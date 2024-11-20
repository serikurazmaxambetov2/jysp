import logging

from pyrogram import filters, types

from .. import config

logger = logging.getLogger(__name__)


@filters.create
async def service_type_filter(_, __, msg: types.Message):
    if not msg.service:
        logger.info("Сообщение не имеет сервисов")
        return True

    is_allowed_service = msg.service in config.ALLOWED_SERVICE_TYPES
    logger.info(f"Поддерживаемый формат сервиса? : {is_allowed_service}")
    return is_allowed_service
