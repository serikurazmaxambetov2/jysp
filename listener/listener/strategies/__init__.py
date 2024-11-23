from .ai import AIStrategy
from .base import BaseStrategy
from .composite import CompositeStrategy
from .media import MediaStrategy
from .media_group import MediaGroupStrategy

strategies = [AIStrategy(), MediaStrategy(), MediaGroupStrategy()]
compositor = CompositeStrategy(strategies)
