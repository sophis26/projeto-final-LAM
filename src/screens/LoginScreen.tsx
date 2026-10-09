import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { RoundArrowButton } from '../components/Button';
import { useApp } from '../context/AppContext';

// Quadro 1 do Crazy 8: (logo) + Login + 2 campos + botão de seta
export default function LoginScreen({ navigation }: any) {
  const { palette, t, login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    const err = await login(email, password);
    setError(err ? t(err) : '');
  };

  return (
    <Screen centered>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Logo size={84} />
      </View>
      <Text style={{ fontSize: 26, fontWeight: '800', color: palette.text, textAlign: 'center', marginBottom: 20 }}>{t('login')}</Text>
      <Input label={t('email')} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="voce@email.com" />
      <Input label={t('password')} value={password} onChangeText={setPassword} secureTextEntry placeholder="••••" onSubmitEditing={submit} />
      {!!error && <Text style={{ color: palette.danger, fontWeight: '600', marginBottom: 8 }}>{error}</Text>}
      <RoundArrowButton onPress={submit} />
      <Text onPress={() => navigation.navigate('Register')} style={{ color: palette.text, textAlign: 'center', marginTop: 24, fontWeight: '700', textDecorationLine: 'underline' }}>
        {t('noAccount')}
      </Text>
    </Screen>
  );
}
