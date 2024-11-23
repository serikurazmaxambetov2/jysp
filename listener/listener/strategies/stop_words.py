from .base import BaseStrategy


class StopWordsStrategy(BaseStrategy):
    def execute(self, data, queue, relation):
        updated_data = data.copy()
        stop_words = relation.get("stopWords")

        if stop_words and "original_text" in updated_data:
            original_text: str = updated_data.get("original_text")  # type: ignore
            for stop_word in stop_words:
                if stop_word.lower() in original_text.lower():
                    updated_data.pop("original_text")
                    updated_data.pop("media_type")
                    updated_data.pop("media_group")

        return updated_data, queue
