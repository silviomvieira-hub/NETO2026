#!/usr/bin/env bash
# ============================================================
# HEFESTO · Hook PostToolUse — Anti-Alucinacao em Relatorios HTML
# ============================================================
# Disparado automaticamente apos Write/Edit em qualquer HTML
# dentro de frontend/public/**. Roda o auditor de fatos e
# bloqueia entrega se houver bloqueios criticos.
#
# Instalado: 2026-04-07 apos incidente Aracaju
# Autor: Hefesto, Diretor de Tecnologia INTEIA
# ============================================================

set -uo pipefail

# Receber path do arquivo via variavel de ambiente do hook ou primeiro arg
ARQUIVO="${CLAUDE_TOOL_FILE_PATH:-${1:-}}"

# Sair silencioso se nao for HTML em frontend/public
if [[ -z "$ARQUIVO" ]]; then exit 0; fi
if [[ "$ARQUIVO" != *".html" ]]; then exit 0; fi
if [[ "$ARQUIVO" != *"frontend/public/"* ]] && [[ "$ARQUIVO" != *"frontend\\public\\"* ]]; then exit 0; fi

# Achar fontes.json correspondente: <pasta>/fontes.json OU scripts/auditoria_fatos/fontes_<slug>.json
PASTA=$(dirname "$ARQUIVO")
SLUG=$(basename "$PASTA")
FONTES_LOCAL="$PASTA/fontes.json"
FONTES_GLOBAL="scripts/auditoria_fatos/fontes_${SLUG}.json"

if [[ -f "$FONTES_LOCAL" ]]; then
  FONTES="$FONTES_LOCAL"
elif [[ -f "$FONTES_GLOBAL" ]]; then
  FONTES="$FONTES_GLOBAL"
else
  echo ""
  echo "============================================================" >&2
  echo "[HEFESTO · ALERTA AMARELO]" >&2
  echo "  HTML detectado em frontend/public sem arquivo de fontes." >&2
  echo "  Arquivo: $ARQUIVO" >&2
  echo "  Esperado: $FONTES_LOCAL  ou  $FONTES_GLOBAL" >&2
  echo "  ACAO: criar fontes.json antes de entrega ao cliente." >&2
  echo "============================================================" >&2
  exit 0
fi

# Rodar auditor
echo ""
echo "[HEFESTO] Auditando $ARQUIVO contra $FONTES ..."
python scripts/auditoria_fatos/auditor_fatos.py "$ARQUIVO" "$FONTES" 2>&1 | tail -12
EXIT_CODE=${PIPESTATUS[0]}

if [[ $EXIT_CODE -ne 0 ]]; then
  echo "" >&2
  echo "============================================================" >&2
  echo "[HEFESTO · ALERTA VERMELHO]" >&2
  echo "  AUDITOR DETECTOU BLOQUEIOS CRITICOS NO HTML" >&2
  echo "  Arquivo: $ARQUIVO" >&2
  echo "  ACAO OBRIGATORIA antes de qualquer entrega:" >&2
  echo "    1. Verificar percentuais e valores monetarios sinalizados" >&2
  echo "    2. Adicionar fontes em $FONTES" >&2
  echo "    3. OU remover afirmacoes nao verificadas do HTML" >&2
  echo "    4. Re-rodar: python scripts/auditoria_fatos/auditor_fatos.py" >&2
  echo "  PROIBIDO entregar relatorio ao cliente sem score [VERDE]." >&2
  echo "============================================================" >&2
  exit 2
fi

echo "[HEFESTO] Auditoria OK. Numericos verificados."
exit 0
