# Generated by Django 5.0.6 on 2024-05-21 10:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cafe_api', '0005_cafe_description_alter_cafe_type_review_reviewimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='Metro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=155, unique=True)),
                ('short_name', models.CharField(max_length=155, unique=True)),
                ('slug', models.SlugField(max_length=155, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='cafe',
            name='url',
            field=models.SlugField(default=1, max_length=255, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='review',
            name='data_created',
            field=models.DateTimeField(auto_now_add=True, default="2002-01-01"),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='cafe',
            name='metro',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='cafes', to='cafe_api.metro'),
            preserve_default=False,
        ),
    ]
