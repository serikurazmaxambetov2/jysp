import json
import re


def extract_unique_text(text: str):
    """Получаем ответ в json формате и возвращаем его"""
    try:
        if text.startswith("```"):
            match = re.search(r"```json(.*?)```", text, re.DOTALL)
            if not match:
                return None

            text = match.group(1).strip()

        unique_text = json.loads(text).get("unique")
        return unique_text
    except Exception:
        return None
