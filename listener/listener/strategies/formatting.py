from .base import BaseStrategy


class FormattingStrategy(BaseStrategy):
    def execute(self, data, queue, relation):
        updated_data = data.copy()
        del updated_data["markup_text"]

        if relation.get("useFormatting") and "original_text" in updated_data:
            markup_text = data.get("markup_text")
            updated_data["original_text"] = markup_text

        return updated_data, queue
