FROM python:3.10-alpine3.15
LABEL maintainer="yaroslavbiziuk@gmail.com"

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1


WORKDIR app

COPY requirements.txt /app

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

EXPOSE 8000
