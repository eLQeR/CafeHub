from django.contrib.auth.decorators import login_required
from rest_framework import generics
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

@login_required
@api_view(["GET"])
def verify_email(request, verification_uuid):
    user = get_object_or_404(get_user_model(), verification_uuid=verification_uuid)
    user.is_email_verified = True
    user.save()
    return Response(data="Your email has been verified", status=200)

