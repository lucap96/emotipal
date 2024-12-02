import logging

from fastapi.responses      import JSONResponse
from services.patients      import patients as patients_services
from fastapi                import APIRouter, HTTPException, status, Depends
from auth.auth              import verify_jwt_token

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "healthy"}

@router.get("/list")
async def get_patients(payload: dict = Depends(verify_jwt_token)) -> list:
    user_id = payload.get("sub")
    email = payload.get("email")
    print({"message": f"Hello, user {email} with ID {user_id}!"})
    patients = await patients_services.get_patients()
    if patients is None:
        raise HTTPException(status_code=500, detail="Failed to fetch patients")
    return JSONResponse(content=patients, status_code=status.HTTP_200_OK)

@router.post('/insert')
async def insert_patient(request: dict) -> dict:
    try:
        new_patient = await patients_services.insert_patient(request["patient"])
        return JSONResponse(content=new_patient, status_code=status.HTTP_200_OK)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=500, detail="Failed to insert patient")