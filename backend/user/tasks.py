from django.core.mail import send_mail
from Cafe_system.settings import EMAIL_HOST_USER
from celery import shared_task


@shared_task
def send_verification_email(verification_uuid, user_email):
    full_verification_link = f"http://localhost:3000/verify-email/?uuid={verification_uuid}"
    message = f"Please click on the link to verify your email: {full_verification_link}"
    send_mail(
        "Verify your email",
        message,
        EMAIL_HOST_USER,
        [user_email],
        fail_silently=False,
    )
