# autoflake: skip_file
import datetime
from typing import List, Union, overload

import pyrogram


def text_to_msg(
    text: str,
) -> Union[List[pyrogram.types.Message], pyrogram.types.Message]:
    return eval(text)
