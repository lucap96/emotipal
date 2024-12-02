import jwt
import logging

from datetime               import timedelta, datetime
from jose                   import jwt as jose_auth, JWTError
from fastapi                import HTTPException, Security
from fastapi.security       import HTTPBearer, HTTPAuthorizationCredentials
from core.config            import get_settings

settings = get_settings()

# Define HTTPBearer for token extraction
auth_scheme = HTTPBearer()

def verify_jwt_token(auth: HTTPAuthorizationCredentials = Security(auth_scheme)):
    token = auth.credentials
    try:
        payload = jose_auth.decode(token, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.ALGORITHM)