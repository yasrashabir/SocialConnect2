import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { mockPosts } from '../Firebase/config';

export default function HomeScreen() {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState('');
  const [commentText, setCommentText] = useState('');
  const [activeComment, setActiveComment] = useState(null);
  const [error, setError] = useState('');

  const handleAddPost = () => {
    if (newPost === '') {
      setError('Please write something!');
      return;
    }
    setError('');
    const post = {
      id: Date.now().toString(),
      username: 'You',
      content: newPost,
      likes: 0,
      likedByMe: false,
      comments: [],
      timestamp: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (id) => {
    setPosts(posts.map(p =>
      p.id === id
        ? { ...p, likes: p.likedByMe ? p.likes - 1 : p.likes + 1, likedByMe: !p.likedByMe }
        : p
    ));
  };

  const handleAddComment = (id) => {
    if (commentText === '') return;
    setPosts(posts.map(p =>
      p.id === id
        ? { ...p, comments: [...p.comments, { text: commentText, user: 'You' }] }
        : p
    ));
    setCommentText('');
    setActiveComment(null);
  };

  const renderPost = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.likeBtn} onPress={() => handleLike(item.id)}>
          <Text style={[styles.likeText, item.likedByMe && styles.liked]}>
            ❤️ {item.likes} Likes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentBtn} onPress={() => setActiveComment(activeComment === item.id ? null : item.id)}>
          <Text style={styles.commentBtnText}>💬 {item.comments.length} Comments</Text>
        </TouchableOpacity>
      </View>

      {item.comments.map((c, i) => (
        <View key={i} style={styles.comment}>
          <Text style={styles.commentUser}>{c.user}: </Text>
          <Text>{c.text}</Text>
        </View>
      ))}

      {activeComment === item.id && (
        <View style={styles.commentInput}>
          <TextInput
            style={styles.commentBox}
            placeholder="Write a comment..."
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity onPress={() => handleAddComment(item.id)} style={styles.commentSubmit}>
            <Text style={styles.commentSubmitText}>Post</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Connect 🌐</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={newPost}
        onChangeText={setNewPost}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#6200ee', marginBottom: 15, textAlign: 'center' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: '#fff' },
  button: { backgroundColor: '#6200ee', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  post: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  username: { fontWeight: 'bold', fontSize: 16, color: '#6200ee' },
  content: { fontSize: 15, marginVertical: 8 },
  timestamp: { fontSize: 11, color: '#999', marginBottom: 8 },
  actions: { flexDirection: 'row', gap: 15 },
  likeBtn: { padding: 5 },
  likeText: { fontSize: 14, color: '#555' },
  liked: { color: 'red' },
  commentBtn: { padding: 5 },
  commentBtnText: { fontSize: 14, color: '#555' },
  comment: { flexDirection: 'row', marginTop: 5, paddingLeft: 10 },
  commentUser: { fontWeight: 'bold', color: '#6200ee' },
  commentInput: { flexDirection: 'row', marginTop: 8, gap: 8 },
  commentBox: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, backgroundColor: '#f9f9f9' },
  commentSubmit: { backgroundColor: '#6200ee', padding: 8, borderRadius: 8, justifyContent: 'center' },
  commentSubmitText: { color: '#fff', fontWeight: 'bold' },
});