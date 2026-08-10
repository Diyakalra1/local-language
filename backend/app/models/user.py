from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
# user base has name, email, preferred_langauge
class UserBase(BaseModel):
    email: EmailStr
    name: str
    preferred_language: str = "hindi"
# user craete has name, email, preferred langauge + password -> sent during register
class UserCreate(UserBase):
    password: str
# Login only needs credetials email and password
class UserLogin(BaseModel):
    email: EmailStr
    password: str
# User class contains name, email, preferred langauge, + id, created_at, is_active
# Represents a safe public user object sent to frontend after login or registration
class User(UserBase):
    id: str
    created_at: datetime
    is_active: bool = True
# user in db contains everything from user and a hashed password
class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User
