import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [name, setName] = useState('Your Name');
  const [bio, setBio] = useState('Your bio here...');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (name === '') {
      Alert.alert('Error', 'Name cannot be empty!');
      return;
    }
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>👤</Text>
      </View>

      <Text style={styles.label}>Name</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      ) : (
        <Text style={styles.value}>{name}</Text>
      )}

      <Text style={styles.label}>Bio</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={setBio}
          multiline
        />
      ) : (
        <Text style={styles.value}>{bio}</Text>
      )}

      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  avatarContainer: { alignItems: 'center', marginBottom: 20, marginTop: 20 },
  avatar: { fontSize: 80 },
  label: { fontSize: 14, color: '#999', marginBottom: 5, marginTop: 15 },
  value: { fontSize: 16, color: '#333', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, fontSize: 16, marginBottom: 5 },
  bioInput: { height: 80, textAlignVertical: 'top' },
  button: { backgroundColor: '#6200ee', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
