

import { io } from 'socket.io-client';


//socketService.js creates a single persistent Socket.IO connection between the React frontend and the FastAPI socket server, provides methods to emit real-time chat events (messages, typing, read receipts, online status, calls), and exposes listener functions to receive live updates from the server without refreshing the page.
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000';  // socket server running on backend

// ... rest of your code remains the same

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    if (this.socket?.connected) {
      console.log('Already connected to socket server');
      return this.socket;
    }

    console.log('Connecting to socket server:', SOCKET_URL);
    
    this.socket = io(SOCKET_URL, {   // opens a persistant connection between the browser (frontend) to the backend server that styas alive and listen to events all the time
      transports: ['websocket', 'polling'], // websocket is the real time protocol, for fallback use polling
      reconnection: true, // if connection breaks socket.io tries to re connect
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,  // Wait 1000 ms (1 second) between attempts.
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to server, socket ID:', this.socket.id);   // Every connected client gets a unique socket ID
      this.isConnected = true;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Disconnected from server, reason:', reason);
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    this.socket.on('connection_response', (data) => {  //custom event sent by your backend
      console.log('Connection response:', data);
    });

    return this.socket;
  }

  disconnect() { // This properly cleans up the connection.
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('Disconnected from socket server');
    }
  }


  // Chat Specific functions
  userOnline(userId) {
    if (this.socket && this.isConnected) {
      console.log('Sending user_online:', userId);    
      this.socket.emit('user_online', { user_id: userId });        // sending the user_online event along with userid as data too the backend server
    }
  }

  joinConversation(conversationId, userId) {
    if (this.socket && this.isConnected) {
      console.log('Joining conversation:', conversationId);
      this.socket.emit('join_conversation', {              // sending join conversation event for the userID
        conversation_id: conversationId,
        user_id: userId,
      });
    }
  }

  leaveConversation(conversationId, userId) {
    if (this.socket && this.isConnected) {
      console.log('Leaving conversation:', conversationId); // sending leave conversation event
      this.socket.emit('leave_conversation', {
        conversation_id: conversationId,
        user_id: userId,
      });
    }
  }
// socket emits event send message along with the message Data
  sendMessage(messageData) {
    if (this.socket && this.isConnected) {
      console.log('Sending message via socket:', messageData);
      this.socket.emit('send_message', messageData);
    }
  }

// User starts typing
//       ↓
// emit('typing', { is_typing: true })
//       ↓
// Server forwards to other participant
//       ↓
// "Diya is typing..." appears
  sendTyping(conversationId, userId, isTyping) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing', {
        conversation_id: conversationId,
        user_id: userId,
        is_typing: isTyping,
      });
    }
  }

  markMessageRead(conversationId, messageId, userId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('message_read', {
        conversation_id: conversationId,
        message_id: messageId,
        user_id: userId,
      });
    }
  }

  requestVoiceCall(conversationId, callerId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('voice_call_request', {
        conversation_id: conversationId,
        caller_id: callerId,
      });
    }
  }

  // Event listeners
  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('new_message', callback);
    }
  }

  onJoinedConversation(callback) {
    if (this.socket) {
      this.socket.on('joined_conversation', callback);
    }
  }

  onUserTyping(callback) {
    if (this.socket) {
      this.socket.on('user_typing', callback);
    }
  }

  onMessageRead(callback) {
    if (this.socket) {
      this.socket.on('message_read', callback);
    }
  }

  onUserOnline(callback) {
    if (this.socket) {
      this.socket.on('user_online', callback);
    }
  }

  onUserOffline(callback) {
    if (this.socket) {
      this.socket.on('user_offline', callback);
    }
  }

  onIncomingCall(callback) {
    if (this.socket) {
      this.socket.on('incoming_call', callback);
    }
  }

  // Remove specific event listeners
  offNewMessage() {
    if (this.socket) {
      this.socket.off('new_message');
    }
  }

  offAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }
}

export default new SocketService();
