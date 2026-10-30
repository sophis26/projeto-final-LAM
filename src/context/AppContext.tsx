import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { Expense, Settings, User, Usuario } from '../types';
import { KEYS, load, save } from '../utils/storage';
import { dictionaries } from '../utils/i18n';
import { darkPalette, lightPalette, Palette } from '../theme/colors';

const defaultSettings: Settings = { theme: 'light', language: 'pt' };

const mapUsuarioToLegacyUser = (usuario: Usuario | null): User | null => {
  if (!usuario) return null;

  return {
    id: usuario.id,
    name: usuario.nome,
    email: usuario.email,
    password: '',
    monthlyBudget: usuario.orcamentoMensal ?? 0,
    onboarded: Boolean(usuario.motivoUso || usuario.origem || usuario.orcamentoMensal > 0),
    motivations: usuario.motivoUso ? usuario.motivoUso.split(',').map((item) => item.trim()).filter(Boolean) : [],
    source: usuario.origem || null,
  };
};

interface AppContextData {
  ready: boolean;
  user: User | null;
  expenses: Expense[];
  settings: Settings;
  palette: Palette;
  t: (key: string) => string;
  register: (name: string, email: string, password: string, confirmPassword?: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  finishOnboarding: (motivations: string[], source: string | null, budget?: number | string) => Promise<void>;
  updateUser: (patch: Partial<User>) => Promise<void>;
  addExpense: (e: Omit<Expense, 'id'>) => Promise<void>;
  removeExpense: (id: string) => Promise<void>;
  updateSettings: (patch: Partial<Settings>) => Promise<void>;
}

const AppContext = createContext<AppContextData>({} as AppContextData);
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await load<Settings>(KEYS.prefs, defaultSettings);
      setSettings({ ...defaultSettings, ...savedSettings });
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const loadExpenses = async () => {
      if (!auth.user) {
        setExpenses([]);
        return;
      }

      const userExpenses = await load<Expense[]>(KEYS.expenses(auth.user.id), []);
      setExpenses(userExpenses);
    };

    if (auth.ready) {
      loadExpenses();
    }
  }, [auth.ready, auth.user?.id]);

  const user = useMemo(() => mapUsuarioToLegacyUser(auth.user), [auth.user]);
  const ready = auth.ready;
  const t = useCallback((key: string) => dictionaries[settings.language][key] ?? key, [settings.language]);
  const palette = settings.theme === 'dark' ? darkPalette : lightPalette;

  const register = async (name: string, email: string, password: string, confirmPassword?: string) => {
    return auth.register(name, email, password, confirmPassword ?? password);
  };

  const login = async (email: string, password: string) => {
    return auth.login(email, password);
  };

  const logout = async () => {
    await auth.logout();
    setExpenses([]);
  };

  const updateUser = async (patch: Partial<User>) => {
    if (!auth.user) return;

    const nextPatch: Partial<Usuario> = {};
    if (patch.name !== undefined) nextPatch.nome = patch.name;
    if (patch.email !== undefined) nextPatch.email = patch.email;
    if (patch.monthlyBudget !== undefined) nextPatch.orcamentoMensal = patch.monthlyBudget;
    if (patch.onboarded !== undefined) nextPatch.motivoUso = auth.user.motivoUso;
    if (patch.source !== undefined) nextPatch.origem = patch.source ?? '';
    if (patch.motivations !== undefined) nextPatch.motivoUso = patch.motivations.join(',');

    await auth.updateUser(nextPatch);
  };

  const finishOnboarding = async (motivations: string[], source: string | null, budget?: number | string) => {
    await auth.finishOnboarding(motivations, source, budget ?? user?.monthlyBudget ?? 0);
  };

  const addExpense = async (e: Omit<Expense, 'id'>) => {
    if (!user) return;
    const description = e.description.trim();
    const amount = Number(e.amount);
    if (!description) return;
    if (!Number.isFinite(amount) || amount <= 0) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) return;
    const list = [{ ...e, description, amount, id: Date.now().toString() }, ...expenses];
    setExpenses(list);
    await save(KEYS.expenses(user.id), list);
  };

  const removeExpense = async (id: string) => {
    if (!user) return;
    const list = expenses.filter((x) => x.id !== id);
    setExpenses(list);
    await save(KEYS.expenses(user.id), list);
  };

  const updateSettings = async (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    await save(KEYS.prefs, next);
  };

  const value = useMemo(
    () => ({
      ready,
      user,
      expenses,
      settings,
      palette,
      t,
      register,
      login,
      logout,
      finishOnboarding,
      updateUser,
      addExpense,
      removeExpense,
      updateSettings,
    }),
    [ready, user, expenses, settings, palette, t],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
