from django.contrib import admin
from cafe_api.models import Cafe, Contact, Feature, Gallery, Review, Metro, LineOfMetro, ReviewImage

models = [Cafe, Contact, Feature, Gallery, Metro, LineOfMetro]
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
