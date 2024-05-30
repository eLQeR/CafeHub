import pathlib
import uuid
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.text import slugify


class Feature(models.Model):
    name = models.CharField(max_length=155, unique=True)

    def __str__(self):
        return self.name


class LineOfMetro(models.Model):
    name = models.CharField(max_length=155, unique=True)

    def __str__(self):
        return self.name


class Metro(models.Model):
    name = models.CharField(max_length=155, unique=True)
    slug = models.SlugField(max_length=155, unique=True)
    line = models.ForeignKey(LineOfMetro, on_delete=models.CASCADE, related_name='metroes')

    def __str__(self):
        return self.name


class Cuisine(models.Model):
    name = models.CharField(max_length=155, unique=True)
    slug = models.SlugField(max_length=155, unique=True)

    def __str__(self):
        return self.name


class EstablishmentType(models.Model):
    name = models.CharField(max_length=155, unique=True)
    slug = models.SlugField(max_length=155, unique=True)

    def __str__(self):
        return self.name


class Cafe(models.Model):
    name = models.CharField(max_length=155)
    city = models.CharField(max_length=155)
    address = models.CharField(max_length=155)
    email = models.EmailField(max_length=155)
    data_created = models.DateField()
    medium_check = models.PositiveIntegerField(null=True, blank=True)
    features = models.ManyToManyField(to=Feature, blank=True)
    url = models.SlugField(max_length=255, unique=True)
    type = models.ForeignKey(to=EstablishmentType, on_delete=models.CASCADE, related_name="cafes")
    cuisine = models.ForeignKey(to=Cuisine, on_delete=models.CASCADE, related_name="cafes")
    metro = models.ForeignKey(
        to=Metro,
        on_delete=models.CASCADE,
        related_name="cafes",
        null=True,
        blank=True
    )
    main_photo = models.ImageField(
        upload_to="uploads/main_photos/",
        default="uploads/main_photos/default.jpg"
    )
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def reviews_count(self):
        return Review.objects.filter(cafe=self).count()

    @property
    def average_review(self):
        return round(sum(self.reviews.all()) / self.reviews_count, 2)


class Contact(models.Model):
    phone = models.CharField(max_length=155)
    cafe = models.ForeignKey(to=Cafe, on_delete=models.CASCADE, related_name="contacts")

    def __str__(self):
        return f"{self.phone} - {self.cafe.name}"


def cafe_images_path(instance: "Gallery", filename: str) -> pathlib.Path:
    filename = f"{slugify(instance.id)}-{uuid.uuid4()}" + pathlib.Path(filename).suffix
    return pathlib.Path("uploads/cafe/gallery/") / pathlib.Path(filename)


class Gallery(models.Model):
    image = models.ImageField(upload_to=cafe_images_path)
    cafe = models.ForeignKey(to=Cafe, on_delete=models.CASCADE, related_name="images")

    def __str__(self):
        return f"{self.cafe.name} - {self.image.name}"


class Review(models.Model):
    mark = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    cafe = models.ForeignKey(to=Cafe, on_delete=models.CASCADE, related_name="reviews")
    data_created = models.DateTimeField(auto_now_add=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.mark} - {self.cafe.name}"


def review_images_path(instance: "ReviewImage", filename: str) -> pathlib.Path:
    filename = f"{slugify(filename)}-{uuid.uuid4()}" + pathlib.Path(filename).suffix
    return pathlib.Path("uploads/cafe/reviews/") / pathlib.Path(filename)


class ReviewImage(models.Model):
    review = models.ForeignKey(to=Review, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=review_images_path)
