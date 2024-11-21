from typing import Optional

from pyrogram.types import Message

from listener.types import SendData


class MessageHandler:
    def __init__(self, next_handler: Optional["MessageHandler"] = None):
        self.next_handler = next_handler

    async def handle(self, msg: Message, send_data: SendData):
        """
        Базовый метод обработки. Если обработчик не может обработать,
        он передает данные следующему обработчику.
        """
        if self.next_handler:
            return self.next_handler.handle(msg, send_data)
        return send_data
