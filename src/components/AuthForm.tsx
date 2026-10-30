import React from 'react';
import { Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { RoundArrowButton } from './Button';

export function AuthHeader({ title }: { title: string }) {
  const { palette } = useApp();

  return (
    <View style={{ alignItems: 'center', marginBottom: 24 }}>
      <Text style={{ fontSize: 26, fontWeight: '800', color: palette.text, textAlign: 'center' }}>{title}</Text>
    </View>
  );
}

export function AuthLink({ label, onPress }: { label: string; onPress: () => void }) {
  const { palette } = useApp();

  return (
    <Text onPress={onPress} style={{ color: palette.text, textAlign: 'center', marginTop: 24, fontWeight: '700', textDecorationLine: 'underline' }}>
      {label}
    </Text>
  );
}

export function AuthSubmit({ onPress }: { onPress: () => void }) {
  return <RoundArrowButton onPress={onPress} />;
}
