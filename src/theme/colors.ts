// Tokens da identidade visual: altere VERDE_PASTEL aqui para ajustar os destaques suaves.
export const VERDE_PASTEL = '#D3EDB0';

export const brand = {
  primary: '#6FA6E2',
  lime: '#A9D94F',
  lightBlue: '#A1C9F5',
  pastelGreen: VERDE_PASTEL,
  background: '#F2F9EA',
  white: '#FFFFFF',
  transparent: 'transparent',
  danger: '#C62828',
  dangerText: '#8B1E25',
  success: '#3C9B55',
  successText: '#1D562E',
  warning: '#F2B84B',
  warningText: '#634300',
  ink: '#1E2F46',
  blueInk: '#315F93',
  muted: '#3D526B',
  border: '#BCD6F2',
};

export const categoryColors = [
  brand.lime,
  brand.primary,
  '#4F86C6',
  brand.lightBlue,
  '#7FB52F',
  '#8DD4BE',
  '#C8D1D8',
];

export const chartColors = [brand.primary, brand.lime, brand.lightBlue, '#7FB52F', '#4F86C6', '#C9E48F'];

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
  icon: string;
  lime: string;
  danger: string;
  dangerText: string;
  success: string;
  successText: string;
  warning: string;
  warningText: string;
  lightBlue: string;
  chartStroke: string;
  transparent: string;
  isDark: boolean;
}

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  cardRadius: 16,
  buttonRadius: 14,
  inputRadius: 12,
  fullRadius: 999,
  touchTarget: 44,
  controlHeight: 48,
  roundButtonSize: 64,
  iconBadgeSize: 40,
  progressHeight: 14,
  legendDotSize: 14,
  chartDotSize: 12,
};

export const lightPalette: Palette = {
  bg: brand.background,
  card: brand.lightBlue,
  cardAlt: brand.white,
  soft: brand.pastelGreen,
  text: brand.ink,
  muted: brand.muted,
  border: brand.border,
  input: brand.white,
  onPrimary: brand.ink,
  primary: brand.primary,
  icon: brand.blueInk,
  lime: brand.lime,
  danger: brand.danger,
  dangerText: brand.dangerText,
  success: brand.success,
  successText: brand.successText,
  warning: brand.warning,
  warningText: brand.warningText,
  lightBlue: brand.lightBlue,
  chartStroke: brand.white,
  transparent: brand.transparent,
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
  onPrimary: brand.ink,
  primary: brand.primary,
  icon: brand.lightBlue,
  lime: brand.lime,
  danger: brand.danger,
  dangerText: '#FF9A9F',
  success: '#7BD88F',
  successText: '#8EE3A0',
  warning: '#F2B84B',
  warningText: '#FFD166',
  lightBlue: '#27425F',
  chartStroke: '#EAF2FB',
  transparent: brand.transparent,
  isDark: true,
};
