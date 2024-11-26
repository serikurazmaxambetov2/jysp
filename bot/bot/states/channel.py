from aiogram.fsm.state import State, StatesGroup


class ChannelSG(StatesGroup):
    ADD = State()
    LIST = State()
