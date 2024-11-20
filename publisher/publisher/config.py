from os import getenv

BOT_TOKEN = getenv("BOT_TOKEN", "")
BACKEND_URL = getenv("BACKEND_URL", "http://localhost:3000")
RABBITMQ_URL = getenv("RABBITMQ_URL", "amqp://guest:guest@localhost:5672")
PUBLISHER_QUEUE = getenv("PUBLISHER_QUEUE", "PUBLISHER")
