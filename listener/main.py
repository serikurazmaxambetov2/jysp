from pyrogram import Client  # type: ignore

from listener import config

app = Client("unnamed", session_string=config.SESSION_STRING, in_memory=True)
