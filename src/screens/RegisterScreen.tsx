import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { AuthHeader, AuthLink, AuthSubmit } from '../components/AuthForm';
import { useApp } from '../context/AppContext';
import { spacing } from '../theme/colors';

// Quadro 2 do Crazy 8: (logo) + Cadastro + 3 campos + botão de seta
export default function RegisterScreen({ navigation }: any) {
  const { palette, t, register } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const err = await register(name, email, password, confirmPassword);
      setError(err ? t(err) : '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen centered>
      <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
        <Logo size={84} />
      </View>
      <AuthHeader title={t('register')} />
      <Input label={t('name')} value={name} onChangeText={setName} autoCapitalize="words" />
      <Input label={t('email')} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="voce@email.com" />
      <Input label={t('password')} value={password} onChangeText={setPassword} secureTextEntry placeholder="••••" />
      <Input label={t('confirmPassword')} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry placeholder="••••" onSubmitEditing={submit} />
      {!!error && <Text style={{ color: palette.dangerText, fontWeight: '600', marginBottom: spacing.xs }}>{error}</Text>}
      <AuthSubmit onPress={submit} loading={loading} />
      <AuthLink label={t('hasAccount')} onPress={() => navigation.goBack()} />
    </Screen>
  );
}
