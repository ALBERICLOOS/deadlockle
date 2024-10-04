from datetime import timedelta
from random import choice

from django.core.management.base import BaseCommand
from django.utils import timezone

from api.models import Hero, DailyHero, Ability, DailyAbility


class Command(BaseCommand):
    help = 'Choose the Ability for tomorrow'

    def handle(self, *args, **kwargs):
        today = timezone.now().date()
        tomorrow = today + timedelta(days=1)

        new_ability = choice(Ability.objects.exclude(dailyability__date=tomorrow))

        try:
            DailyAbility.objects.create(ability=new_ability, date=tomorrow)
        except Exception as e:
            self.stdout.write(self.style.ERROR(
                f'An error occurred: {e}.'))
            return

        self.stdout.write(self.style.SUCCESS(
            f'Ability for {tomorrow} is {new_ability.name} from {new_ability.hero.name}.'))
