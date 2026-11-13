import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import type { Categoria, Expense, Settings, User, Usuario } from '../types';
import { createLancamento, listCategorias, listLancamentos, removeLancamento, updateLancamento } from '../services/storage';
import { useTheme } from './ThemeContext';
import type { Palette } from '../theme/colors';

const mapUsuarioToLegacyUser = (usuario: Usuario | null): User | null => {
  if (!usuario) return null;

  return {
    id: usuario.id,
    name: usuario.nome,
    email: usuario.email,
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
  categories: Categoria[];
  settings: Settings;
  palette: Palette;
  t: (key: string) => string;
  register: (name: string, email: string, password: string, confirmPassword?: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  finishOnboarding: (motivations: string[], source: string | null, budget?: number | string) => Promise<boolean>;
  updateUser: (patch: Partial<User>) => Promise<boolean>;
  addExpense: (e: Omit<Expense, 'id'>) => Promise<boolean>;
  updateExpense: (id: string, patch: Omit<Expense, 'id'>) => Promise<boolean>;
  removeExpense: (id: string) => Promise<void>;
  updateSettings: (patch: Partial<Settings>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string, confirmation: string) => Promise<string | null>;
}

const AppContext = createContext<AppContextData>({} as AppContextData);
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const loadExpenses = async () => {
      setDataReady(false);
      try {
        if (!auth.user) {
          setExpenses([]);
          setCategories([]);
          return;
        }

        const [userLancamentos, userCategorias] = await Promise.all([
          listLancamentos(auth.user.id),
          listCategorias(),
        ]);
        setExpenses(userLancamentos.map((item) => ({
          id: item.id,
          description: item.descricao,
          amount: item.valor,
          categoryId: item.categoriaId,
          date: item.data.slice(0, 10),
          type: item.tipo,
        })));
        setCategories(userCategorias);
      } finally {
        setDataReady(true);
      }
    };

    if (auth.ready) {
      loadExpenses();
    }
  }, [auth.ready, auth.user?.id]);

  const user = useMemo(() => mapUsuarioToLegacyUser(auth.user), [auth.user]);
  const ready = auth.ready && dataReady;
  const { settings, palette, t } = theme;

  const register = async (name: string, email: string, password: string, confirmPassword?: string) => {
    return auth.register(name, email, password, confirmPassword ?? password);
  };

  const login = async (email: string, password: string) => {
    return auth.login(email, password);
  };

  const logout = async () => {
    await auth.logout();
    setExpenses([]);
    setCategories([]);
  };

  const updateUser = async (patch: Partial<User>) => {
    if (!auth.user) return false;

    const nextPatch: Partial<Usuario> = {};
    if (patch.name !== undefined) nextPatch.nome = patch.name;
    if (patch.email !== undefined) nextPatch.email = patch.email;
    if (patch.monthlyBudget !== undefined) nextPatch.orcamentoMensal = patch.monthlyBudget;
    if (patch.onboarded !== undefined) nextPatch.motivoUso = auth.user.motivoUso;
    if (patch.source !== undefined) nextPatch.origem = patch.source ?? '';
    if (patch.motivations !== undefined) nextPatch.motivoUso = patch.motivations.join(',');

    return auth.updateUser(nextPatch);
  };

  const finishOnboarding = async (motivations: string[], source: string | null, budget?: number | string) => {
    return auth.finishOnboarding(motivations, source, budget ?? user?.monthlyBudget ?? 0);
  };

  const addExpense = async (e: Omit<Expense, 'id'>) => {
    if (!user) return false;
    const description = e.description.trim();
    const amount = Number(e.amount);
    if (!description || !Number.isFinite(amount) || amount <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(e.date)) return false;
    const saved = await createLancamento({
      usuarioId: user.id,
      descricao: description,
      valor: amount,
      tipo: e.type,
      categoriaId: e.categoryId,
      data: new Date(`${e.date}T12:00:00`).toISOString(),
    });
    if (!saved) return false;
    setExpenses((current) => [{ ...e, description, amount, id: saved.id }, ...current]);
    return true;
  };

  const updateExpense = async (id: string, patch: Omit<Expense, 'id'>) => {
    if (!user) return false;
    const updated = await updateLancamento(id, {
      usuarioId: user.id,
      descricao: patch.description.trim(),
      valor: Number(patch.amount),
      tipo: patch.type,
      categoriaId: patch.categoryId,
      data: new Date(`${patch.date}T12:00:00`).toISOString(),
    });
    if (!updated) return false;
    setExpenses((current) => current.map((item) => item.id === id ? { ...patch, description: patch.description.trim(), id } : item));
    return true;
  };

  const removeExpense = async (id: string) => {
    if (!user) return;
    const removed = await removeLancamento(id);
    if (removed) setExpenses((current) => current.filter((x) => x.id !== id));
  };

  const updateSettings = theme.updateSettings;
  const changePassword = auth.changePassword;

  const value = useMemo(
    () => ({
      ready,
      user,
      expenses,
      categories,
      settings,
      palette,
      t,
      register,
      login,
      logout,
      finishOnboarding,
      updateUser,
      addExpense,
      updateExpense,
      removeExpense,
      updateSettings,
      changePassword,
    }),
    [ready, user, expenses, categories, settings, palette, t, changePassword, updateSettings],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
