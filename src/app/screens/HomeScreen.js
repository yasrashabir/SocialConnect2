import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { mockPosts } from '../../Firebase/config';

export default function HomeScreen() {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState('');

  const handleAddPost = () => {
    if (newPost === '') {
      Alert.alert('Error', 'Please write something!');
      return;
    }
    const post = {
      id: Date.now().toString(),
      username: 'You',
      content: newPost,
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (id) => {
    setPosts(posts.map(p =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  const renderPost = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
      <TouchableOpacity style={styles.likeBtn} onPress={() => handleLike(item.id)}>
        <Text style={styles.likeText}>❤️ {item.likes} Likes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Connect 🌐</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          value={newPost}
          onChangeText={setNewPost}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleAddPost}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#6200ee', marginBottom: 15, textAlign: 'center' },
  inputContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 10, fontSize: 15 },
  button: { backgroundColor: '#6200ee', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  post: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  username: { fontWeight: 'bold', fontSize: 16, color: '#6200ee', marginBottom: 5 },
  content: { fontSize: 15, color: '#333', marginBottom: 8 },
  timestamp: { fontSize: 12, color: '#999', marginBottom: 8 },
  likeBtn: { flexDirection: 'row', alignItems: 'center' },
  likeText: { fontSize: 14, color: '#e91e63' },
});
