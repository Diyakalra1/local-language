# Local Language Integrator

A real-time multilingual messaging platform that enables users to communicate in their preferred language with user having a different preferred language in real time. It supports 14+ Indian langauges

---

## Architecture

```
                                          LOCAL LANGUAGE INTEGRATOR

┌──────────────┐
│    User A    │
│  (Hindi)     │
└──────┬───────┘
       │
       │ Types Message
       ▼  Records a message
┌─────────────────────────────┐
│        React Frontend       │
│      Chat Interface         │
└───────────┬─────────────────┘
            │
            │ 
            ▼
┌─────────────────────────────┐
│      FastAPI Backend        │
│ • Process Message           │
│ • Translate Message         │
│        │
│ • Store Conversation        │
└───────────┬─────────────────┘
            │
            ├──────────────► Firestore
            │                (Stores chats & users)
            │
            ▼
      Socket.IO Event
            │
            ▼
┌─────────────────────────────┐
│ Recipient Conversation Room │
└───────────┬─────────────────┘
            │
            ▼
┌──────────────┐
│    User B    │
│ (Tamil)      │
│ Receives     │
│ Translated   │
│ Message      │
└──────────────┘```

---
```
## Technology Stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend UI |
| FastAPI | Backend API |
| Socket.IO | Real-time messaging |
| Firebase Firestore | User and chat storage |
| Zustand | Frontend state management |
| googletrans 4.0.2  | Message translation |
| Vercel | Frontend deployment |
| Render | Backend deployment |

---

## Features

- Real-time messaging using Socket.IO
- Text to audio and audio to text capabilities
- Automatic translation before message delivery
- Supports 14+ Indian languages
- Persistent chat history using Firestore
- Responsive web interface
- User registration and login
- Cloud deployment
---
## Challenges Faced

| Challenge | Solution |
|------------|----------|
| **Real-time message delivery** | Messages were initially received only after a page refresh. This was resolved by ensuring users establish a Socket.IO connection and join the appropriate conversation room before sending or receiving messages. |
| **Responsive user interface** | Replaced fixed-width layouts with responsive Tailwind CSS utilities to ensure a consistent experience across different screen sizes and deployments. |


## Technical Specifications
### Frontend

- React.js
- Zustand state management
- Socket.IO Client
- Responsive interface

### Backend
- FastAPI
- REST APIs
- Socket.IO server
- Translation pipeline
- Sentiment analysis pipeline

### Database
- Firebase Firestore
- Persistent user data
- Persistent conversations

---

## Performance
- Real-time communication through WebSockets
- Automatic translation before delivery
- Asynchronous backend request handling
---

## Live Demo

https://local-language-ashen.vercel.app/login

---

## Video Demo


(https://youtu.be/6Dcz8KUVrGQ)
---
## Demo Accounts
Divyam@gmail.com
Divyam@123
Divya@gmail.com
Divya@22
---
## Future Work

- Group chats
- Media sharing
- Push notifications
- End-to-end encryption

### environment in local pc - llli
