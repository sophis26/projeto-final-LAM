import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { spacing } from '../theme/colors';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  variant?: 'plain' | 'primary' | 'soft';
  size?: number;
}

export function IconButton({ icon, label, onPress, variant = 'plain', size = 24 }: Props) {
  const { palette } = useApp();
  const backgroundColor = variant === 'primary' ? palette.primary : variant === 'soft' ? palette.soft : palette.transparent;
  const iconColor = variant === 'primary' ? palette.onPrimary : palette.icon;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={4}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        minWidth: spacing.touchTarget,
        minHeight: spacing.touchTarget,
        borderRadius: spacing.fullRadius,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <Ionicons name={icon} size={size} color={iconColor} />
    </Pressable>
  );
}
