from typing import Any, Dict, Optional

from aiohttp import ClientSession

from .. import config


class ApiService:
    def __init__(self, url: str):
        self.url = url

    def get_session(self) -> ClientSession:
        return ClientSession(self.url)

    async def _make_request(
        self, method: str, endpoint: str, data: Optional[Dict[str, Any]] = None
    ) -> Any:
        session = self.get_session()
        async with session:
            async with session.request(method, endpoint, json=data) as response:
                response.raise_for_status()
                return await response.json()

    async def get_user(self, user_id: int) -> Any:
        return await self._make_request("GET", f"/telegram-user/{user_id}")

    async def get_user_relations(self, user_id: int) -> Any:
        return await self._make_request("GET", f"/telegram-user/{user_id}/relations")

    async def create_user(self, dto: Dict[str, Any]) -> Any:
        return await self._make_request("POST", "/telegram-user", data=dto)

    async def create_channel(self, dto: Dict[str, Any]) -> Any:
        return await self._make_request("POST", "/channel", data=dto)

    async def set_channel_owner(self, channel_id: int, user_id: int) -> Any:
        return await self._make_request(
            "POST", f"/channel/{channel_id}/owner", data={"id": user_id}
        )

    async def create_relation(self, dto: Dict[str, Any]) -> Any:
        return await self._make_request("POST", "/channel-relation/", data=dto)

    async def delete_relation(self, dto: Dict[str, Any]) -> Any:
        return await self._make_request("DELETE", "/channel-relation/", data=dto)

    async def update_relation(self, relation_id: int, dto: Dict[str, Any]) -> Any:
        return await self._make_request(
            "POST", f"/channel-relation/{relation_id}", data=dto
        )


api_service = ApiService(config.BACKEND_URL)
