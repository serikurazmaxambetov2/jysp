from typing import Any, Dict

from aiohttp import ClientSession

from .. import config


class ApiService:
    def __init__(self, url: str):
        self.url = url

    def get_session(self):
        return ClientSession(self.url)

    async def get_user(self, user_id: int):
        session = self.get_session()

        async with session:
            response = await session.get(f"/telegram-user/{user_id}")
            json_response = await response.json()

            return json_response.get("channels")

    async def get_user_relations(self, user_id: int):
        session = self.get_session()

        async with session:
            response = await session.get(f"/telegram-user/{user_id}/relations")
            json_response = await response.json()

            return json_response

    async def create_user(self, dto: Dict[str, Any]):
        session = self.get_session()

        async with session:
            response = await session.post("/telegram-user", data=dto)
            json_response = await response.json()

            return json_response

    async def create_channel(self, dto: Dict[str, Any]):
        session = self.get_session()
        async with session:
            response = await session.post("/channel", data=dto)
            json_response = await response.json()

            return json_response

    async def set_channel_owner(self, channel_id: int, user_id: int):
        session = self.get_session()
        owner_data = {"id": user_id}
        async with session:
            response = await session.post(
                f"/channel/{channel_id}/owner", data=owner_data
            )
            json_response = await response.json()

            return json_response

    async def create_relation(self, dto: Dict[str, Any]):
        session = self.get_session()

        async with session:
            response = await session.post("/channel-relation/", data=dto)
            json_response = await response.json()

            return json_response

    async def delete_relation(self, dto: Dict[str, Any]):
        session = self.get_session()

        async with session:
            response = await session.delete("/channel-relation/", data=dto)
            json_response = await response.json()

            return json_response

    async def update_relation(self, relation_id: int, dto: Dict[str, Any]):
        session = self.get_session()

        async with session:
            response = await session.post(f"/channel-relation/{relation_id}", data=dto)
            json_response = await response.json()

            return json_response


api_service = ApiService(config.BACKEND_URL)
