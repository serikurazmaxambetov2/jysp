from typing import Any, Dict, List

from aiohttp import ClientSession

from listener import config


class ApiService:
    def __init__(self, base_url: str):
        self.base_url = base_url

    def _get_client(self):
        return ClientSession(self.base_url)

    async def get_relations(self) -> List[Dict[str, Any]]:
        client = self._get_client()

        async with client:
            response = await client.get(f"/session/{config.USER_ID}/")
            response.raise_for_status()
            json_data = await response.json()

            return json_data.get("listenRelations")


api_service = ApiService(config.BACKEND_URL)
