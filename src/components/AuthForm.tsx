import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { RoundArrowButton } from './Button';
import { spacing } from '../theme/colors';

export function AuthHeader({ title }: { title: string }) {
  const { palette } = useApp();

  return (
    <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
      <Text style={{ fontSize: 26, fontWeight: '800', color: palette.text, textAlign: 'center' }}>{title}</Text>
    </View>
  );
}

export function AuthLink({ label, onPress }: { label: string; onPress: () => void }) {
  const { palette } = useApp();

  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={{ minHeight: spacing.touchTarget, justifyContent: 'center', alignItems: 'center', marginTop: spacing.sm }}>
      <Text style={{ color: palette.text, textAlign: 'center', fontWeight: '700', textDecorationLine: 'underline' }}>{label}</Text>
    </Pressable>
  );
}

export function AuthSubmit({ onPress, loading = false }: { onPress: () => void; loading?: boolean }) {
  return <RoundArrowButton onPress={onPress} loading={loading} />;
}
