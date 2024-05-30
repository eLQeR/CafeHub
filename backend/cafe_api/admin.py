from django.contrib import admin
from cafe_api.models import Cafe, Contact, Feature, Gallery, Review, Metro, LineOfMetro, ReviewImage

models = [Contact, Feature, Metro, LineOfMetro]
for model in models:
    admin.site.register(model)

class ReviewImageInline(admin.TabularInline):
    fk_name = 'review'
    model = ReviewImage
    extra = 5

@admin.register(Review)
class ProductAdmin(admin.ModelAdmin):
    exclude = ["article"]
    inlines = [ReviewImageInline]


class GalleryInline(admin.TabularInline):
    fk_name = 'cafe'
    model = Gallery
    extra = 5


@admin.register(Cafe)
class ProductAdmin(admin.ModelAdmin):
    exclude = ["article"]
    inlines = [GalleryInline]