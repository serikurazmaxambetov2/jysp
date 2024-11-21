from pyrogram.enums import MessageMediaType

from .base import PublisherStrategy


class MediaPublisherStrategy(PublisherStrategy):
    def __init__(
        self, file_id: str, media_type: MessageMediaType, caption: str | None = None
    ):
        self.file_id = file_id
        self.media_type = media_type
        self.caption = caption

    async def publish(self, to_channel_id, bot):
        send_methods = {
            MessageMediaType.AUDIO: bot.send_audio,
            MessageMediaType.VIDEO_NOTE: bot.send_video_note,
            MessageMediaType.VIDEO: bot.send_video,
            MessageMediaType.PHOTO: bot.send_photo,
            MessageMediaType.DOCUMENT: bot.send_document,
            MessageMediaType.VOICE: bot.send_voice,
        }
        send_method = send_methods.get(self.media_type)
        if not send_method:
            return False

        kwargs = {
            "chat_id": to_channel_id,
            self.media_type.value.lower(): self.file_id,  # type: ignore
        }
        if self.media_type != MessageMediaType.VIDEO_NOTE:
            kwargs["caption"] = self.caption

        await send_method(**kwargs)
        return True
