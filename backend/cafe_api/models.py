import pathlib
import uuid

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.text import slugify


class Feature(models.Model):
    name = models.CharField(max_length=155, unique=True)


class Metro(models.Model):
    name = models.CharField(max_length=155, unique=True)
    short_name = models.CharField(max_length=155, unique=True)
    slug = models.SlugField(max_length=155, unique=True)

    def __str__(self):
        return self.name


class Cafe(models.Model):

    class Cuisine(models.TextChoices):
        Japanese = ("Японська", "Japanese")
        Italian = ("Італійська", "Italian")
        French = ("Французька", "French")
        Chinese = ("Китайська", "Chinese")
        Indian = ("Індійська", "Indian")
        Mexican = ("Мексиканська", "Mexican")
        Thai = ("Тайська", "Thai")
        Greek = ("Грецька", "Greek")
        Spanish = ("Іспанська", "Spanish")
        Ukrainian = ("Українська", "Ukrainian")

    class EstablishmentType(models.TextChoices):
        Bar = ("Бар", "Bar")
        Restaurant = ("Ресторан", "Restaurant")
        Cafe = ("Кафе", "Cafe")
        Pub = ("Паб", "Pub")
        Pizzeria = ("Піцерія", "Pizzeria")
        Bakery = ("Пекарня", "Bakery")

    name = models.CharField(max_length=155)
    city = models.CharField(max_length=155)
    address = models.CharField(max_length=155)
    email = models.EmailField(max_length=155)
    data_created = models.DateField()
    medium_check = models.PositiveIntegerField(null=True, blank=True)
    features = models.ManyToManyField(to=Feature, blank=True)
    url = models.SlugField(max_length=255, unique=True)
    type = models.CharField(
        max_length=155,
        choices=EstablishmentType.choices,
        default=EstablishmentType.Cafe
    )
    сuisine = models.CharField(
        max_length=155,
        choices=Cuisine.choices,
        null=True,
        blank=True
    )
    metro = models.ForeignKey(
        to=Metro,
        on_delete=models.CASCADE,
        related_name="cafes",
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


def cafe_images_path(instance: "Gallery", filename: str) -> pathlib.Path:
    filename = f"{slugify(instance.id)}-{uuid.uuid4()}" + pathlib.Path(filename).suffix
    return pathlib.Path("uploads/cafe/gallery/") / pathlib.Path(filename)


class Gallery(models.Model):
    image = models.ImageField()
    cafe = models.ForeignKey(to=Cafe, on_delete=models.CASCADE, related_name="images")

    def __str__(self):
        return f"{self.cafe.name} - {self.image.name}"


class Review(models.Model):
    mark = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    cafe = models.ForeignKey(to=Cafe, on_delete=models.CASCADE, related_name="reviews")
    data_created = models.DateTimeField(auto_now_add=True)
    description = models.TextField(null=True, blank=True)


def review_images_path(instance: "ReviewImage", filename: str) -> pathlib.Path:
    filename = f"{slugify(filename)}-{uuid.uuid4()}" + pathlib.Path(filename).suffix
    return pathlib.Path("uploads/cafe/reviews/") / pathlib.Path(filename)


class ReviewImage(models.Model):
    review = models.ForeignKey(to=Review, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField()
