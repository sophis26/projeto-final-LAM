export type Tema = 'claro' | 'escuro';
export type Idioma = 'pt' | 'en';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
  orcamentoMensal: number;
  motivoUso: string;
  origem: string;
  tema: Tema;
  idioma: Idioma;
  criadoEm: string;
}

export interface Categoria {
  id: string;
  nome: string;
  cor: string;
}

/** Metadados visuais usados para escolher o ícone de cada categoria. */
export interface Category {
  id: string;
  icon: string;
}

export interface Lancamento {
  id: string;
  usuarioId: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoriaId: string;
  data: string;
  criadoEm: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  monthlyBudget: number;
  onboarded: boolean;
  motivations: string[];
  source: string | null;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  date: string; // AAAA-MM-DD
  type: 'receita' | 'despesa';
}

export type ThemeMode = 'light' | 'dark';
export type Language = 'pt' | 'en';

export interface Settings {
  theme: ThemeMode;
  language: Language;
}
