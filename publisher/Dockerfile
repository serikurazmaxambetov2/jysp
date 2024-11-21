FROM python:3.11

# Базовая директория
WORKDIR /publisher

# Установка Poetry
ENV POETRY_HOME="/opt/poetry"
ENV PATH="$POETRY_HOME/bin:$PATH"
RUN curl -sSL https://install.python-poetry.org | python3 -

# Копирование файлов зависимостей и установка
COPY poetry.lock pyproject.toml ./
RUN poetry install

# Запуск
CMD poetry run python main.py

