import logging
from typing import Any, Awaitable, Callable, Dict

import aiohttp
from aiogram import BaseMiddleware
from aiogram.types import Message

from ..services import api_service

# Создаем логгер для этого модуля
logger = logging.getLogger(__name__)


class RegisterMiddleware(BaseMiddleware):
    async def __call__(  # type: ignore
        self,
        handler: Callable[[Message, Dict[str, Any]], Awaitable[Any]],
        event: Message,
        data: Dict[str, Any],
    ):
        # Логируем начало получения пользователя
        logger.info("Начинаем обработку пользователя")

        # Получаем информацию о пользователе из события
        telegram_user = event.from_user
        if telegram_user:
            user_id = telegram_user.id
            try:
                # Пытаемся получить данные пользователя из базы данных
                user = await api_service.get_user(user_id)
            except aiohttp.ClientResponseError as e:
                # Логируем ошибку при получении пользователя
                logger.warning(f"Ошибка при получении пользователя, статус: {e.status}")

                # Если пользователь не найден, создаем нового
                logger.info("Пользователь не найден, создаем нового")
                dto = {
                    "id": user_id,
                    "fullName": telegram_user.full_name,
                    "username": telegram_user.username,
                }
                await api_service.create_user(dto)

        # Передаем управление обработчику
        return await handler(event, data)
