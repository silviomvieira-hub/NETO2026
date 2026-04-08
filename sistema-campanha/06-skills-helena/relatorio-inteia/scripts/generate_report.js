/**
 * INTEIA - Template de Relatório Profissional
 * 
 * Este template gera documentos Word seguindo o padrão visual e estrutural
 * da INTEIA (Instituto Nacional de Tecnologia Estratégica e Inteligência Artificial).
 * 
 * Uso: Adaptar as variáveis de conteúdo (CONTENT) e executar com Node.js
 * Dependência: npm install -g docx
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
        VerticalAlign, PageBreak } = require('docx');
const fs = require('fs');

// ============================================================================
// PALETA DE CORES INTEIA
// ============================================================================
const COLORS = {
  NAVY: "0A1628",       // Azul marinho principal
  GOLD: "C9A227",       // Dourado de destaque
  GRAY: "5A5A5A",       // Texto secundário
  LIGHT_GRAY: "F5F5F5", // Fundos de tabela
  WHITE: "FFFFFF",      // Fundo padrão
  // Semânticas
  GREEN: "2E7D32",      // Baixo risco / Favorável
  GREEN_LIGHT: "E8F5E9",
  ORANGE: "F57C00",     // Médio risco / Neutro
  ORANGE_LIGHT: "FFF8E1",
  RED: "C62828",        // Alto risco / Desfavorável
  RED_LIGHT: "FFEBEE",
  BLUE: "1565C0",       // Insight
  BLUE_LIGHT: "E3F2FD",
  PURPLE: "5E35B1",     // Mitigação
  PURPLE_LIGHT: "EDE7F6",
  ALERT_ORANGE: "E65100",
  ALERT_ORANGE_LIGHT: "FFF3E0"
};

// ============================================================================
// BORDAS PADRÃO
// ============================================================================
const noBorder = { style: BorderStyle.NONE, size: 0, color: COLORS.WHITE };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" };
const thinBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };
const goldBottomBorder = { style: BorderStyle.SINGLE, size: 8, color: COLORS.GOLD };

// ============================================================================
// CONTEÚDO DO RELATÓRIO (ADAPTAR CONFORME NECESSIDADE)
// ============================================================================
const CONTENT = {
  // Metadados
  titulo: "TÍTULO DO RELATÓRIO",
  subtitulo: "Subtítulo Contextualizador",
  instituicao: "Instituição ou Cliente",
  data: "Janeiro 2026",
  pesquisador: "Igor Morais Vasconcelos",
  
  // Conclusão Principal
  conclusao: "Texto da conclusão principal que responde diretamente à pergunta do relatório. Deve ser conciso e direto, em 2-3 linhas no máximo.",
  
  // Métricas (4 principais)
  metricas: [
    { valor: "21", label: "Favoráveis à CPI" },
    { valor: "3", label: "Contrários à CPI" },
    { valor: "75%", label: "Prob. Assinaturas" },
    { valor: "30%", label: "Prob. Instalação" }
  ],
  
  // Cenários (3 obrigatórios)
  cenarios: [
    { tipo: "FAVORÁVEL", descricao: "Descrição do cenário favorável", prob: "45%", cor: COLORS.GREEN, corFundo: COLORS.GREEN_LIGHT },
    { tipo: "NEUTRO", descricao: "Descrição do cenário neutro", prob: "25%", cor: COLORS.ORANGE, corFundo: COLORS.ORANGE_LIGHT },
    { tipo: "DESFAVORÁVEL", descricao: "Descrição do cenário desfavorável", prob: "30%", cor: COLORS.RED, corFundo: COLORS.RED_LIGHT }
  ],
  
  // Vetores Estratégicos (4)
  vetores: [
    { num: "01", titulo: "Primeiro Vetor", descricao: "Descrição da primeira ação estratégica recomendada" },
    { num: "02", titulo: "Segundo Vetor", descricao: "Descrição da segunda ação estratégica recomendada" },
    { num: "03", titulo: "Terceiro Vetor", descricao: "Descrição da terceira ação estratégica recomendada" },
    { num: "04", titulo: "Quarto Vetor", descricao: "Descrição da quarta ação estratégica recomendada" }
  ],
  
  // Probabilidade Geral
  probabilidadeFavoravel: "70%",
  
  // Metodologia
  metodologia: {
    sistema: "HELENA",
    significado: "Heuristic Engine for Legislative and Electoral Neural Analysis",
    descricao: "Descrição do sistema e metodologia empregada na análise.",
    fundamentacao: "Descrição da fundamentação científica e referências acadêmicas.",
    metricas: [
      { valor: "24", label: "Agentes Simulados" },
      { valor: "67", label: "Atributos por Perfil" },
      { valor: "1.2M", label: "Tokens Processados" },
      { valor: "94%", label: "Validade Estatística" }
    ],
    componentes: [
      { nome: "Perfil Psicográfico", descricao: "Big Five (OCEAN), Moral Foundations Theory, orientação ideológica multidimensional" },
      { nome: "Histórico Comportamental", descricao: "Votações nominais, proposições, discursos em plenário, posicionamentos públicos" },
      { nome: "Rede de Influência", descricao: "Mapeamento de conexões partidárias, coalizões temáticas, financiadores de campanha" },
      { nome: "Função de Utilidade", descricao: "Maximização de capital político ponderada por horizonte eleitoral e custo reputacional" },
      { nome: "Cenário Simulado", descricao: "Monte Carlo com 10.000 iterações, intervalo de confiança de 95%" }
    ],
    limitacoes: "Descrição das limitações do modelo e ressalvas importantes para interpretação dos resultados."
  }
};

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Cria o cabeçalho padrão INTEIA
 */
