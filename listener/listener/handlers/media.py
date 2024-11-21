import logging

from .base import MessageHandler

logger = logging.getLogger(__name__)


class MediaHandler(MessageHandler):
    async def handle(self, msg, send_data):
        if msg.media:
            # Отправляем в бота чтобы он имел доступ к file_id медиа.
            logger.info("Копируем медиа в бота")
            await msg.copy("olxuzsearchbot")

            logger.info("Обрабатываем медиа сообщение")
            send_data["original_text"] = msg.caption
            send_data["media_type"] = msg.media.value
            return send_data
        return await super().handle(msg, send_data)
