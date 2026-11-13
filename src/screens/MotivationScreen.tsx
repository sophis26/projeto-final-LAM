import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { OptionCard } from '../components/OptionCard';
import { RoundArrowButton } from '../components/Button';
import { useApp } from '../context/AppContext';
import { spacing } from '../theme/colors';

type IconName = keyof typeof Ionicons.glyphMap;

const OPTIONS: { id: string; icon: IconName }[] = [
  { id: 'control', icon: 'wallet-outline' },
  { id: 'save', icon: 'trending-up-outline' },
  { id: 'debts', icon: 'card-outline' },
  { id: 'fixed', icon: 'receipt-outline' },
  { id: 'plan', icon: 'cart-outline' },
  { id: 'learn', icon: 'school-outline' },
];

// Quadro "Por que você quer usar o JIM's?" (seleção múltipla)
export default function MotivationScreen({ navigation }: any) {
  const { palette, t } = useApp();
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState('');

  const toggle = (id: string) => {
    setSelected((cur) => {
      const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
      if (next.length > 0) setError('');
      return next;
    });
  };

  const submit = () => {
    if (selected.length === 0) {
      setError(t('selectSource'));
      return;
    }
    navigation.navigate('Source', { motivations: selected });
  };

  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '800', color: palette.text, marginTop: spacing.xs }}>{t('whyTitle')}</Text>
      <Text style={{ color: palette.muted, marginTop: spacing.xxs, marginBottom: spacing.lg }}>{t('whyHint')}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {OPTIONS.map((o) => (
          <OptionCard key={o.id} icon={o.icon} label={t(`m_${o.id}`)} selected={selected.includes(o.id)} onPress={() => toggle(o.id)} />
        ))}
      </View>
      {!!error && <Text style={{ color: palette.dangerText, fontWeight: '600', marginTop: spacing.xs, marginBottom: spacing.xxs }}>{error}</Text>}
      <RoundArrowButton onPress={submit} />
    </Screen>
  );
}
