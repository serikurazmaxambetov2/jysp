from .. import config
from .base import BaseStrategy


class AIStrategy(BaseStrategy):
    def execute(self, data, queue, relation):
        if relation.get("use_ai"):
            queue = config.UNIFIER_QUEUE

        return data, queue
