from typing import Dict

from aiogram.utils.i18n import gettext as _
from aiogram_dialog import DialogManager
from aiogram_dialog.widgets.text import Format


class I18nFormat(Format):
    async def _render_text(self, data: Dict, manager: DialogManager):
        return _(self.text).format_map(data)
