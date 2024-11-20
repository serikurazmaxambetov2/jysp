import json
import logging
import re

logger = logging.getLogger(__name__)


def extract_unique_text(text: str):
    """Получаем ответ в json формате и возвращаем его"""
    try:
        if text.startswith("```"):
            logger.info("Сообщение содержит json обертку")

            match = re.search(r"```json(.*?)```", text, re.DOTALL)
            if not match:
                return None

            text = match.group(1).strip()

        logger.info("Возвращаем уникальный текст")
        return json.loads(text).get("unique")
    except Exception as e:
        logger.info(f"Ошибка: \n{e}")
