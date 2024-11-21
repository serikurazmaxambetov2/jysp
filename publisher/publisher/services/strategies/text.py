from aiogram import Bot

from .base import PublisherStrategy


class TextPublisherStrategy(PublisherStrategy):
    def __init__(self, text: str):
        self.text = text

    async def publish(self, to_channel_id, bot) -> bool:
        await bot.send_message(to_channel_id, self.text)
        return True
