from abc import ABC, abstractmethod

from aiogram import Bot


class PublisherStrategy(ABC):
    @abstractmethod
    async def publish(self, to_channel_id: int, bot: Bot) -> bool:
        """Метод для публикаций сообщения."""
