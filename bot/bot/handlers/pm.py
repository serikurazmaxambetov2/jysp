import logging

from aiogram import Bot, Router
from aiogram.enums import ChatType
from aiogram.filters import IS_ADMIN, ChatMemberUpdatedFilter
from aiogram.types import Chat, ChatMemberUpdated

from ..services import api_service
from ..utils.get_chat_owner import get_chat_owner

# Настраиваем логирование
logger = logging.getLogger(__name__)

# Инициализация роутера
pm_router = Router()


async def get_link(chat: Chat) -> str:
    """
    Получает ссылку на чат. Если у чата нет публичного username, создается инвайт-ссылка.
    """
    if chat.username:
        logger.info(f"Чат имеет username: {chat.username}")
        return f"https://t.me/{chat.username}"

    if chat.invite_link:
        logger.info("Используется существующая инвайт-ссылка.")
        return chat.invite_link

    # Создание новой инвайт-ссылки, если других вариантов нет
    try:
        chat_link = await chat.create_invite_link(
            name="Created by jysp_bot, do not delete!"
        )
        logger.info("Создана новая инвайт-ссылка.")
        return chat_link.invite_link
    except Exception as e:
        logger.error(f"Ошибка при создании инвайт-ссылки: {e}")
        raise


@pm_router.my_chat_member(ChatMemberUpdatedFilter(IS_ADMIN))
async def on_my_rights_updated(event: ChatMemberUpdated, bot: Bot):
    """
    Обработчик обновления прав бота в чате.
    Проверяет, стал ли бот администратором с правами отправки сообщений и управления чатом.
    """
    new_chat_member = event.new_chat_member
    chat = event.chat

    # Пропускаем обработку для личных чатов
    if chat.type == ChatType.PRIVATE:
        logger.info("Пропуск обработки для личного чата.")
        return

    # Получаем владельца чата
    owner = await get_chat_owner(chat)
    user = owner.user  # type: ignore
    logger.info(f"Получен владелец чата: {user.id}")

    # Проверяем права бота
    if new_chat_member.can_post_messages:  # type: ignore
        logger.info(f"Бот получил права администратора в чате: {chat.id}")

        try:
            # Получаем или создаем ссылку на чат
            link = await get_link(chat)
            dto = {"id": chat.id, "title": chat.full_name, "link": link}
            await api_service.create_channel(dto)
            logger.info(f"Канал успешно создан: {dto}")
        except Exception as e:
            logger.error(f"Ошибка при создании канала: {e}")

        try:
            dto = {"id": user.id, "fullName": user.full_name}
            if user.username:
                dto["username"] = user.username
            await api_service.create_user(dto)
            logger.info("Пользователь не был в бд и был создан")
        except Exception as e:
            logger.info(f"Ошибка при создании пользователя: {e}")

        try:
            # Назначаем владельца канала
            await api_service.set_channel_owner(chat.id, user.id)
            logger.info(f"Владелец канала установлен: {user.id}")

            # Уведомляем владельца
            await bot.send_message(user.id, f"Вам добавлен канал [{chat.full_name}]")
            logger.info(f"Уведомление отправлено владельцу: {user.id}")
        except Exception as e:
            logger.error(
                f"Ошибка при установке владельца или отправке уведомления: {e}"
            )
