import { monthPrefix } from './date';
import type { Categoria } from '../types';

type DadoCalculavel = { data: string; tipo: 'receita' | 'despesa'; valor: number; categoriaId: string };

export interface ResumoMensal {
  receitas: number;
  despesas: number;
  saldo: number;
  percentualOrcamento: number;
  percentualOrcamentoInteiro: number;
  faixaOrcamento: 'baixo' | 'medio' | 'alto';
  categorias: { id: string; nome: string; cor: string; valor: number; percentual: number }[];
}

export interface ResumoDiario {
  receitas: number;
  despesas: number;
  saldo: number;
}

/** Agrupa os lançamentos do mês por data, somando receitas e despesas. */
export function agruparLancamentosPorDia(lancamentos: DadoCalculavel[], mes: Date): Record<string, ResumoDiario> {
  const prefixo = monthPrefix(mes);
  return lancamentos
    .filter((lancamento) => lancamento.data.startsWith(prefixo))
    .reduce<Record<string, ResumoDiario>>((dias, lancamento) => {
      const dia = lancamento.data.slice(0, 10);
      const resumo = dias[dia] ?? { receitas: 0, despesas: 0, saldo: 0 };
      if (lancamento.tipo === 'receita') resumo.receitas += lancamento.valor;
      else resumo.despesas += lancamento.valor;
      resumo.saldo = resumo.receitas - resumo.despesas;
      dias[dia] = resumo;
      return dias;
    }, {});
}

/** Calcula saldo, uso do orçamento e gastos por categoria para o mês. */
export function calcularResumoMensal(
  lancamentos: DadoCalculavel[],
  categorias: Categoria[],
  mes: Date,
  orcamentoMensal: number,
): ResumoMensal {
  const prefixo = monthPrefix(mes);
  const doMes = lancamentos.filter((lancamento) => lancamento.data.startsWith(prefixo));
  const receitas = doMes
    .filter((lancamento) => lancamento.tipo === 'receita')
    .reduce((total, lancamento) => total + lancamento.valor, 0);
  const despesas = doMes
    .filter((lancamento) => lancamento.tipo === 'despesa')
    .reduce((total, lancamento) => total + lancamento.valor, 0);
  const percentualOrcamento = orcamentoMensal > 0 ? (despesas / orcamentoMensal) * 100 : 0;
  const totais = doMes
    .filter((lancamento) => lancamento.tipo === 'despesa')
    .reduce<Record<string, number>>((resultado, lancamento) => {
      resultado[lancamento.categoriaId] = (resultado[lancamento.categoriaId] ?? 0) + lancamento.valor;
      return resultado;
    }, {});

  return {
    receitas,
    despesas,
    saldo: receitas - despesas,
    percentualOrcamento,
    percentualOrcamentoInteiro: Math.round(percentualOrcamento),
    faixaOrcamento: percentualOrcamento > 100 ? 'alto' : percentualOrcamento >= 70 ? 'medio' : 'baixo',
    categorias: categorias
      .filter((categoria) => (totais[categoria.id] ?? 0) > 0)
      .map((categoria) => {
        const valor = totais[categoria.id];
        return {
          id: categoria.id,
          nome: categoria.nome,
          cor: categoria.cor,
          valor,
          percentual: despesas > 0 ? Math.round((valor / despesas) * 1000) / 10 : 0,
        };
      }),
  };
}

/** Soma as despesas do mês selecionado. */
export function totalPorMes(lancamentos: DadoCalculavel[], mes: Date): number {
  const prefixo = monthPrefix(mes);
  return lancamentos
    .filter((lancamento) => lancamento.data.startsWith(prefixo) && lancamento.tipo === 'despesa')
    .reduce((total, lancamento) => total + lancamento.valor, 0);
}

/** Soma os valores do mês por categoria, separados entre receitas e despesas. */
export function totalPorCategoria(lancamentos: DadoCalculavel[], mes: Date) {
  const prefixo = monthPrefix(mes);
  return lancamentos
    .filter((lancamento) => lancamento.data.startsWith(prefixo))
    .reduce<Record<string, { receitas: number; despesas: number }>>((totais, lancamento) => {
      const categoria = totais[lancamento.categoriaId] ?? { receitas: 0, despesas: 0 };
      if (lancamento.tipo === 'receita') categoria.receitas += lancamento.valor;
      else categoria.despesas += lancamento.valor;
      totais[lancamento.categoriaId] = categoria;
      return totais;
    }, {});
}
