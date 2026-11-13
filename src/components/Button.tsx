import React from 'react';
import { ActivityIndicator, Pressable, Text, type ViewStyle, type StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { spacing } from '../theme/colors';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'lime' | 'ghost';
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({ label, onPress, variant = 'primary', icon, style, loading = false, disabled = false }: Props) {
  const { palette } = useApp();
  const bg = variant === 'primary' ? palette.primary : variant === 'lime' ? palette.lime : palette.transparent;
  const contentColor = variant === 'ghost' ? palette.text : palette.onPrimary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      style={({ pressed }) => [
        {
          minHeight: spacing.controlHeight,
          backgroundColor: bg, borderRadius: spacing.buttonRadius, paddingVertical: spacing.sm, paddingHorizontal: spacing.md,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs,
          opacity: disabled || loading ? 0.65 : pressed ? 0.8 : 1,
          borderWidth: variant === 'ghost' ? 1.5 : 0, borderColor: variant === 'ghost' ? palette.icon : palette.transparent,
        },
        style,
      ]}
    >
      {loading ? <ActivityIndicator size="small" color={contentColor} /> : icon ? <Ionicons name={icon} size={20} color={variant === 'ghost' ? palette.icon : contentColor} /> : null}
      <Text style={{ fontSize: 16, fontWeight: '700', color: contentColor }}>{label}</Text>
    </Pressable>
  );
}

// Botão circular com seta, como nos quadros de Login, Cadastro e Onboarding
export function RoundArrowButton({ onPress, loading = false, disabled = false }: { onPress: () => void; loading?: boolean; disabled?: boolean }) {
  const { palette } = useApp();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      style={({ pressed }) => ({
        width: spacing.roundButtonSize, height: spacing.roundButtonSize, borderRadius: spacing.fullRadius, backgroundColor: palette.primary, alignSelf: 'center',
        alignItems: 'center', justifyContent: 'center', opacity: disabled || loading ? 0.65 : pressed ? 0.8 : 1, marginTop: spacing.sm,
      })}
    >
      {loading ? <ActivityIndicator color={palette.onPrimary} /> : <Ionicons name="arrow-forward" size={30} color={palette.onPrimary} />}
    </Pressable>
  );
}
