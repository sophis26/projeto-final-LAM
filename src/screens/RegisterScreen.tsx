import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { AuthHeader, AuthLink, AuthSubmit } from '../components/AuthForm';
import { useApp } from '../context/AppContext';

// Quadro 2 do Crazy 8: (logo) + Cadastro + 3 campos + botão de seta
export default function RegisterScreen({ navigation }: any) {
  const { palette, t, register } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    const err = await register(name, email, password, confirmPassword);
    setError(err ? t(err) : '');
  };

  return (
    <Screen centered>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Logo size={84} />
      </View>
      <AuthHeader title={t('register')} />
      <Input label={t('name')} value={name} onChangeText={setName} autoCapitalize="words" />
      <Input label={t('email')} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="voce@email.com" />
      <Input label={t('password')} value={password} onChangeText={setPassword} secureTextEntry placeholder="••••" />
      <Input label={t('confirmPassword')} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry placeholder="••••" onSubmitEditing={submit} />
      {!!error && <Text style={{ color: palette.danger, fontWeight: '600', marginBottom: 8 }}>{error}</Text>}
      <AuthSubmit onPress={submit} />
      <AuthLink label={t('hasAccount')} onPress={() => navigation.goBack()} />
    </Screen>
  );
}
