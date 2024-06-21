from django.contrib.auth.decorators import login_required
from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404


@extend_schema_view(
    post=extend_schema(
        summary="Create the profile",
        description="User can create his profile",
    ),
)
class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


@extend_schema_view(
    put=extend_schema(
        summary="Update the profile",
        description="User can update his personal information, "
                    "password length should be in range (5, 18)",
    ),
    patch=extend_schema(
        summary="Partial update the profile",
        description="User can make partial update of his personal information,"
                    " password length should be in range (5, 18)",
    ),
    get=extend_schema(
        summary="Get his profile",
        description="User can get his personal information",
    ),
)
class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


@extend_schema_view(
    get=extend_schema(
        summary="Verify email",
        description="User can verify his profile by email"
    )
)
@login_required
@api_view(["GET"])
def verify_email(request, verification_uuid):
    user = get_object_or_404(get_user_model(), verification_uuid=verification_uuid)
    user.is_email_verified = True
    user.save()
    return Response(data="Your email has been verified", status=200)
