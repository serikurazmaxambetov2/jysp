import logging

from .base import MessageHandler

logger = logging.getLogger(__name__)


class MediaGroupHandler(MessageHandler):
    async def handle(self, msg, send_data):
        if msg.media_group_id:
            # Отправляем медиа группу в бота чтобы он имел доступ к file_id
            logger.info("Копируем медиа группу в бота")
            await msg._client.copy_media_group("olxuzsearchbot", msg.chat.id, msg.id)

            logger.info("Обрабатываем медиа группу")
            media_group = await msg.get_media_group()

            send_data["media_group"] = repr(media_group)
            send_data["media_group_type"] = media_group[0].media.value

            texts = [message.caption for message in media_group if message.caption]
            if len(texts) != 1:
                logger.info("Не имеет текста")
                send_data["original_text"] = None
            else:
                logger.info("Положили текст")
                send_data["original_text"] = texts[0]
            return send_data

        return await super().handle(msg, send_data)
