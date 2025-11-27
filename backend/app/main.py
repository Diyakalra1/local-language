from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio
from .api import auth, chat
from .core.config import settings

# Create FastAPI app
app = FastAPI(
    title="Local Language Integrator API",
    version="2.0.0",
    description="Real-time translation with sentiment analysis"
)

# Create Socket.IO server with proper CORS
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    logger=True,
    engineio_logger=True
)

# Wrap with Socket.IO
socket_app = socketio.ASGIApp(sio, app)

# CORS middleware - Use settings
allowed_origins = settings.ALLOWED_ORIGINS.split(',')
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(chat.router)

# Track online users
online_users = {}

@app.get("/")
async def root():
    return {
        "message": "Local Language Integrator API",
        "version": "2.0.0",
        "status": "running",
        "features": [
            "Real-time translation",
            "Sentiment analysis",
            "Voice input/output",
            "Read receipts",
            "Typing indicators",
            "Online status"
        ]
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "online_users": len(online_users)}

# Socket.IO events with error handling
@sio.event
async def connect(sid, environ):
    print(f"✅ Client connected: {sid}")
    await sio.emit('connection_response', {'status': 'connected', 'sid': sid}, room=sid)

@sio.event
async def disconnect(sid):
    print(f"❌ Client disconnected: {sid}")
    if sid in online_users:
        user_id = online_users[sid]
        del online_users[sid]
        await sio.emit('user_offline', {'user_id': user_id})

@sio.event
async def user_online(sid, data):
    """Track user online status"""
    try:
        user_id = data.get('user_id')
        if not user_id:
            return
        online_users[sid] = user_id
        print(f"👤 User {user_id} is online (sid: {sid})")
        await sio.emit('user_online', {'user_id': user_id})
    except Exception as e:
        print(f"Error in user_online: {e}")

@sio.event
async def join_conversation(sid, data):
    """User joins a conversation room"""
    try:
        conversation_id = data.get('conversation_id')
        user_id = data.get('user_id')
        
        if not conversation_id or not user_id:
            return
        
        await sio.enter_room(sid, conversation_id)
        print(f"👤 User {user_id} joined conversation {conversation_id}")
        
        await sio.emit('joined_conversation', {
            'conversation_id': conversation_id,
            'user_id': user_id
        }, room=conversation_id)
    except Exception as e:
        print(f"Error in join_conversation: {e}")

@sio.event
async def leave_conversation(sid, data):
    """User leaves a conversation room"""
    try:
        conversation_id = data.get('conversation_id')
        user_id = data.get('user_id')
        
        if not conversation_id:
            return
        
        await sio.leave_room(sid, conversation_id)
        print(f"👤 User {user_id} left conversation {conversation_id}")
    except Exception as e:
        print(f"Error in leave_conversation: {e}")

@sio.event
async def send_message(sid, data):
    """Handle real-time message"""
    try:
        conversation_id = data.get('conversation_id')
        if not conversation_id:
            return
        print(f"📨 Message sent to conversation {conversation_id}")
        await sio.emit('new_message', data, room=conversation_id)
    except Exception as e:
        print(f"Error in send_message: {e}")

@sio.event
async def typing(sid, data):
    """Handle typing indicator"""
    try:
        conversation_id = data.get('conversation_id')
        user_id = data.get('user_id')
        is_typing = data.get('is_typing', True)
        
        if not conversation_id or not user_id:
            return
        
        await sio.emit('user_typing', {
            'conversation_id': conversation_id,
            'user_id': user_id,
            'is_typing': is_typing
        }, room=conversation_id, skip_sid=sid)
        
        print(f"⌨️ User {user_id} typing: {is_typing}")
    except Exception as e:
        print(f"Error in typing: {e}")

@sio.event
async def message_read(sid, data):
    """Handle read receipt"""
    try:
        conversation_id = data.get('conversation_id')
        message_id = data.get('message_id')
        user_id = data.get('user_id')
        
        if not all([conversation_id, message_id, user_id]):
            return
        
        await sio.emit('message_read', {
            'message_id': message_id,
            'user_id': user_id
        }, room=conversation_id)
        
        print(f"✓✓ Message {message_id} read by {user_id}")
    except Exception as e:
        print(f"Error in message_read: {e}")

@sio.event
async def voice_call_request(sid, data):
    """Handle voice call request"""
    try:
        conversation_id = data.get('conversation_id')
        caller_id = data.get('caller_id')
        
        if not conversation_id or not caller_id:
            return
        
        await sio.emit('incoming_call', {
            'conversation_id': conversation_id,
            'caller_id': caller_id
        }, room=conversation_id, skip_sid=sid)
        
        print(f"📞 Call request from {caller_id}")
    except Exception as e:
        print(f"Error in voice_call_request: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(socket_app, host="0.0.0.0", port=8000, reload=True)