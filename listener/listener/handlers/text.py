import logging

from listener.handlers.base import MessageHandler

logger = logging.getLogger(__name__)


class TextHandler(MessageHandler):
    async def handle(self, msg, send_data):
        if msg.text:
            logger.info("Обрабатываем текстовое сообщение")
            send_data["original_text"] = msg.text
            return send_data
        return await super().handle(msg, send_data)
