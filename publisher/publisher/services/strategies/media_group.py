from typing import Callable, List, Type

from pyrogram.types import InputMedia, Message

from .base import PublisherStrategy

MediaGetter = Callable[[Message], str]


class MediaGroupPublisherStrategy(PublisherStrategy):
    def __init__(
        self,
        media_group: List[Message],
        media_builder: Type[InputMedia],
        media_getter: MediaGetter,
        caption: str | None = None,
    ):
        self.media_group = media_group
        self.media_builer = media_builder
        self.caption = caption
        self.media_getter = media_getter

    async def publish(self, to_channel_id, bot):
        media_group = [
            self.media_builer(media=self.media_getter(msg)) for msg in self.media_group
        ]
        media_group[0].caption = self.caption  # type: ignore
        await bot.send_media_group(to_channel_id, media=media_group)  # type: ignore
        return True
