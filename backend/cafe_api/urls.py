from django.urls import path, include
from rest_framework.routers import DefaultRouter

from cafe_api.views import (
    CafeViewSet,
    ReviewViewSet,
    FiltersView,
    IndexView,
)

app_name = "catalog"

router = DefaultRouter()

router.register('cafes', CafeViewSet)
router.register('reviews', ReviewViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("index/", IndexView.as_view(), name="index"),
    path("filters/", FiltersView.as_view(), name="filters"),
]
