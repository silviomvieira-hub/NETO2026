"""
Gerador de Imagens INTEIA - Gemini 3 Pro Image Preview
=====================================================
Gera imagens via API Google Gemini com suporte a:
- Aspect ratios configuráveis (padrão: 1:1)
- Tamanhos configuráveis (padrão: 1K)
- Geração de pessoas habilitada
- Google Search integrado para referências visuais
- Salvamento automático com extensão correta

Uso:
    python gerar_imagem.py "Um logo profissional para consultoria política"
    python gerar_imagem.py "Infográfico eleitoral" --ratio 16:9 --size 2K --output relatorio_header
    python gerar_imagem.py "Foto de campanha" --ratio 4:3 --dir frontend/public/images
"""

import argparse
import mimetypes
import os
import sys
from datetime import datetime
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("ERRO: Dependência 'google-genai' não instalada.")
    print("Execute: pip install google-genai")
    sys.exit(1)


def carregar_api_key() -> str:
    """Carrega GEMINI_API_KEY do ambiente ou do .env na raiz do projeto."""
    key = os.environ.get("GEMINI_API_KEY")
    if key:
        return key

    # Tentar carregar do .env
    env_paths = [
        Path(__file__).resolve().parents[3] / ".env",  # raiz do projeto
        Path.cwd() / ".env",
    ]

    for env_path in env_paths:
        if env_path.exists():
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("GEMINI_API_KEY="):
                        key = line.split("=", 1)[1].strip().strip("'\"")
                        if key:
                            os.environ["GEMINI_API_KEY"] = key
                            return key

    print("ERRO: GEMINI_API_KEY não encontrada.")
    print("Defina no .env (GEMINI_API_KEY=sua_chave) ou como variável de ambiente.")
    sys.exit(1)


def gerar_imagem(
    prompt: str,
    output_name: str = None,
    output_dir: str = ".",
    aspect_ratio: str = "1:1",
    image_size: str = "1K",
) -> list[str]:
    """
    Gera imagem(ns) usando Gemini 3 Pro Image Preview.

    Args:
        prompt: Descrição da imagem a ser gerada
        output_name: Nome base do arquivo (sem extensão). Se None, gera automático.
        output_dir: Diretório de saída
        aspect_ratio: Proporção (1:1, 16:9, 9:16, 4:3, 3:4)
        image_size: Tamanho (1K, 2K)

    Returns:
        Lista de caminhos dos arquivos gerados
    """
    api_key = carregar_api_key()
    client = genai.Client(api_key=api_key)

    model = "gemini-3-pro-image-preview"

    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=prompt)],
        ),
    ]

    tools = [
        types.Tool(googleSearch=types.GoogleSearch()),
    ]

    generate_content_config = types.GenerateContentConfig(
        image_config=types.ImageConfig(
            aspect_ratio=aspect_ratio,
            image_size=image_size,
        ),
        response_modalities=["IMAGE", "TEXT"],
        tools=tools,
    )

    # Garantir diretório de saída existe
    os.makedirs(output_dir, exist_ok=True)

    # Nome base
    if not output_name:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        # Sanitizar prompt para nome de arquivo
        slug = prompt[:40].lower()
        slug = "".join(c if c.isalnum() or c in " -_" else "" for c in slug)
        slug = slug.strip().replace(" ", "_")
        output_name = f"img_{slug}_{timestamp}"

    arquivos_gerados = []
    file_index = 0
    text_response = []

    print(f"Gerando imagem: '{prompt}'")
    print(f"  Modelo: {model}")
    print(f"  Ratio: {aspect_ratio} | Tamanho: {image_size}")
    print(f"  Saída: {output_dir}/")
    print()

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        if chunk.parts is None:
            continue

        for part in chunk.parts:
            if part.inline_data and part.inline_data.data:
                suffix = f"_{file_index}" if file_index > 0 else ""
                file_extension = mimetypes.guess_extension(part.inline_data.mime_type) or ".png"
                file_path = os.path.join(output_dir, f"{output_name}{suffix}{file_extension}")

                with open(file_path, "wb") as f:
                    f.write(part.inline_data.data)

                arquivos_gerados.append(file_path)
                print(f"  Imagem salva: {file_path}")
                file_index += 1

            elif part.text:
                text_response.append(part.text)

    if text_response:
        full_text = "".join(text_response)
        print(f"\n  Resposta do modelo: {full_text}")

    if not arquivos_gerados:
        print("\n  AVISO: Nenhuma imagem foi gerada. O modelo retornou apenas texto.")

    return arquivos_gerados


def main():
    parser = argparse.ArgumentParser(
        description="Gerador de Imagens INTEIA - Gemini 3 Pro",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  python gerar_imagem.py "Logo profissional INTEIA"
  python gerar_imagem.py "Banner eleitoral" --ratio 16:9 --size 2K
  python gerar_imagem.py "Ícone de votação" --output icone_voto --dir frontend/public
        """,
    )

    parser.add_argument("prompt", help="Descrição da imagem a gerar")
    parser.add_argument("--output", "-o", help="Nome do arquivo de saída (sem extensão)")
    parser.add_argument("--dir", "-d", default=".", help="Diretório de saída (padrão: atual)")
    parser.add_argument(
        "--ratio", "-r",
        default="1:1",
        choices=["1:1", "16:9", "9:16", "4:3", "3:4"],
        help="Aspect ratio (padrão: 1:1)",
    )
    parser.add_argument(
        "--size", "-s",
        default="1K",
        choices=["1K", "2K"],
        help="Tamanho da imagem (padrão: 1K)",
    )

    args = parser.parse_args()

    arquivos = gerar_imagem(
        prompt=args.prompt,
        output_name=args.output,
        output_dir=args.dir,
        aspect_ratio=args.ratio,
        image_size=args.size,
    )

    if arquivos:
        print(f"\n{'='*50}")
        print(f"Total: {len(arquivos)} imagem(ns) gerada(s)")
        for f in arquivos:
            print(f"  -> {f}")
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
