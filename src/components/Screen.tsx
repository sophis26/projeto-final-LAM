import React from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { spacing } from '../theme/colors';

interface Props {
  children: React.ReactNode;
  centered?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  contentStyle?: StyleProp<ViewStyle>;
}

export function Screen({ children, centered = false, edges = ['top', 'left', 'right'], contentStyle }: Props) {
  const { palette } = useApp();
  return (
    <SafeAreaView edges={edges} style={{ flex: 1, backgroundColor: palette.bg }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          { padding: spacing.lg, paddingBottom: spacing.xxl, flexGrow: 1 },
          centered && { justifyContent: 'center' },
          contentStyle,
        ]}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
