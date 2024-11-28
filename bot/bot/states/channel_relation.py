from aiogram.fsm.state import State, StatesGroup


class ChannelRelationSG(StatesGroup):
    CREATE_FROM_CHANNEL = State()
    CREATE_TO_CHANNEL = State()
    LIST = State()
