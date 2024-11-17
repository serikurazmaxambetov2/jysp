from pyrogram import filters, types

from .. import config


@filters.create
async def service_type_filter(_, __, msg: types.Message):
    if not msg.service:
        return True

    return msg.service in config.ALLOWED_SERVICE_TYPES
