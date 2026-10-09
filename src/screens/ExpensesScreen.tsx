import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { ExpenseRow } from '../components/ExpenseRow';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../utils/categories';
import { brl } from '../utils/format';
import { monthPrefix } from '../utils/date';

// Quadro "Gastos do mês": cartões de categorias (IPTU, IPVA, Mercado...) + lançamentos
export default function ExpensesScreen({ navigation }: any) {
  const { palette, t, expenses } = useApp();
  const prefix = monthPrefix(new Date());
  const month = expenses.filter((e) => e.date.startsWith(prefix)).sort((a, b) => (a.date < b.date ? 1 : -1));
  const total = month.reduce((s, e) => s + e.amount, 0);

  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '800', color: palette.text }}>{t('monthExpenses')}</Text>
      <Text style={{ color: palette.muted, marginTop: 2, marginBottom: 16 }}>{t('total')}: {brl(total)}</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {CATEGORIES.map((c) => {
          const sum = month.filter((e) => e.categoryId === c.id).reduce((s, e) => s + e.amount, 0);
          return (
            <Pressable
              key={c.id}
              onPress={() => navigation.navigate('AddExpense', { categoryId: c.id })}
              style={({ pressed }) => ({
                width: '31.5%', backgroundColor: palette.card, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 6,
                alignItems: 'center', marginBottom: 12, opacity: pressed ? 0.85 : 1,
              })}
            >
              <Ionicons name={c.icon as keyof typeof Ionicons.glyphMap} size={28} color={palette.isDark ? palette.primary : '#2F5E96'} />
              <Text style={{ color: palette.text, fontWeight: '700', marginTop: 6 }} numberOfLines={1}>{t(`cat_${c.id}`)}</Text>
              <Text style={{ color: palette.text, fontSize: 12, marginTop: 2 }}>{brl(sum)}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={{ fontWeight: '800', color: palette.text, fontSize: 16, marginTop: 8, marginBottom: 10 }}>{t('entries')}</Text>
      {month.length === 0 ? (
        <Text style={{ color: palette.muted }}>{t('noEntries')}</Text>
      ) : (
        month.map((e) => <ExpenseRow key={e.id} expense={e} />)
      )}
    </Screen>
  );
}
