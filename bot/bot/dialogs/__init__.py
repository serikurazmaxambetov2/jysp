from aiogram import Router

from .start import start_dialog

dialog_registry = Router()
dialog_registry.include_router(start_dialog)
