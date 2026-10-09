// Identidade visual do JIM's (ver "Identidade visual.docx")
export const brand = {
  primary: '#6FA6E2', // azul principal RGB(111,166,226): botões, ícones, navegação
  lime: '#A9D94F', // verde-lima RGB(169,217,79): destaques, economia
  lightBlue: '#A1C9F5', // azul claro RGB(161,201,245): cartões e fundos secundários
  pastelGreen: '#D3EDB0', // verde pastel: áreas de destaque suaves (cor a confirmar, ver README)
  background: '#F2F9EA', // fundo quase branco RGB(242,249,234)
  danger: '#E5484D', // vermelho (gasto acima do limite, conforme Crazy 8)
  warning: '#F2B84B',
};

export interface Palette {
  bg: string;
  card: string;
  cardAlt: string;
  soft: string;
  text: string;
  muted: string;
  border: string;
  input: string;
  onPrimary: string;
  primary: string;
  lime: string;
  danger: string;
  warning: string;
  lightBlue: string;
  isDark: boolean;
}

export const lightPalette: Palette = {
  bg: brand.background,
  card: brand.lightBlue,
  cardAlt: '#FFFFFF',
  soft: brand.pastelGreen,
  text: '#1E2F46',
  muted: '#4D617A',
  border: '#BCD6F2',
  input: '#FFFFFF',
  onPrimary: '#1E2F46',
  primary: brand.primary,
  lime: brand.lime,
  danger: brand.danger,
  warning: brand.warning,
  lightBlue: brand.lightBlue,
  isDark: false,
};

export const darkPalette: Palette = {
  bg: '#14202E',
  card: '#27425F',
  cardAlt: '#1B2D42',
  soft: '#2E4A2A',
  text: '#EAF2FB',
  muted: '#A9BED6',
  border: '#34506E',
  input: '#1B2D42',
  onPrimary: '#10202F',
  primary: brand.primary,
  lime: brand.lime,
  danger: '#F0686D',
  warning: brand.warning,
  lightBlue: '#27425F',
  isDark: true,
};

export const chartColors = ['#6FA6E2', '#A9D94F', '#A1C9F5', '#7FB52F', '#4F86C6', '#C9E48F'];
