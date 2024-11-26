import asyncio
import logging

from aiogram_dialog import setup_dialogs

from bot.dialogs import dialog_registry
from bot.handlers import main_router
from bot.misc import bot, dp


async def main():
    # Настраиваем диалоги
    setup_dialogs(dp)

    # Добавляем обработчики
    dp.include_router(main_router)
    dp.include_router(dialog_registry)

    # Запускаем polling
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())
