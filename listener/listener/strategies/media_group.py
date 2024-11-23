from .base import BaseStrategy


class MediaGroupStrategy(BaseStrategy):
    def execute(self, data, queue, relation):
        updated_data = data.copy()

        if data.get("media_group") and not relation.get("useMediaGroup"):
            del updated_data["media_group"]
            del updated_data["media_group_type"]

        return updated_data, queue
