import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { OptionCard } from '../components/OptionCard';
import { RoundArrowButton } from '../components/Button';
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

  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '800', color: palette.text, marginTop: 8, marginBottom: 20 }}>{t('sourceTitle')}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {OPTIONS.map((o) => (
          <OptionCard key={o.id} icon={o.icon} label={t(`src_${o.id}`)} selected={source === o.id} onPress={() => setSource(o.id)} />
        ))}
      </View>
      <RoundArrowButton onPress={() => finishOnboarding(route.params?.motivations ?? [], source)} />
    </Screen>
  );
}
