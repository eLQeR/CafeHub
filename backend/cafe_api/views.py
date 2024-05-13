from django.shortcuts import render
from rest_framework import generics, mixins, viewsets

from cafe_api.models import Cafe
from cafe_api.serializers import CafeSerializer, CafeListSerializer, CafeDetailSerializer


class CafeViewSet(viewsets.ModelViewSet):
    queryset = Cafe.objects.all()
    serializer_class = CafeSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return CafeListSerializer
        if self.action == 'retrieve':
            return CafeDetailSerializer
        return CafeSerializer

    def get_queryset(self):
        queryset = self.queryset
        name = self.request.query_params.get("name", None)
        type = self.request.query_params.get("type", None)
        address = self.request.query_params.get("address", None)

        if name:
            queryset = queryset.filter(name__icontains=name)
        if address:
            queryset = queryset.filter(address__icontains=address)
        if type:
            queryset = queryset.filter(type=type)
        return queryset
