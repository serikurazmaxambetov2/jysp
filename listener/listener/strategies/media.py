from .base import BaseStrategy


class MediaStrategy(BaseStrategy):
    def execute(self, data, queue, relation):
        updated_data = data.copy()

        if "media_type" in data and not relation.get("useMedia"):
            del updated_data["media_type"]

        return updated_data, queue
