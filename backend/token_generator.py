from django.contrib.auth.tokens import PasswordResetTokenGenerator


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):

    def _make_hash_value(self, user, timestamp):
        return f"{user.pk}{timestamp}{user.is_email_verified}{user.password}"


account_activation_token = AccountActivationTokenGenerator()
