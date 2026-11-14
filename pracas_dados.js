// Gerado por scripts/coleta_pracas.py. Nomes anonimizados; números públicos do IBGE.
export const PRACAS = [
  {
    "id": "capital-a",
    "nome": "Capital A",
    "km": 0.0,
    "direcao": null,
    "ocupados": {
      "instalacoes": 16977,
      "manutencao": 1902,
      "engenharia": 12898
    }
  },
  {
    "id": "municipio-1",
    "nome": "Município 1",
    "km": 41.1,
    "direcao": -171.1,
    "ocupados": {
      "instalacoes": 110,
      "manutencao": null,
      "engenharia": 34
    }
  },
  {
    "id": "municipio-2",
    "nome": "Município 2",
    "km": 41.3,
    "direcao": -161.0,
    "ocupados": {
      "instalacoes": 110,
      "manutencao": 39,
      "engenharia": 95
    }
  },
  {
    "id": "municipio-3",
    "nome": "Município 3",
    "km": 44.2,
    "direcao": -149.1,
    "ocupados": {
      "instalacoes": 30,
      "manutencao": null,
      "engenharia": 20
    }
  },
  {
    "id": "municipio-4",
    "nome": "Município 4",
    "km": 55.8,
    "direcao": -85.3,
    "ocupados": {
      "instalacoes": 92,
      "manutencao": 16,
      "engenharia": 52
    }
  },
  {
    "id": "municipio-5",
    "nome": "Município 5",
    "km": 56.6,
    "direcao": -111.4,
    "ocupados": {
      "instalacoes": 4,
      "manutencao": null,
      "engenharia": 5
    }
  },
  {
    "id": "municipio-6",
    "nome": "Município 6",
    "km": 62.3,
    "direcao": 38.7,
    "ocupados": {
      "instalacoes": 41,
      "manutencao": null,
      "engenharia": 30
    }
  },
  {
    "id": "municipio-7",
    "nome": "Município 7",
    "km": 67.0,
    "direcao": -171.6,
    "ocupados": {
      "instalacoes": 121,
      "manutencao": 141,
      "engenharia": 303
    }
  },
  {
    "id": "municipio-8",
    "nome": "Município 8",
    "km": 84.5,
    "direcao": 64.8,
    "ocupados": {
      "instalacoes": 91,
      "manutencao": 299,
      "engenharia": null
    }
  }
];

export const FONTE = {
  "tabela": "IBGE SIDRA, tabela 9418 (Cadastro Central de Empresas, pessoal ocupado total em 31/12, CNAE 2.0 grupos 43.2, 33.1 e 71.1)",
  "ano": 2024,
  "consultadoEm": "2026-11-14",
  "regraDistancia": "Distância em linha reta entre a sede municipal e o centro da capital (coordenada da sede municipal), multiplicada por 1,3 para aproximar o trajeto rodoviário.",
  "sigilo": "Valor nulo: o IBGE omite a célula por sigilo estatístico. Nenhum valor foi estimado."
};
