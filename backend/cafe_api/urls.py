from django.urls import path, include
from rest_framework.routers import DefaultRouter

from cafe_api.views import (
    CafeViewSet,
    get_filters_view,
    ReviewViewSet,
)

app_name = "catalog"

router = DefaultRouter()

router.register('cafes', CafeViewSet)
router.register('reviews', ReviewViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("filters/", get_filters_view, name="filters"),
]
