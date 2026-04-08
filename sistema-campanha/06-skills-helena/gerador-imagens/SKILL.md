# SKILL: Gerador de Imagens (Gemini 3 Pro)

> **Propósito**: Gerar imagens de alta qualidade via Google Gemini 3 Pro Image Preview, integrado ao Claude Code como skill acionável por comando.

---

## QUANDO USAR ESTA SKILL

- Usuário pede para **gerar**, **criar**, **desenhar** ou **fazer uma imagem**
- Pedidos de **logo**, **banner**, **ícone**, **ilustração**, **infográfico**
- Criação de **assets visuais** para relatórios, apresentações ou frontend
- Qualquer solicitação envolvendo **geração de imagem por IA**

### Triggers (palavras-chave)
`gerar imagem`, `criar imagem`, `fazer imagem`, `desenhar`, `logo`, `banner`, `ícone`, `ilustração`, `infográfico`, `thumbnail`, `capa`, `arte`, `visual`, `generate image`, `create image`

---

## CONFIGURAÇÃO

### 1. API Key (obrigatório)

Adicionar no `.env` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_aqui
```

> A chave é obtida em: https://aistudio.google.com/apikey

### 2. Instalar dependência

```bash
pip install google-genai
```

### 3. Segurança

O `.gitignore` já protege o `.env`:
```gitignore
.env
.env.*
```

**NUNCA** commitar a API key. Ela fica APENAS no `.env` local.

---

## COMO USAR

### Via Script Direto

```bash
# Imagem padrão 1:1 1K
python .claude/skills/gerador-imagens/gerar_imagem.py "Logo profissional para consultoria política"

# Com opções
python .claude/skills/gerador-imagens/gerar_imagem.py "Banner eleitoral moderno" --ratio 16:9 --size 2K --output banner_campanha --dir frontend/public/images

# Ícone quadrado
python .claude/skills/gerador-imagens/gerar_imagem.py "Ícone de urna eletrônica minimalista" -o icone_urna -d frontend/public
```

### Via Claude Code (Integração)

Quando o usuário pedir para gerar uma imagem, o Claude deve:

1. **Construir o prompt** descritivo em inglês (Gemini responde melhor em inglês)
2. **Executar o script** com os parâmetros adequados
3. **Reportar** o caminho do arquivo gerado

```python
# Exemplo de chamada programática
import subprocess
import sys

resultado = subprocess.run(
    [
        sys.executable,
        ".claude/skills/gerador-imagens/gerar_imagem.py",
        "Professional political consulting logo with golden amber tones",
        "--output", "logo_inteia",
        "--dir", "frontend/public/images",
        "--ratio", "1:1",
        "--size", "1K",
    ],
    capture_output=True,
    text=True,
)
print(resultado.stdout)
```

---

## PARÂMETROS

| Parâmetro | Valores | Padrão | Descrição |
|-----------|---------|--------|-----------|
| `prompt` | texto livre | (obrigatório) | Descrição da imagem |
| `--ratio` / `-r` | `1:1`, `16:9`, `9:16`, `4:3`, `3:4` | `1:1` | Proporção da imagem |
| `--size` / `-s` | `1K`, `2K` | `1K` | Resolução |
| `--output` / `-o` | nome sem extensão | auto (timestamp) | Nome do arquivo |
| `--dir` / `-d` | caminho | `.` (atual) | Diretório de saída |

---

## ASPECT RATIOS - Quando Usar

| Ratio | Uso Recomendado |
|-------|-----------------|
| **1:1** | Logos, ícones, avatares, thumbnails, posts Instagram |
| **16:9** | Banners, headers, apresentações, YouTube thumbnails |
| **9:16** | Stories, posts verticais, mobile-first |
| **4:3** | Documentos, relatórios, fotos tradicionais |
| **3:4** | Retratos, posts Pinterest |

---

## BOAS PRÁTICAS PARA PROMPTS

### Estrutura Recomendada

```
[Tipo] + [Sujeito] + [Estilo] + [Cores] + [Detalhes]
```

### Exemplos de Prompts Eficazes

```
# Logo
"Professional minimalist logo for political consulting firm, golden amber and dark navy colors, clean geometric design, white background"

