import aio_pika

from .. import config


class RabbitMQService:
    def __init__(self, url: str) -> None:
        self.url = url

    async def _get_connection(self):
        return await aio_pika.connect_robust(self.url)

    async def send(self, body: bytes, queue_name: str):
        connection = await self._get_connection()

        async with connection:
            channel = await connection.channel()
            await channel.declare_queue(queue_name, durable=True)

            await channel.default_exchange.publish(
                aio_pika.Message(body=body), routing_key=queue_name
            )


rmq_service = RabbitMQService(config.RABBITMQ_URL)
