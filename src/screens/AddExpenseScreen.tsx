import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../utils/categories';
import { brToISO, maskDate, todayBR } from '../utils/date';
import { parseAmount } from '../utils/format';

export default function AddExpenseScreen({ navigation, route }: any) {
  const { palette, t, addExpense } = useApp();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState<string>(route.params?.categoryId ?? CATEGORIES[0].id);
  const [date, setDate] = useState<string>(route.params?.date ?? todayBR());
  const [error, setError] = useState('');

  const submit = async () => {
    const value = parseAmount(amount);
    if (value <= 0) return setError(t('errAmount'));
    const iso = brToISO(date);
    if (!iso) return setError(t('errDate'));
    await addExpense({ description: description.trim() || t(`cat_${categoryId}`), amount: value, categoryId, date: iso });
    navigation.goBack();
  };

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <Input label={t('amount')} value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0,00" />
      <Input label={t('description')} value={description} onChangeText={setDescription} autoCapitalize="sentences" />

      <Text style={{ color: palette.text, fontWeight: '600', marginBottom: 8 }}>{t('category')}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {CATEGORIES.map((c) => {
          const active = c.id === categoryId;
          return (
            <Pressable
              key={c.id}
              onPress={() => setCategoryId(c.id)}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20,
                backgroundColor: active ? palette.soft : palette.card, borderWidth: 2, borderColor: active ? palette.lime : 'transparent',
              }}
            >
              <Ionicons name={c.icon as keyof typeof Ionicons.glyphMap} size={16} color={palette.text} />
              <Text style={{ color: palette.text, fontWeight: '600' }}>{t(`cat_${c.id}`)}</Text>
            </Pressable>
          );
        })}
      </View>

      <Input label={t('date')} value={date} onChangeText={(v) => setDate(maskDate(v))} keyboardType="number-pad" maxLength={10} />
      {!!error && <Text style={{ color: palette.danger, fontWeight: '600', marginBottom: 10 }}>{error}</Text>}
      <Button label={t('save')} icon="checkmark" onPress={submit} />
    </Screen>
  );
}
