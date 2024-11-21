import logging
from typing import Dict, Optional, Tuple

from aiogram import Bot
from aiogram import types as aiogram_types
from pyrogram.enums import MessageMediaType

from ..utils import text_to_msg
from .strategies import (MediaGroupPublisherStrategy, MediaPublisherStrategy,
                         PublisherStrategy, TextPublisherStrategy)

logger = logging.getLogger(__name__)


class PublisherService:
    def __init__(self, body: Dict):
        """
        Сервис для публикации сообщений с различными типами контента.

        :param body: Словарь с данными о публикации.
        """
        self.msg = text_to_msg(body.get("original_message", ""))
        self.media_group = text_to_msg(body.get("media_group", "None"))
        self.media_type = self._get_media_type(body.get("media_type"))
        self.media_group_type = self._get_media_type(body.get("media_group_type"))
        self.original_text = body.get("original_text", "")
        self.unique_text = body.get("unique_text", "")

        logger.debug("Инициализация PublisherService с данными: %s", body)

    @staticmethod
    def _get_media_type(media_type: Optional[str]) -> Optional[MessageMediaType]:
        """
        Преобразует строку в соответствующий тип MessageMediaType.

        :param media_type: Тип медиа в виде строки.
        :return: MessageMediaType или None, если не удалось определить тип.
        """
        if not media_type:
            return None
        try:
            return getattr(MessageMediaType, media_type.upper())
        except AttributeError:
            logger.warning("Неизвестный тип медиа: %s", media_type)
            return None

    def get_strategy(self) -> PublisherStrategy:
        """
        Определяет подходящую стратегию для публикации.

        :return: Экземпляр стратегии, соответствующий данным публикации.
        """
        text = self.unique_text or self.original_text
        logger.debug("Определение стратегии публикации. Текст: %s", text)

        if self.media_group:
            media_builder, media_getter = self._get_media_group_handlers()  # type: ignore
            logger.debug("Выбрана стратегия MediaGroupPublisherStrategy")
            return MediaGroupPublisherStrategy(
                media_group=self.media_group,  # type: ignore
                media_builder=media_builder,
                media_getter=media_getter,
                caption=text,
            )

        if self.media_type:
            media = getattr(self.msg, self.media_type.value.upper(), None)  # type: ignore
            logger.debug("Выбрана стратегия MediaPublisherStrategy")
            return MediaPublisherStrategy(
                file_id=media.file_id,  # type: ignore
                media_type=self.media_type,
                caption=text,
            )

        logger.debug("Выбрана стратегия TextPublisherStrategy")
        return TextPublisherStrategy(text=text)

    def _get_media_group_handlers(self) -> Optional[Tuple]:
        """
        Возвращает обработчики для группового медиа (builder и getter).

        :return: Кортеж с builder и getter или None, если тип медиа неизвестен.
        """
        handlers = {
            MessageMediaType.PHOTO: (
                aiogram_types.InputMediaPhoto,
                lambda msg: msg.photo.file_id,
            ),
            MessageMediaType.VIDEO: (
                aiogram_types.InputMediaVideo,
                lambda msg: msg.video.file_id,
            ),
            MessageMediaType.AUDIO: (
                aiogram_types.InputMediaAudio,
                lambda msg: msg.audio.file_id,
            ),
            MessageMediaType.DOCUMENT: (
                aiogram_types.InputMediaDocument,
                lambda msg: msg.document.file_id,
            ),
        }
        handler = handlers.get(self.media_group_type, None)  # type: ignore
        if not handler:
            logger.warning(
                "Не удалось определить обработчики для типа: %s", self.media_group_type
            )
        return handler

    async def publish(self, to_channel_id: int, bot: Bot):
        """
        Публикует сообщение с использованием подходящей стратегии.

        :param to_channel_id: ID канала, куда будет отправлено сообщение.
        :param bot: Инстанс бота для отправки сообщения.
        """
        strategy = self.get_strategy()
        logger.info("Начало публикации сообщения в канал: %d", to_channel_id)
        try:
            result = await strategy.publish(to_channel_id, bot)
            logger.info("Сообщение успешно опубликовано")
            return result
        except Exception as e:
            logger.error("Ошибка при публикации сообщения: %s", e, exc_info=True)
            raise
