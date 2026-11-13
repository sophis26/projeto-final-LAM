import type { Language } from '../types';

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
  hello: 'Olá', balance: 'Seu saldo do mês', budgetLevel: 'Nível de orçamento', levelGood: 'Dentro do planejado',
  levelWarn: 'Atenção', levelOver: 'Orçamento estourado', byCategory: 'Gastos por categoria',
  income: 'Receitas', expenses: 'Despesas', usedBudget: 'Você usou', ofBudget: 'do orçamento', budgetNotSet: 'Defina seu orçamento mensal em Configurações.',
  noData: 'Nenhum gasto neste mês. Toque em "Novo gasto" para começar.', newExpense: 'Novo gasto',
  calendar: 'Calendário', spentOf: 'gasto de', helpTitle: 'Como funciona',
  helpText: 'Defina seu orçamento mensal em Configurações. O saldo é a soma das receitas menos as despesas do mês. No calendário, verde indica receitas iguais ou maiores que despesas no dia; vermelho indica despesas maiores.',
  tabHome: 'Início', tabCalendar: 'Calendário', tabExpenses: 'Gastos', tabSettings: 'Config.',
  calendarTitle: 'Calendário de gastos', legendGreen: 'Receitas iguais ou maiores que despesas', legendRed: 'Despesas maiores que receitas',
  legendNone: 'Sem lançamentos', dayBalance: 'Saldo do dia', noExpensesDay: 'Nenhum lançamento neste dia.', addForDay: 'Adicionar gasto neste dia',
  monthExpenses: 'Gastos do mês', total: 'Total', entries: 'Lançamentos', noEntries: 'Nenhum lançamento neste mês.',
  deleteTitle: 'Excluir gasto', deleteConfirm: 'Deseja excluir este lançamento?', cancel: 'Cancelar', delete: 'Excluir',
  description: 'Descrição', amount: 'Valor (R$)', category: 'Categoria', date: 'Data (dd/mm/aaaa)', save: 'Salvar lançamento',
  transactionType: 'Tipo de lançamento', receita: 'Receita', despesa: 'Despesa', edit: 'Editar lançamento',
  previousMonth: 'Mês anterior', nextMonth: 'Próximo mês', emptyMonthTitle: 'Nenhum lançamento neste mês',
  errDescription: 'Informe uma descrição.', errCategory: 'Selecione uma categoria.', errSave: 'Não foi possível salvar. Tente novamente.',
  errAmount: 'Informe um valor maior que zero.', errDate: 'Data inválida. Use dd/mm/aaaa.',
  cat_market: 'Mercado', cat_iptu: 'IPTU', cat_ipva: 'IPVA', cat_bills: 'Contas', cat_transport: 'Transporte', cat_leisure: 'Lazer',
  'cat_categoria-1': 'Mercado', 'cat_categoria-2': 'Moradia', 'cat_categoria-3': 'Transporte', 'cat_categoria-4': 'Impostos',
  'cat_categoria-5': 'Lazer', 'cat_categoria-6': 'Saúde', 'cat_categoria-7': 'Outros',
  settingsTitle: 'Configurações', sTheme: 'Cor / Tema', sLanguage: 'Idioma', sUser: 'Usuário', sBudget: 'Orçamento', sHelp: 'Ajuda',
  light: 'Claro', dark: 'Escuro', monthlyBudget: 'Orçamento mensal (R$)', saveBudget: 'Salvar orçamento', saved: 'Salvo!',
  saveProfile: 'Salvar perfil', changePassword: 'Alterar senha', currentPassword: 'Senha atual', newPassword: 'Nova senha',
  errCurrentPassword: 'A senha atual está incorreta.', errName: 'Informe seu nome.',
  sPassword: 'Senha', faqAddQuestion: 'Como adiciono um lançamento?', faqAddAnswer: 'Use o botão + em Início ou Gastos, preencha os dados e salve.',
  faqBalanceQuestion: 'Como o saldo é calculado?', faqBalanceAnswer: 'O saldo do mês é a soma das receitas menos a soma das despesas.',
  faqCalendarQuestion: 'O que significam as cores do calendário?', faqCalendarAnswer: 'Verde indica receitas iguais ou maiores que despesas no dia; vermelho indica despesas maiores.',
  faqEditQuestion: 'Como edito ou excluo um lançamento?', faqEditAnswer: 'Na tela Gastos, use o lápis para editar ou a lixeira para excluir após confirmar.',
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
  hello: 'Hi', balance: 'Monthly balance', budgetLevel: 'Budget level', levelGood: 'On track',
  levelWarn: 'Careful', levelOver: 'Over budget', byCategory: 'Spending by category',
  income: 'Income', expenses: 'Expenses', usedBudget: 'You used', ofBudget: 'of your budget', budgetNotSet: 'Set your monthly budget in Settings.',
  noData: 'No spending this month. Tap "New expense" to start.', newExpense: 'New expense',
  calendar: 'Calendar', spentOf: 'spent of', helpTitle: 'How it works',
  helpText: "Set your monthly budget in Settings. Balance is this month's income minus expenses. On the calendar, green means income equals or exceeds expenses that day; red means expenses are higher.",
  tabHome: 'Home', tabCalendar: 'Calendar', tabExpenses: 'Expenses', tabSettings: 'Settings',
  calendarTitle: 'Spending calendar', legendGreen: 'Income equals or exceeds expenses', legendRed: 'Expenses exceed income',
  legendNone: 'No entries', dayBalance: 'Daily balance', noExpensesDay: 'No entries on this day.', addForDay: 'Add expense for this day',
  monthExpenses: "This month's expenses", total: 'Total', entries: 'Entries', noEntries: 'No entries this month.',
  deleteTitle: 'Delete expense', deleteConfirm: 'Delete this entry?', cancel: 'Cancel', delete: 'Delete',
  description: 'Description', amount: 'Amount (R$)', category: 'Category', date: 'Date (dd/mm/yyyy)', save: 'Save entry',
  transactionType: 'Entry type', receita: 'Income', despesa: 'Expense', edit: 'Edit entry',
  previousMonth: 'Previous month', nextMonth: 'Next month', emptyMonthTitle: 'No entries this month',
  errDescription: 'Enter a description.', errCategory: 'Choose a category.', errSave: 'Could not save. Please try again.',
  errAmount: 'Enter an amount greater than zero.', errDate: 'Invalid date. Use dd/mm/yyyy.',
  cat_market: 'Groceries', cat_iptu: 'Property tax', cat_ipva: 'Vehicle tax', cat_bills: 'Bills', cat_transport: 'Transport', cat_leisure: 'Leisure',
  'cat_categoria-1': 'Groceries', 'cat_categoria-2': 'Housing', 'cat_categoria-3': 'Transport', 'cat_categoria-4': 'Taxes',
  'cat_categoria-5': 'Leisure', 'cat_categoria-6': 'Health', 'cat_categoria-7': 'Other',
  settingsTitle: 'Settings', sTheme: 'Color / Theme', sLanguage: 'Language', sUser: 'User', sBudget: 'Budget', sHelp: 'Help',
  light: 'Light', dark: 'Dark', monthlyBudget: 'Monthly budget (R$)', saveBudget: 'Save budget', saved: 'Saved!',
  saveProfile: 'Save profile', changePassword: 'Change password', currentPassword: 'Current password', newPassword: 'New password',
  errCurrentPassword: 'The current password is incorrect.', errName: 'Enter your name.',
  sPassword: 'Password', faqAddQuestion: 'How do I add an entry?', faqAddAnswer: 'Use the + button on Home or Expenses, fill in the details, and save.',
  faqBalanceQuestion: 'How is the balance calculated?', faqBalanceAnswer: 'The monthly balance is income minus expenses for the month.',
  faqCalendarQuestion: 'What do the calendar colors mean?', faqCalendarAnswer: 'Green means income equals or exceeds expenses that day; red means expenses are higher.',
  faqEditQuestion: 'How can I edit or delete an entry?', faqEditAnswer: 'On Expenses, tap the pencil to edit or the trash icon to delete after confirming.',
  logout: 'Log out', logged: 'Signed in as', selectSource: 'Choose an option to continue.',
};

export const dictionaries: Record<Language, Record<string, string>> = { pt, en };

export function categoryLabel(id: string, fallback: string, language: Language): string {
  return dictionaries[language][`cat_${id}`] ?? fallback;
}

export const MONTHS: Record<Language, string[]> = {
  pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

export const WEEKDAYS: Record<Language, string[]> = {
  pt: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};
