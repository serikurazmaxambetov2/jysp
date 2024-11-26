from aiogram import Router, types
from aiogram.filters import Command
from aiogram_dialog import DialogManager

from ..middlewares import RegisterMiddleware
from ..states import MainSG

start_router = Router()
start_router.message.middleware(RegisterMiddleware())


@start_router.message(Command("start"))
async def start_cmd(msg: types.Message, dialog_manager: DialogManager):
    await msg.delete()
    await dialog_manager.start(MainSG.START)
