import asyncio
import json
import logging

import aio_pika
from aiogram import Bot

from publisher import config
from publisher.services import PublisherService, rmq_service

# Настройка логирования на русском
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")
logger = logging.getLogger(__name__)


async def on_message(msg: aio_pika.abc.AbstractIncomingMessage):
    try:
        bot = Bot(config.BOT_TOKEN)
        body = json.loads(msg.body.decode())
        publisher = PublisherService(body)

        async with bot:
            await publisher.publish(bot)

    except Exception as e:
        logger.error(f"Ошибка при обработке сообщения: {e}")


async def main():
    try:
        logger.info("Запуск потребления сообщений из очереди...")
        await rmq_service.consume(config.PUBLISHER_QUEUE, on_message)

    except Exception as e:
        logger.error(f"Ошибка при запуске потребителя: {e}")


if __name__ == "__main__":
    asyncio.run(main())
