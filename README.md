# CafeHub
# to start redis:
docker run -d -p 6379:6379 redis
# to start celery email verification task:
celery -A tasks worker --loglevel=info