from aiogram_dialog.widgets.kbd import Button, Group, Row, Url
from aiogram_dialog.widgets.text import Const

start_menu = Group(
    Url(Const("keyboards.start.instructions"), Const("https://t.me/")),
    Row(
        Button(Const("keyboards.start.add_channel"), "add_channel"),
        Button(Const("keyboards.start.my_channels"), "my_channels"),
    ),
    Row(
        Button(Const("keyboards.start.create_relation"), "create_relation"),
        Button(Const("keyboards.start.my_relations"), "my_relaions"),
    ),
    Url(Const("keyboards.start.support"), Const("https://t.me/jysp_support")),
)
