from pydantic_settings import BaseSettings
from functools import lru_cache
import os
import base64
import json

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Local Language Integrator"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = int(os.getenv("PORT", 8000))
    
    # Firebase - Multiple credential sources for flexibility
    FIREBASE_CREDENTIALS_PATH: str = "firebase-credentials-local-language.json"
    FIREBASE_CREDENTIALS_BASE64: str | None = None
    FIREBASE_CREDENTIALS_JSON: str | None = None
    
    # JWT
    JWT_SECRET: str = "your-super-secret-key-change-this"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS - Frontend URLs
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

    def get_firebase_credentials(self):
        """Get Firebase credentials from various sources (production-ready)"""
        # Priority 1: Base64 encoded credentials (Railway/Render recommended)
        if self.FIREBASE_CREDENTIALS_BASE64:
            try:
                decoded = base64.b64decode(self.FIREBASE_CREDENTIALS_BASE64)
                cred_dict = json.loads(decoded)
                print("✅ Using Base64 encoded Firebase credentials")
                return cred_dict
            except Exception as e:
                print(f"❌ Error decoding Base64 credentials: {e}")
        
        # Priority 2: JSON string credentials
        if self.FIREBASE_CREDENTIALS_JSON:
            try:
                cred_dict = json.loads(self.FIREBASE_CREDENTIALS_JSON)
                print("✅ Using JSON string Firebase credentials")
                return cred_dict
            except Exception as e:
                print(f"❌ Error parsing JSON credentials: {e}")
        
        # Priority 3: File path (local development)
        cred_path = os.path.join(os.path.dirname(__file__), '..', '..', self.FIREBASE_CREDENTIALS_PATH)
        if os.path.exists(cred_path):
            try:
                with open(cred_path, 'r') as f:
                    cred_dict = json.load(f)
                print(f"✅ Using Firebase credentials from file: {cred_path}")
                return cred_dict
            except Exception as e:
                print(f"❌ Error reading credentials file: {e}")
        
        # If we reach here, no credentials found
        raise ValueError(
            "❌ No Firebase credentials found! Please set one of:\n"
            "  - FIREBASE_CREDENTIALS_BASE64 (recommended for deployment)\n"
            "  - FIREBASE_CREDENTIALS_JSON\n"
            "  - firebase-credentials-local-language.json file"
        )

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()