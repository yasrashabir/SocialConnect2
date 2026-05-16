import { useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { mockPosts } from '../Firebase/config';

export default function HomeScreen({ currentUser }) {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState('');
  const [commentText, setCommentText] = useState('');
  const [activeComment, setActiveComment] = useState(null);
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const scaleAnims = useRef({});

  const getAnim = (id) => {
    if (!scaleAnims.current[id]) {
      scaleAnims.current[id] = new Animated.Value(1);
    }
    return scaleAnims.current[id];
  };

  const animateLike = (id) => {
    const anim = getAnim(id);
    Animated.sequence([
      Animated.spring(anim, { toValue: 1.4, useNativeDriver: true }),
      Animated.spring(anim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const addNotification = (msg) => {
    const notif = { id: Date.now().toString(), msg, time: new Date().toLocaleTimeString() };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleAddPost = () => {
    if (newPost === '') { setError('Please write something!'); return; }
    setError('');
    const post = {
      id: Date.now().toString(),
      username: currentUser || 'You',
      content: newPost,
      likes: 0,
      likedByMe: false,
      comments: [],
      timestamp: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (id, username) => {
    animateLike(id);
    setPosts(posts.map(p =>
      p.id === id
        ? { ...p, likes: p.likedByMe ? p.likes - 1 : p.likes + 1, likedByMe: !p.likedByMe }
        : p
    ));
    const post = posts.find(p => p.id === id);
    if (!post.likedByMe) addNotification(`You liked ${username}'s post! ❤️`);
  };

  const handleAddComment = (id, username) => {
    if (commentText === '') return;
    setPosts(posts.map(p =>
      p.id === id
        ? { ...p, comments: [...p.comments, { text: commentText, user: 'You' }] }
        : p
    ));
    addNotification(`You commented on ${username}'s post! 💬`);
    setCommentText('');
    setActiveComment(null);
  };

  const renderPost = ({ item }) => (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.username[0]}</Text>
        </View>
        <View>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
        </View>
      </View>
      <Text style={styles.content}>{item.content}</Text>

      <View style={styles.actions}>
        <Animated.View style={{ transform: [{ scale: getAnim(item.id) }] }}>
          <TouchableOpacity style={styles.likeBtn} onPress={() => handleLike(item.id, item.username)}>
            <Text style={[styles.likeText, item.likedByMe && styles.liked]}>
              ❤️ {item.likes} Likes
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
          <TouchableOpacity onPress={() => handleAddComment(item.id, item.username)} style={styles.commentSubmit}>
            <Text style={styles.commentSubmitText}>Post</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Social Connect 🌐</Text>
        <TouchableOpacity onPress={() => setShowNotifications(!showNotifications)} style={styles.notifBtn}>
          <Text style={styles.notifIcon}>🔔</Text>
          {notifications.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notifications.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {showNotifications && (
        <View style={styles.notifPanel}>
          <Text style={styles.notifTitle}>Notifications</Text>
          {notifications.length === 0 ? (
            <Text style={styles.noNotif}>No notifications yet</Text>
          ) : (
            notifications.map(n => (
              <View key={n.id} style={styles.notifItem}>
                <Text style={styles.notifMsg}>{n.msg}</Text>
                <Text style={styles.notifTime}>{n.time}</Text>
              </View>
            ))
          )}
          <TouchableOpacity onPress={() => { setNotifications([]); setShowNotifications(false); }}>
            <Text style={styles.clearNotif}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#6200ee' },
  notifBtn: { position: 'relative', padding: 5 },
  notifIcon: { fontSize: 24 },
  badge: { position: 'absolute', top: 0, right: 0, backgroundColor: 'red', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  notifPanel: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 15 },
  notifTitle: { fontSize: 18, fontWeight: 'bold', color: '#6200ee', marginBottom: 10 },
  noNotif: { color: '#999', textAlign: 'center' },
  notifItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  notifMsg: { fontSize: 14, color: '#333' },
  notifTime: { fontSize: 11, color: '#999' },
  clearNotif: { color: 'red', textAlign: 'center', marginTop: 10, fontWeight: 'bold' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: '#fff' },
  button: { backgroundColor: '#6200ee', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  post: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#6200ee', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  username: { fontWeight: 'bold', fontSize: 16, color: '#6200ee' },
  content: { fontSize: 15, marginVertical: 8, color: '#333' },
  timestamp: { fontSize: 11, color: '#999' },
  actions: { flexDirection: 'row', gap: 15, marginTop: 8 },
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