function criarCabecalho(data) {
  return new Header({
    children: [
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [5400, 4200],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 5400, type: WidthType.DXA },
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    spacing: { after: 40 },
                    children: [
                      new TextRun({ text: "INTE", font: "Arial", bold: true, size: 32, color: COLORS.NAVY }),
                      new TextRun({ text: "IA", font: "Arial", bold: true, size: 32, color: COLORS.GOLD })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 20 },
                    children: [
                      new TextRun({ text: "Instituto Nacional de Tecnologia Estratégica e Inteligência Artificial", font: "Arial", size: 14, color: COLORS.GRAY })
                    ]
                  })
                ]
              }),
              new TableCell({
                width: { size: 4200, type: WidthType.DXA },
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({ text: "Relatório de Inteligência", font: "Arial", size: 18, color: COLORS.GRAY, italics: true })
                    ]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({ text: data, font: "Arial", size: 16, color: COLORS.GRAY })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 120 },
        border: { bottom: goldBottomBorder }
      })
    ]
  });
}

/**
 * Cria o rodapé padrão INTEIA
 */
function criarRodape(pesquisador) {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "INTEIA", font: "Arial", size: 16, bold: true, color: COLORS.NAVY }),
          new TextRun({ text: ` · Pesquisador Responsável: ${pesquisador} · Documento Confidencial`, font: "Arial", size: 16, color: COLORS.GRAY })
        ]
      })
    ]
  });
}

/**
 * Cria uma caixa de destaque (Conclusão, Insight, Alerta, Mitigação)
 */
function criarCaixaDestaque(tipo, titulo, texto) {
  const configs = {
    CONCLUSAO: { corBorda: COLORS.GOLD, corFundo: COLORS.LIGHT_GRAY, corTexto: COLORS.NAVY },
    INSIGHT: { corBorda: COLORS.BLUE, corFundo: COLORS.BLUE_LIGHT, corTexto: COLORS.BLUE },
    ALERTA: { corBorda: COLORS.ALERT_ORANGE, corFundo: COLORS.ALERT_ORANGE_LIGHT, corTexto: COLORS.ALERT_ORANGE },
    MITIGACAO: { corBorda: COLORS.PURPLE, corFundo: COLORS.PURPLE_LIGHT, corTexto: COLORS.PURPLE }
  };
  
  const config = configs[tipo] || configs.CONCLUSAO;
  
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [9600],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 9600, type: WidthType.DXA },
            shading: { fill: config.corFundo, type: ShadingType.CLEAR },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" },
              left: { style: BorderStyle.SINGLE, size: 24, color: config.corBorda },
              right: { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" }
            },
            margins: { top: 200, bottom: 200, left: 300, right: 200 },
            children: [
              new Paragraph({
                spacing: { after: 120 },
                children: [new TextRun({ text: titulo, font: "Arial", bold: true, size: 24, color: config.corTexto })]
              }),
              new Paragraph({
                children: [new TextRun({ text: texto, font: "Arial", size: 22, color: COLORS.GRAY })]
              })
            ]
          })
        ]
      })
    ]
  });
}

/**
 * Cria grid de métricas (4 colunas)
 */
function criarGridMetricas(metricas, tamanhoValor = 48, usarCor = false) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [2400, 2400, 2400, 2400],
    rows: [
      new TableRow({
        children: metricas.map((m, i) => 
          new TableCell({
            width: { size: 2400, type: WidthType.DXA },
            borders: thinBorders,
            shading: { fill: COLORS.WHITE, type: ShadingType.CLEAR },
            margins: { top: 150, bottom: 150, left: 100, right: 100 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ 
                  text: m.valor, 
                  font: "Arial", 
                  bold: true, 
                  size: tamanhoValor, 
                  color: usarCor && i >= 2 ? COLORS.GOLD : COLORS.NAVY 
                })]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: m.label, font: "Arial", size: 18, color: COLORS.GRAY })]
              })
            ]
          })
        )
      })
    ]
  });
}

