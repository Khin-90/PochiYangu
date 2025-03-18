from pathlib import Path
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=False, cast=bool)

# Allowed hosts
ALLOWED_HOSTS = config("ALLOWED_HOSTS", cast=lambda v: [s.strip() for s in v.split(",")])

# Database settings (PostgreSQL example)
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("DATABASE_NAME"),
        "USER": config("DATABASE_USER"),
        "PASSWORD": config("DATABASE_PASSWORD"),
        "HOST": config("DATABASE_HOST"),
        "PORT": config("DATABASE_PORT"),
    }
}

# Email settings
EMAIL_HOST = config("EMAIL_HOST")
EMAIL_PORT = config("EMAIL_PORT", cast=int)
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = config("EMAIL_USE_TLS", default=True, cast=bool)

# CORS settings
CORS_ALLOWED_ORIGINS = config("CORS_ALLOWED_ORIGINS", cast=lambda v: [s.strip() for s in v.split(",")])

# Sui blockchain settings (for future integration)
SUI_NETWORK_URL = config("SUI_NETWORK_URL")
SUI_WALLET_ADDRESS = config("SUI_WALLET_ADDRESS")
SUI_PRIVATE_KEY = config("SUI_PRIVATE_KEY")