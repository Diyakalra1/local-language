import axios from 'axios';
// axios is used to send http requests - post get delete 
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';


// Create axios instance with base url and json format
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
// Before sending requests add the bearer to the header (JWS authentication formation)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API


export const authAPI = {
  // take the userData and reqister the user 
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  // Login-> take credentials and login the user 
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
// take email to find the user
  searchUser: async (email) => {
    const response = await api.get(`/auth/search/${email}`);
    return response.data;
  },

  // find user by its id

  getUserById: async (userId) => {
    const response = await api.get(`/auth/user/${userId}`);
    return response.data;
  },
};

// Chat API
export const chatAPI = {
  // take the information of two participants to create a conversation room
  createConversation: async (participant1_id, participant2_id) => {
    const response = await api.post('/chat/conversations', {
      participant1_id,
      participant2_id,
    });
    return response.data;
  },
  // get a conversation
  getConversation: async (conversationId) => {
    const response = await api.get(`/chat/conversations/${conversationId}`);
    return response.data;
  },
  // send Messages
  sendMessage: async (messageData) => {
    const response = await api.post('/chat/messages', messageData);
    return response.data;
  },

  // get messages from the conversationID
  getMessages: async (conversationId) => {
    const response = await api.get(`/chat/messages/${conversationId}`);
    return response.data;
  },
};

// Translation API
export const translationAPI = {
  translate: async (text, targetLanguage, sourceLanguage = null) => {
    const response = await api.post('/chat/translate', {
      text,
      target_language: targetLanguage,
      source_language: sourceLanguage,
    });
    return response.data;
  },

  getSupportedLanguages: async () => {
    const response = await api.get('/chat/languages');
    return response.data;
  },
};

export default api;
