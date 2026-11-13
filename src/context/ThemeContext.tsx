import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import type { Language, Settings } from '../types';
import { darkPalette, lightPalette, type Palette } from '../theme/colors';
import { dictionaries } from '../utils/i18n';

interface ThemeContextValue {
  settings: Settings;
  palette: Palette;
  t: (key: string) => string;
  updateSettings: (patch: Partial<Settings>) => Promise<boolean>;
}

const defaults: Settings = { theme: 'light', language: 'pt' };
const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [settings, setSettings] = useState<Settings>(defaults);

  useEffect(() => {
    if (!auth.ready) return;
    if (!auth.user) {
      setSettings(defaults);
      return;
    }
    setSettings({
      theme: auth.user.tema === 'escuro' ? 'dark' : 'light',
      language: auth.user.idioma,
    });
  }, [auth.ready, auth.user?.id]);

  const updateSettings = useCallback(async (patch: Partial<Settings>) => {
    const next: Settings = { ...settings, ...patch };
    setSettings(next);
    if (!auth.user) return false;

    const saved = await auth.updateUser({
      tema: next.theme === 'dark' ? 'escuro' : 'claro',
      idioma: next.language as Language,
    });
    if (!saved) setSettings(settings);
    return saved;
  }, [settings, auth.user, auth.updateUser]);

  const palette = settings.theme === 'dark' ? darkPalette : lightPalette;
  const t = useCallback((key: string) => dictionaries[settings.language][key] ?? key, [settings.language]);
  const value = useMemo(() => ({ settings, palette, t, updateSettings }), [settings, palette, t, updateSettings]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
