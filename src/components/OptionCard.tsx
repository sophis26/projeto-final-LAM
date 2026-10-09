import React from 'react';
import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

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
      style={({ pressed }) => ({
        width, minHeight: 104, borderRadius: 16, padding: 12, marginBottom: 12, alignItems: 'center', justifyContent: 'center', gap: 8,
        backgroundColor: selected ? palette.soft : palette.card,
        borderWidth: 2.5, borderColor: selected ? palette.lime : 'transparent',
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Ionicons name={icon} size={30} color={selected ? palette.text : palette.isDark ? palette.primary : '#2F5E96'} />
      <Text style={{ color: palette.text, fontWeight: '700', textAlign: 'center' }}>{label}</Text>
    </Pressable>
  );
}
