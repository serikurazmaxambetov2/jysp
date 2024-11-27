from aiogram.enums import ChatMemberStatus
from aiogram.types import Chat


async def get_chat_owner(chat: Chat):
    administrators = await chat.get_administrators()
    for administrator_or_owner in administrators:
        if administrator_or_owner.status == ChatMemberStatus.CREATOR:
            return administrator_or_owner
