import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { OptionCard } from '../components/OptionCard';
import { RoundArrowButton } from '../components/Button';
import { Input } from '../components/Input';
import { useApp } from '../context/AppContext';

type IconName = keyof typeof Ionicons.glyphMap;

const OPTIONS: { id: string; icon: IconName }[] = [
  { id: 'instagram', icon: 'logo-instagram' },
  { id: 'tiktok', icon: 'logo-tiktok' },
  { id: 'whatsapp', icon: 'logo-whatsapp' },
  { id: 'internet', icon: 'globe-outline' },
  { id: 'youtube', icon: 'logo-youtube' },
  { id: 'other', icon: 'ellipsis-horizontal-circle-outline' },
];

// Quadro "Por onde nos encontrou?" (seleção única) -> finaliza o onboarding
export default function SourceScreen({ route }: any) {
  const { palette, t, finishOnboarding } = useApp();
  const [source, setSource] = useState<string | null>(null);
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    if (!source) {
      setError(t('selectSource'));
      return;
    }

    const value = Number(String(budget).replace(',', '.'));
    if (!Number.isFinite(value) || value <= 0) {
      setError(t('errAmount'));
      return;
    }

    setError('');
    await finishOnboarding(route?.params?.motivations ?? [], source, value);
  };

  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '800', color: palette.text, marginTop: 8, marginBottom: 20 }}>{t('sourceTitle')}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {OPTIONS.map((o) => (
          <OptionCard key={o.id} icon={o.icon} label={t(`src_${o.id}`)} selected={source === o.id} onPress={() => {
            setSource(o.id);
            setError('');
          }} />
        ))}
      </View>
      <View style={{ marginTop: 18 }}>
        <Input label={t('monthlyBudget')} value={budget} keyboardType="decimal-pad" onChangeText={setBudget} placeholder="3000" />
      </View>
      {!!error && <Text style={{ color: palette.danger, fontWeight: '600', marginTop: 4, marginBottom: 8 }}>{error}</Text>}
      <RoundArrowButton onPress={submit} />
    </Screen>
  );
}
