import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { parseAmount } from '../utils/format';

type Section = 'theme' | 'language' | 'budget' | 'user' | 'help';
type IconName = keyof typeof Ionicons.glyphMap;

const SECTIONS: { id: Section; icon: IconName; label: string }[] = [
  { id: 'theme', icon: 'color-palette-outline', label: 'sTheme' },
  { id: 'language', icon: 'language-outline', label: 'sLanguage' },
  { id: 'budget', icon: 'cash-outline', label: 'sBudget' },
  { id: 'user', icon: 'person-outline', label: 'sUser' },
  { id: 'help', icon: 'help-circle-outline', label: 'sHelp' },
];

// Quadro "Configurações": Cor/Tema, Idioma, Usuário e Ajuda (+ Orçamento mensal)
export default function SettingsScreen() {
  const { palette, t, user, settings, updateSettings, updateUser, logout } = useApp();
  const [active, setActive] = useState<Section>('theme');
  const [budget, setBudget] = useState(String(user?.monthlyBudget ?? 0).replace('.', ','));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setBudget(String(user?.monthlyBudget ?? 0).replace('.', ','));
  }, [user?.monthlyBudget]);

  const Chip = ({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: 'center',
        backgroundColor: on ? palette.soft : palette.cardAlt, borderWidth: 2, borderColor: on ? palette.lime : palette.border,
      }}
    >
      <Text style={{ color: palette.text, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );

  const saveBudget = async () => {
    const v = parseAmount(budget);
    if (v <= 0) return;
    await updateUser({ monthlyBudget: v });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '800', color: palette.text, marginBottom: 16 }}>{t('settingsTitle')}</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {SECTIONS.map((s) => (
          <Pressable
            key={s.id}
            onPress={() => setActive(s.id)}
            style={{
              width: '48%', backgroundColor: palette.card, borderRadius: 16, paddingVertical: 18, alignItems: 'center', marginBottom: 12, gap: 6,
              borderWidth: 2.5, borderColor: active === s.id ? palette.lime : 'transparent',
            }}
          >
            <Ionicons name={s.icon} size={30} color={palette.primary} />
            <Text style={{ color: palette.text, fontWeight: '700' }}>{t(s.label)}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ backgroundColor: palette.cardAlt, borderRadius: 16, padding: 16, marginTop: 4, borderWidth: 1, borderColor: palette.border }}>
        {active === 'theme' && (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Chip label={t('light')} on={settings.theme === 'light'} onPress={() => updateSettings({ theme: 'light' })} />
            <Chip label={t('dark')} on={settings.theme === 'dark'} onPress={() => updateSettings({ theme: 'dark' })} />
          </View>
        )}
        {active === 'language' && (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Chip label="Português" on={settings.language === 'pt'} onPress={() => updateSettings({ language: 'pt' })} />
            <Chip label="English" on={settings.language === 'en'} onPress={() => updateSettings({ language: 'en' })} />
          </View>
        )}
        {active === 'budget' && (
          <View>
            <Input label={t('monthlyBudget')} value={budget} onChangeText={setBudget} keyboardType="decimal-pad" />
            <Button label={saved ? t('saved') : t('saveBudget')} icon={saved ? 'checkmark' : undefined} variant="lime" onPress={saveBudget} />
          </View>
        )}
        {active === 'user' && (
          <View style={{ gap: 12 }}>
            <Text style={{ color: palette.text, fontSize: 18, fontWeight: '800' }}>{user?.name}</Text>
            <Text style={{ color: palette.muted }}>{t('logged')} {user?.email}</Text>
            <Button label={t('logout')} icon="log-out-outline" variant="ghost" onPress={logout} />
          </View>
        )}
        {active === 'help' && (
          <View>
            <Text style={{ color: palette.text, fontWeight: '800', marginBottom: 6 }}>{t('helpTitle')}</Text>
            <Text style={{ color: palette.text, lineHeight: 21 }}>{t('helpText')}</Text>
          </View>
        )}
      </View>
    </Screen>
  );
}
