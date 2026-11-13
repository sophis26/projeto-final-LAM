import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useApp } from '../context/AppContext';
import { parseAmount } from '../utils/format';
import { spacing } from '../theme/colors';

type Section = 'theme' | 'language' | 'user' | 'password' | 'help';
type IconName = keyof typeof Ionicons.glyphMap;

const SECTIONS: { id: Section; icon: IconName; label: string }[] = [
  { id: 'theme', icon: 'color-palette-outline', label: 'sTheme' },
  { id: 'language', icon: 'language-outline', label: 'sLanguage' },
  { id: 'user', icon: 'person-outline', label: 'sUser' },
  { id: 'password', icon: 'key-outline', label: 'sPassword' },
  { id: 'help', icon: 'help-circle-outline', label: 'sHelp' },
];

const FAQ_KEYS = [
  ['faqAddQuestion', 'faqAddAnswer'],
  ['faqBalanceQuestion', 'faqBalanceAnswer'],
  ['faqCalendarQuestion', 'faqCalendarAnswer'],
  ['faqEditQuestion', 'faqEditAnswer'],
];

export default function SettingsScreen() {
  const { palette, t, user, settings, updateSettings, updateUser, changePassword, logout } = useApp();
  const [active, setActive] = useState<Section>('theme');
  const [name, setName] = useState(user?.name ?? '');
  const [budget, setBudget] = useState(String(user?.monthlyBudget ?? 0).replace('.', ','));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setName(user?.name ?? '');
    setBudget(String(user?.monthlyBudget ?? 0).replace('.', ','));
  }, [user?.name, user?.monthlyBudget]);

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const saveProfile = async () => {
    const cleanName = name.trim();
    const monthlyBudget = parseAmount(budget);
    if (!cleanName) return setError(t('errName'));
    if (!Number.isFinite(monthlyBudget) || monthlyBudget <= 0) return setError(t('errAmount'));

    setError('');
    setSavingProfile(true);
    try {
      const success = await updateUser({ name: cleanName, monthlyBudget });
      if (!success) return setError(t('errSave'));
      showSaved();
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async () => {
    setSavingPassword(true);
    try {
      const result = await changePassword(currentPassword, newPassword, confirmation);
      if (result) {
        setError(t(result));
        setSaved(false);
        return;
      }
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmation('');
      showSaved();
    } finally {
      setSavingPassword(false);
    }
  };

  const signOut = async () => {
    setLeaving(true);
    try { await logout(); }
    finally { setLeaving(false); }
  };

  const changePreference = async (patch: { theme?: 'light' | 'dark'; language?: 'pt' | 'en' }) => {
    setError('');
    const success = await updateSettings(patch);
    if (!success) setError(t('errSave'));
  };

  const Chip = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={{
        flex: 1, minHeight: spacing.controlHeight, paddingVertical: spacing.sm, borderRadius: spacing.buttonRadius, alignItems: 'center', justifyContent: 'center',
        backgroundColor: selected ? palette.soft : palette.cardAlt,
        borderWidth: 2, borderColor: selected ? palette.lime : palette.border,
      }}
    >
      <Text style={{ color: palette.text, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );

  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '800', color: palette.text, marginBottom: spacing.md }}>{t('settingsTitle')}</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {SECTIONS.map((section) => (
          <Pressable
            key={section.id}
            onPress={() => { setActive(section.id); setError(''); setSaved(false); }}
            accessibilityRole="button"
            accessibilityState={{ selected: active === section.id }}
            style={{
              width: '48%', minHeight: 88, backgroundColor: palette.card, borderRadius: spacing.cardRadius, paddingVertical: spacing.md,
              alignItems: 'center', marginBottom: spacing.sm, gap: spacing.xs,
              borderWidth: 2.5, borderColor: active === section.id ? palette.lime : palette.transparent,
            }}
          >
            <Ionicons name={section.icon} size={30} color={palette.icon} />
            <Text style={{ color: palette.text, fontWeight: '700' }}>{t(section.label)}</Text>
          </Pressable>
        ))}
      </View>

      <Card variant="surface" style={{ marginTop: spacing.xxs }}>
        {active === 'theme' && (
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <Chip label={t('light')} selected={settings.theme === 'light'} onPress={() => changePreference({ theme: 'light' })} />
            <Chip label={t('dark')} selected={settings.theme === 'dark'} onPress={() => changePreference({ theme: 'dark' })} />
          </View>
        )}

        {active === 'language' && (
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <Chip label="Português" selected={settings.language === 'pt'} onPress={() => changePreference({ language: 'pt' })} />
            <Chip label="English" selected={settings.language === 'en'} onPress={() => changePreference({ language: 'en' })} />
          </View>
        )}

        {active === 'user' && (
          <View>
            <Input label={t('name')} value={name} onChangeText={setName} autoCapitalize="words" />
            <Input label={t('monthlyBudget')} value={budget} onChangeText={setBudget} keyboardType="decimal-pad" />
            <Text style={{ color: palette.muted, marginBottom: spacing.sm }}>{t('logged')} {user?.email}</Text>
            <Button label={saved ? t('saved') : t('saveProfile')} icon={saved ? 'checkmark' : 'save-outline'} variant="lime" onPress={saveProfile} loading={savingProfile} />
            <Button label={t('logout')} icon="log-out-outline" variant="ghost" onPress={signOut} loading={leaving} style={{ marginTop: spacing.sm }} />
          </View>
        )}

        {active === 'password' && (
          <View>
            <Input label={t('currentPassword')} value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry />
            <Input label={t('newPassword')} value={newPassword} onChangeText={setNewPassword} secureTextEntry />
            <Input label={t('confirmPassword')} value={confirmation} onChangeText={setConfirmation} secureTextEntry onSubmitEditing={savePassword} />
            <Button label={saved ? t('saved') : t('changePassword')} icon={saved ? 'checkmark' : 'key-outline'} variant="lime" onPress={savePassword} loading={savingPassword} />
          </View>
        )}

        {active === 'help' && (
          <View>
            <Text style={{ color: palette.text, fontSize: 18, fontWeight: '800', marginBottom: spacing.sm }}>{t('helpTitle')}</Text>
            {FAQ_KEYS.map(([question, answer]) => (
              <View key={question} style={{ marginBottom: spacing.sm }}>
                <Text style={{ color: palette.text, fontWeight: '700', marginBottom: spacing.xxs }}>{t(question)}</Text>
                <Text style={{ color: palette.muted, lineHeight: 21 }}>{t(answer)}</Text>
              </View>
            ))}
          </View>
        )}

        {!!error && <Text style={{ color: palette.dangerText, fontWeight: '600', marginTop: spacing.sm }}>{error}</Text>}
      </Card>
    </Screen>
  );
}
