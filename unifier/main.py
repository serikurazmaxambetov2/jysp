import asyncio
import json

import aio_pika

from unifier import config
from unifier.services import G4FUnifier, rmq_service
from unifier.utils.to_bytes import dict_to_bytes


async def on_message(msg: aio_pika.abc.AbstractIncomingMessage):
    # Получаем тело сообщения
    body = msg.body.decode()
    json_body = json.loads(body)

    # Проверяем что тело сообщения имеется
    original_text = json_body["original_text"]
    if not original_text:
        await msg.ack()

    # Получаем уникальный текст и положим его в json_body
    unique_text = await G4FUnifier.unify(original_text)
    json_body["unique_text"] = unique_text

    # Отправляем текст на PUBLISHER_QUEUE
    await rmq_service.publish(config.PUBLISHER_QUEUE, dict_to_bytes(json_body))


async def main():
    await rmq_service.consume(config.UNIFIER_QUEUE, on_message)


# Запуск
if __name__ == "__main__":
    asyncio.run(main())
