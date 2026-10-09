import React, { useMemo } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { PieChart } from '../components/PieChart';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../utils/categories';
import { chartColors } from '../theme/colors';
import { brl } from '../utils/format';
import { monthPrefix } from '../utils/date';

// Quadro Home: (logo), saldo, nível de orçamento, "?" de ajuda, gráfico de pizza e atalhos
export default function HomeScreen({ navigation }: any) {
  const { palette, t, user, expenses } = useApp();
  const budget = user?.monthlyBudget ?? 0;

  const { spent, slices } = useMemo(() => {
    const prefix = monthPrefix(new Date());
    const month = expenses.filter((e) => e.date.startsWith(prefix));
    return {
      spent: month.reduce((s, e) => s + e.amount, 0),
      slices: CATEGORIES.map((c, i) => ({
        id: c.id,
        color: chartColors[i % chartColors.length],
        value: month.filter((e) => e.categoryId === c.id).reduce((s, e) => s + e.amount, 0),
      })),
    };
  }, [expenses]);

  const balance = budget - spent;
  const ratio = budget > 0 ? spent / budget : 0;
  const levelColor = ratio > 1 ? palette.danger : ratio >= 0.8 ? palette.warning : palette.lime;
  const levelLabel = ratio > 1 ? t('levelOver') : ratio >= 0.8 ? t('levelWarn') : t('levelGood');

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo size={40} row />
        <Pressable onPress={() => Alert.alert(t('helpTitle'), t('helpText'))} hitSlop={10} accessibilityLabel={t('helpTitle')}>
          <Ionicons name="help-circle-outline" size={32} color={palette.primary} />
        </Pressable>
      </View>

      <Text style={{ color: palette.muted, marginTop: 16 }}>{t('hello')}, {user?.name.split(' ')[0]}</Text>

      <View style={{ backgroundColor: palette.soft, borderRadius: 20, padding: 18, marginTop: 8 }}>
        <Text style={{ color: palette.muted, fontWeight: '600' }}>{t('balance')}</Text>
        <Text style={{ fontSize: 34, fontWeight: '800', color: balance < 0 ? palette.danger : palette.text }}>{brl(balance)}</Text>
        <Text style={{ color: palette.muted, marginTop: 2 }}>{brl(spent)} {t('spentOf')} {brl(budget)}</Text>
      </View>

      <View style={{ backgroundColor: palette.card, borderRadius: 20, padding: 18, marginTop: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: palette.text, fontWeight: '700' }}>{t('budgetLevel')}</Text>
          <Text style={{ color: palette.text, fontWeight: '700' }}>{Math.round(ratio * 100)}%</Text>
        </View>
        <View style={{ height: 14, borderRadius: 7, backgroundColor: palette.cardAlt, marginTop: 10, overflow: 'hidden' }}>
          <View style={{ width: `${Math.min(ratio, 1) * 100}%`, height: '100%', backgroundColor: levelColor }} />
        </View>
        <Text style={{ color: palette.text, marginTop: 8, fontWeight: '600' }}>{levelLabel}</Text>
      </View>

      <View style={{ backgroundColor: palette.card, borderRadius: 20, padding: 18, marginTop: 12 }}>
        <Text style={{ color: palette.text, fontWeight: '700', marginBottom: 12 }}>{t('byCategory')}</Text>
        <View style={{ alignItems: 'center' }}>
          <PieChart data={slices} emptyColor={palette.cardAlt} />
        </View>
        {spent > 0 ? (
          <View style={{ marginTop: 14, gap: 6 }}>
            {slices.filter((s) => s.value > 0).map((s) => (
              <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: s.color }} />
                <Text style={{ flex: 1, color: palette.text }}>{t(`cat_${s.id}`)}</Text>
                <Text style={{ color: palette.text, fontWeight: '700' }}>{brl(s.value)}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={{ color: palette.muted, textAlign: 'center', marginTop: 12 }}>{t('noData')}</Text>
        )}
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
        <Button label={t('newExpense')} icon="add-circle-outline" onPress={() => navigation.navigate('AddExpense')} style={{ flex: 1 }} />
        <Button label={t('calendar')} icon="calendar-outline" variant="lime" onPress={() => navigation.navigate('Calendar')} style={{ flex: 1 }} />
      </View>
    </Screen>
  );
}
