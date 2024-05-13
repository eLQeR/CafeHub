from django.db import models


class Cafe(models.Model):
    class Metro(models.TextChoices):
        Zhytomyrska = "Житомирська", "Zhytomyrska"
        Sviatoshyno = "Святошин", "Sviatoshyno"
        Nyvky = "Нивки", "Nyvky"
        Beresteiska = "Берестейська", "Beresteiska"
        Shuliavska = "Шулявська", "Shuliavska"
        Vokzalna = "Вокзальна", "Vokzalna"
        Universytet = "Університет", "Universytet"
        Teatralna = "Театральна", "Teatralna"
        Khreshchatyk = "Хрещатик", "Khreshchatyk"
        Arsenalna = "Арсенальна", "Arsenalna"
        Dnipro = "Дніпро", "Dnipro"
        Hidropark = "Гідропарк", "Hidropark"
        Livoberezhna = "Лівобережна", "Livoberezhna"
        Darnytsia = "Дарниця", "Darnytsia"
        Chernihivska = "Чернігівська", "Chernihivska"
        Lisova = "Лісова", "Lisova"
        Obolon = "Оболонь", "Obolon"

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

    name = models.CharField(max_length=155)
    city = models.CharField(max_length=155)
    address = models.CharField(max_length=155)
    email = models.EmailField(max_length=155)
    data_created = models.DateField()
    medium_check = models.PositiveIntegerField(null=True, blank=True)
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
    metro = models.CharField(
        max_length=155,
        choices=Metro.choices,
        null=True,
        blank=True
    )
    main_photo = models.ImageField(
        upload_to="uploads/main_photos/",
        default="uploads/main_photos/default.jpg"
    )


class Contact(models.Model):
    phone = models.CharField(max_length=155)
    cafe = models.ForeignKey(to=Cafe, on_delete=models.CASCADE)


class Feature:
    name = models.CharField(max_length=155, unique=True)
