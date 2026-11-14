// Motor de dimensionamento da defesa técnica do Cliente A.
// Entradas: inventário e matriz de periodicidade do edital (anonimizados) e premissas ajustáveis.
// Toda tela lê este módulo; nenhum número é recalculado fora dele.

// Quantidades por unidade, contadas no inventário publicado.
export const UNIDADES = {
  u1: { nome: 'Unidade 1 · Sede', sala: 1, m2: 39, quadros: 15, ups: 2, geradores: 2, precisao: 5, conforto: 6, deteccao: 3, biometria: 5, cameras: 14, luminarias: 42, ativos: 137 },
  u2: { nome: 'Unidade 2 · Centro de Operações', sala: 1, m2: 28, quadros: 11, ups: 2, geradores: 2, precisao: 3, conforto: 2, deteccao: 2, biometria: 2, cameras: 13, luminarias: 60, ativos: 112 },
};

export const SUBSISTEMAS = {
  celula: 'Célula da sala-cofre', energia: 'Energia', clima: 'Climatização', incendio: 'Detecção e combate a incêndio', apoio: 'Supervisão, acesso, câmeras e rede',
};

// As 30 atividades do quadro-resumo. freq = execuções por ano (do edital).
// base e div dizem o que multiplica a atividade; horas = [otimista, provável, pessimista] por execução e por unidade de base (premissa).
export const ATIVIDADES = [
  { id: '1.1', sub: 'celula', nome: 'Porta de entrada da sala-cofre', freq: 3, base: 'sala', horas: [1, 1.5, 3] },
  { id: '1.2', sub: 'celula', nome: 'Blindagens dos elementos', freq: 3, base: 'sala', horas: [1, 2, 4] },
  { id: '1.3', sub: 'celula', nome: 'Painéis e luminárias', freq: 3, base: 'luminarias', div: 10, horas: [0.3, 0.5, 1] },
  { id: '1.4', sub: 'celula', nome: 'Vedações e acabamento dos elementos', freq: 3, base: 'sala', horas: [1, 1.5, 3] },
  { id: '1.5', sub: 'celula', nome: 'Teste de estanqueidade', freq: 0, base: 'sala', horas: [6, 8, 12], sobDemanda: true },
  { id: '1.6', sub: 'celula', nome: 'Nivelamento do piso elevado', freq: 6, base: 'm2', div: 10, horas: [0.3, 0.5, 1] },
  { id: '1.7', sub: 'celula', nome: 'Reforços do piso elevado', freq: 3, base: 'sala', horas: [0.5, 1, 2] },
  { id: '1.8', sub: 'celula', nome: 'Leito aramado', freq: 3, base: 'sala', horas: [1, 1.5, 3] },
  { id: '1.9', sub: 'celula', nome: 'Limpeza do piso elevado', freq: 12, base: 'm2', div: 10, horas: [0.3, 0.5, 0.8] },
  { id: '1.10', sub: 'celula', nome: 'Limpeza das placas e do fundo', freq: 12, base: 'm2', div: 10, horas: [0.4, 0.6, 1] },
  { id: '1.11', sub: 'celula', nome: 'Limpeza do leito e dos cabos', freq: 4, base: 'sala', horas: [1.5, 2, 4] },
  { id: '1.12', sub: 'celula', nome: 'Limpeza de elementos, portas e luminárias', freq: 12, base: 'sala', horas: [1, 1.5, 2.5] },
  { id: '1.13', sub: 'celula', nome: 'Limpeza e organização dos racks', freq: 12, base: 'sala', horas: [1, 2, 3] },
  { id: '2.1', sub: 'energia', nome: 'Quadros: medição, termografia e reaperto', freq: 4, base: 'quadros', horas: [0.5, 0.75, 1.5] },
  { id: '2.2', sub: 'energia', nome: 'Aterramento', freq: 4, base: 'sala', horas: [1.5, 2, 4] },
  { id: '2.3', sub: 'energia', nome: 'UPS', freq: 4, base: 'ups', horas: [1.5, 2, 4] },
  { id: '2.4', sub: 'energia', nome: 'Banco de baterias', freq: 4, base: 'ups', horas: [1, 1.5, 3] },
  { id: '2.5', sub: 'energia', nome: 'Grupos geradores', freq: 12, base: 'geradores', horas: [1, 1.5, 3] },
  { id: '2.6', sub: 'energia', nome: 'Iluminação geral e de emergência', freq: 12, base: 'luminarias', div: 10, horas: [0.2, 0.3, 0.6] },
  { id: '3.1', sub: 'clima', nome: 'Filtros de ar', freq: 4, base: 'clima', horas: [0.3, 0.5, 1] },
  { id: '3.2', sub: 'clima', nome: 'Circuito frigorígeno', freq: 6, base: 'clima', horas: [1, 1.5, 3] },
  { id: '3.3', sub: 'clima', nome: 'Compressores', freq: 6, base: 'clima', horas: [0.3, 0.5, 1.5] },
  { id: '3.4', sub: 'clima', nome: 'Lavagem do condensador', freq: 6, base: 'clima', horas: [0.75, 1, 2] },
  { id: '4.1', sub: 'incendio', nome: 'Detecção precoce por aspiração', freq: 4, base: 'deteccao', horas: [1, 1.5, 2.5] },
  { id: '4.2', sub: 'incendio', nome: 'Combate por gás', freq: 4, base: 'sala', horas: [1, 1.5, 3] },
  { id: '4.3', sub: 'incendio', nome: 'Detecção convencional', freq: 4, base: 'sala', horas: [1.5, 2, 4] },
  { id: '5.1', sub: 'apoio', nome: 'Sistema de monitoramento', freq: 4, base: 'sala', horas: [1.5, 2, 4] },
  { id: '6.1', sub: 'apoio', nome: 'Leitores biométricos', freq: 6, base: 'biometria', horas: [0.3, 0.5, 1] },
  { id: '7.1', sub: 'apoio', nome: 'Câmeras', freq: 6, base: 'cameras', horas: [0.2, 0.3, 0.6] },
  { id: '8.1', sub: 'apoio', nome: 'Cabeamento e racks', freq: 6, base: 'sala', horas: [1, 2, 4] },
];

