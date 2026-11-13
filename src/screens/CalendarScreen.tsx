import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { ExpenseRow } from '../components/ExpenseRow';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { IconButton } from '../components/IconButton';
import { useApp } from '../context/AppContext';
import { brl } from '../utils/format';
import { agruparLancamentosPorDia } from '../utils/calculations';
import { daysInMonth, isoToBR, monthPrefix, pad, toISO } from '../utils/date';
import { MONTHS, WEEKDAYS } from '../utils/i18n';
import { spacing } from '../theme/colors';

export default function CalendarScreen({ navigation }: any) {
  const { palette, t, expenses, settings } = useApp();
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selected, setSelected] = useState<string>(() => toISO(new Date()));

  const monthLength = daysInMonth(month);
  const prefix = monthPrefix(month);
  const dailyTotals = useMemo(() => agruparLancamentosPorDia(
    expenses.map((expense) => ({
      data: expense.date,
      tipo: expense.type,
      valor: expense.amount,
      categoriaId: expense.categoryId,
    })),
    month,
  ), [expenses, month]);
  const dayExpenses = expenses.filter((expense) => expense.date === selected);
  const selectedTotals = dailyTotals[selected] ?? { receitas: 0, despesas: 0, saldo: 0 };
  const cells: (number | null)[] = [
    ...Array(month.getDay()).fill(null),
    ...Array.from({ length: monthLength }, (_, index) => index + 1),
  ];

  const shiftMonth = (delta: number) => {
    const nextMonth = new Date(month.getFullYear(), month.getMonth() + delta, 1);
    setMonth(nextMonth);
    setSelected(toISO(nextMonth));
  };

  const dayColor = (date: string) => {
    const totals = dailyTotals[date];
    if (!totals) return palette.cardAlt;
    return totals.despesas > totals.receitas ? palette.danger : palette.lime;
  };

  const Legend = ({ color, label }: { color: string; label: string }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xxs }}>
      <View style={{ width: spacing.legendDotSize, height: spacing.legendDotSize, borderRadius: spacing.fullRadius, backgroundColor: color, borderWidth: 1, borderColor: palette.border }} />
      <Text style={{ color: palette.muted, fontSize: 12 }}>{label}</Text>
    </View>
  );

  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '800', color: palette.text }}>{t('calendarTitle')}</Text>

      <Card style={{ marginTop: spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
          <IconButton icon="chevron-back" label={t('previousMonth')} onPress={() => shiftMonth(-1)} />
          <Text style={{ fontSize: 18, fontWeight: '800', color: palette.text }}>{MONTHS[settings.language][month.getMonth()]} {month.getFullYear()}</Text>
          <IconButton icon="chevron-forward" label={t('nextMonth')} onPress={() => shiftMonth(1)} />
        </View>

        <View style={{ flexDirection: 'row' }}>
          {WEEKDAYS[settings.language].map((weekday, index) => (
            <Text key={index} style={{ width: '14.2857%', textAlign: 'center', color: palette.muted, fontWeight: '700' }}>{weekday}</Text>
          ))}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {cells.map((day, index) => {
            if (day === null) return <View key={`blank-${index}`} style={{ width: '14.2857%', aspectRatio: 1 }} />;
            const date = `${prefix}-${pad(day)}`;
            const totals = dailyTotals[date];
            const isSelected = date === selected;
            const textColor = totals && totals.despesas > totals.receitas ? palette.chartStroke : palette.text;
            return (
              <View key={date} style={{ width: '14.2857%', aspectRatio: 1, padding: spacing.xxs }}>
                <Pressable
                  onPress={() => setSelected(date)}
                  hitSlop={4}
                  accessibilityRole="button"
                  accessibilityLabel={`${day} ${MONTHS[settings.language][month.getMonth()]}`}
                  style={{
                    flex: 1,
                    borderRadius: spacing.fullRadius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: dayColor(date),
                    borderWidth: isSelected ? 3 : 0,
                    borderColor: palette.text,
                  }}
                >
                  <Text style={{ fontWeight: '700', color: textColor }}>{day}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.xs }}>
          <Legend color={palette.lime} label={t('legendGreen')} />
          <Legend color={palette.danger} label={t('legendRed')} />
          <Legend color={palette.cardAlt} label={t('legendNone')} />
        </View>
      </Card>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.lg, marginBottom: spacing.xxs }}>
        <Text style={{ fontWeight: '800', color: palette.text, fontSize: 16 }}>{isoToBR(selected)}</Text>
        <Text style={{ fontWeight: '800', color: selectedTotals.saldo < 0 ? palette.dangerText : palette.successText, fontSize: 16 }}>
          {t('dayBalance')}: {brl(selectedTotals.saldo)}
        </Text>
      </View>
      <Text style={{ color: palette.muted, marginBottom: spacing.sm }}>
        {t('income')}: {brl(selectedTotals.receitas)} · {t('expenses')}: {brl(selectedTotals.despesas)}
      </Text>

      {dayExpenses.length === 0 ? (
        <Text style={{ color: palette.muted, marginBottom: spacing.sm }}>{t('noExpensesDay')}</Text>
      ) : (
        dayExpenses.map((expense) => <ExpenseRow key={expense.id} expense={expense} />)
      )}
      <Button label={t('addForDay')} icon="add" variant="ghost" onPress={() => navigation.navigate('AddExpense', { date: isoToBR(selected) })} style={{ marginTop: spacing.xs }} />
    </Screen>
  );
}
