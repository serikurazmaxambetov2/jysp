import os

USER_ID = int(os.getenv("USER_ID", "0"))
SESSION_STRING = os.getenv("SESSION_STRING", "")

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000/")

RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://guest:guest@localhost")
PUBLISHER_QUEUE = os.getenv("PUBLISHER_QUEUE", "PUBLISHER")
UNIFIER_QUEUE = os.getenv("UNIFIER_QUEUE", "UNIFIER")
