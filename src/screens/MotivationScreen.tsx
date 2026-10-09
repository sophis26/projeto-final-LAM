import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { OptionCard } from '../components/OptionCard';
import { RoundArrowButton } from '../components/Button';
import { useApp } from '../context/AppContext';

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

  const toggle = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '800', color: palette.text, marginTop: 8 }}>{t('whyTitle')}</Text>
      <Text style={{ color: palette.muted, marginTop: 4, marginBottom: 20 }}>{t('whyHint')}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {OPTIONS.map((o) => (
          <OptionCard key={o.id} icon={o.icon} label={t(`m_${o.id}`)} selected={selected.includes(o.id)} onPress={() => toggle(o.id)} />
        ))}
      </View>
      <RoundArrowButton onPress={() => navigation.navigate('Source', { motivations: selected })} />
    </Screen>
  );
}
