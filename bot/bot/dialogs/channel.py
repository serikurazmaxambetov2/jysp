from aiogram.types import User
from aiogram_dialog import Dialog, DialogManager, Window
from aiogram_dialog.widgets.kbd import Start
from aiogram_dialog.widgets.text import Case, Format, List

from ..services import api_service
from ..states import ChannelSG, MainSG
from ..widgets import I18nFormat


async def getter(dialog_manager: DialogManager, event_from_user: User, **_):
    user = await api_service.get_user(event_from_user.id)
    channels = user.get("channels")
    return {
        "user": user,
        "channels": [
            (unique_id, ch.get("id"), ch.get("title"))
            for unique_id, ch in enumerate(channels, 1)
        ],
        "has_channels": len(channels) != 0,
    }


# Определение диалога для управления каналами
channel_dialog = Dialog(
    Window(
        Case(
            {
                True: I18nFormat("dialogs.channel.has_channels"),
                False: I18nFormat("dialogs.channel.has_not_channels"),
            },
            selector="has_channels",
        ),
        List(Format("{item[0]}. {item[2]}"), items="channels"),
        Start(I18nFormat("globals.back"), id="back", state=MainSG.START),
        state=ChannelSG.LIST,
        getter=getter,
    ),
)
