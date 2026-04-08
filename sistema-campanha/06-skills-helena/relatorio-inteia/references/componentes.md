# Componentes Visuais

Funções auxiliares para elementos visuais em relatórios INTEIA.

## Barras de Progresso

```javascript
function gerarBarraProgresso(valor, total = 10) {
  const cheios = Math.round(valor);
  return "█".repeat(cheios) + "░".repeat(total - cheios);
}
// Uso: gerarBarraProgresso(7.5) → "████████░░"
```

## Cores por Valor

```javascript
function corPorValor(valor, inverso = false) {
  if (inverso) {
    return valor >= 7 ? "2E7D32" : valor >= 4 ? "F57C00" : "C62828";
  }
  return valor >= 7 ? "C62828" : valor >= 4 ? "F57C00" : "2E7D32";
}
```

## Nível de Risco

```javascript
function nivelRisco(valor, inverso = false) {
  const niveis = {
    alto: { texto: "ALTO", cor: "C62828", fundo: "FFEBEE" },
    medio: { texto: "MÉDIO", cor: "F57C00", fundo: "FFF8E1" },
    baixo: { texto: "BAIXO", cor: "2E7D32", fundo: "E8F5E9" }
  };
  if (inverso) {
    return valor >= 7 ? niveis.baixo : valor >= 4 ? niveis.medio : niveis.alto;
  }
  return valor >= 7 ? niveis.alto : valor >= 4 ? niveis.medio : niveis.baixo;
}
```

## Caixa de Destaque

```javascript
function criarCaixaDestaque(tipo, titulo, texto) {
  const configs = {
    CONCLUSAO: { borda: "C9A227", fundo: "F5F5F5", texto: "0A1628" },
    INSIGHT: { borda: "1565C0", fundo: "E3F2FD", texto: "1565C0" },
    ALERTA: { borda: "E65100", fundo: "FFF3E0", texto: "E65100" },
    MITIGACAO: { borda: "5E35B1", fundo: "EDE7F6", texto: "5E35B1" }
  };
  // Retorna TableCell com borda lateral de 24pt na cor especificada
}
```

## Tabela de Ranking

Estrutura: Item | Barra+Score | Nível Risco

```javascript
const partidos = [
  { nome: "PSOL", score: 10.0 },
  { nome: "PT", score: 9.3 },
  { nome: "MDB", score: 5.6 }
];
// Gera tabela com barras visuais e classificação de risco
```

## Grid de Métricas (4 colunas)

```javascript
const metricas = [
  { valor: "21", label: "Favoráveis" },
  { valor: "3", label: "Contrários" },
  { valor: "75%", label: "Prob. Assinaturas" },
  { valor: "30%", label: "Prob. Instalação" }
];
```

## Tabela de Cenários

```javascript
const cenarios = [
  { tipo: "FAVORÁVEL", descricao: "...", prob: "45%", cor: "2E7D32", fundo: "E8F5E9" },
  { tipo: "NEUTRO", descricao: "...", prob: "25%", cor: "F57C00", fundo: "FFF8E1" },
  { tipo: "DESFAVORÁVEL", descricao: "...", prob: "30%", cor: "C62828", fundo: "FFEBEE" }
];
```

## Grid de Vetores (2x2)

```javascript
const vetores = [
  { num: "01", titulo: "Ação 1", descricao: "..." },
  { num: "02", titulo: "Ação 2", descricao: "..." },
  { num: "03", titulo: "Ação 3", descricao: "..." },
  { num: "04", titulo: "Ação 4", descricao: "..." }
];
```

## Matriz de Risco

```javascript
const riscos = [
  { risco: "ALTO", qtde: 5, itens: "Lista de itens alto risco" },
  { risco: "MÉDIO", qtde: 8, itens: "Lista de itens médio risco" },
  { risco: "BAIXO", qtde: 11, itens: "Lista de itens baixo risco" }
];
```

## Grid de Pilares (3 colunas)

```javascript
const pilares = [
  { numero: "I", titulo: "Pilar 1", descricao: "..." },
  { numero: "II", titulo: "Pilar 2", descricao: "..." },
  { numero: "III", titulo: "Pilar 3", descricao: "..." }
];
```

## Especificações Técnicas

```javascript
// Página A4
page: { width: 11906, height: 16838 }
margin: { top: 1800, right: 1134, bottom: 1134, left: 1134 }

// Tipografia (Arial)
titulo: 40pt bold NAVY
subtitulo: 28pt GOLD
secao: 28pt bold NAVY
corpo: 20-22pt
tabela: 18-20pt

// Bordas
thinBorder: { style: SINGLE, size: 1, color: "DDDDDD" }
goldBorder: { style: SINGLE, size: 8, color: "C9A227" }
accentBorder: { style: SINGLE, size: 24 }
```
