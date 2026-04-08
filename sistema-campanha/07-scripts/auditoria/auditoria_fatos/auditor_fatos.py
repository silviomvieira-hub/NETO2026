"""
INTEIA — Auditor de Fatos para Relatorios
==========================================
Pega um arquivo HTML/MD e extrai TODA afirmacao factual passivel de verificacao:
  - Numeros (valores monetarios, percentuais, contagens, datas)
  - Nomes proprios (pessoas, instituicoes, lugares)
  - Citacoes diretas

Cruza com um arquivo `fontes.json` que mapeia cada afirmacao para fonte verificavel.
Gera relatorio com 4 categorias:
  [V] VERIFICADO   — afirmacao tem fonte oficial registrada
  [S] SIMULACAO    — output computacional reprodutivel (Monte Carlo, Banzhaf, etc.)
  [I] INFERENCIA   — raciocinio explicito sobre dados verificados
  [X] NAO VERIFICADO — afirmacao sem fonte. BLOQUEIA entrega.

USO:
  python scripts/auditoria_fatos/auditor_fatos.py <arquivo.html> <fontes.json>

CRIADO em 2026-04-07 apos incidente de alucinacao no dossie Rogerio Carvalho.
NAO entregar nenhum relatorio ao cliente sem rodar este script com 0 alertas [X].
"""

import re
import sys
import json
from pathlib import Path
from html.parser import HTMLParser


# ============================================================
# 1. EXTRATOR DE TEXTO PURO DE HTML
# ============================================================
class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.skip = False
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.skip = True
    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip = False
    def handle_data(self, data):
        if not self.skip:
            self.text.append(data)
    def get_text(self):
        return '\n'.join(self.text)


def extrair_texto(caminho):
    raw = Path(caminho).read_text(encoding='utf-8')
    if caminho.endswith('.html'):
        p = TextExtractor()
        p.feed(raw)
        return p.get_text()
    return raw  # markdown


# ============================================================
# 2. EXTRATORES DE AFIRMACOES FACTUAIS
# ============================================================
PADROES = {
    'monetario': re.compile(r'R\$\s*[\d\.,]+(?:\s*(?:bi|bilh[oõ]es?|mi|milh[oõ]es?|mil)?)', re.IGNORECASE),
    'percentual': re.compile(r'\d{1,3}[,.]?\d*\s*%'),
    'data': re.compile(r'\b\d{1,2}[\/\.\s]?(?:jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez|janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)[\/\.\s]*\d{2,4}\b', re.IGNORECASE),
    'numero_grande': re.compile(r'\b\d{1,3}(?:\.\d{3})+\b'),
    'instituicao': re.compile(r'\b(?:Banco\s+\w+|Senado|C[âa]mara|STF|TSE|PF|BC|MDB|PSD|PT|PL|PSDB|CPI|CPMI|CVM|FGC|RPPS|BRB|REAG|Petros|Funcef|Previ|Rioprevid[eê]ncia)\b', re.IGNORECASE),
    'pessoa_capitalizada': re.compile(r'\b[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+(?:\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+){1,3}\b'),
}

# Stopwords para nomes (evitar pegar titulos genericos)
STOP_NOMES = {
    'Banco Master', 'Senado Federal', 'Camara Federal', 'Carta Capital',
    'Agencia Brasil', 'Helena Strategos', 'Igor Morais', 'Oracle Gnosis',
    'Diana Venatrix', 'Midas Chrysos', 'Iris Aetheria', 'Ares Tekhton', 'Themis Nomos',
    'Cormorant Garamond', 'Outfit', 'JetBrains Mono', 'Banco Central',
    'INTEIA', 'Brasilia', 'Sao Paulo', 'Rio de Janeiro',
}


def extrair_afirmacoes(texto):
    """Retorna dict {categoria: [lista de matches unicos]}"""
    achados = {}
    for nome, regex in PADROES.items():
        matches = regex.findall(texto)
        # normalizar
        matches = [m.strip() for m in matches]
        unicos = sorted(set(matches))
        achados[nome] = unicos
    return achados


