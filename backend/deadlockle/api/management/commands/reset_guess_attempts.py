from django.core.management.base import BaseCommand
from django.utils import timezone

from api.models import Hero


class Command(BaseCommand):
    help = 'Reset guess attempts for each hero to zero'

    def handle(self, *args, **kwargs):
        today = timezone.now().date()
        Hero.objects.all().update(hero_guess_attempts=0)
        Hero.objects.all().update(ability_guess_attempts=0)
        self.stdout.write(self.style.SUCCESS(
            f'Successfully reset guess attempts for all heroes on {today}.'))
