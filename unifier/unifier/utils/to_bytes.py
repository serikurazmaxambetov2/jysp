import json
from typing import Any, Dict


def dict_to_bytes(d: Dict[str, Any]) -> bytes:
    return json.dumps(d).encode()
