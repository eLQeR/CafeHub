# CafeHub
# to start redis:
docker run -d -p 6379:6379 redis
# to start celery email verification task:
celery -A tasks worker --loglevel=info

## for now, it crashes when you create new user but
## user is being created anyway, so don`t pay
## attention yet, im working on it