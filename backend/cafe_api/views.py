from django.core.exceptions import FieldError
from django.db.models import Avg
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter, OpenApiExample
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from cafe_api.permissions import IsAdminOrReadOnly, IsReadOnlyOrEmailVerified
from cafe_api.models import (
    Cafe,
    Metro,
    Feature,
    Cuisine,
    EstablishmentType,
    CafeWorkingHours,
    Review,
)

from cafe_api.serializers import (
    CafeSerializer,
    CafeListSerializer,
    CafeDetailSerializer,
    FeatureSerializer,
    MetroSerializer,
    ReviewSerializer,
    EstablishmentTypeSerializer,
    CuisineSerializer,
    CafeWorkingHoursSerializer,
)


@extend_schema_view(
    retrieve=extend_schema(
        summary="Retrieve a certain cafe",
        description="User can get a detail info about cafe.",
    ),
    create=extend_schema(
        summary="Create a cafe",
        description="Admin can create a cafe.",
    ),
    update=extend_schema(
        summary="Update a certain cafe",
        description="Admin can update a cafe.",
    ),
    partial_update=extend_schema(
        summary="Partial update a certain cafe",
        description="Admin can make partial update a cafe.",
    ),
    destroy=extend_schema(
        summary="Delete a certain cafe",
        description="Admin can delete a cafe.",
    ),
)
class CafeViewSet(viewsets.ModelViewSet):
    queryset = Cafe.objects.all()
    serializer_class = CafeSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = PageNumberPagination

    @extend_schema(
        summary="Get get working hours of cafe",
        description="User can get working hours of cafe.",
        methods=["GET"],
    )
    @action(detail=True, methods=['GET'], url_path="get-working-hours")
    def get_working_hours(self, request, pk=None):
        cafe = self.get_object()
        working_hours = CafeWorkingHours.objects.filter(cafe=cafe)
        serializer = CafeWorkingHoursSerializer(working_hours, many=True)
        return Response(serializer.data, status=200)

    def get_serializer_class(self):
        if self.action == 'list':
            return CafeListSerializer
        if self.action == 'retrieve':
            return CafeDetailSerializer
        return CafeSerializer

    @staticmethod
    def _params_to_ints(qs):
        """Converts a list of string IDs to a list of integers"""
        try:
            return [int(str_id) for str_id in qs.split(",")]
        except ValueError:
            raise ValidationError(code=400, detail="Not a valid list of IDs")

    def get_queryset(self):
        queryset = self.queryset
        name = self.request.query_params.get("name", None)
        address = self.request.query_params.get("address", None)
        type_ids = self.request.query_params.get("types", None)
        cuisine_ids = self.request.query_params.get("cuisines", None)
        metro_ids = self.request.query_params.get("metroes", None)
        feature_ids = self.request.query_params.get("features", None)
        ordering = self.request.query_params.get("ordering", None)

        if name:
            queryset = queryset.filter(name__icontains=name)
        if address:
            queryset = queryset.filter(address__icontains=address)
        if type_ids:
            type_ids = self._params_to_ints(type_ids)
            queryset = queryset.filter(type__in=type_ids)
        if cuisine_ids:
            cuisines = self._params_to_ints(cuisine_ids)
            queryset = queryset.filter(cuisine__in=cuisines)
        if feature_ids:
            feature_ids = self._params_to_ints(feature_ids)
            queryset = queryset.filter(features__in=feature_ids)
        if metro_ids:
            metro_ids = self._params_to_ints(metro_ids)
            queryset = queryset.filter(metro__in=metro_ids)
        if ordering:
            try:
                queryset = queryset.order_by(ordering)
            except FieldError:
                raise ValidationError(code=400, detail="Invalid ordering")

        return queryset.distinct().annotate(
            mark=(Avg("reviews__mark"))
        )

    @extend_schema(
        summary="Get list of cafes",
        description="User can get a list of cafes.",
        methods=["GET"],
        parameters=[
            OpenApiParameter(
                name="type_ids",
                description="Filter by cafe type ids (ex. ?type_ids=2,3)",
                required=False,
                type={"type": "array", "items": {"type": "integer"}},
            ),
            OpenApiParameter(
                name="cuisine_ids",
                description="Filter by cafe cuisines ids (ex. ?cuisine_ids=1,3,6)",
                required=False,
                type={"type": "array", "items": {"type": "integer"}},
            ),
            OpenApiParameter(
                name="feature_ids",
                description="Filter by cafe feature ids (ex. ?feature_ids=5,7,9)",
                required=False,
                type={"type": "array", "items": {"type": "integer"}},
            ),
            OpenApiParameter(
                name="metro_ids",
                description="Filter by cafe metro ids (ex. ?metro_ids=5,7,9)",
                required=False,
                type={"type": "array", "items": {"type": "integer"}},
            ),
            OpenApiParameter(
                name="name", description="Filter by name", required=False, type=str
            ),
            OpenApiParameter(
                name="address", description="Filter by address", required=False, type=str
            ),
            OpenApiParameter(
                name="ordering", description="Ordering cafes", required=False, type=str
            ),
        ],
        examples=[
            OpenApiExample(
                "Example 1",
                value={
                    "type_ids": "1,2,7",
                    "cuisine_ids": "1,6,8",
                    "feature_ids": "5,8",
                    "metro_ids": "3",
                },
            ),
            OpenApiExample(
                "Example 2",
                value={
                    "name": "Fenix",
                    "feature_ids": "5,8",
                    "metro_ids": "3",
                    "address": "Джона Маккейна",
                },
            )
        ],
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


@extend_schema_view(
    retrieve=extend_schema(
        summary="Retrieve a certain review",
        description="User can get a review about cafe.",
    ),
    create=extend_schema(
        summary="Create a review",
        description="User with verified email can create a review.",
    ),
    update=extend_schema(
        summary="Update a the review",
        description="User can update his own review.",
    ),
    partial_update=extend_schema(
        summary="Partial update a review",
        description="User can make partial update his own review.",
    ),
    destroy=extend_schema(
        summary="Delete a certain review",
        description="User can delete his review.",
    ),
)
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsReadOnlyOrEmailVerified]

    def get_queryset(self):
        queryset = self.queryset
        cafe_id = self.request.query_params.get("cafe", None)

        if cafe_id:
            queryset = queryset.filter(cafe_id=cafe_id)

        return queryset.prefetch_related("images")

    @extend_schema(
        summary="Get list of reviews",
        description="User can get a list of reviews.",
        methods=["GET"],
        parameters=[
            OpenApiParameter(
                name="cafe_id", description="Filtering by id of cafe", required=False, type=str
            ),
        ],
        examples=[
            OpenApiExample(
                "Example 1",
                value={
                    "cafe_id": 4,
                },
            )
        ],
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


@extend_schema(
    summary="Get filters for cafes",
    description="User filters for filtering cafes.",
    methods=["GET"],
)
@api_view(["GET"])
def get_filters_view(request, *args, **kwargs):
    return Response(
        {
            "metro": {
                "green": MetroSerializer(Metro.objects.filter(line__name=1), many=True).data,
                "red": MetroSerializer(Metro.objects.filter(line_id=2), many=True).data,
                "blue": MetroSerializer(Metro.objects.filter(line_id=3), many=True).data,
            },
            "features": FeatureSerializer(Feature.objects.all(), many=True).data,
            "cafe_types": EstablishmentTypeSerializer(EstablishmentType.objects.all(), many=True).data,
            "cuisine": CuisineSerializer(Cuisine.objects.all(), many=True).data
        },
        status=200,
    )