/**
 * Cria tabela de cenários
 */
function criarTabelaCenarios(cenarios) {
  const rows = cenarios.map(c => 
    new TableRow({
      children: [
        new TableCell({
          width: { size: 2400, type: WidthType.DXA },
          borders: thinBorders,
          shading: { fill: c.corFundo, type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 120, left: 150, right: 150 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ children: [new TextRun({ text: c.tipo, font: "Arial", bold: true, size: 20, color: c.cor })] })]
        }),
        new TableCell({
          width: { size: 5400, type: WidthType.DXA },
          borders: thinBorders,
          margins: { top: 120, bottom: 120, left: 150, right: 150 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ children: [new TextRun({ text: c.descricao, font: "Arial", size: 20 })] })]
        }),
        new TableCell({
          width: { size: 1800, type: WidthType.DXA },
          borders: thinBorders,
          margins: { top: 120, bottom: 120, left: 150, right: 150 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ 
            alignment: AlignmentType.CENTER, 
            children: [new TextRun({ text: c.prob, font: "Arial", bold: true, size: 24, color: c.cor })] 
          })]
        })
      ]
    })
  );
  
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [2400, 5400, 1800],
    rows: rows
  });
}

/**
 * Cria grid de vetores estratégicos (2x2)
 */
function criarGridVetores(vetores) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [4800, 4800],
    rows: [
      new TableRow({
        children: vetores.slice(0, 2).map(v => 
          new TableCell({
            width: { size: 4800, type: WidthType.DXA },
            borders: thinBorders,
            margins: { top: 150, bottom: 150, left: 200, right: 200 },
            children: [
              new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: `${v.num}  ${v.titulo}`, font: "Arial", bold: true, size: 22, color: COLORS.NAVY })] }),
              new Paragraph({ children: [new TextRun({ text: v.descricao, font: "Arial", size: 20, color: COLORS.GRAY })] })
            ]
          })
        )
      }),
      new TableRow({
        children: vetores.slice(2, 4).map(v => 
          new TableCell({
            width: { size: 4800, type: WidthType.DXA },
            borders: thinBorders,
            margins: { top: 150, bottom: 150, left: 200, right: 200 },
            children: [
              new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: `${v.num}  ${v.titulo}`, font: "Arial", bold: true, size: 22, color: COLORS.NAVY })] }),
              new Paragraph({ children: [new TextRun({ text: v.descricao, font: "Arial", size: 20, color: COLORS.GRAY })] })
            ]
          })
        )
      })
    ]
  });
}

/**
 * Cria caixa de probabilidade destacada
 */
function criarCaixaProbabilidade(titulo, valor) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [9600],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 9600, type: WidthType.DXA },
            shading: { fill: COLORS.NAVY, type: ShadingType.CLEAR },
            borders: noBorders,
            margins: { top: 300, bottom: 300, left: 200, right: 200 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 80 },
                children: [new TextRun({ text: titulo, font: "Arial", size: 22, color: COLORS.WHITE })]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: valor, font: "Arial", bold: true, size: 72, color: COLORS.GOLD })]
              })
            ]
          })
        ]
      })
    ]
  });
}

/**
 * Cria título de seção
 */
function criarTituloSecao(texto, tamanho = 28) {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    children: [new TextRun({ text: texto, font: "Arial", bold: true, size: tamanho, color: COLORS.NAVY })]
  });
}

/**
 * Cria parágrafo de texto
 */
function criarParagrafo(texto, espacoDepois = 200) {
  return new Paragraph({
    spacing: { after: espacoDepois },
    children: [new TextRun({ text: texto, font: "Arial", size: 20, color: COLORS.GRAY })]
  });
}

