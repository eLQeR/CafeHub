from django.contrib import admin
from cafe_api.models import (
    Cafe,
    Contact,
    Feature,
    Gallery,
    Review,
    Metro,
    LineOfMetro,
    ReviewImage,
    CafeWorkingHours,
    Cuisine,
    EstablishmentType
)

models = [Contact, Feature, Metro, LineOfMetro, Cuisine, EstablishmentType]
for model in models:
    admin.site.register(model)


class CafeWorkingHoursAdmin(admin.ModelAdmin):
    list_display = ('cafe', 'weekday', 'open_hour', 'close_hour')
    list_filter = ('weekday', 'cafe')


admin.site.register(CafeWorkingHours, CafeWorkingHoursAdmin)


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