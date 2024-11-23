from abc import ABC, abstractmethod
from typing import Dict, Tuple


class BaseStrategy(ABC):
    @abstractmethod
    def execute(
        self,
        data: Dict,
        queue: str,
        relation: Dict,
    ) -> Tuple[Dict, str]:
        pass
