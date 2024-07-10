from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(
            (request.method in SAFE_METHODS) or (request.user and request.user.is_staff)
        )


class IsReadOnlyOrEmailVerified(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(
            view.action == "create" and (
                request.user and request.user.is_authenticated
                and request.user.is_email_verified
            )
        )
