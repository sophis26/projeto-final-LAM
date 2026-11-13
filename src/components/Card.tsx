import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useApp } from '../context/AppContext';
import { spacing } from '../theme/colors';

interface Props {
  children: React.ReactNode;
  variant?: 'blue' | 'surface' | 'soft';
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, variant = 'blue', style }: Props) {
  const { palette } = useApp();
  const backgroundColor = variant === 'soft' ? palette.soft : variant === 'surface' ? palette.cardAlt : palette.card;

  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: spacing.cardRadius,
          padding: spacing.md,
          ...(variant === 'surface' ? { borderWidth: 1, borderColor: palette.border } : {}),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
