import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Expense, Settings, User } from '../types';
import { KEYS, load, save } from '../utils/storage';
import { dictionaries } from '../utils/i18n';
import { darkPalette, lightPalette, Palette } from '../theme/colors';

const defaultSettings: Settings = { theme: 'light', language: 'pt' };

interface AppContextData {
  ready: boolean;
  user: User | null;
  expenses: Expense[];
  settings: Settings;
  palette: Palette;
  t: (key: string) => string;
  register: (name: string, email: string, password: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  finishOnboarding: (motivations: string[], source: string | null) => Promise<void>;
  updateUser: (patch: Partial<User>) => Promise<void>;
  addExpense: (e: Omit<Expense, 'id'>) => Promise<void>;
  removeExpense: (id: string) => Promise<void>;
  updateSettings: (patch: Partial<Settings>) => Promise<void>;
}

const AppContext = createContext<AppContextData>({} as AppContextData);
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    (async () => {
      const [u, s, sessionId] = await Promise.all([
        load<User[]>(KEYS.users, []),
        load<Settings>(KEYS.prefs, defaultSettings),
        load<string | null>(KEYS.session, null),
      ]);
      setUsers(u);
      setSettings({ ...defaultSettings, ...s });
      const current = u.find((x) => x.id === sessionId) ?? null;
      if (current) {
        setUser(current);
        setExpenses(await load<Expense[]>(KEYS.expenses(current.id), []));
      }
      setReady(true);
    })();
  }, []);

  const t = useCallback((key: string) => dictionaries[settings.language][key] ?? key, [settings.language]);
  const palette = settings.theme === 'dark' ? darkPalette : lightPalette;

  const persistUsers = async (list: User[]) => {
    setUsers(list);
    await save(KEYS.users, list);
  };

  const register = async (name: string, email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!name.trim() || !cleanEmail || !password) return 'errFill';
    if (password.length < 4) return 'errPasswordShort';
    if (users.some((u) => u.email === cleanEmail)) return 'errEmailExists';
    const newUser: User = {
      id: Date.now().toString(),
      name: name.trim(),
      email: cleanEmail,
      password,
      monthlyBudget: 3000,
      onboarded: false,
      motivations: [],
      source: null,
    };
    await persistUsers([...users, newUser]);
    await save(KEYS.session, newUser.id);
    setExpenses([]);
    setUser(newUser);
    return null;
  };

  const login = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) return 'errFill';
    const found = users.find((u) => u.email === cleanEmail && u.password === password);
    if (!found) return 'errCredentials';
    await save(KEYS.session, found.id);
    setExpenses(await load<Expense[]>(KEYS.expenses(found.id), []));
    setUser(found);
    return null;
  };

  const logout = async () => {
    await save(KEYS.session, null);
    setUser(null);
    setExpenses([]);
  };

  const updateUser = async (patch: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...patch };
    setUser(updated);
    await persistUsers(users.map((u) => (u.id === updated.id ? updated : u)));
  };

  const finishOnboarding = async (motivations: string[], source: string | null) => {
    await updateUser({ motivations, source, onboarded: true });
  };

  const addExpense = async (e: Omit<Expense, 'id'>) => {
    if (!user) return;
    const list = [{ ...e, id: Date.now().toString() }, ...expenses];
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
      ready, user, expenses, settings, palette, t,
      register, login, logout, finishOnboarding, updateUser, addExpense, removeExpense, updateSettings,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ready, user, users, expenses, settings, palette, t],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
