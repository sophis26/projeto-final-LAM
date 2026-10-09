import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useApp } from '../context/AppContext';

export function Input({ label, ...props }: TextInputProps & { label: string }) {
  const { palette } = useApp();
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: palette.text, fontWeight: '600', marginBottom: 6 }}>{label}</Text>
      <TextInput
        placeholderTextColor={palette.muted}
        autoCapitalize="none"
        {...props}
        style={{
          backgroundColor: palette.input, borderWidth: 1.5, borderColor: palette.border, borderRadius: 12,
          paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, color: palette.text,
        }}
      />
    </View>
  );
}
