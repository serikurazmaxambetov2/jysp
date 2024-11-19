from typing import Awaitable, Callable

import aio_pika

from .. import config

OnMessage = Callable[
    [aio_pika.abc.AbstractIncomingMessage],
    Awaitable[None],
]


class RabbitMQService:
    def __init__(self, url: str):
        self.url = url

    async def _get_connection(self):
        """Получить соединение"""
        return await aio_pika.connect_robust(self.url)

    async def _get_channel_and_queue(
        self, connection: aio_pika.abc.AbstractConnection, queue_name: str
    ):
        """Получить канал и объявить очередь."""
        channel = await connection.channel()
        queue = await channel.declare_queue(queue_name, durable=True)
        return channel, queue

    async def consume(self, queue_name: str, on_message: OnMessage):
        connection = await self._get_connection()
        async with connection:
            _, queue = await self._get_channel_and_queue(connection, queue_name)
            async with queue.iterator() as queue_iter:
                async for message in queue_iter:
                    async with message.process():
                        try:
                            await on_message(message)
                        except Exception:
                            pass

    async def publish(self, queue_name: str, body: bytes):
        connection = await self._get_connection()
        async with connection:
            channel, _ = await self._get_channel_and_queue(connection, queue_name)
            await channel.default_exchange.publish(
                aio_pika.Message(body=body), routing_key=queue_name
            )


rmq_service = RabbitMQService(config.RABBITMQ_URL)
