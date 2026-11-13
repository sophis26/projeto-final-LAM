import React, { useState } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { useApp } from '../context/AppContext';
import { spacing } from '../theme/colors';

export function Input({ label, accessibilityLabel, onFocus, onBlur, ...props }: TextInputProps & { label: string }) {
  const { palette } = useApp();
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={{ color: palette.text, fontWeight: '600', marginBottom: spacing.xs }}>{label}</Text>
      <TextInput
        placeholderTextColor={palette.muted}
        accessibilityLabel={accessibilityLabel ?? label}
        onFocus={(event) => { setFocused(true); onFocus?.(event); }}
        onBlur={(event) => { setFocused(false); onBlur?.(event); }}
        autoCapitalize="none"
        {...props}
        style={{
          backgroundColor: palette.input, borderWidth: focused ? 2 : 1.5, borderColor: focused ? palette.icon : palette.border, borderRadius: spacing.inputRadius,
          minHeight: spacing.controlHeight,
          paddingHorizontal: spacing.sm, paddingVertical: spacing.sm, fontSize: 16, color: palette.text,
        }}
      />
    </View>
  );
}
