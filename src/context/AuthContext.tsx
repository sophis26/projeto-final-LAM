import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import type { Usuario } from '../types';
import { createUsuario, listUsuarios, updateUsuario } from '../services/storage';

const SESSION_KEY = '@jims:session';

interface AuthContextData {
  ready: boolean;
  user: Usuario | null;
  login: (email: string, password: string) => Promise<string | null>;
  register: (name: string, email: string, password: string, confirmPassword?: string) => Promise<string | null>;
  logout: () => Promise<void>;
  finishOnboarding: (motivations: string[], source: string | null, budget?: number | string) => Promise<void>;
  updateUser: (patch: Partial<Usuario>) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

const hashPassword = async (password: string) => {
  const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
  return digest;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionId = await AsyncStorage.getItem(SESSION_KEY);
        if (!sessionId) {
          setReady(true);
          return;
        }

        const usuarios = await listUsuarios();
        const usuario = usuarios.find((item) => item.id === sessionId) ?? null;
        setUser(usuario);
      } catch (error) {
        console.warn('Erro ao restaurar sessão:', error);
      } finally {
        setReady(true);
      }
    };

    loadSession();
  }, []);

  const persistSession = async (nextUser: Usuario | null) => {
    if (nextUser) {
      await AsyncStorage.setItem(SESSION_KEY, nextUser.id);
    } else {
      await AsyncStorage.removeItem(SESSION_KEY);
    }
  };

  const login = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) return 'errFill';

    try {
      const usuarios = await listUsuarios();
      const usuario = usuarios.find((item) => item.email.toLowerCase() === cleanEmail);
      if (!usuario) return 'errCredentials';

      const senhaHash = await hashPassword(password);
      if (usuario.senhaHash !== senhaHash) return 'errCredentials';

      await persistSession(usuario);
      setUser(usuario);
      return null;
    } catch (error) {
      console.warn('Erro ao fazer login:', error);
      return 'errCredentials';
    }
  };

  const register = async (name: string, email: string, password: string, confirmPassword = password) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) return 'errFill';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return 'errEmailInvalid';
    if (password.length < 6) return 'errPasswordShort';
    if (password !== confirmPassword) return 'errPasswordMismatch';

    try {
      const usuarios = await listUsuarios();
      if (usuarios.some((item) => item.email.toLowerCase() === cleanEmail)) return 'errEmailExists';

      const novoUsuario: Usuario = {
        id: `usuario_${Date.now()}`,
        nome: cleanName,
        email: cleanEmail,
        senhaHash: await hashPassword(password),
        orcamentoMensal: 0,
        motivoUso: '',
        origem: '',
        tema: 'claro',
        idioma: 'pt',
        criadoEm: new Date().toISOString(),
      };

      const salvo = await createUsuario(novoUsuario);
      if (!salvo) return 'errFill';

      await persistSession(novoUsuario);
      setUser(novoUsuario);
      return null;
    } catch (error) {
      console.warn('Erro ao cadastrar usuário:', error);
      return 'errFill';
    }
  };

  const logout = async () => {
    await persistSession(null);
    setUser(null);
  };

  const finishOnboarding = async (motivations: string[], source: string | null, budget?: number | string) => {
    if (!user) return;

    const nextBudget = typeof budget === 'string' ? Number(budget.replace(',', '.')) : Number(budget ?? user.orcamentoMensal);
    const updatedUser: Usuario = {
      ...user,
      motivoUso: motivations.join(','),
      origem: source ?? '',
      orcamentoMensal: Number.isFinite(nextBudget) && nextBudget > 0 ? nextBudget : user.orcamentoMensal,
    };

    const saved = await updateUsuario(user.id, updatedUser);
    if (saved) {
      await persistSession(saved);
      setUser(saved);
    }
  };

  const updateUser = async (patch: Partial<Usuario>) => {
    if (!user) return;

    const saved = await updateUsuario(user.id, patch);
    if (saved) {
      await persistSession(saved);
      setUser(saved);
    }
  };

  const value = useMemo(
    () => ({ ready, user, login, register, logout, finishOnboarding, updateUser }),
    [ready, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
