from django.contrib.auth import get_user_model
from rest_framework import serializers
from .task import send_verification_email
from django.urls import reverse
import uuid
from token_generator import account_activation_token

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "email",
            "password",
            "avatar",
            "bio",
            "is_staff"
        )
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {"password": {"write_only": True, "min_length": 5}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        user.verification_uuid = uuid.uuid4()
        verification_link = f"http://{self.context['request'].get_host()}/api/user/me/"
        send_verification_email(user.id, verification_link)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "profile_image", "email", "is_staff")
