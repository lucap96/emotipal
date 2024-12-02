from pydantic               import BaseModel

class Patient(BaseModel):
    firstName: str
    lastName: str
    avatar: int
    email: str
    age: int
    gender: str
    role: str
    status: int

class PatientResponse(BaseModel):
   patients: list[Patient]
   count: int