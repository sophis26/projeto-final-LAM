export const brl = (n: number): string => {
  const sign = n < 0 ? '-' : '';
  const s = Math.abs(n).toFixed(2).replace('.', ',');
  return `${sign}R$ ${s.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export const parseAmount = (text: string): number => {
  const n = parseFloat(text.replace(/\./g, '').replace(',', '.'));
  return isNaN(n) ? 0 : n;
};
