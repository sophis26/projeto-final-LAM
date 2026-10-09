import { Category } from '../types';

// Categorias do quadro "Gastos do mês" (IPTU, IPVA, Mercado...)
export const CATEGORIES: Category[] = [
  { id: 'market', icon: 'cart-outline' },
  { id: 'iptu', icon: 'home-outline' },
  { id: 'ipva', icon: 'car-outline' },
  { id: 'bills', icon: 'flash-outline' },
  { id: 'transport', icon: 'bus-outline' },
  { id: 'leisure', icon: 'game-controller-outline' },
];

export const categoryIcon = (id: string) => CATEGORIES.find((c) => c.id === id)?.icon ?? 'ellipse-outline';
