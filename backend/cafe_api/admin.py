from django.contrib import admin
from .models import Cafe, Contact, Feature, Gallery

models = [Cafe, Contact, Feature, Gallery]
for model in models:
    admin.site.register(model)
