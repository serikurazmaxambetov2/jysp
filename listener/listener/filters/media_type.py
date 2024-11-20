import logging

from pyrogram import filters, types

from .. import config

logger = logging.getLogger(__name__)


@filters.create
async def media_type_filter(_, __, msg: types.Message):
    """Фильтруем так, чтобы тип медиафайла соответствовал доступным."""
    if not msg.media:
        logger.info("Сообщение не имеет медиа файлов")
        return True

    is_allowed_media = msg.media in config.ALLOWED_MEDIA_TYPES
    logger.info(f"Медиа файл поддерживаемый? : {is_allowed_media}")

    return is_allowed_media
