from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.urls import reverse
from .serializers import UserSerializer
from django.shortcuts import render, redirect
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator as token_generator
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth import get_user_model


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


def verify_email(request, verification_uuid):
    user = get_user_model().objects.get(verification_uuid=verification_uuid)
    user.is_email_verified = True
    user.save()
    messages.success(request, 'Your email has been verified.')
    return redirect('manage')
