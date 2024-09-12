from django.db import models
from django.utils import timezone


class Hero(models.Model):
    name = models.CharField(max_length=20)
    gender = models.CharField(max_length=1)
    type = models.CharField(max_length=20)
    release_year = models.IntegerField()
    image = models.ImageField(upload_to="heroes/", default="heroes/default.png")

    def __str__(self):
        return self.name


class DailyHero(models.Model):
    hero = models.ForeignKey(Hero, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now, unique=True)
    amount_of_people = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.hero.name} - {self.date}"