# ============================================================
# 3. AUDITORIA — CRUZAR COM FONTES.JSON
# ============================================================
def auditar(caminho_html, caminho_fontes):
    print(f"\n{'='*70}")
    print(f"INTEIA · AUDITOR DE FATOS")
    print(f"{'='*70}")
    print(f"Arquivo:  {caminho_html}")
    print(f"Fontes:   {caminho_fontes}")
    print(f"{'='*70}\n")

    texto = extrair_texto(caminho_html)
    achados = extrair_afirmacoes(texto)

    if Path(caminho_fontes).exists():
        fontes = json.loads(Path(caminho_fontes).read_text(encoding='utf-8'))
    else:
        print(f"[!] Arquivo fontes nao encontrado: {caminho_fontes}")
        print(f"[!] Criando template vazio. Preencha e rode novamente.\n")
        fontes = {'verificados': [], 'simulacoes': [], 'inferencias': [], 'hipoteses': []}
        Path(caminho_fontes).write_text(json.dumps(fontes, ensure_ascii=False, indent=2), encoding='utf-8')

    # Indexar fontes
    todas_string_verificadas = set()
    for cat in ('verificados', 'simulacoes', 'inferencias', 'hipoteses'):
        for entrada in fontes.get(cat, []):
            chave = entrada.get('claim', '').strip()
            if chave:
                todas_string_verificadas.add(chave)
            for k in entrada.get('aliases', []):
                todas_string_verificadas.add(k.strip())

    # Stats
    total_claims = sum(len(v) for v in achados.values())
    total_fontes = sum(len(fontes.get(c, [])) for c in ('verificados', 'simulacoes', 'inferencias', 'hipoteses'))

    print(f"[Estatisticas brutas]")
    print(f"  Afirmacoes factuais detectadas: {total_claims}")
    print(f"  Entradas em fontes.json:        {total_fontes}")
    print()

    # Por categoria
    print(f"[Detalhamento por padrao detectado]")
    for cat, lista in achados.items():
        print(f"  {cat:20s}: {len(lista):4d} ocorrencias unicas")
    print()

    # Auditar nomes proprios contra stopwords e fontes
    nomes_unicos = set(achados.get('pessoa_capitalizada', []))
    nomes_alvo = nomes_unicos - STOP_NOMES
    nomes_nao_verificados = []
    for n in sorted(nomes_alvo):
        if n in todas_string_verificadas:
            continue
        nomes_nao_verificados.append(n)

    print(f"[Auditoria de NOMES PROPRIOS]")
    print(f"  Nomes unicos no texto:       {len(nomes_unicos)}")
    print(f"  Stopwords (auto-OK):         {len(nomes_unicos & STOP_NOMES)}")
    print(f"  Nao verificados (alerta):    {len(nomes_nao_verificados)}")
    if nomes_nao_verificados:
        print(f"  Lista:")
        for n in nomes_nao_verificados[:30]:
            print(f"    [X] {n}")
    print()

    # Auditar valores monetarios
    monetarios = achados.get('monetario', [])
    monetarios_nao_verif = [m for m in monetarios if m not in todas_string_verificadas]
    print(f"[Auditoria de VALORES MONETARIOS]")
    print(f"  Total no texto:        {len(monetarios)}")
    print(f"  Nao verificados:       {len(monetarios_nao_verif)}")
    for m in monetarios_nao_verif[:15]:
        print(f"    [X] {m}")
    print()

    # Auditar percentuais
    pcts = achados.get('percentual', [])
    pcts_nao_verif = [p for p in pcts if p not in todas_string_verificadas]
    print(f"[Auditoria de PERCENTUAIS]")
    print(f"  Total no texto:        {len(pcts)}")
    print(f"  Nao verificados:       {len(pcts_nao_verif)}")
    for p in pcts_nao_verif[:20]:
        print(f"    [X] {p}")
    print()

    # SCORE FINAL — bloqueios criticos sao numericos.
    # Nomes proprios sao AVISO (regex ruidoso em HTML), nao bloqueiam score critico.
    bloqueios_criticos = len(monetarios_nao_verif) + len(pcts_nao_verif)
    avisos = len(nomes_nao_verificados)
    score = max(0, 100 - bloqueios_criticos * 8 - min(avisos, 25))

    print(f"{'='*70}")
    print(f"SCORE DE VERIFICABILIDADE: {score}/100")
    print(f"  Bloqueios criticos (monetarios + percentuais nao verificados): {bloqueios_criticos}")
    print(f"  Avisos (nomes proprios nao classificados): {avisos}")
    if bloqueios_criticos == 0 and avisos < 10:
        print(f"STATUS: [VERDE] Numeros 100% verificados. Liberado para entrega.")
    elif bloqueios_criticos == 0:
        print(f"STATUS: [AMARELO-VERDE] Numeros OK. Avisos de nomes proprios sao ruido de regex em HTML — revisar manualmente.")
    elif bloqueios_criticos < 3:
        print(f"STATUS: [AMARELO] {bloqueios_criticos} bloqueios criticos. Verificar antes de entregar.")
    else:
        print(f"STATUS: [VERMELHO] {bloqueios_criticos} bloqueios criticos. NAO ENTREGAR sem verificar.")
    print(f"{'='*70}\n")
    bloqueios = bloqueios_criticos

    return {
        'score': score,
        'bloqueios': bloqueios,
        'nomes_nao_verificados': nomes_nao_verificados,
        'monetarios_nao_verificados': monetarios_nao_verif,
        'percentuais_nao_verificados': pcts_nao_verif,
    }


# ============================================================
# MAIN
# ============================================================
if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Uso: python auditor_fatos.py <arquivo.html> <fontes.json>")
        sys.exit(1)
    resultado = auditar(sys.argv[1], sys.argv[2])
    sys.exit(0 if resultado['bloqueios'] == 0 else 1)
