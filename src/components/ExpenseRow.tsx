import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Expense } from '../types';
import { categoryIcon } from '../utils/categories';
import { brl } from '../utils/format';
import { isoToBR } from '../utils/date';

export function ExpenseRow({ expense }: { expense: Expense }) {
  const { palette, t, removeExpense } = useApp();

  const confirmDelete = () =>
    Alert.alert(t('deleteTitle'), t('deleteConfirm'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('delete'), style: 'destructive', onPress: () => removeExpense(expense.id) },
    ]);

  return (
    <View
      style={{
        flexDirection: 'row', alignItems: 'center', backgroundColor: palette.cardAlt, borderRadius: 14,
        padding: 12, marginBottom: 8, gap: 12, borderWidth: 1, borderColor: palette.border,
      }}
    >
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: palette.card, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={categoryIcon(expense.categoryId) as keyof typeof Ionicons.glyphMap} size={20} color={palette.text} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: palette.text, fontWeight: '700' }} numberOfLines={1}>{expense.description}</Text>
        <Text style={{ color: palette.muted, fontSize: 12 }}>{t(`cat_${expense.categoryId}`)} · {isoToBR(expense.date)}</Text>
      </View>
      <Text style={{ color: palette.text, fontWeight: '800' }}>{brl(expense.amount)}</Text>
      <Pressable onPress={confirmDelete} hitSlop={10} accessibilityLabel={t('delete')}>
        <Ionicons name="trash-outline" size={20} color={palette.muted} />
      </Pressable>
    </View>
  );
}
