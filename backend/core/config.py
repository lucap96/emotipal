
from functools          import lru_cache
from pydantic_settings  import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "EmotiPal"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Database
    SUPABASE_KEY: str
    SUPABASE_URL: str

    # JWT
    JWT_SECRET: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: str
    
    # # AI Services
    # OPENAI_API_KEY: str
    # GOOGLE_API_KEY: str
    # GOOGLE_CSE_ID: str

    # TAVILY_API_KEY: str
    
    # # Generation Settings
    # MIN_CONFIDENCE_SCORE: float
    # ACCEPTABLE_SIMILARITY: float

    class Config:
        env_file = ".env"

@lru_cache
def get_settings() -> Settings:
    return Settings()