export const PADRAO = {
  horasMes: 220,          // horas contratadas por pessoa por mês
  wrench: 0.55,           // fração do tempo em serviço efetivo
  mix: 0.35,              // horas de corretiva para cada hora de preventiva
  ensaios: 1,             // testes de estanqueidade por sala por ano
  especialidades: 3,      // elétrica, refrigeração e infraestrutura da célula
  urgentesMes: 4,         // chamados urgentes por mês nas duas unidades
  horasAtendimento: 4,    // horas que um chamado urgente ocupa o técnico
  alvoFila: 0.95,         // fração dos chamados com técnico livre na hora
  porPosicao: 4,          // pessoas para manter uma posição de sobreaviso em rodízio
  cobertura: 0.077,       // acréscimo para faltas, férias e reposição
  estrutura: 1.5,         // responsável técnico exigido e apoio de planejamento
  acionamento: [5, 10, 20],   // minutos entre o chamado e a saída do técnico
  deslocamento: [15, 30, 55], // minutos de trajeto até a unidade
  prazo: 60,
  // Itens pagos à parte no edital: 4 unidades de cada em 60 meses.
  meses: 60, pagas: 4,
  bancos: 4,                  // um banco de baterias por UPS, duas UPS por unidade
  vidaBateria: [30, 33, 36],  // meses de vida útil de um banco (faixa do estudo técnico)
  ambientes: 2,
  intervaloGas: [30, 33, 36], // meses entre descargas de gás por ambiente (faixa do estudo técnico)
};

