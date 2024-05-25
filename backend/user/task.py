from celery import shared_task
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from token_generator import account_activation_token
from Cafe_system.celery import app
from Cafe_system.settings import EMAIL_HOST_USER
from .models import User


@app.task
def send_verification_email(user_id, verification_link):
    user = User.objects.get(pk=user_id)
    message = f"Please click on the link to verify your email: {verification_link}"
    send_mail(
        "Verify your email",
        message,
        EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )
