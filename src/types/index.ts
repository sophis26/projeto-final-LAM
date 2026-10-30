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

export interface Category extends Categoria {
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
  password: string; // protótipo: sem criptografia (ver README)
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
}

export type ThemeMode = 'light' | 'dark';
export type Language = 'pt' | 'en';

export interface Settings {
  theme: ThemeMode;
  language: Language;
}
