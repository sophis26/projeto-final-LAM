import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { AuthHeader, AuthLink, AuthSubmit } from '../components/AuthForm';
import { useApp } from '../context/AppContext';
import { spacing } from '../theme/colors';

// Quadro 1 do Crazy 8: (logo) + Login + 2 campos + botão de seta
export default function LoginScreen({ navigation }: any) {
  const { palette, t, login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const err = await login(email, password);
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
      <AuthHeader title={t('login')} />
      <Input label={t('email')} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="voce@email.com" />
      <Input label={t('password')} value={password} onChangeText={setPassword} secureTextEntry placeholder="••••" onSubmitEditing={submit} />
      {!!error && <Text style={{ color: palette.dangerText, fontWeight: '600', marginBottom: spacing.xs }}>{error}</Text>}
      <AuthSubmit onPress={submit} loading={loading} />
      <AuthLink label={t('noAccount')} onPress={() => navigation.navigate('Register')} />
    </Screen>
  );
}
