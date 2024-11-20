from aiolimiter import AsyncLimiter
from g4f.client import AsyncClient, logging
from g4f.client.stubs import ChatCompletion

from ...utils.extract_unique_text import extract_unique_text
from .base import BaseUnifier

limiter = AsyncLimiter(10, 60)
client = AsyncClient()
logger = logging.getLogger(__name__)


class G4FUnifier(BaseUnifier):
    @staticmethod
    async def unify(text: str) -> str:
        logger.info(f"Делаем текст уникальным: {text}")
        # Формируем сообщение для обработки
        messages = [
            {
                "role": "user",
                "content": (
                    "Сделай этот текст уникальным и возврати ответ в json "
                    "также не трогай на html теги если они есть, "
                    "формате без лишних вступлений. Формат JSON: "
                    "{unique: <тут уникальный текст>}. "
                    f'Текст который нужно сделать уникальным:\n\n\n"""{text}"""'
                ),
            }
        ]

        # Работаем через limiter
        async with limiter:
            logger.info("Отправка запроса")
            response: (
                ChatCompletion
            ) = await client.chat.completions.create(  # type: ignore
                model="gpt-4o-mini", messages=messages  # type: ignore
            )

            gpt_response: str = response.choices[0].message.content  # type: ignore

            if gpt_response == "Request ended with status code 404":
                logger.info("404. Пробуем снова")
                return await G4FUnifier.unify(text)

            logger.info("Получение уникального текста из ответа")
            # Если есть текст то получаем его иначе пробуем снова
            return extract_unique_text(
                gpt_response,
            ) or await G4FUnifier.unify(
                text,
            )
