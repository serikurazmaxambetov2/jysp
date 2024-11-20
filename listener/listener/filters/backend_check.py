import logging

from pyrogram import filters, types

from ..services import api_service

logger = logging.getLogger(__name__)


@filters.create
async def backend_check_filter(_, __, msg: types.Message):
    logger.info("Получение связок")
    relations = await api_service.get_relations()

    for relation in relations:
        from_channel_id = relation.get("fromChannel", {}).get("id")

        logger.info(f"Проверка {from_channel_id} == {msg.chat.id}")
        if from_channel_id == msg.chat.id:
            return True

    logger.info("Проверка не пройдена")
    return False
