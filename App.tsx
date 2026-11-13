import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import Navigation from './src/navigation';

function Root() {
  const { palette } = useApp();
  return (
    <>
      <StatusBar style={palette.isDark ? 'light' : 'dark'} />
      <Navigation />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <AppProvider>
            <Root />
          </AppProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
