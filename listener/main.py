import logging

from pyrogram import Client, filters, types  # type: ignore

from listener import config
from listener import filters as custom_filters
from listener import utils
from listener.handlers import MediaGroupHandler, MediaHandler, TextHandler
from listener.services import api_service, rmq_service
from listener.strategies import compositor
from listener.types import SendData

# Инициализация клиента и логгера
app = Client("unnamed", session_string=config.SESSION_STRING, in_memory=True)
logger = logging.getLogger(__name__)


# Основная логика обработки сообщений
@app.on_message(
    filters.channel
    & custom_filters.backend_check_filter
    & custom_filters.once_media_filter
    & custom_filters.media_type_filter
    & custom_filters.service_type_filter
)
async def handle(_: Client, msg: types.Message):
    logger.info("Формирование данных для отправки")

    # 1. Подготовка базовых данных для отправки
    base_send_data: SendData = {
        "original_message": repr(msg)  # Представление сообщения для отправки
    }

    # 2. Создание цепочки обработчиков, чтобы обработать типы медиа и текста
    handler_chain = MediaGroupHandler(MediaHandler(TextHandler()))

    # 3. Обработка сообщения через цепочку обработчиков
    send_data = await handler_chain.handle(msg, base_send_data)

    # 4. Определение очереди для отправки в зависимости от наличия текста
    queue = (
        config.UNIFIER_QUEUE
        if send_data.get("original_text")
        else config.PUBLISHER_QUEUE
    )

    # 5. Получение списка отношений для отправки сообщений в каналы
    relations = await api_service.get_relations()

    # 6. Отправка сообщений в соответствующие каналы
    for relation in relations:
        to_channel_id: int = relation.get("toChannel", {}).get("id")

        # Добавление ID канала в данные для отправки
        send_data["to_channel_id"] = to_channel_id

        # Обрабатываем настройки и получаем обновленные данные
        updated_data, updated_queue = compositor.execute(send_data, queue, relation)

        if (
            "original_text" in updated_data
            or "media_type" in updated_data
            or "media_group" in updated_data
        ):
            logger.info(
                "Отправляем сообщение в канал"
                f": {to_channel_id} в очередь: {updated_queue}"
            )

            # Отправка данных в очередь (RabbitMQ)
            await rmq_service.send(utils.dict_to_bytes(updated_data), updated_queue)

            logger.info(f"Сообщение отправлено в очередь")

            # Удаляем из данных поле с ID канала, чтобы не отправить его повторно
            del send_data["to_channel_id"]


if __name__ == "__main__":
    # Настройка уровня логирования
    logging.basicConfig(level=logging.INFO)
    logger.info(f"Слушаем сообщения в пользователе id={config.USER_ID}")

    # Запуск клиента
    app.run()
