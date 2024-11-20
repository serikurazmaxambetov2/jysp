import logging

from aiohttp import ClientSession

from .. import config

logger = logging.getLogger(__name__)


class ApiService:
    def __init__(self, url: str):
        self.url = url

    def _get_session(self):
        return ClientSession(self.url)

    async def get_relations(self, from_channel_id: int, session_id: int):
        logger.info(
            f"Получаем связки по from_channel_id ({from_channel_id}), session_id ({session_id})"
        )
        http_session = self._get_session()
        find_data = {
            "fromChannel": {"id": from_channel_id},
            "session": {"id": session_id},
        }

        async with http_session:
            response = await http_session.post("/channel-relation/find", data=find_data)

            logger.info(f"Статус ответа: {response.status}")
            response.raise_for_status()

            return await response.json()


api_service = ApiService(config.BACKEND_URL)
