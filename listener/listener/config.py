import os

from pyrogram.enums import MessageMediaType

USER_ID = int(os.getenv("USER_ID", "0"))
SESSION_STRING = os.getenv("SESSION_STRING", "")

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000/")

RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://guest:guest@localhost")
PUBLISHER_QUEUE = os.getenv("PUBLISHER_QUEUE", "PUBLISHER")
UNIFIER_QUEUE = os.getenv("UNIFIER_QUEUE", "UNIFIER")

ALLOWED_MEDIA_TYPES = [
    MessageMediaType.AUDIO,
    MessageMediaType.PHOTO,
    MessageMediaType.VIDEO,
    MessageMediaType.DOCUMENT,
    MessageMediaType.VIDEO_NOTE,
    MessageMediaType.VOICE,
]
