from pyrogram import filters, types

from .. import config


@filters.create
async def media_type_filter(_, __, msg: types.Message):
    """Фильтруем так, чтобы тип медиафайла соответствовал доступным."""
    if not msg.media:
        return True

    return msg.media in config.ALLOWED_MEDIA_TYPES
