# Generated by Django 5.0.6 on 2024-05-30 12:19

import cafe_api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cafe_api', '0010_cuisine_establishmenttype_alter_cafe_cuisine_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gallery',
            name='image',
            field=models.ImageField(upload_to=cafe_api.models.cafe_images_path),
        ),
        migrations.AlterField(
            model_name='reviewimage',
            name='image',
            field=models.ImageField(upload_to=cafe_api.models.review_images_path),
        ),
    ]
