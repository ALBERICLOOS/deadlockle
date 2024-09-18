from random import choice

from django.utils import timezone

from .models import DailyHero, Hero


def get_or_create_daily_hero():
    today = timezone.now().date()
    try:
        daily_hero = DailyHero.objects.get(date=today)
    except DailyHero.DoesNotExist:
        hero = choice(Hero.objects.all())
        daily_hero = DailyHero.objects.create(hero=hero, date=today)
    return daily_hero