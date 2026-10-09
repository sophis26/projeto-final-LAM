import React from 'react';
import { Pressable, Text, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'lime' | 'ghost';
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
}

export function Button({ label, onPress, variant = 'primary', icon, style }: Props) {
  const { palette } = useApp();
  const bg = variant === 'primary' ? palette.primary : variant === 'lime' ? palette.lime : 'transparent';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: bg, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 18,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
          opacity: pressed ? 0.8 : 1,
          borderWidth: variant === 'ghost' ? 1.5 : 0, borderColor: palette.primary,
        },
        style,
      ]}
    >
      {icon && <Ionicons name={icon} size={20} color={variant === 'ghost' ? palette.text : palette.onPrimary} />}
      <Text style={{ fontSize: 16, fontWeight: '700', color: variant === 'ghost' ? palette.text : palette.onPrimary }}>{label}</Text>
    </Pressable>
  );
}

// Botão circular com seta, como nos quadros de Login, Cadastro e Onboarding
export function RoundArrowButton({ onPress }: { onPress: () => void }) {
  const { palette } = useApp();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: 64, height: 64, borderRadius: 32, backgroundColor: palette.primary, alignSelf: 'center',
        alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.8 : 1, marginTop: 8,
      })}
    >
      <Ionicons name="arrow-forward" size={30} color={palette.onPrimary} />
    </Pressable>
  );
}
