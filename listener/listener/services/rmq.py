import logging

import aio_pika

from .. import config

logger = logging.getLogger(__name__)


class RabbitMQService:
    def __init__(self, url: str) -> None:
        self.url = url

    async def _get_connection(self):
        return await aio_pika.connect_robust(self.url)

    async def send(self, body: bytes, queue_name: str):
        logger.info(f"Отправка сообщения в {queue_name}")
        connection = await self._get_connection()

        async with connection:
            logger.info("Создание канала и очереди...")
            channel = await connection.channel()
            await channel.declare_queue(queue_name, durable=True)

            logger.info("Отправка...")
            await channel.default_exchange.publish(
                aio_pika.Message(body=body), routing_key=queue_name
            )


rmq_service = RabbitMQService(config.RABBITMQ_URL)
