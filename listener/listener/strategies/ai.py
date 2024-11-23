from .. import config
from .base import BaseStrategy


class AIStrategy(BaseStrategy):
    def execute(self, data, queue, relation):
        use_ai = relation.get("useAi", False)

        if use_ai:
            queue = config.UNIFIER_QUEUE
        else:
            queue = config.PUBLISHER_QUEUE

        return data, queue
