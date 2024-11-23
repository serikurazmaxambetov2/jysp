from typing import List

from listener.strategies.base import BaseStrategy


class CompositeStrategy(BaseStrategy):
    def __init__(self, strategies: List[BaseStrategy]):
        self.strategies = strategies

    def execute(self, data, queue, relation):
        for strategy in self.strategies:
            data, queue = strategy.execute(data, queue, relation)

        return data, queue