export const pert = ([o, m, p]) => (o + 4 * m + p) / 6;
const base = (u, a) => (a.base === 'clima' ? u.precisao + u.conforto : u[a.base]) / (a.div || 1);

// Horas de preventiva por ano, por unidade e por subsistema.
export function horasPreventiva(p = PADRAO) {
  const porUnidade = {}, porSub = {}, linhas = [];
  let total = 0, execucoes = 0;
  for (const [id, u] of Object.entries(UNIDADES)) {
    porUnidade[id] = { total: 0 };
    for (const a of ATIVIDADES) {
      const freq = a.sobDemanda ? p.ensaios : a.freq;
      const h = freq * pert(a.horas) * base(u, a);
      porUnidade[id][a.sub] = (porUnidade[id][a.sub] || 0) + h;
      porUnidade[id].total += h;
      porSub[a.sub] = (porSub[a.sub] || 0) + h;
      total += h;
      linhas.push({ unidade: id, id: a.id, sub: a.sub, horas: h });
    }
  }
  for (const a of ATIVIDADES) execucoes += a.freq;
  return { porUnidade, porSub, total, execucoes, linhas };
}

// Probabilidade de espera na fila M/M/c (Erlang C). a = carga em erlangs.
export function erlangC(a, c) {
  if (a <= 0) return 0;
  if (a >= c) return 1;
  let soma = 0, termo = 1;
  for (let k = 0; k < c; k++) { if (k > 0) termo *= a / k; soma += termo; }
  const ultimo = (termo * a / c) * (c / (c - a));
  return ultimo / (soma + ultimo);
}

// Menor número de técnicos de sobreaviso simultâneo para a fila atender o alvo.
export function fila(p = PADRAO) {
  const carga = (p.urgentesMes / 720) * p.horasAtendimento;
  let c = 1;
  while (1 - erlangC(carga, c) < p.alvoFila && c < 20) c++;
  return { carga, posicoes: c, livre: 1 - erlangC(carga, c) };
}

// Núcleo da conta em pessoas. É a única implementação: a cascata e o estudo de risco chamam esta função.
export function nucleo(p, horasTotal) {
  const capacidade = p.horasMes * p.wrench * 12;
  const f = fila(p);
  const preventiva = horasTotal / capacidade;
  const corretiva = (horasTotal * p.mix) / capacidade;
  const carga = preventiva + corretiva;
  const especialidade = Math.max(0, p.especialidades - carga);
  const campo = carga + especialidade;
  const rodizio = Math.max(0, f.posicoes * p.porPosicao - campo);
  const campoTotal = campo + rodizio;
  const cobertura = campoTotal * p.cobertura;
  return { capacidade, f, preventiva, corretiva, carga, especialidade, campo, rodizio, campoTotal, cobertura, total: campoTotal + cobertura + p.estrutura };
}

// Cascata em pessoas: cada degrau liga um elemento da conta.
export function cascata(p = PADRAO) {
  const hp = horasPreventiva(p);
  const { capacidade, f, preventiva, corretiva, carga, especialidade, campo, rodizio, campoTotal, cobertura } = nucleo(p, hp.total);
  const degraus = [
    { k: 'preventiva', nome: 'Preventiva do plano de manutenção', nota: '30 atividades, na frequência do edital', pessoas: preventiva, conta: `${Math.round(hp.total)} HH por ano ÷ ${Math.round(capacidade)} HH produtivas por pessoa por ano` },
    { k: 'corretiva', nome: 'Corretiva', nota: 'premissa: proporção da preventiva, por falta de histórico de chamados no edital', pessoas: corretiva, conta: `${Math.round(hp.total)} HH × ${p.mix.toLocaleString('pt-BR')} ÷ ${Math.round(capacidade)} HH` },
    { k: 'especialidade', nome: 'Complemento por especialidade', nota: 'um técnico por disciplina: elétrica, refrigeração e infraestrutura da célula', pessoas: especialidade, conta: `${p.especialidades} disciplinas − ${carga.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} pessoas de carga` },
    { k: 'rodizio', nome: 'Sobreaviso 24 h', nota: 'atendimento em até 60 min, nas duas unidades', pessoas: rodizio, conta: `${f.posicoes} posição × ${p.porPosicao} pessoas em escala − ${campo.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} já no quadro` },
    { k: 'cobertura', nome: 'Cobertura de férias e ausências', nota: 'reserva técnica sobre o efetivo de campo', pessoas: cobertura, conta: `${campoTotal.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} pessoas × ${(p.cobertura * 100).toLocaleString('pt-BR')}%` },
    { k: 'estrutura', nome: 'Responsável técnico e planejamento', nota: 'engenheiro com acervo técnico, exigido no edital, e apoio de planejamento', pessoas: p.estrutura, conta: `1 engenheiro e ${(p.estrutura - 1).toLocaleString('pt-BR')} de apoio` },
  ];
  let acum = 0;
  for (const d of degraus) { acum += d.pessoas; d.acum = acum; }
  return { degraus, total: acum, capacidade, horas: hp, fila: f, carga, campoTotal: campoTotal + cobertura };
}

