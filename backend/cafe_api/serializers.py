from decimal import Decimal

from django.contrib.auth import get_user_model
from rest_framework import serializers
from cafe_api.models import Cafe, Feature, Gallery, Contact, Review, ReviewImage, Metro


class CafeSerializer(serializers.ModelSerializer):
    mark = serializers.IntegerField(
        min_value=1,
        max_value=5,
        read_only=True
    )

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

    class Meta:
        model = Cafe
        fields = (
            "id",
            "name",
            "address",
            "medium_check",
            "mark",
            "type",
            "metro",
            "main_photo",
            "reviews"
        )


class CafeCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cafe
        fields = ("reviews", )


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ("id", "name")


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ("phone", )


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ("image", )


class CafeDetailSerializer(CafeSerializer):
    contacts = serializers.SlugRelatedField(slug_field="phone", read_only=True, many=True)
    features = FeatureSerializer(many=True, read_only=True)
    images = GallerySerializer(many=True, read_only=True)

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
            "type",
            "cuisine",
            "metro",
            "main_photo",
            "contacts",
            "features",
            "images"
        )


class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = ("image", )

class ReviewSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = ("id", "mark", "cafe", "description", "images")

class MetroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metro
        fields = "__all__"
