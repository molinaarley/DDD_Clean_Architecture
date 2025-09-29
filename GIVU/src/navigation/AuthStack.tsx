import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { PhoneNumberScreen } from '../features/auth/screens/PhoneNumberScreen';
import { OtpVerificationScreen } from '../features/auth/screens/OtpVerificationScreen';
import { PasswordSetupScreen } from '../features/auth/screens/PasswordSetupScreen';
import { ProfileSetupScreen } from '../features/auth/screens/ProfileSetupScreen';
import { EmailLoginScreen } from '../features/auth/screens/EmailLoginScreen';
import { EmailVerificationPendingScreen } from '../features/auth/screens/EmailVerificationPendingScreen';
import { HomePlaceholderScreen } from '../features/auth/screens/HomePlaceholderScreen';
import { AuthStackParamList } from './types';

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="PasswordSetup" component={PasswordSetupScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="EmailInput" component={EmailLoginScreen} />
      <Stack.Screen name="EmailVerificationPending" component={EmailVerificationPendingScreen} />
      <Stack.Screen name="HomePlaceholder" component={HomePlaceholderScreen} />
    </Stack.Navigator>
  );
}
