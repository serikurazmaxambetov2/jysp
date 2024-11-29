# autoflake: skip_file
from typing import List, Union

import pyrogram


def text_to_msg(
    text: str,
) -> Union[List[pyrogram.types.Message], pyrogram.types.Message]:
    return eval(text)
