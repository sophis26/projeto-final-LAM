import React from 'react';
import { Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { spacing } from '../theme/colors';

// Logo provisório (o desenho do Crazy 8 indica "(logo)"): moeda azul + nome.
export function Logo({ size = 56, row = false }: { size?: number; row?: boolean }) {
  const { palette } = useApp();
  return (
    <View style={{ alignItems: 'center', flexDirection: row ? 'row' : 'column', gap: spacing.xs }}>
      <View
        style={{
          width: size, height: size, borderRadius: size / 2, backgroundColor: palette.primary,
          alignItems: 'center', justifyContent: 'center', borderWidth: size / 14, borderColor: palette.lime,
        }}
      >
        <Text style={{ fontSize: size * 0.5, fontWeight: '800', color: palette.onPrimary }}>J</Text>
      </View>
      <Text style={{ fontSize: size * 0.42, fontWeight: '800', color: palette.text }}>JIM's</Text>
    </View>
  );
}
