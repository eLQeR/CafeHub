from django.urls import path, include
from rest_framework.routers import DefaultRouter

from cafe_api.views import (CafeViewSet,)

app_name = "user"

router = DefaultRouter()

router.register('cafes', CafeViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
