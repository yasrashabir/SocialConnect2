import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChatScreen from '../Screens/ChatScreen';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import SignupScreen from '../Screens/SignupScreen';

export default function AppNavigator() {
  const [screen, setScreen] = useState('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  if (!isLoggedIn) {
    if (screen === 'Login') {
      return <LoginScreen setIsLoggedIn={setIsLoggedIn} goToSignup={() => setScreen('Signup')} setCurrentUser={setCurrentUser} />;
    }
    return <SignupScreen goToLogin={() => setScreen('Login')} />;
  }

  const renderScreen = () => {
    if (screen === 'Home') return <HomeScreen currentUser={currentUser} />;
    if (screen === 'Chat') return <ChatScreen currentUser={currentUser} />;
    if (screen === 'Profile') return <ProfileScreen currentUser={currentUser} />;
    if (screen === 'Settings') return <SettingsScreen setIsLoggedIn={setIsLoggedIn} goToProfile={() => setScreen('Profile')} />;
    return <HomeScreen currentUser={currentUser} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tab} onPress={() => setScreen('Home')}>
          <Text style={[styles.tabText, screen === 'Home' && styles.active]}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setScreen('Chat')}>
          <Text style={[styles.tabText, screen === 'Chat' && styles.active]}>💬 Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setScreen('Profile')}>
          <Text style={[styles.tabText, screen === 'Profile' && styles.active]}>👤 Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setScreen('Settings')}>
          <Text style={[styles.tabText, screen === 'Settings' && styles.active]}>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  tabBar: { flexDirection: 'row', backgroundColor: '#6200ee', paddingVertical: 10 },
  tab: { flex: 1, alignItems: 'center' },
  tabText: { color: '#fff', fontSize: 13 },
  active: { fontWeight: 'bold', borderBottomWidth: 2, borderBottomColor: '#fff' },
});