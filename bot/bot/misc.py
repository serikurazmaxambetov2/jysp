from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.base import DefaultKeyBuilder
from aiogram.fsm.storage.redis import RedisStorage
from aiogram.utils.i18n import I18n
from redis.asyncio import Redis

from . import config

# Storage
redis = Redis(host=config.REDIS_HOST, port=config.REDIS_PORT)
key_builder = DefaultKeyBuilder(with_destiny=True)
storage = RedisStorage(redis=redis, key_builder=key_builder)

# Other
bot = Bot(config.BOT_TOKEN)
dp = Dispatcher(storage=storage)

# I18n
i18n = I18n(path="locales", default_locale="ru")
