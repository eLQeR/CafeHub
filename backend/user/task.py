from celery import shared_task
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse_lazy
from token_generator import account_activation_token
from Cafe_system.celery import app
from Cafe_system.settings import EMAIL_HOST_USER
from .models import User


@app.task
def send_verification_email(user_id):
    user = User.objects.get(pk=user_id)
    verification_link = reverse('user:verify-email', kwargs={'verification_uuid': str(user.verification_uuid)})
    full_verification_link = f"http://127.0.0.1:8000/{verification_link}"
    message = f"Please click on the link to verify your email: {full_verification_link}"
    send_mail(
        "Verify your email",
        message,
        EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )
