import React, { useState } from 'react';
import { View } from 'react-native';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';

export default function AppNavigator() {
  const [screen, setScreen] = useState('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    if (screen === 'Login') {
      return <LoginScreen setIsLoggedIn={setIsLoggedIn} goToSignup={() => setScreen('Signup')} />;
    }
    return <SignupScreen goToLogin={() => setScreen('Login')} />;
  }

  return <View style={{ flex: 1 }}><HomeScreen /></View>;
}
