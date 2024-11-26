from aiogram_dialog.widgets.kbd import Button, Group, Row, Start, Url
from aiogram_dialog.widgets.text import Const

from bot.states.channel import ChannelSG

from ..widgets import I18nFormat

start_menu = Group(
    Url(I18nFormat("keyboards.start.instructions"), Const("https://t.me/")),
    Row(
        Start(
            I18nFormat("keyboards.start.add_channel"),
            "add_channel",
            state=ChannelSG.ADD,
        ),
        Start(
            I18nFormat("keyboards.start.my_channels"),
            "my_channels",
            state=ChannelSG.LIST,
        ),
    ),
    Row(
        Button(I18nFormat("keyboards.start.create_relation"), "create_relation"),
        Button(I18nFormat("keyboards.start.my_relations"), "my_relaions"),
    ),
    Url(I18nFormat("keyboards.start.support"), Const("https://t.me/jysp_support")),
)
