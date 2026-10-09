import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { ExpenseRow } from '../components/ExpenseRow';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { brl } from '../utils/format';
import { daysInMonth, isoToBR, monthPrefix, pad, toISO } from '../utils/date';
import { MONTHS, WEEKDAYS } from '../utils/i18n';

// Quadro "Calendário de gastos": cada dia é um círculo verde (dentro do limite) ou vermelho (acima)
export default function CalendarScreen({ navigation }: any) {
  const { palette, t, user, expenses, settings } = useApp();
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selected, setSelected] = useState<string>(toISO(new Date()));

  const total = daysInMonth(month);
  const prefix = monthPrefix(month);
  const dailyLimit = (user?.monthlyBudget ?? 0) / total;

  const perDay = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      if (e.date.startsWith(prefix)) map[e.date] = (map[e.date] ?? 0) + e.amount;
    });
    return map;
  }, [expenses, prefix]);

  const cells: (number | null)[] = [...Array(month.getDay()).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  const dayExpenses = expenses.filter((e) => e.date === selected);
  const shift = (delta: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));

  const dayColor = (iso: string) => {
    const v = perDay[iso];
    if (!v) return palette.cardAlt;
    return v > dailyLimit ? palette.danger : palette.lime;
  };

  const Legend = ({ color, label }: { color: string; label: string }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: color, borderWidth: 1, borderColor: palette.border }} />
      <Text style={{ color: palette.muted, fontSize: 12 }}>{label}</Text>
    </View>
  );

  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '800', color: palette.text }}>{t('calendarTitle')}</Text>

      <View style={{ backgroundColor: palette.card, borderRadius: 20, padding: 14, marginTop: 14 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Pressable onPress={() => shift(-1)} hitSlop={12}><Ionicons name="chevron-back" size={26} color={palette.text} /></Pressable>
          <Text style={{ fontSize: 18, fontWeight: '800', color: palette.text }}>{MONTHS[settings.language][month.getMonth()]} {month.getFullYear()}</Text>
          <Pressable onPress={() => shift(1)} hitSlop={12}><Ionicons name="chevron-forward" size={26} color={palette.text} /></Pressable>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {WEEKDAYS[settings.language].map((d, i) => (
            <Text key={i} style={{ width: '14.2857%', textAlign: 'center', color: palette.muted, fontWeight: '700' }}>{d}</Text>
          ))}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {cells.map((day, i) => {
            if (day === null) return <View key={`b${i}`} style={{ width: '14.2857%', aspectRatio: 1 }} />;
            const iso = `${prefix}-${pad(day)}`;
            const isSel = iso === selected;
            const coloured = !!perDay[iso];
            return (
              <View key={iso} style={{ width: '14.2857%', aspectRatio: 1, padding: 3 }}>
                <Pressable
                  onPress={() => setSelected(iso)}
                  style={{
                    flex: 1, borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: dayColor(iso),
                    borderWidth: isSel ? 3 : 0, borderColor: palette.text,
                  }}
                >
                  <Text style={{ fontWeight: '700', color: coloured && perDay[iso] > dailyLimit ? '#FFFFFF' : palette.isDark && !coloured ? palette.text : '#1E2F46' }}>{day}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 10 }}>
          <Legend color={palette.lime} label={t('legendGreen')} />
          <Legend color={palette.danger} label={t('legendRed')} />
          <Legend color={palette.cardAlt} label={t('legendNone')} />
        </View>
        <Text style={{ color: palette.muted, fontSize: 12, marginTop: 8 }}>{t('dailyLimit')}: {brl(dailyLimit)}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 }}>
        <Text style={{ fontWeight: '800', color: palette.text, fontSize: 16 }}>{isoToBR(selected)}</Text>
        <Text style={{ fontWeight: '800', color: palette.text, fontSize: 16 }}>{brl(dayExpenses.reduce((s, e) => s + e.amount, 0))}</Text>
      </View>
      {dayExpenses.length === 0 ? (
        <Text style={{ color: palette.muted, marginBottom: 12 }}>{t('noExpensesDay')}</Text>
      ) : (
        dayExpenses.map((e) => <ExpenseRow key={e.id} expense={e} />)
      )}
      <Button label={t('addForDay')} icon="add" variant="ghost" onPress={() => navigation.navigate('AddExpense', { date: isoToBR(selected) })} style={{ marginTop: 8 }} />
    </Screen>
  );
}
