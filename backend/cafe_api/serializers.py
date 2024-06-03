from django.contrib.auth import get_user_model
from rest_framework import serializers
from cafe_api.models import Cafe, Feature, Gallery, Contact, Review, ReviewImage, Metro, EstablishmentType, Cuisine, CafeWorkingHours


class EstablishmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstablishmentType
        fields = ("id", "name", "slug")


class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = ("id", "name", "slug")


class CafeCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cafe
        fields = ("reviews",)


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ("id", "name")


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ("phone",)


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ("image",)


class MetroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metro
        fields = ("id", "name", "slug")


class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = ("image",)


class CafeWorkingHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = CafeWorkingHours
        fields = ("id", "cafe", "weekday", "open_hour", "close_hour")


class ReviewSerializer(serializers.ModelSerializer):
    images = ReviewImageSerializer(many=True, read_only=False)

    class Meta:
        model = Review
        fields = ("id", "mark", "cafe", "description", "images")
        extra_kwargs = {"cafe": {"write_only": True}}


class CafeSerializer(serializers.ModelSerializer):
    mark = serializers.FloatField(read_only=True)

    class Meta:
        model = Cafe
        fields = (
            "id",
            "name",
            "city",
            "address",
            "email",
            "data_created",
            "medium_check",
            "mark",
            "type",
            "cuisine",
            "metro",
            "main_photo",
            "contacts",
            "reviews"
        )


class CafeListSerializer(CafeSerializer):
    type = serializers.CharField(source="type.name", read_only=True)

    class Meta:
        model = Cafe
        fields = (
            "id",
            "name",
            "address",
            "medium_check",
            "mark",
            "type",
            "url",
            "main_photo",
        )


class CafeDetailSerializer(CafeSerializer):
    features = FeatureSerializer(many=True, read_only=True)
    images = GallerySerializer(many=True, read_only=True)
    metro = MetroSerializer(many=False, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    contacts = serializers.SlugRelatedField(slug_field="phone", read_only=True, many=True)
    cuisine = serializers.CharField(source="cuisine.name", read_only=True)
    type = serializers.CharField(source="type.name", read_only=True)

    class Meta:
        model = Cafe
        fields = (
            "id",
            "name",
            "city",
            "address",
            "email",
            "medium_check",
            "mark",
            "description",
            "type",
            "cuisine",
            "metro",
            "main_photo",
            "contacts",
            "features",
            "images",
            "reviews"
        )
