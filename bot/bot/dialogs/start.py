from aiogram.types import User
from aiogram_dialog import Dialog, DialogManager, Window

from ..keyboards import start_menu
from ..services import api_service
from ..states import MainSG
from ..widgets import I18nFormat


async def getter(dialog_manager: DialogManager, event_from_user: User, **_):
    user = await api_service.get_user(event_from_user.id)
    return {"user": user, "name": user.get("fullName")}


start_dialog = Dialog(
    Window(
        I18nFormat("dialogs.start.main"),
        start_menu,
        state=MainSG.START,
        getter=getter,  # type: ignore
    )
)
