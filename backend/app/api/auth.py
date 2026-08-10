from fastapi import APIRouter, HTTPException   #for creating end points and showing errors
from ..models.user import UserCreate, UserLogin, Token  #pydantic models that influence the shape of request and response
from ..services.auth_service import auth_service # business logic - services for the authorization
from ..services.firebase_service import firebase_service # services that help talking to firebase

router = APIRouter(prefix="/auth", tags=["Authentication"]) # every route in this file starts from auth

@router.post("/register", response_model=Token) # this fucntion shall handle the post request to auth/register
async def register(user_data: UserCreate):
    """Register a new user"""
    result = await auth_service.register_user(user_data)
    
    if not result:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    return result

@router.post("/login", response_model=Token)
async def login(login_data: UserLogin):
    """Login user"""
    result = await auth_service.login_user(login_data)
    
    if not result:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return result

@router.get("/test")
async def test_auth():
    """Test authentication endpoint"""
    return {"message": "Auth API is working!"}

@router.get("/search/{email}")
async def search_user(email: str):
    """Search for a user by email"""
    user = await firebase_service.get_user_by_email(email)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user.get('id'),
        "name": user.get('name'),
        "email": user.get('email'),
        "preferred_language": user.get('preferred_language')
    }

@router.get("/user/{user_id}")
async def get_user(user_id: str):
    """Get user by ID"""
    user = await firebase_service.get_user_by_id(user_id)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user.get('id'),
        "name": user.get('name'),
        "email": user.get('email'),
        "preferred_language": user.get('preferred_language')
    }
