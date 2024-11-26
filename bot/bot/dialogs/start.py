from aiogram_dialog import Dialog, Window

from ..keyboards import start_menu
from ..states import MainSG
from ..widgets import I18nFormat

start_dialog = Dialog(
    Window(I18nFormat("dialogs.start.main"), start_menu, state=MainSG.START)
)
