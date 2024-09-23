from random import choice

from django.utils import timezone

from .models import DailyHero, Hero, DailyAbility, Ability


def get_or_create_daily_hero():
    today = timezone.now().date()
    try:
        daily_hero = DailyHero.objects.get(date=today)
    except DailyHero.DoesNotExist:
        hero = choice(Hero.objects.all())
        daily_hero = DailyHero.objects.create(hero=hero, date=today)
    return daily_hero


def get_or_create_daily_ability():
    today = timezone.now().date()
    try:
        daily_ability = DailyAbility.objects.get(date=today)
    except DailyAbility.DoesNotExist:
        ability = choice(Ability.objects.all())
        daily_ability = DailyAbility.objects.create(ability=ability, date=today)
    return daily_ability