// ============================================================================
// GERAÇÃO DO DOCUMENTO
// ============================================================================

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 22 }
      }
    },
    paragraphStyles: [
      {
        id: "Normal",
        name: "Normal",
        run: { font: "Arial", size: 22 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1800, right: 1134, bottom: 1134, left: 1134 }
      }
    },
    headers: {
      default: criarCabecalho(CONTENT.data)
    },
    footers: {
      default: criarRodape(CONTENT.pesquisador)
    },
    children: [
      // ====================================================================
      // PÁGINA 1: RESUMO EXECUTIVO
      // ====================================================================
      
      // Título Principal
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 120 },
        children: [new TextRun({ text: CONTENT.titulo, font: "Arial", bold: true, size: 40, color: COLORS.NAVY })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: CONTENT.subtitulo, font: "Arial", size: 28, color: COLORS.GOLD })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: CONTENT.instituicao, font: "Arial", size: 22, color: COLORS.GRAY })]
      }),
      
      // Conclusão
      criarCaixaDestaque("CONCLUSAO", "CONCLUSÃO", CONTENT.conclusao),
      new Paragraph({ spacing: { after: 300 } }),
      
      // Métricas
      criarGridMetricas(CONTENT.metricas, 48, true),
      new Paragraph({ spacing: { after: 400 } }),
      
      // Cenários
      criarTituloSecao("Cenários Projetados"),
      criarTabelaCenarios(CONTENT.cenarios),
      new Paragraph({ spacing: { after: 400 } }),
      
      // Vetores
      criarTituloSecao("Vetores Estratégicos"),
      criarGridVetores(CONTENT.vetores),
      new Paragraph({ spacing: { after: 300 } }),
      
      // Probabilidade
      criarCaixaProbabilidade("PROBABILIDADE DE CENÁRIO FAVORÁVEL", CONTENT.probabilidadeFavoravel),
      
      // ====================================================================
      // PAGE BREAK - INÍCIO DA ANÁLISE DETALHADA
      // ====================================================================
      new Paragraph({ children: [new PageBreak()] }),
      
      // [INSERIR CONTEÚDO DE ANÁLISE DETALHADA AQUI]
      // Use as funções auxiliares para criar:
      // - Tabelas de ranking com barras de progresso
      // - Análise de stakeholders
      // - Caixas de Insight, Alerta, Mitigação
      // - Matrizes de risco
      // - Grids de pilares estratégicos
      
      criarTituloSecao("Análise Detalhada"),
      criarParagrafo("Insira aqui o conteúdo de análise detalhada conforme os dados disponíveis."),
      
      // ====================================================================
      // PAGE BREAK - METODOLOGIA (ÚLTIMA PÁGINA)
      // ====================================================================
      new Paragraph({ children: [new PageBreak()] }),
      
      // Metodologia
      criarTituloSecao(`Metodologia: Sistema ${CONTENT.metodologia.sistema} de Inteligência Preditiva`),
      criarParagrafo(`Este relatório foi produzido pelo Sistema ${CONTENT.metodologia.sistema} (${CONTENT.metodologia.significado}), desenvolvido pela INTEIA. ${CONTENT.metodologia.descricao}`),
      
      criarTituloSecao("Fundamentação Científica", 24),
      criarParagrafo(CONTENT.metodologia.fundamentacao, 300),
      
      // Métricas do Modelo
      criarGridMetricas(CONTENT.metodologia.metricas, 48, true),
      new Paragraph({ spacing: { after: 300 } }),
      
      // Componentes
      criarTituloSecao("Componentes do Modelo", 24),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [3000, 6600],
        rows: CONTENT.metodologia.componentes.map(c =>
          new TableRow({
            children: [
              new TableCell({ 
                width: { size: 3000, type: WidthType.DXA }, 
                borders: thinBorders, 
                shading: { fill: COLORS.LIGHT_GRAY, type: ShadingType.CLEAR }, 
                margins: { top: 100, bottom: 100, left: 150, right: 150 }, 
                children: [new Paragraph({ children: [new TextRun({ text: c.nome, font: "Arial", bold: true, size: 18 })] })] 
              }),
              new TableCell({ 
                width: { size: 6600, type: WidthType.DXA }, 
                borders: thinBorders, 
                margins: { top: 100, bottom: 100, left: 150, right: 150 }, 
                children: [new Paragraph({ children: [new TextRun({ text: c.descricao, font: "Arial", size: 18 })] })] 
              })
            ]
          })
        )
      }),
      new Paragraph({ spacing: { after: 300 } }),
      
      // Limitações
      criarTituloSecao("Limitações e Ressalvas", 24),
      criarParagrafo(CONTENT.metodologia.limitacoes, 400),
      
      // Assinatura
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 },
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.GOLD } },
        children: []
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 },
        children: [
          new TextRun({ text: "INTE", font: "Arial", bold: true, size: 28, color: COLORS.NAVY }),
          new TextRun({ text: "IA", font: "Arial", bold: true, size: 28, color: COLORS.GOLD })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Instituto Nacional de Tecnologia Estratégica e Inteligência Artificial", font: "Arial", size: 16, color: COLORS.GRAY })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100 },
        children: [new TextRun({ text: `Pesquisador Responsável: ${CONTENT.pesquisador}`, font: "Arial", size: 18, color: COLORS.GRAY })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60 },
        children: [new TextRun({ text: "inteia.com.br · igor@inteia.com.br", font: "Arial", size: 16, color: COLORS.GRAY })]
      })
    ]
  }]
});

// ============================================================================
// EXPORTAÇÃO
// ============================================================================

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/claude/relatorio-inteia.docx", buffer);
  console.log("Relatório INTEIA gerado com sucesso!");
});
