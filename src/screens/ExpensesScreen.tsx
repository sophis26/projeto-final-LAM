import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { ExpenseRow } from '../components/ExpenseRow';
import { Card } from '../components/Card';
import { IconButton } from '../components/IconButton';
import { useApp } from '../context/AppContext';
import { brl } from '../utils/format';
import { monthPrefix } from '../utils/date';
import { MONTHS } from '../utils/i18n';
import { totalPorCategoria, totalPorMes } from '../utils/calculations';
import { categoryLabel } from '../utils/i18n';
import { spacing } from '../theme/colors';

export default function ExpensesScreen({ navigation }: any) {
  const { palette, t, expenses, categories, settings } = useApp();
  const [selectedMonth, setSelectedMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const month = useMemo(() => {
    const prefix = monthPrefix(selectedMonth);
    return expenses
      .filter((expense) => expense.date.startsWith(prefix))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [expenses, selectedMonth]);

  const entriesForCalculation = month.map((expense) => ({
    data: expense.date,
    tipo: expense.type,
    valor: expense.amount,
    categoriaId: expense.categoryId,
  }));
  const total = totalPorMes(entriesForCalculation, selectedMonth);
  const totalsByCategory = totalPorCategoria(entriesForCalculation, selectedMonth);
  const monthName = MONTHS[settings.language][selectedMonth.getMonth()];

  const changeMonth = (offset: number) => {
    setSelectedMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '800', color: palette.text }}>{t('monthExpenses')}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm }}>
        <IconButton icon="chevron-back" label={t('previousMonth')} onPress={() => changeMonth(-1)} />
        <Text style={{ color: palette.text, fontWeight: '700', fontSize: 16 }}>{monthName} {selectedMonth.getFullYear()}</Text>
        <IconButton icon="chevron-forward" label={t('nextMonth')} onPress={() => changeMonth(1)} />
      </View>

      <Text style={{ color: palette.muted, marginTop: spacing.xxs, marginBottom: spacing.md }}>
        {t('total')}: <Text style={{ color: palette.dangerText, fontWeight: '800' }}>{brl(total)}</Text>
      </Text>

      {month.length > 0 && categories.length > 0 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {categories.map((category) => {
            const totals = totalsByCategory[category.id] ?? { receitas: 0, despesas: 0 };
            return (
              <Card key={category.id} style={{ width: '48%', padding: spacing.sm, marginBottom: spacing.sm }}>
                <Text style={{ color: palette.text, fontWeight: '700' }} numberOfLines={1}>{categoryLabel(category.id, category.nome, settings.language)}</Text>
                <Text style={{ color: palette.dangerText, marginTop: spacing.xxs }}>{brl(totals.despesas)}</Text>
              </Card>
            );
          })}
        </View>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xs, marginBottom: spacing.sm }}>
        <Text style={{ fontWeight: '800', color: palette.text, fontSize: 16 }}>{t('entries')}</Text>
        <IconButton
          icon="add"
          label={t('newExpense')}
          variant="primary"
          size={28}
          onPress={() => navigation.navigate('AddExpense', { month: monthPrefix(selectedMonth) })}
        />
      </View>

      {month.length === 0 ? (
        <Card variant="surface" style={{ alignItems: 'center', paddingVertical: spacing.xl, paddingHorizontal: spacing.md }}>
          <Ionicons name="receipt-outline" size={34} color={palette.muted} />
          <Text style={{ color: palette.text, fontWeight: '700', marginTop: spacing.xs }}>{t('emptyMonthTitle')}</Text>
          <Text style={{ color: palette.muted, textAlign: 'center', marginTop: spacing.xxs }}>{t('noEntries')}</Text>
        </Card>
      ) : (
        month.map((expense) => (
          <ExpenseRow key={expense.id} expense={expense} onEdit={() => navigation.navigate('AddExpense', { id: expense.id })} />
        ))
      )}
    </Screen>
  );
}
