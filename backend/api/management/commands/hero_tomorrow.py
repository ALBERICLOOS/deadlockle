from datetime import timedelta
from random import choice

from django.core.management.base import BaseCommand
from django.utils import timezone

from api.models import Hero, DailyHero


class Command(BaseCommand):
    help = 'Choose the Hero for tomorrow'

    def handle(self, *args, **kwargs):
        today = timezone.now().date()

        # Calculate tomorrow's date
        tomorrow = today + timedelta(days=1)

        # Ensure a new hero is selected for tomorrow
        new_hero = choice(Hero.objects.exclude(dailyhero__date=tomorrow))

        # Create the DailyHero entry for tomorrow
        try:
            DailyHero.objects.create(hero=new_hero, date=tomorrow)
        except Exception as e:
            self.stdout.write(self.style.ERROR(
                f'An error occurred: {e}.'))
            return

        self.stdout.write(self.style.SUCCESS(
            f'Hero for {tomorrow} is {new_hero.name}.'))
