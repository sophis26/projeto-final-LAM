import type { Category } from '../types';

// Ícones associados às categorias padrão criadas pelo serviço de armazenamento.
export const CATEGORIES: Category[] = [
  { id: 'categoria-1', icon: 'cart-outline' },
  { id: 'categoria-2', icon: 'home-outline' },
  { id: 'categoria-3', icon: 'bus-outline' },
  { id: 'categoria-4', icon: 'receipt-outline' },
  { id: 'categoria-5', icon: 'game-controller-outline' },
  { id: 'categoria-6', icon: 'heart-outline' },
  { id: 'categoria-7', icon: 'ellipsis-horizontal-circle-outline' },
];

export const categoryIcon = (id: string) => CATEGORIES.find((c) => c.id === id)?.icon ?? 'ellipse-outline';
