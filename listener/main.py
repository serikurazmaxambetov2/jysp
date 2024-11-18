from typing import Any, Dict, Union

from pyrogram import Client, filters, types  # type: ignore

from listener import config
from listener import filters as custom_filters
from listener import utils
from listener.services import rmq_service

app = Client("unnamed", session_string=config.SESSION_STRING, in_memory=True)


@app.on_message(
    filters.channel
    & custom_filters.backend_check_filter
    & custom_filters.once_media_filter
    & custom_filters.media_type_filter
    & custom_filters.service_type_filter
)
async def handle(_: Client, msg: types.Message):
    # Формируем данные для отправки
    send_data: Dict[str, Any] = {
        "original_message": repr(msg),
        "session_string": config.SESSION_STRING,
        "quote_text": msg.quote_text,
        "quote_entities": repr(msg.quote_entities),
    }
    queue: Union[str, None] = None

    if msg.media_group_id:
        # Получаем медиа группу
        media_group = await msg.get_media_group()

        # Добавляем данные для отправки
        send_data["media_group"] = repr(media_group)
        send_data["media_group_type"] = media_group[0].media

        # Получаем все медиа с текстом
        messages_with_caption = filter(
            lambda message: message.caption,
            media_group,
        )

        # Получаем все тексты в медиа группе
        texts = [message.caption for message in messages_with_caption]

        # Проверяем количество caption'ов и отправляем данные
        if len(texts) != 1:
            send_data["original_text"] = None
            queue = config.PUBLISHER_QUEUE
        else:
            send_data["original_text"] = texts[0]
            queue = config.UNIFIER_QUEUE

    elif msg.media:
        # Формируем данные для отправки
        send_data["media"] = msg.download
        send_data["original_text"] = msg.caption
        send_data["media_type"] = msg.media

        # Определяем очередь
        if msg.caption:
            queue = config.UNIFIER_QUEUE
        else:
            queue = config.PUBLISHER_QUEUE

    elif msg.text:
        send_data["original_text"] = msg.text
        queue = config.UNIFIER_QUEUE

    # Отправляем если queue не равен None
    if queue:
        await rmq_service.send(utils.dict_to_bytes(send_data), queue)


app.run()
