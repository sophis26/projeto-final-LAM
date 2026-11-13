import React, { useMemo } from 'react';
import { Alert, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { IconButton } from '../components/IconButton';
import { PieChart } from '../components/PieChart';
import { useApp } from '../context/AppContext';
import { chartColors, spacing } from '../theme/colors';
import { brl } from '../utils/format';
import { calcularResumoMensal } from '../utils/calculations';
import { categoryLabel } from '../utils/i18n';

export default function HomeScreen({ navigation }: any) {
  const { palette, t, user, expenses, categories, settings } = useApp();
  const budget = user?.monthlyBudget ?? 0;
  const resumo = useMemo(() => calcularResumoMensal(
    expenses.map((expense) => ({
      data: expense.date,
      tipo: expense.type,
      valor: expense.amount,
      categoriaId: expense.categoryId,
    })),
    categories,
    new Date(),
    budget,
  ), [expenses, categories, budget]);

  const levelColor = resumo.faixaOrcamento === 'alto'
    ? palette.danger
    : resumo.faixaOrcamento === 'medio' ? palette.warning : palette.lime;
  const levelLabel = resumo.faixaOrcamento === 'alto'
    ? t('levelOver')
    : resumo.faixaOrcamento === 'medio' ? t('levelWarn') : t('levelGood');
  const usedLabel = budget > 0
    ? `${t('usedBudget')} ${resumo.percentualOrcamentoInteiro}% ${t('ofBudget')}`
    : t('budgetNotSet');
  const chartData = resumo.categorias.map((categoria, index) => ({
    value: categoria.valor,
    color: categoria.cor || chartColors[index % chartColors.length],
  }));

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo size={40} row />
        <IconButton icon="help-circle-outline" label={t('helpTitle')} onPress={() => Alert.alert(t('helpTitle'), t('helpText'))} />
      </View>

      <Text style={{ color: palette.muted, marginTop: spacing.md }}>{t('hello')}, {user?.name.split(' ')[0]}</Text>

      <Card variant="soft" style={{ marginTop: spacing.xs }}>
        <Text style={{ color: palette.muted, fontWeight: '600' }}>{t('balance')}</Text>
        <Text style={{ fontSize: 34, fontWeight: '800', color: resumo.saldo < 0 ? palette.dangerText : palette.text }}>{brl(resumo.saldo)}</Text>
        <Text style={{ color: palette.muted, marginTop: spacing.xxs }}>
          {t('income')}: {brl(resumo.receitas)} · {t('expenses')}: {brl(resumo.despesas)}
        </Text>
      </Card>

      <Card style={{ marginTop: spacing.sm }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: palette.text, fontWeight: '700' }}>{t('budgetLevel')}</Text>
          <Text style={{ color: palette.text, fontWeight: '700' }}>
            {budget > 0 ? `${resumo.percentualOrcamentoInteiro}%` : '—'}
          </Text>
        </View>
        <View style={{ height: spacing.progressHeight, borderRadius: spacing.fullRadius, backgroundColor: palette.cardAlt, marginTop: spacing.xs, overflow: 'hidden' }}>
          <View style={{ width: `${Math.min(resumo.percentualOrcamento, 100)}%`, height: '100%', backgroundColor: levelColor }} />
        </View>
        <Text style={{ color: resumo.faixaOrcamento === 'alto' ? palette.dangerText : resumo.faixaOrcamento === 'medio' ? palette.warningText : palette.successText, marginTop: spacing.xs, fontWeight: '700' }}>{levelLabel}</Text>
        <Text style={{ color: palette.text, marginTop: spacing.xxs }}>{usedLabel}</Text>
      </Card>

      <Card style={{ marginTop: spacing.sm }}>
        <Text style={{ color: palette.text, fontWeight: '700', marginBottom: spacing.sm }}>{t('byCategory')}</Text>
        <View style={{ alignItems: 'center' }}>
          <PieChart data={chartData} emptyColor={palette.cardAlt} strokeColor={palette.chartStroke} />
        </View>
        {resumo.despesas > 0 ? (
          <View style={{ marginTop: spacing.md, gap: spacing.xs }}>
            {resumo.categorias.map((categoria) => (
              <View key={categoria.id} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <View style={{ width: spacing.chartDotSize, height: spacing.chartDotSize, borderRadius: spacing.fullRadius, backgroundColor: categoria.cor }} />
                <Text style={{ flex: 1, color: palette.text }}>{categoryLabel(categoria.id, categoria.nome, settings.language)}</Text>
                <Text style={{ color: palette.text, fontWeight: '700' }}>{brl(categoria.valor)} · {categoria.percentual}%</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={{ color: palette.muted, textAlign: 'center', marginTop: spacing.sm }}>{t('noData')}</Text>
        )}
      </Card>

      <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
        <Button label={t('newExpense')} icon="add-circle-outline" onPress={() => navigation.navigate('AddExpense')} style={{ flex: 1 }} />
        <Button label={t('calendar')} icon="calendar-outline" variant="lime" onPress={() => navigation.navigate('Calendar')} style={{ flex: 1 }} />
      </View>
    </Screen>
  );
}