# Banner
"Modern electoral campaign banner, Brazilian flag colors, abstract geometric patterns, professional clean design, 2026 election theme"

# Infográfico
"Clean infographic about voter demographics in Brasilia, charts and icons, amber gold accent color, professional data visualization style"

# Ilustração
"Digital illustration of Brazilian Capitol building Congresso Nacional, sunset golden hour, modern vector art style"

# Ícone
"Flat design icon of a ballot box with a checkmark, amber gold color on transparent background, material design style"
```

### Dicas

1. **Escrever prompts em inglês** - Gemini gera melhor com prompts em inglês
2. **Ser específico** - "minimalist logo with geometric shapes" > "um logo bonito"
3. **Incluir cores** - Mencionar a paleta INTEIA (amber/gold, navy, slate)
4. **Definir estilo** - professional, minimalist, modern, flat design, etc.
5. **Especificar fundo** - white background, transparent, gradient, etc.

---

## FLUXO DO CLAUDE CODE

Quando o usuário pedir uma imagem, seguir este fluxo:

```
1. INTERPRETAR o pedido do usuário
2. TRADUZIR para um prompt descritivo em inglês
3. ESCOLHER ratio e size adequados:
   - Logo/ícone → 1:1, 1K
   - Banner/header → 16:9, 1K ou 2K
   - Relatório → 4:3, 1K
   - Story/mobile → 9:16, 1K
4. DEFINIR nome e diretório de saída adequados
5. EXECUTAR o script via Bash
6. REPORTAR o resultado ao usuário
7. Se solicitado, INTEGRAR no projeto (componente, relatório, etc.)
```

### Exemplo de Interação

**Usuário:** "Gera uma imagem de logo para a INTEIA"

**Claude:**
```bash
python .claude/skills/gerador-imagens/gerar_imagem.py \
  "Professional minimalist logo for INTEIA political intelligence firm, golden amber accent on dark navy background, clean modern typography, geometric AI brain icon" \
  --output logo_inteia \
  --dir frontend/public/images \
  --ratio 1:1 \
  --size 1K
```

---

## INTEGRAÇÃO COM PROJETO

### Diretórios Recomendados

| Tipo de Imagem | Diretório |
|----------------|-----------|
| Assets do frontend | `frontend/public/images/` |
| Relatórios | `frontend/public/relatorios/images/` |
| Documentação | `docs/images/` |
| Temporários | `.tmp/images/` (adicionar ao .gitignore) |

### Uso em Componentes React

```tsx
// Após gerar a imagem em frontend/public/images/
<Image
  src="/images/logo_inteia.png"
  alt="Logo INTEIA"
  width={200}
  height={200}
/>
```

---

## TROUBLESHOOTING

| Problema | Solução |
|----------|---------|
| `google-genai não instalado` | `pip install google-genai` |
| `GEMINI_API_KEY não encontrada` | Adicionar no `.env` da raiz |
| `Nenhuma imagem gerada` | Prompt pode ter sido bloqueado por safety filters. Reformular. |
| `Quota exceeded` | Aguardar reset ou verificar plano em aistudio.google.com |
| `Modelo não disponível` | Verificar se `gemini-3-pro-image-preview` está ativo na região |

---

## MODELO UTILIZADO

| Propriedade | Valor |
|-------------|-------|
| **Modelo** | `gemini-3-pro-image-preview` |
| **Provider** | Google AI (Gemini) |
| **Capabilities** | Geração de imagem + texto |
| **Aspect Ratios** | 1:1, 16:9, 9:16, 4:3, 3:4 |
| **Resoluções** | 1K, 2K |
| **Geração de pessoas** | Habilitada |
| **Google Search** | Integrado (referências visuais) |

---

## REFERÊNCIAS

| Arquivo | Descrição |
|---------|-----------|
| `.claude/skills/gerador-imagens/gerar_imagem.py` | Script principal de geração |
| `.env` | API key (GEMINI_API_KEY) |
| `.gitignore` | Proteção do .env |
| `frontend/public/images/` | Diretório padrão de assets |

---

*Skill criada em: 2026-02-12*
*Mantida por: Claude Code*
*Modelo: Gemini 3 Pro Image Preview*
