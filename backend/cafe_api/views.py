from django.core.exceptions import ValidationError
from django.db.models import Avg
from django.utils.text import slugify
from rest_framework import generics, mixins, viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from cafe_api.models import Cafe, Metro, Feature, LineOfMetro, Cuisine, EstablishmentType
from cafe_api.permissions import IsAdminOrReadOnly
from cafe_api.serializers import CafeSerializer, CafeListSerializer, CafeDetailSerializer, FeatureSerializer, \
    MetroSerializer, ReviewSerializer, EstablishmentTypeSerializer, CuisineSerializer


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

    @staticmethod
    def _params_to_str_list(qs: str):
        """Converts a string slugs to a list of strings"""
        return [str_id for str_id in qs.split(",")]

    @staticmethod
    def _params_to_ints(qs):
        """Converts a list of string IDs to a list of integers"""
        try:
            return [int(str_id) for str_id in qs.split(",")]
        except ValueError:
            raise ValidationError("Not a valid list of IDs")

    def get_queryset(self):
        queryset = self.queryset
        name = self.request.query_params.get("name", None)
        address = self.request.query_params.get("address", None)
        types = self.request.query_params.get("types", None)
        cuisines = self.request.query_params.get("cuisines", None)
        metro_ids = self.request.query_params.get("metroes", None)
        feature_ids = self.request.query_params.get("features", None)

        if name:
            queryset = queryset.filter(name__icontains=name)
        if address:
            queryset = queryset.filter(address__icontains=address)
        if types:
            types = self._params_to_str_list(types)
            queryset = queryset.filter(type__in=types)
        if cuisines:
            cuisines = self._params_to_str_list(cuisines)
            queryset = queryset.filter(cuisine__in=cuisines)
        if feature_ids:
            feature_ids = self._params_to_ints(feature_ids)
            queryset = queryset.filter(features__in=feature_ids)
        if metro_ids:
            metro_ids = self._params_to_ints(metro_ids)
            queryset = queryset.filter(metro_id__in=metro_ids)

        return queryset.distinct().annotate(
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
            "features": FeatureSerializer(Feature.objects.all(), many=True).data,
            "cafe_types": EstablishmentTypeSerializer(EstablishmentType.objects.all(), many=True).data,
            "cuisine": CuisineSerializer(Cuisine.objects.all(), many=True).data
        },
        status=200,
    )
