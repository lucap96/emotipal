from pydantic import BaseModel, EmailStr

# class UserSignIn(BaseModel):
#     email: str
#     password: str

# class UserSignUp(BaseModel):
#     email: str
#     password: str
#     first_name: str
#     last_name: str

# Models
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(UserLogin):
    email: EmailStr
    password: str
    firstName: str
    lastName: str
    company: str
    displayName: str = ""