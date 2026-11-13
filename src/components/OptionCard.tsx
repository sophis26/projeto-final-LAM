import React from 'react';
import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { spacing } from '../theme/colors';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  selected?: boolean;
  onPress: () => void;
  width?: `${number}%`;
}

export function OptionCard({ icon, label, selected = false, onPress, width = '48%' }: Props) {
  const { palette } = useApp();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => ({
        width, minHeight: 104, borderRadius: spacing.cardRadius, padding: spacing.sm, marginBottom: spacing.sm, alignItems: 'center', justifyContent: 'center', gap: spacing.xs,
        backgroundColor: selected ? palette.soft : palette.card,
        borderWidth: 2.5, borderColor: selected ? palette.lime : palette.transparent,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Ionicons name={icon} size={30} color={selected ? palette.text : palette.icon} />
      <Text style={{ color: palette.text, fontWeight: '700', textAlign: 'center' }}>{label}</Text>
    </Pressable>
  );
}
