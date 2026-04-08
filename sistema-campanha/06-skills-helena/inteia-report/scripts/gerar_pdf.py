#!/usr/bin/env python3
"""
INTEIA Report — Gerador de PDF a partir de HTML

Dois modos:
  1. Via Playwright (headless Chrome) — fidelidade visual 100%
  2. Via WeasyPrint (fallback sem browser)

Uso:
  python gerar_pdf.py relatorio.html                    # gera relatorio.pdf via Playwright
  python gerar_pdf.py relatorio.html --engine weasy     # gera via WeasyPrint
  python gerar_pdf.py relatorio.html -o saida.pdf       # nome customizado
  python gerar_pdf.py relatorio.html --landscape        # paisagem
"""
import argparse
import sys
import os
from pathlib import Path


def gerar_pdf_playwright(html_path: Path, pdf_path: Path, landscape: bool = False):
    """Gera PDF usando Playwright (Chromium headless). Fidelidade visual máxima."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Playwright não instalado. Instalando...")
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "playwright"])
        subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium"])
        from playwright.sync_api import sync_playwright

    html_uri = html_path.resolve().as_uri()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Carregar HTML com timeout generoso (relatórios são pesados)
        page.goto(html_uri, wait_until="networkidle", timeout=60000)

        # Esperar fontes Google carregarem
        page.wait_for_timeout(2000)

        page.pdf(
            path=str(pdf_path),
            format="A4",
            landscape=landscape,
            print_background=True,
            margin={
                "top": "15mm",
                "right": "18mm",
                "bottom": "12mm",
                "left": "22mm",
            },
            # Primeira página (capa) sem margem — tratado via CSS @page :first
        )
        browser.close()

    tamanho_mb = pdf_path.stat().st_size / (1024 * 1024)
    print(f"PDF gerado: {pdf_path} ({tamanho_mb:.1f} MB)")


def gerar_pdf_weasyprint(html_path: Path, pdf_path: Path, landscape: bool = False):
    """Gera PDF usando WeasyPrint. Mais leve, sem browser."""
    try:
        from weasyprint import HTML
    except ImportError:
        print("WeasyPrint não instalado. Instalando...")
        os.system(f"{sys.executable} -m pip install weasyprint")
        from weasyprint import HTML

    if landscape:
        # Injetar CSS @page landscape no HTML antes de renderizar
        import tempfile
        html_text = html_path.read_text(encoding="utf-8")
        landscape_css = "<style>@page{size:A4 landscape;}</style>"
        if "</head>" in html_text:
            html_text = html_text.replace("</head>", f"{landscape_css}</head>", 1)
        else:
            html_text = f"{landscape_css}{html_text}"
        with tempfile.NamedTemporaryFile(mode="w", suffix=".html", delete=False, encoding="utf-8") as tmp:
            tmp.write(html_text)
            tmp_path = Path(tmp.name)
        try:
            HTML(filename=str(tmp_path)).write_pdf(str(pdf_path))
        finally:
            tmp_path.unlink(missing_ok=True)
    else:
        html_uri = html_path.resolve().as_uri()
        HTML(url=html_uri).write_pdf(str(pdf_path))

    tamanho_mb = pdf_path.stat().st_size / (1024 * 1024)
    print(f"PDF gerado: {pdf_path} ({tamanho_mb:.1f} MB)")


def main():
    parser = argparse.ArgumentParser(description="INTEIA Report — HTML → PDF")
    parser.add_argument("html", type=Path, help="Arquivo HTML do relatório")
    parser.add_argument("-o", "--output", type=Path, default=None, help="Arquivo PDF de saída")
    parser.add_argument("--engine", choices=["playwright", "weasy"], default="playwright",
                        help="Motor de renderização (default: playwright)")
    parser.add_argument("--landscape", action="store_true", help="Orientação paisagem")
    args = parser.parse_args()

    if not args.html.exists():
        print(f"Arquivo não encontrado: {args.html}", file=sys.stderr)
        sys.exit(1)

    pdf_path = args.output or args.html.with_suffix(".pdf")

    if args.engine == "playwright":
        gerar_pdf_playwright(args.html, pdf_path, args.landscape)
    else:
        gerar_pdf_weasyprint(args.html, pdf_path, args.landscape)


if __name__ == "__main__":
    main()
