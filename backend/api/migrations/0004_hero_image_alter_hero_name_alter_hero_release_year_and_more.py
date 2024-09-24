# Generated by Django 5.1.1 on 2024-09-11 12:14

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_image_description"),
    ]

    operations = [
        migrations.AddField(
            model_name="hero",
            name="image",
            field=models.ImageField(default="images/default.png", upload_to="images/"),
        ),
        migrations.AlterField(
            model_name="hero",
            name="name",
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name="hero",
            name="release_year",
            field=models.CharField(max_length=4),
        ),
        migrations.AlterField(
            model_name="hero",
            name="type",
            field=models.CharField(max_length=20),
        ),
        migrations.DeleteModel(
            name="Image",
        ),
    ]