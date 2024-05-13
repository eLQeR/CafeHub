from celery import shared_task
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from token_generator import account_activation_token


@shared_task
def send_verification_email(user_id, domain):
    from .models import User
    user = User.objects.get(pk=user_id)
    token = account_activation_token.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    url = f"https://{domain}{reverse('activate', kwargs={'uidb64': uid, 'token': token})}"
    message = f"Please click on the link to verify your email: {url}"
    send_mail(
        "Verify your email",
        message,
        "from@example.com",
        [user.email],
        fail_silently=False,
    )
