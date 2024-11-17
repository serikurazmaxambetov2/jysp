import asyncio
import random
from typing import List

from pyrogram import filters, types

storage: List[str] = []


@filters.create
async def once_media_filter(_, __, msg: types.Message):
    """
    Фильтр для обработки сообщений с media_group_id один раз.
    Без этого сообщения с media_group будут обрабатываться несколько раз
    """
    if not msg.media_group_id:
        return True

    chat_id = msg.chat.id
    media_group_id = msg.media_group_id
    storage_key = f"{chat_id}:{media_group_id}"

    # Делаем небольшое ожидание
    await asyncio.sleep(random.randint(1, 5))

    if storage_key in storage:
        return False

    storage.append(storage_key)

    return True
