from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message
from aiogram_dialog import DialogManager, ShowMode

from ..middlewares import RegisterMiddleware
from ..states import MainSG

start_router = Router()
start_router.message.middleware(RegisterMiddleware())


@start_router.message(Command("start"))
async def start_cmd(_: Message, dialog_manager: DialogManager):
    await dialog_manager.start(
        MainSG.START,
        show_mode=ShowMode.EDIT,
    )
