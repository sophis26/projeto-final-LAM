import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import type { Categoria, Expense } from '../types';
import { categoryIcon } from '../utils/categories';
import { brl } from '../utils/format';
import { isoToBR } from '../utils/date';
import { categoryLabel } from '../utils/i18n';
import { Card } from './Card';
import { spacing } from '../theme/colors';

export function ExpenseRow({ expense, onEdit }: { expense: Expense; onEdit?: () => void }) {
  const { palette, t, removeExpense, categories, settings } = useApp();
  const fallbackName = categories.find((category: Categoria) => category.id === expense.categoryId)?.nome ?? expense.categoryId;
  const categoryName = categoryLabel(expense.categoryId, fallbackName, settings.language);

  const confirmDelete = () =>
    Alert.alert(t('deleteTitle'), t('deleteConfirm'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('delete'), style: 'destructive', onPress: () => removeExpense(expense.id) },
    ]);

  return (
    <Card
      variant="surface"
      style={{
        flexDirection: 'row', alignItems: 'center', padding: spacing.sm, marginBottom: spacing.xs, gap: spacing.xs,
      }}
    >
      <View style={{ width: spacing.iconBadgeSize, height: spacing.iconBadgeSize, borderRadius: spacing.fullRadius, backgroundColor: palette.card, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={categoryIcon(expense.categoryId) as keyof typeof Ionicons.glyphMap} size={20} color={palette.icon} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: palette.text, fontWeight: '700' }} numberOfLines={1}>{expense.description}</Text>
        <Text style={{ color: palette.muted, fontSize: 14 }}>{categoryName} · {isoToBR(expense.date)}</Text>
      </View>
      <Text style={{ color: expense.type === 'receita' ? palette.successText : palette.dangerText, fontWeight: '800' }}>
        {expense.type === 'receita' ? '+' : '−'}{brl(expense.amount)}
      </Text>
      {onEdit && (
        <Pressable onPress={onEdit} hitSlop={4} accessibilityRole="button" accessibilityLabel={t('edit')} style={{ minWidth: spacing.touchTarget, minHeight: spacing.touchTarget, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="create-outline" size={20} color={palette.icon} />
        </Pressable>
      )}
      <Pressable onPress={confirmDelete} hitSlop={4} accessibilityRole="button" accessibilityLabel={t('delete')} style={{ minWidth: spacing.touchTarget, minHeight: spacing.touchTarget, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name="trash-outline" size={20} color={palette.muted} />
      </Pressable>
    </Card>
  );
}
