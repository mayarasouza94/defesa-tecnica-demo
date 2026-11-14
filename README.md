# Defesa técnica: manutenção de duas salas-cofre

Demonstração de método de defesa técnica, de Mayara Souza. A peça parte dos documentos de um edital público de
manutenção de data center e devolve ao cliente o dimensionamento da equipe, com a conta aberta e as premissas
ajustáveis.

O cliente, as unidades, os endereços, os municípios e os fabricantes estão anonimizados. Quantidades,
periodicidades e prazos são os dos documentos publicados. Os dados de mão de obra por município são do IBGE
(Cadastro Central de Empresas e Censo 2022).

## Telas

- Capa e parque: cena em 3D das duas unidades, com as HH de preventiva por subsistema e por mês.
- A proposta em uma tela: dados do edital, conta da equipe, divergências entre documentos, atendimento de
  emergência e quadro proposto.
- A equipe: premissas, sensibilidade por simulação de Monte Carlo e fila do sobreaviso.
- Praças: oferta de mão de obra por município e distância máxima da base do sobreaviso.
- O contrato: itens sob demanda em 60 meses.
- Mobilização: marcos de entrada, medições de linha de base e preventiva dos primeiros 90 dias.

## Método

Estimativa em três pontos para as HH por execução, teoria das filas (Erlang C) para o sobreaviso, simulação de
Monte Carlo para tempo de atendimento e sensibilidade. Toda a conta está em `motor.js`; as telas não recalculam
regra. As HH por execução, a proporção de corretiva e o volume de chamados urgentes são premissas, declaradas em
cada tela.

## Execução local

Páginas estáticas, sem etapa de build. Servir a pasta por HTTP (os módulos não carregam por `file://`):

```
python -m http.server 8055
```

## Licenças

three.js (MIT), em `vendor/`, com o arquivo de licença.