// Gerador pseudoaleatório com semente, para a simulação dar sempre o mesmo resultado.
function mulberry32(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function triangular(r, [a, m, b]) { const u = r(), f = (m - a) / (b - a); return u < f ? a + Math.sqrt(u * (b - a) * (m - a)) : b - Math.sqrt((1 - u) * (b - a) * (b - m)); }

// Monte Carlo do tempo entre o chamado e o técnico no local.
export function chegada(p = PADRAO, n = 10000, semente = 20261114) {
  const r = mulberry32(semente), tempos = new Float64Array(n);
  let dentro = 0;
  for (let i = 0; i < n; i++) { const t = triangular(r, p.acionamento) + triangular(r, p.deslocamento); tempos[i] = t; if (t <= p.prazo) dentro++; }
  const ord = Array.from(tempos).sort((a, b) => a - b);
  const faixas = new Array(16).fill(0);
  for (const t of ord) faixas[Math.min(15, Math.floor(t / 5))]++;
  const f = fila(p);
  return { noPrazo: dentro / n, p50: ord[Math.floor(n * 0.5)], p90: ord[Math.floor(n * 0.9)], faixas, n, combinado: (dentro / n) * f.livre };
}

// A equipe por função, arredondada para pessoas inteiras.
export function equipe(p = PADRAO) {
  const c = cascata(p);
  const campo = Math.ceil(c.campoTotal - 1e-9);
  const volantes = Math.max(0, campo - p.especialidades);
  const funcoes = [
    { funcao: 'Técnico eletrotécnico', qtd: 1, motivo: 'UPS, quadros, geradores e baterias' },
    { funcao: 'Técnico de refrigeração', qtd: 1, motivo: 'climatização de precisão e de conforto' },
    { funcao: 'Técnico de infraestrutura crítica', qtd: 1, motivo: 'célula, detecção e combate a incêndio, acesso e câmeras' },
    { funcao: 'Técnico de sobreaviso', qtd: volantes, motivo: 'compõe a escala de sobreaviso 24 h' },
    { funcao: 'Engenheiro responsável técnico', qtd: 1, motivo: 'exigência do edital; responde por relatórios e ensaios' },
    { funcao: 'Apoio de planejamento', qtd: Math.max(0, p.estrutura - 1), motivo: 'programação de OS, relatórios e controle do plano' },
  ].filter(f => f.qtd > 0);
  return { funcoes, total: funcoes.reduce((s, f) => s + f.qtd, 0), campo };
}

// Estudo de risco: Monte Carlo sobre as premissas, com a mesma conta do núcleo.
// Devolve a distribuição da equipe que a conta pede e o peso de cada premissa (correlação linear).
export function risco(p = PADRAO, n = 10000, semente = 20261114) {
  const r = mulberry32(semente);
  const unidades = Object.values(UNIDADES);
  const totais = new Float64Array(n);
  const ent = { horas: new Float64Array(n), mix: new Float64Array(n), wrench: new Float64Array(n), urgentes: new Float64Array(n), cobertura: new Float64Array(n) };
  for (let i = 0; i < n; i++) {
    let horas = 0;
    for (const a of ATIVIDADES) {
      const h = triangular(r, a.horas), freq = a.sobDemanda ? p.ensaios : a.freq;
      for (const u of unidades) horas += freq * h * base(u, a);
    }
    const q = { ...p, mix: triangular(r, [0.15, p.mix, 0.8]), wrench: triangular(r, [0.45, p.wrench, 0.65]), urgentesMes: triangular(r, [1, p.urgentesMes, p.urgentesMes * 4]), cobertura: triangular(r, [0.04, p.cobertura, 0.12]) };
    totais[i] = nucleo(q, horas).total;
    ent.horas[i] = horas; ent.mix[i] = q.mix; ent.wrench[i] = q.wrench; ent.urgentes[i] = q.urgentesMes; ent.cobertura[i] = q.cobertura;
  }
  const ord = Array.from(totais).sort((a, b) => a - b);
  const quantil = f => ord[Math.min(n - 1, Math.floor(n * f))];
  const postos = v => { const idx = Array.from(v.keys()).sort((a, b) => v[a] - v[b]), rk = new Float64Array(v.length); idx.forEach((j, k) => { rk[j] = k; }); return rk; };
  const corr = (a, b) => { const m = (n - 1) / 2; let sab = 0, saa = 0, sbb = 0; for (let i = 0; i < n; i++) { const x = a[i] - m, y = b[i] - m; sab += x * y; saa += x * x; sbb += y * y; } return sab / Math.sqrt(saa * sbb); };
  const rt = postos(totais);
  // Peso = correlação linear entre a premissa e o tamanho da equipe. A de postos foi descartada: a equipe muda em degraus,
  // e dentro de cada degrau a ordem dos cenários segue a cobertura, o que inflava o peso de uma premissa que move décimos.
  const linear = (a, b) => { let ma = 0, mb = 0; for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; } ma /= n; mb /= n; let sab = 0, saa = 0, sbb = 0; for (let i = 0; i < n; i++) { const x = a[i] - ma, y = b[i] - mb; sab += x * y; saa += x * x; sbb += y * y; } return sab / Math.sqrt(saa * sbb); };
  const peso = Object.fromEntries(Object.entries(ent).map(([k, v]) => [k, linear(v, totais)]));
  const cobre = k => { let c = 0; for (let i = 0; i < n; i++) if (totais[i] <= k + 1e-9) c++; return c / n; };
  return { n, p10: quantil(0.1), p50: quantil(0.5), p90: quantil(0.9), min: ord[0], max: ord[n - 1], peso, cobre, curva: [5, 5.5, 6, 6.5, 7, 8, 9, 10, 11].map(k => ({ pessoas: k, cobre: cobre(k) })) };
}

