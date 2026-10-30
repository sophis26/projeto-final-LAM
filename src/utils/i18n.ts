import { Language } from '../types';

const pt: Record<string, string> = {
  login: 'Login', register: 'Cadastro', email: 'E-mail', password: 'Senha', name: 'Nome',
  noAccount: 'Não tem conta? Cadastre-se', hasAccount: 'Já tem conta? Entre', confirmPassword: 'Confirmar senha',
  errFill: 'Preencha todos os campos.', errEmailExists: 'Este e-mail já está cadastrado.', errEmailInvalid: 'Informe um e-mail válido.',
  errCredentials: 'E-mail ou senha incorretos.', errPasswordShort: 'A senha precisa ter ao menos 6 caracteres.', errPasswordMismatch: 'As senhas não conferem.',
  whyTitle: "Por que você quer usar o JIM's?", whyHint: 'Escolha quantas quiser.',
  m_control: 'Controlar meus gastos', m_save: 'Economizar dinheiro', m_debts: 'Sair das dívidas',
  m_fixed: 'Organizar contas fixas', m_plan: 'Planejar compras', m_learn: 'Aprender sobre finanças',
  sourceTitle: 'Por onde nos encontrou?', src_instagram: 'Instagram', src_tiktok: 'TikTok',
  src_whatsapp: 'WhatsApp', src_internet: 'Internet', src_youtube: 'YouTube', src_other: 'Outro',
  hello: 'Olá', balance: 'Seu saldo', budgetLevel: 'Nível de orçamento', levelGood: 'Tudo certo',
  levelWarn: 'Atenção', levelOver: 'Orçamento estourado', byCategory: 'Gastos por categoria',
  noData: 'Nenhum gasto neste mês. Toque em "Novo gasto" para começar.', newExpense: 'Novo gasto',
  calendar: 'Calendário', spentOf: 'gasto de', helpTitle: 'Como funciona',
  helpText: 'Defina seu orçamento mensal em Configurações. O saldo é o orçamento menos os gastos do mês. No calendário, dias verdes ficaram dentro do limite diário e dias vermelhos passaram dele.',
  tabHome: 'Início', tabCalendar: 'Calendário', tabExpenses: 'Gastos', tabSettings: 'Config.',
  calendarTitle: 'Calendário de gastos', legendGreen: 'Dentro do limite diário', legendRed: 'Acima do limite diário',
  legendNone: 'Sem gastos', dailyLimit: 'Limite diário', noExpensesDay: 'Nenhum gasto neste dia.', addForDay: 'Adicionar gasto neste dia',
  monthExpenses: 'Gastos do mês', total: 'Total', entries: 'Lançamentos', noEntries: 'Nenhum lançamento neste mês.',
  deleteTitle: 'Excluir gasto', deleteConfirm: 'Deseja excluir este lançamento?', cancel: 'Cancelar', delete: 'Excluir',
  description: 'Descrição', amount: 'Valor (R$)', category: 'Categoria', date: 'Data (dd/mm/aaaa)', save: 'Salvar gasto',
  errAmount: 'Informe um valor maior que zero.', errDate: 'Data inválida. Use dd/mm/aaaa.',
  cat_market: 'Mercado', cat_iptu: 'IPTU', cat_ipva: 'IPVA', cat_bills: 'Contas', cat_transport: 'Transporte', cat_leisure: 'Lazer',
  settingsTitle: 'Configurações', sTheme: 'Cor / Tema', sLanguage: 'Idioma', sUser: 'Usuário', sBudget: 'Orçamento', sHelp: 'Ajuda',
  light: 'Claro', dark: 'Escuro', monthlyBudget: 'Orçamento mensal (R$)', saveBudget: 'Salvar orçamento', saved: 'Salvo!',
  logout: 'Sair da conta', logged: 'Conectado como', selectSource: 'Selecione uma opção para continuar.',
};

const en: Record<string, string> = {
  login: 'Log in', register: 'Sign up', email: 'E-mail', password: 'Password', name: 'Name',
  noAccount: "Don't have an account? Sign up", hasAccount: 'Already have an account? Log in', confirmPassword: 'Confirm password',
  errFill: 'Fill in all fields.', errEmailExists: 'This e-mail is already registered.', errEmailInvalid: 'Enter a valid e-mail address.',
  errCredentials: 'Wrong e-mail or password.', errPasswordShort: 'Password must have at least 6 characters.', errPasswordMismatch: 'Passwords do not match.',
  whyTitle: "Why do you want to use JIM's?", whyHint: 'Pick as many as you like.',
  m_control: 'Track my spending', m_save: 'Save money', m_debts: 'Get out of debt',
  m_fixed: 'Organize fixed bills', m_plan: 'Plan purchases', m_learn: 'Learn about finance',
  sourceTitle: 'How did you find us?', src_instagram: 'Instagram', src_tiktok: 'TikTok',
  src_whatsapp: 'WhatsApp', src_internet: 'Internet', src_youtube: 'YouTube', src_other: 'Other',
  hello: 'Hi', balance: 'Your balance', budgetLevel: 'Budget level', levelGood: 'On track',
  levelWarn: 'Careful', levelOver: 'Over budget', byCategory: 'Spending by category',
  noData: 'No spending this month. Tap "New expense" to start.', newExpense: 'New expense',
  calendar: 'Calendar', spentOf: 'spent of', helpTitle: 'How it works',
  helpText: "Set your monthly budget in Settings. Balance is the budget minus this month's spending. On the calendar, green days stayed within the daily limit and red days went over it.",
  tabHome: 'Home', tabCalendar: 'Calendar', tabExpenses: 'Expenses', tabSettings: 'Settings',
  calendarTitle: 'Spending calendar', legendGreen: 'Within daily limit', legendRed: 'Over daily limit',
  legendNone: 'No spending', dailyLimit: 'Daily limit', noExpensesDay: 'No spending on this day.', addForDay: 'Add expense for this day',
  monthExpenses: "This month's expenses", total: 'Total', entries: 'Entries', noEntries: 'No entries this month.',
  deleteTitle: 'Delete expense', deleteConfirm: 'Delete this entry?', cancel: 'Cancel', delete: 'Delete',
  description: 'Description', amount: 'Amount (R$)', category: 'Category', date: 'Date (dd/mm/yyyy)', save: 'Save expense',
  errAmount: 'Enter an amount greater than zero.', errDate: 'Invalid date. Use dd/mm/yyyy.',
  cat_market: 'Groceries', cat_iptu: 'Property tax', cat_ipva: 'Vehicle tax', cat_bills: 'Bills', cat_transport: 'Transport', cat_leisure: 'Leisure',
  settingsTitle: 'Settings', sTheme: 'Color / Theme', sLanguage: 'Language', sUser: 'User', sBudget: 'Budget', sHelp: 'Help',
  light: 'Light', dark: 'Dark', monthlyBudget: 'Monthly budget (R$)', saveBudget: 'Save budget', saved: 'Saved!',
  logout: 'Log out', logged: 'Signed in as', selectSource: 'Choose an option to continue.',
};

export const dictionaries: Record<Language, Record<string, string>> = { pt, en };

export const MONTHS: Record<Language, string[]> = {
  pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

export const WEEKDAYS: Record<Language, string[]> = {
  pt: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};
