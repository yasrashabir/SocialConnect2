import { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen({ setIsLoggedIn, goToProfile }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [showLogout, setShowLogout] = useState(false);

  const handleChangePassword = () => {
    if (oldPassword === '' || newPassword === '') {
      setPasswordMsg('Please fill all fields');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg('Password must be at least 6 characters');
      return;
    }
    setPasswordMsg('Password changed successfully!');
    setOldPassword('');
    setNewPassword('');
    setTimeout(() => {
      setPasswordMsg('');
      setShowChangePassword(false);
    }, 2000);
  };

  const bg = darkMode ? '#1a1a1a' : '#f5f5f5';
  const cardBg = darkMode ? '#2d2d2d' : '#fff';
  const textColor = darkMode ? '#fff' : '#333';

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.title, { color: textColor }]}>Settings</Text>

      <View style={[styles.section, { backgroundColor: cardBg }]}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.row}>
          <Text style={[styles.rowText, { color: textColor }]}>🔔 Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: '#6200ee' }} />
        </View>
        <View style={styles.row}>
          <Text style={[styles.rowText, { color: textColor }]}>🌙 Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: '#6200ee' }} />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: cardBg }]}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.row} onPress={() => setShowChangePassword(!showChangePassword)}>
          <Text style={[styles.rowText, { color: textColor }]}>🔑 Change Password</Text>
        </TouchableOpacity>

        {showChangePassword && (
          <View style={styles.passwordForm}>
            {passwordMsg ? (
              <Text style={[styles.msg, { color: passwordMsg.includes('success') ? 'green' : 'red' }]}>
                {passwordMsg}
              </Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          <TouchableOpacity style={styles.row} onPress={() => goToProfile && goToProfile()}>
  <Text style={[styles.rowText, { color: textColor }]}>👤 Edit Profile</Text>
</TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.row}>
          <Text style={[styles.rowText, { color: textColor }]}>👤 Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {showLogout ? (
        <View style={[styles.section, { backgroundColor: cardBg }]}>
          <Text style={[styles.rowText, { color: textColor, textAlign: 'center', marginBottom: 10 }]}>
            Are you sure you want to logout?
          </Text>
          <View style={styles.logoutConfirm}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowLogout(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutBtn} onPress={() => setIsLoggedIn && setIsLoggedIn(false)}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.logoutBtn} onPress={() => setShowLogout(true)}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 25, marginTop: 10 },
  section: { borderRadius: 10, padding: 15, marginBottom: 20 },
  sectionTitle: { fontSize: 14, color: '#999', marginBottom: 10, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  rowText: { fontSize: 16 },
  passwordForm: { paddingVertical: 10 },
  msg: { textAlign: 'center', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: '#f9f9f9' },
  saveBtn: { backgroundColor: '#6200ee', padding: 12, borderRadius: 8, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontWeight: 'bold' },
  logoutConfirm: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, backgroundColor: '#ddd', padding: 12, borderRadius: 8, alignItems: 'center' },
  cancelText: { fontWeight: 'bold', color: '#333' },
  logoutBtn: { flex: 1, backgroundColor: '#e53935', padding: 15, borderRadius: 8, alignItems: 'center' },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});