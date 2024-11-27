from aiogram_dialog import Dialog, Window

from ..states import ChannelSG
from ..widgets import I18nFormat

# Определение диалога для управления каналами
channel_dialog = Dialog(
    Window(
        I18nFormat("dialogs.channel.list"),
        # TODO: Реализовать логику отображения списка каналов
        state=ChannelSG.LIST,
    ),
)
