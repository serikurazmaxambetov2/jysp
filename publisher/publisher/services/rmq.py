import logging
from typing import Any, Awaitable, Callable

import aio_pika

from .. import config

OnMessage = Callable[[aio_pika.abc.AbstractIncomingMessage], Awaitable[Any]]
logger = logging.getLogger(__name__)


class RabbitMQService:
    def __init__(self, url: str):
        self.url = url

    async def consume(self, queue_name: str, on_message: OnMessage):
        # Настройка соединения и объявление очереди
        logger.info(f"Прослушивание очереди: {queue_name}")
        connection = await aio_pika.connect_robust(self.url)
        channel = await connection.channel()
        queue = await channel.declare_queue(queue_name, durable=True)

        # Слушаем сообщения
        async with queue.iterator() as queue_iter:
            async for message in queue_iter:
                logger.info("Новое сообщение в очереди")

                async with message.process():
                    try:
                        await on_message(message)
                    except Exception as e:
                        logger.info(f"Ошибка при обработке сообщения:\n{e}")


rmq_service = RabbitMQService(config.RABBITMQ_URL)
