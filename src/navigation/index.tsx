import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MotivationScreen from '../screens/MotivationScreen';
import SourceScreen from '../screens/SourceScreen';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ICONS: Record<string, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ['home', 'home-outline'],
  Calendar: ['calendar', 'calendar-outline'],
  Expenses: ['cash', 'cash-outline'],
  Settings: ['settings', 'settings-outline'],
};

function Tabs() {
  const { palette, t } = useApp();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.isDark ? palette.primary : '#3F7FC8',
        tabBarInactiveTintColor: palette.muted,
        tabBarStyle: { backgroundColor: palette.cardAlt, borderTopColor: palette.border },
        tabBarLabelStyle: { fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('tabHome') }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{ title: t('tabCalendar') }} />
      <Tab.Screen name="Expenses" component={ExpensesScreen} options={{ title: t('tabExpenses') }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t('tabSettings') }} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { ready, user, palette, t } = useApp();

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.bg }}>
        <ActivityIndicator size="large" color={palette.primary} />
      </View>
    );
  }

  const theme = {
    ...DefaultTheme,
    dark: palette.isDark,
    colors: { ...DefaultTheme.colors, background: palette.bg, card: palette.bg, text: palette.text, border: palette.border, primary: palette.primary },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : !user.onboarded ? (
          <>
            <Stack.Screen name="Motivation" component={MotivationScreen} />
            <Stack.Screen name="Source" component={SourceScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen
              name="AddExpense"
              component={AddExpenseScreen}
              options={{
                presentation: 'modal',
                headerShown: true,
                title: t('newExpense'),
                headerStyle: { backgroundColor: palette.bg },
                headerTintColor: palette.text,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
