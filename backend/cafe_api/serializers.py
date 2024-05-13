from django.contrib.auth import get_user_model
from rest_framework import serializers
from cafe_api.models import Cafe, Feature, Gallery, Contact


class CafeSerializer(serializers.ModelSerializer):
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
            "type",
            "сuisine",
            "metro",
            "main_photo",
            "contacts"
        )


class CafeListSerializer(CafeSerializer):
    class Meta:
        model = Cafe
        fields = (
            "id",
            "name",
            "address",
            "medium_check",
            "type",
            "сuisine",
            "metro",
            "main_photo",
        )


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
            "data_created",
            "medium_check",
            "type",
            "сuisine",
            "metro",
            "main_photo",
            "contacts",
            "features",
            "images"
        )
