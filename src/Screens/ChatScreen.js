import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { mockUsers } from '../Firebase/config';

export default function ChatScreen({ currentUser }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [messageText, setMessageText] = useState('');

  const otherUsers = mockUsers.filter(u => u.name !== currentUser);

  const handleSendMessage = () => {
    if (messageText === '' || !selectedUser) return;
    const chatKey = selectedUser;
    const newMsg = {
      id: Date.now().toString(),
      text: messageText,
      sender: currentUser,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => ({
      ...prev,
      [chatKey]: [...(prev[chatKey] || []), newMsg],
    }));
    setMessageText('');
  };

  if (selectedUser) {
    const chatMessages = messages[selectedUser] || [];
    return (
      <View style={styles.container}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedUser(null)} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.chatHeaderName}>{selectedUser}</Text>
        </View>

        <FlatList
          data={chatMessages}
          keyExtractor={item => item.id}
          style={styles.messagesList}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.sender === currentUser ? styles.myMessage : styles.theirMessage]}>
              <Text style={item.sender === currentUser ? styles.myMessageText : styles.theirMessageText}>{item.text}</Text>
              <Text style={styles.messageTime}>{item.time}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noMessages}>No messages yet. Say hi! 👋</Text>}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
            <Text style={styles.sendBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={otherUsers}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => {
          const chatMessages = messages[item.name] || [];
          const lastMsg = chatMessages[chatMessages.length - 1];
          return (
            <TouchableOpacity style={styles.userRow} onPress={() => setSelectedUser(item.name)}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {lastMsg ? lastMsg.text : 'Tap to start chatting'}
                </Text>
              </View>
              {lastMsg && <Text style={styles.msgTime}>{lastMsg.time}</Text>}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#6200ee', marginBottom: 20, marginTop: 10 },
  userRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#6200ee', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  userName: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  lastMessage: { color: '#999', fontSize: 13, marginTop: 2 },
  msgTime: { color: '#999', fontSize: 11 },
  chatHeader: { flexDirection: 'row', alignItems: 'center', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginBottom: 10 },
  backBtn: { marginRight: 15 },
  backBtnText: { color: '#6200ee', fontWeight: 'bold', fontSize: 16 },
  chatHeaderName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  messagesList: { flex: 1 },
  noMessages: { textAlign: 'center', color: '#999', marginTop: 50 },
  messageBubble: { maxWidth: '75%', padding: 10, borderRadius: 12, marginBottom: 8 },
  myMessage: { backgroundColor: '#6200ee', alignSelf: 'flex-end' },
  theirMessage: { backgroundColor: '#f0f0f0', alignSelf: 'flex-start' },
  myMessageText: { color: '#fff' },
  theirMessageText: { color: '#333' },
  messageTime: { fontSize: 10, color: '#ccc', marginTop: 4 },
  inputRow: { flexDirection: 'row', gap: 8, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  messageInput: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 20, backgroundColor: '#f9f9f9' },
  sendBtn: { backgroundColor: '#6200ee', paddingHorizontal: 20, justifyContent: 'center', borderRadius: 20 },
  sendBtnText: { color: '#fff', fontWeight: 'bold' },
});