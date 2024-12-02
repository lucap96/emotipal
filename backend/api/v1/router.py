from fastapi                        import APIRouter
from api.v1.endpoints.patients      import router as patients_router
from api.v1.endpoints.auth          import router as auth_router

router = APIRouter()

router.include_router(patients_router, prefix="/patient", tags=["patient"])
router.include_router(auth_router, prefix="/auth", tags=["auth"])

@router.get("/health")
async def health_check():
    return {"status": "healthy"}