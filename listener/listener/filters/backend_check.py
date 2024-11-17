from pyrogram import filters, types

from ..services import api_service


@filters.create
async def backend_check_filter(_, __, msg: types.Message):
    relations = await api_service.get_relations()
    for relation in relations:
        if relation.get("fromChannel", {}).get("id") == msg.chat.id:
            return True
    return False
