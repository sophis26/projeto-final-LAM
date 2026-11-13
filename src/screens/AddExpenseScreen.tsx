import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { brToISO, isoToBR, maskDate, todayBR } from '../utils/date';
import { parseAmount } from '../utils/format';
import { categoryLabel } from '../utils/i18n';
import { spacing } from '../theme/colors';

export default function AddExpenseScreen({ navigation, route }: any) {
  const { palette, t, addExpense, updateExpense, expenses, categories, settings } = useApp();
  const editingId = route.params?.id as string | undefined;
  const existing = editingId ? expenses.find((item) => item.id === editingId) : undefined;
  const [description, setDescription] = useState(existing?.description ?? '');
  const [amount, setAmount] = useState(existing ? String(existing.amount).replace('.', ',') : '');
  const [categoryId, setCategoryId] = useState<string>(existing?.categoryId ?? route.params?.categoryId ?? categories[0]?.id ?? '');
  const [date, setDate] = useState<string>(existing ? isoToBR(existing.date) : initialDate(route.params));
  const [type, setType] = useState<'receita' | 'despesa'>(existing?.type ?? 'despesa');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId && categories.length > 0) setCategoryId(categories[0].id);
  }, [categories, categoryId]);

  const submit = async () => {
    if (!description.trim()) return setError(t('errDescription'));
    const value = parseAmount(amount);
    if (!Number.isFinite(value) || value <= 0) return setError(t('errAmount'));
    const iso = brToISO(date);
    if (!iso) return setError(t('errDate'));
    if (!categoryId) return setError(t('errCategory'));

    setError('');
    const data = { description: description.trim(), amount: value, categoryId, date: iso, type };
    setLoading(true);
    try {
      const saved = editingId ? await updateExpense(editingId, data) : await addExpense(data);
      if (!saved) return setError(t('errSave'));
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <Text style={{ color: palette.text, fontWeight: '700', marginBottom: spacing.xs }}>{t('transactionType')}</Text>
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md }}>
        {(['despesa', 'receita'] as const).map((option) => {
          const active = type === option;
          return (
            <Pressable key={option} onPress={() => setType(option)} accessibilityRole="button" accessibilityState={{ selected: active }} style={{ flex: 1, minHeight: spacing.controlHeight, padding: spacing.sm, borderRadius: spacing.inputRadius, alignItems: 'center', justifyContent: 'center', backgroundColor: active ? palette.soft : palette.card, borderWidth: 2, borderColor: active ? palette.lime : palette.transparent }}>
              <Text style={{ color: palette.text, fontWeight: '700' }}>{t(option)}</Text>
            </Pressable>
          );
        })}
      </View>

      <Input label={t('description')} value={description} onChangeText={setDescription} autoCapitalize="sentences" />
      <Input label={t('amount')} value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0,00" />

      <Text style={{ color: palette.text, fontWeight: '600', marginBottom: spacing.xs }}>{t('category')}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md }}>
        {categories.map((category) => {
          const active = category.id === categoryId;
          return (
            <Pressable key={category.id} onPress={() => setCategoryId(category.id)} accessibilityRole="button" accessibilityState={{ selected: active }} style={{ minHeight: spacing.touchTarget, justifyContent: 'center', paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, borderRadius: spacing.fullRadius, backgroundColor: active ? palette.soft : palette.card, borderWidth: 2, borderColor: active ? palette.lime : palette.transparent }}>
              <Text style={{ color: palette.text, fontWeight: '600' }}>{categoryLabel(category.id, category.nome, settings.language)}</Text>
            </Pressable>
          );
        })}
      </View>

      <Input label={t('date')} value={date} onChangeText={(value) => setDate(maskDate(value))} keyboardType="number-pad" maxLength={10} />
      {!!error && <Text style={{ color: palette.dangerText, fontWeight: '600', marginBottom: spacing.sm }}>{error}</Text>}
      <Button label={t('save')} icon="checkmark" onPress={submit} loading={loading} />
    </Screen>
  );
}

function initialDate(params: { date?: string; month?: string } | undefined): string {
  if (params?.date) return params.date;
  if (params?.month && /^\d{4}-\d{2}$/.test(params.month)) return isoToBR(`${params.month}-01`);
  return todayBR();
}
