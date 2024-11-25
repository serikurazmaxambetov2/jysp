from .ai import AIStrategy
from .base import BaseStrategy
from .composite import CompositeStrategy
from .formatting import FormattingStrategy
from .media import MediaStrategy
from .media_group import MediaGroupStrategy
from .stop_words import StopWordsStrategy

strategies = [
    AIStrategy(),
    MediaStrategy(),
    MediaGroupStrategy(),
    FormattingStrategy(),
    StopWordsStrategy(),
]
compositor = CompositeStrategy(strategies)
