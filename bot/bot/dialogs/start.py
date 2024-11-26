from aiogram_dialog import Dialog, DialogManager, Window

from ..keyboards import start_menu
from ..states import MainSG
from ..widgets import I18nFormat


async def getter(dialog_manager: DialogManager, **_):
    return dialog_manager.start_data


start_dialog = Dialog(
    Window(
        I18nFormat("dialogs.start.main"),
        start_menu,
        state=MainSG.START,
        getter=getter,  # type: ignore
    )
)
