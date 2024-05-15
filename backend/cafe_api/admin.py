from django.contrib import admin
from .models import Cafe, Contact, Feature, Gallery, Review

models = [Cafe, Contact, Feature, Gallery, Review]
for model in models:
    admin.site.register(model)
