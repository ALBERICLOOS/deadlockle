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


def ability_image_path(instance, filename):
    return f'abilities/{str(instance.hero.name).lower()}/{instance.key}.jpg'


class Ability(models.Model):
    hero = models.ForeignKey(Hero, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    key = models.IntegerField()
    image = models.ImageField(upload_to=ability_image_path, default="abilities/default.jpg")

    def __str__(self):
        return f"{self.name} - {self.hero.name}"


class DailyAbility(models.Model):
    ability = models.ForeignKey(Ability, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now, unique=True)
    amount_of_people = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.ability.name} - {self.date}"