// Itens pagos à parte: quantas trocas de banco de baterias e recargas de gás acontecem em 60 meses,
// contra as 4 unidades de cada que o edital paga.
export function sobDemanda(p = PADRAO, n = 10000, semente = 20261114) {
  const r = mulberry32(semente);
  const poisson = lam => { const lim = Math.exp(-lam); let k = 0, x = 1; do { k++; x *= r(); } while (x > lim); return k - 1; };
  const conta = () => ({ dist: new Array(13).fill(0), soma: 0, acima: 0 });
  const bat = conta(), gas = conta();
  for (let i = 0; i < n; i++) {
    let trocas = 0;
    for (let b = 0; b < p.bancos; b++) {
      let t = triangular(r, p.vidaBateria) * (1 - r());
      while (t <= p.meses) { trocas++; t += triangular(r, p.vidaBateria); }
    }
    let rec = 0;
    for (let a = 0; a < p.ambientes; a++) rec += poisson(p.meses / triangular(r, p.intervaloGas));
    for (const [o, v] of [[bat, trocas], [gas, rec]]) { o.dist[Math.min(12, v)]++; o.soma += v; if (v > p.pagas) o.acima++; }
  }
  const fecha = o => ({ media: o.soma / n, acima: o.acima / n, dist: o.dist.map(v => v / n) });
  return { pagas: p.pagas, meses: p.meses, baterias: fecha(bat), gas: fecha(gas), n };
}

