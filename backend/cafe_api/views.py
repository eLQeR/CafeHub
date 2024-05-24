from django.db.models import Avg
from django.utils.text import slugify
from rest_framework import generics, mixins, viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from cafe_api.models import Cafe, Metro, Feature, LineOfMetro
from cafe_api.permissions import IsAdminOrReadOnly
from cafe_api.serializers import CafeSerializer, CafeListSerializer, CafeDetailSerializer, FeatureSerializer, \
    MetroSerializer, ReviewSerializer


class CafeViewSet(viewsets.ModelViewSet):
    queryset = Cafe.objects.all()
    serializer_class = CafeSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=True, methods=['GET'], url_path="get-reviews")
    def get_reviews(self, request, pk=None):
        cafe = self.get_object()
        return Response(ReviewSerializer(cafe.reviews.all(), many=True).data, status=200)

    def get_serializer_class(self):
        if self.action == 'list':
            return CafeListSerializer
        if self.action == 'retrieve':
            return CafeDetailSerializer
        return CafeSerializer

    def get_queryset(self):
        queryset = self.queryset
        name = self.request.query_params.get("name", None)
        type = self.request.query_params.get("type", None)
        address = self.request.query_params.get("address", None)

        if name:
            queryset = queryset.filter(name__icontains=name)
        if address:
            queryset = queryset.filter(address__icontains=address)
        if type:
            queryset = queryset.filter(type=type)

        return queryset.annotate(
            mark=(Avg("reviews__mark"))
        )


@api_view(["GET"])
def get_filters_view(request, *args, **kwargs):
    return Response(
        {
            "metro": {
                "green": MetroSerializer(Metro.objects.filter(line__name="Зелена"), many=True).data,
                "blue": MetroSerializer(Metro.objects.filter(line__name="Синя"), many=True).data,
                "red": MetroSerializer(Metro.objects.filter(line__name="Червона"), many=True).data,
            },
            "features": FeatureSerializer(Feature.objects.all(), many=True).data
        },
        status=200,
    )
