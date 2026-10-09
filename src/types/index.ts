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

export interface Category {
  id: string;
  icon: string; // nome de ícone Ionicons
}
