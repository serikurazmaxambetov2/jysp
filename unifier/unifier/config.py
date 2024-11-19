import os

RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://localhost:5672")
UNIFIER_QUEUE = os.getenv("UNIFIER_QUEUE", "UNIFIER")
PUBLISHER_QUEUE = os.getenv("PUBLISHER_QUEUE", "PUBLISHER")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
