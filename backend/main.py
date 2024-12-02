import logging
import uvicorn

from fastapi                        import FastAPI
from starlette.middleware.cors      import CORSMiddleware
from core.config                    import get_settings
from api.v1.router                  import router
# from flask_cors                     import CORS
# from flask                          import Flask, request, make_response, jsonify
# from flask_jwt_extended             import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt, verify_jwt_in_request

settings = get_settings()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# app = Flask(settings.PROJECT_NAME)
# CORS(app, supports_credentials=True, resources={r"/*": { "origins": "*", "allow_headers": "*", "expose_headers": "*", "methods": ["GET","POST","PATCH","PUT","DELETE"]}})

# app.config['SECRET_KEY'] = 'ru3ieQ0fqu8LbhqODbkhoe0sq3YjybSm'
# app.config["JWT_SECRET"] = 'ikRgjkhi15HJiU78-OLKfjngiu'
# app.config["JWT_ACCESS_TOEKEN_EXPIRES"] = timedelta(hours=10)
# app.config['JWT_TOKEN_LOCATION'] = ['headers']
# app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=10)
# app.config["PROPAGATE_EXCEPTIONS}"] = True

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add API router
app.include_router(router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, reload=True)