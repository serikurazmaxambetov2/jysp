from os import getenv

BOT_TOKEN = getenv("BOT_TOKEN", "")
BACKEND_URL = getenv("BACKEND_URL", "http://localhost:3000")

REDIS_HOST = getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(getenv("REDIS_PORT", "6379"))
