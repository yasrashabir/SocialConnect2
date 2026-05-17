import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { mockUsers } from '../Firebase/config';

export default function ProfileScreen({ currentUser }) {
  console.log('PROFILE SCREEN LOADED - NEW VERSION');
  const [name, setName] = useState(currentUser || 'Your Name');
  const [bio, setBio] = useState('Your bio here...');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [followedUsers, setFollowedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

  const otherUsers = mockUsers.filter(u => u.name !== name);

  const handleFollow = (userName) => {
    if (followedUsers.includes(userName)) {
      setFollowedUsers(followedUsers.filter(u => u !== userName));
    } else {
      setFollowedUsers([...followedUsers, userName]);
    }
  };

  const handleSave = () => {
    setError('');
    setSuccess('');
    if (name === '') {
      setError('Name cannot be empty!');
      return;
    }
    setIsEditing(false);
    setSuccess('Profile updated!');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <View style={styles.container}>
      
        <View style={styles.tabs}>
        
        <TouchableOpacity style={[styles.tab, activeTab === 'profile' && styles.activeTab]} onPress={() => setActiveTab('profile')}>
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>My Profile</Text>
        </TouchableOpacity>
<TouchableOpacity style={[styles.tab, activeTab === 'users' && styles.activeTab]} onPress={() => setActiveTab('users')}>
          <Text style={[styles.tabText, activeTab === 'users' && styles.activeTabText]}>Find Users</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'profile' ? (
        <View>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{name[0]}</Text>
            </View>
            <Text style={styles.followCount}>{followedUsers.length} Following</Text>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}

          <Text style={styles.label}>Name</Text>
          {isEditing ? (
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          ) : (
            <Text style={styles.value}>{name}</Text>
          )}

          <Text style={styles.label}>Bio</Text>
          {isEditing ? (
            <TextInput style={[styles.input, styles.bioInput]} value={bio} onChangeText={setBio} multiline />
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
      ) : (
        <View>
          <Text style={styles.sectionTitle}>People You May Know</Text>
          {otherUsers.map((user, i) => (
            <View key={i} style={styles.userCard}>
              <View style={styles.userAvatar}>
                <Text style={styles.avatarText}>{user.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userBio}>{user.bio}</Text>
              </View>
              <TouchableOpacity
                style={[styles.followBtn, followedUsers.includes(user.name) && styles.unfollowBtn]}
                onPress={() => handleFollow(user.name)}
              >
                <Text style={styles.followBtnText}>
                  {followedUsers.includes(user.name) ? 'Unfollow' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
tabs: { flexDirection: 'row', marginBottom: 20, borderRadius: 10, borderWidth: 1, borderColor: '#6200ee', minHeight: 50 },
tabs: { flexDirection: 'row', marginBottom: 20, marginTop: 50, borderRadius: 10, borderWidth: 1, borderColor: '#6200ee', minHeight: 50, width: '100%', zIndex: 10, position: 'relative' },
  activeTab: { backgroundColor: '#6200ee' },
  tabText: { color: '#6200ee', fontWeight: 'bold' },
  activeTabText: { color: '#fff' },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#6200ee', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 32 },
  followCount: { color: '#6200ee', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  success: { color: 'green', textAlign: 'center', marginBottom: 10 },
  label: { fontSize: 14, color: '#999', marginBottom: 5, marginTop: 15 },
  value: { fontSize: 16, color: '#333', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, fontSize: 16, marginBottom: 5 },
  bioInput: { height: 80, textAlignVertical: 'top' },
  button: { backgroundColor: '#6200ee', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 12, borderRadius: 10, marginBottom: 10 },
  userAvatar: { width: 45, height: 45, borderRadius: 22, backgroundColor: '#6200ee', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  userName: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  userBio: { fontSize: 12, color: '#999' },
  followBtn: { backgroundColor: '#6200ee', padding: 8, borderRadius: 8, minWidth: 80, alignItems: 'center' },
  unfollowBtn: { backgroundColor: '#ddd' },
  followBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});