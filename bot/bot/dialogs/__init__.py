from aiogram import Router

from .channel import channel_dialog
from .start import start_dialog

dialog_registry = Router()
dialog_registry.include_router(start_dialog)
dialog_registry.include_router(channel_dialog)
