from aiogram import Router

from .pm import pm_router
from .start import start_router

main_router = Router()
main_router.include_router(start_router)
main_router.include_router(pm_router)
