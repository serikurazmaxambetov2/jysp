import logging

from .base import MessageHandler

logger = logging.getLogger(__name__)


class MediaHandler(MessageHandler):
    async def handle(self, msg, send_data):
        if msg.media:
            logger.info("Обрабатываем медиа сообщение")
            send_data["original_text"] = msg.caption
            send_data["media_type"] = msg.media.value
            return send_data
        return super().handle(msg, send_data)
