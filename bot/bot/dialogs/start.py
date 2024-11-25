from aiogram_dialog import Dialog, Window
from aiogram_dialog.widgets.text import Const

from ..keyboards import start_menu
from ..states import MainSG

start_dialog = Dialog(
    Window(Const("dialogs.start.main"), start_menu, state=MainSG.START)
)
