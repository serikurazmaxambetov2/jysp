import json
from typing import Dict


def dict_to_bytes(d: Dict):
    return json.dumps(d).encode()