// Marcos de entrada do contrato, em dias corridos a partir da assinatura (termo de referência).
// O prazo de 5 dias úteis da reunião inicial aparece aqui como 7 dias corridos.
export const MARCOS = [
  { dia: -17, nome: 'Sessão pública', nota: '17 dias até o fim do contrato vigente', tipo: 'antes' },
  { dia: 0, nome: 'Assinatura e início do serviço mensal', nota: 'atendimento de emergência a partir da mesma data', tipo: 'inicio' },
  { dia: 7, nome: 'Reunião inicial e plano de execução', nota: 'equipe, termos de sigilo e cronograma das preventivas', tipo: 'entrega' },
  { dia: 25, nome: 'Levantamento situacional', nota: 'relatório preliminar; depois, a cada 45 dias', tipo: 'entrega' },
  { dia: 30, nome: 'Inspeção inicial completa', nota: 'manutenções necessárias executadas', tipo: 'entrega' },
  { dia: 90, nome: 'Diagnóstico de conformidade da sala', nota: 'lista de não conformidades e plano de ação', tipo: 'entrega' },
];

// Calendário do ano: em que mês cai cada execução do plano e quantas horas cada mês carrega.
// nivelar = false: toda periodicidade começa no mês da assinatura. nivelar = true: o início de cada
// atividade é deslocado dentro do próprio intervalo para reduzir o mês de pico (escolha gulosa, maior carga primeiro).
export function calendario(p = PADRAO, nivelar = true) {
  const itens = [];
  for (const [unidade, u] of Object.entries(UNIDADES)) {
    for (const a of ATIVIDADES) {
      const freq = a.sobDemanda ? p.ensaios : a.freq;
      if (!freq) continue;
      itens.push({ unidade, id: a.id, sub: a.sub, nome: a.nome, freq, passo: 12 / freq, horas: pert(a.horas) * base(u, a) });
    }
  }
  const carga = new Array(12).fill(0);
  const ordem = nivelar ? [...itens].sort((x, y) => y.horas * y.freq - x.horas * x.freq) : itens;
  for (const it of ordem) {
    let melhor = 0;
    if (nivelar) {
      let menor = Infinity;
      for (let o = 0; o < it.passo; o++) {
        let pico = 0;
        for (let m = o; m < 12; m += it.passo) pico = Math.max(pico, carga[m]);
        if (pico < menor - 1e-9) { menor = pico; melhor = o; }
      }
    }
    it.inicio = melhor;
    for (let m = melhor; m < 12; m += it.passo) carga[m] += it.horas;
  }
  const meses = Array.from({ length: 12 }, (_, m) => {
    const doMes = itens.filter(it => (m - it.inicio) % it.passo === 0 && m >= it.inicio);
    const porSub = {}, porUnidade = { u1: 0, u2: 0 }, rotinas = { u1: 0, u2: 0 };
    for (const it of doMes) { porSub[it.sub] = (porSub[it.sub] || 0) + it.horas; porUnidade[it.unidade] += it.horas; rotinas[it.unidade]++; }
    return { mes: m + 1, total: carga[m], porSub, porUnidade, rotinas, itens: doMes };
  });
  const totais = meses.map(m => m.total);
  return { meses, pico: Math.max(...totais), vale: Math.min(...totais), media: totais.reduce((s, v) => s + v, 0) / 12, nivelado: nivelar };
}
