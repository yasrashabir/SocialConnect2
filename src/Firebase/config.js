export const mockUsers = [
  { name: 'Test User', email: 'test@test.com', password: '123456', bio: 'Hello I am Test User!', profilePicture: null },
  { name: 'Ali Hassan', email: 'ali@test.com', password: '123456', bio: 'React Native Developer', profilePicture: null },
  { name: 'Sara Khan', email: 'sara@test.com', password: '123456', bio: 'UI/UX Designer', profilePicture: null },
];

export const mockPosts = [
  {
    id: '1',
    username: 'Ali Hassan',
    content: 'Hello Social Connect! 👋 Excited to be here!',
    likes: 5,
    likedByMe: false,
    comments: [{ text: 'Welcome!', user: 'Sara Khan' }],
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'Sara Khan',
    content: 'This app is amazing! 🔥 Love the UI!',
    likes: 12,
    likedByMe: false,
    comments: [],
    timestamp: new Date().toISOString(),
  },
  {
    id: '3',
    username: 'Ali Hassan',
    content: 'React Native is the best! 💻 Building awesome apps!',
    likes: 8,
    likedByMe: false,
    comments: [],
    timestamp: new Date().toISOString(),
  },
];