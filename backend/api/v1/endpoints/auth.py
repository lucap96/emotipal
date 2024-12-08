import jwt
import logging 

from fastapi.responses      import JSONResponse
from core.config            import get_settings
from datetime               import datetime, timedelta
from core.supabase          import get_supabase_client
from core.constants         import AUTH_ERROR_MESSAGES
from models.auth            import UserLogin, UserRegister
from fastapi                import APIRouter, HTTPException, Security
from utils.utils            import convert_keys_to_snake_case, convert_keys_to_camel_case
from fastapi.security       import HTTPBearer, HTTPAuthorizationCredentials
from auth.auth              import create_access_token

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

router = APIRouter()
settings = get_settings()

@router.post("/login")
def login(user: UserLogin):
    result = get_supabase_client().auth.sign_in_with_password({"email": user.email, "password": user.password})

    if not result.user:
        raise HTTPException(status_code=401, detail=AUTH_ERROR_MESSAGES["verifyEmailAndPassword"])

    if user.password != result.user.user_metadata["password"]:
        raise HTTPException(status_code=401, detail=AUTH_ERROR_MESSAGES["invalidPassword"])
    
    user_metadata = {
      "id": dict(result.user).get("id", ""),
      "email": result.user.user_metadata.get("email", ""),
      "firstName": result.user.user_metadata.get("first_name", ""),
      "lastName": result.user.user_metadata.get("last_name", ""),
      "role": dict(result.user).get("role", ""),
    }
    access_token = create_access_token(data={"sub": result.user.id}, expires_delta=timedelta(hours=10))
    return {"accessToken": access_token, "user": user_metadata}

@router.post("/register")
def register(new_user: dict):
  try:
    result = get_supabase_client().auth.sign_up({"email": new_user["email"], "password": new_user["password"], "options": {"data": convert_keys_to_snake_case(new_user)}})
    if not result.user:
      raise HTTPException(status_code=400, detail="Something went wrong!")

    user_metadata = {
      "id": dict(result.user).get("id", ""),
      "email": result.user.user_metadata.get("email", ""),
      "firstName": result.user.user_metadata.get("first_name", ""),
      "lastName": result.user.user_metadata.get("last_name", ""),
      "role": dict(result.user).get("role",""),
    }

    # profile_data = {
    #     "id": user.id,
    #     "firstname": user.first_name,
    #     "lastname": user.last_name,
    #     "email": user.email,
    # }
    # get_supabase_client().table("profiles").insert(profile_data).execute()

    access_token = create_access_token(data={"sub": result.user.id}, expires_delta=timedelta(hours=10))
    return {"accessToken": access_token, "user": user_metadata}
  except Exception as e:
    error_msg = str(e)
    logging.error(error_msg)
    if "User already registered" in error_msg:
        raise HTTPException(status_code=400, detail=AUTH_ERROR_MESSAGES["alreadyRegistered"])
    elif "Invalid email or password" in error_msg:
        raise HTTPException(status_code=400, detail=AUTH_ERROR_MESSAGES["verifyEmailAndPassword"])
    else:
        raise HTTPException(status_code=500, detail=AUTH_ERROR_MESSAGES["serverError"])