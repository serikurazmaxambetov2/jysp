from aiogram_dialog import Dialog, DialogManager, Window
from aiogram_dialog.widgets.text import Const

from ..keyboards import start_menu
from ..states import MainSG


async def getter(dialog_manager: DialogManager, **_):
    middleware_data = dialog_manager.middleware_data
    return {
        "user": middleware_data.get("user"),
    }


start_dialog = Dialog(
    Window(Const("dialogs.start.main"), start_menu, state=MainSG.START),
    getter=getter,
)
