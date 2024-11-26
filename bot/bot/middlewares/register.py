import logging
from typing import Any, Awaitable, Callable, Dict

import aiohttp
from aiogram import BaseMiddleware
from aiogram.types import Message
from aiogram_dialog import DialogManager

from ..services import api_service

logger = logging.getLogger(__name__)


class RegisterMiddleware(BaseMiddleware):
    async def __call__(  # type: ignore
        self,
        handler: Callable[[Message, Dict[str, Any]], Awaitable[Any]],
        event: Message,
        data: Dict[str, Any],
    ):
        logger.info("Получение пользователя")
        # Получаем пользователя
        telegram_user = event.from_user
        if telegram_user:
            # Получаем пользователя с бд по его id
            user_id = telegram_user.id
            try:
                user = await api_service.get_user(user_id)
            except aiohttp.ClientResponseError as e:
                logger.info(f"Ошибка: {e.status}")
                logger.info("Создание пользователя")
                # Иначе создаем
                dto = dict(
                    id=user_id,
                    fullName=telegram_user.full_name,
                    username=telegram_user.username,
                )
                user = await api_service.create_user(dto)

            logger.info("Передаем пользователя")
            logger.info(f"user={user}")
            # Передаем пользователя
            dialog_manager: DialogManager = data.get("dialog_manager")  # type: ignore
            dialog_manager.middleware_data["user"] = user

        return await handler(event, data)
