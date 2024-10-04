from django.core.management.base import BaseCommand
from django.utils import timezone

from api.models import Hero


class Command(BaseCommand):
    help = 'Reset guess attempts for each hero to zero'

    def handle(self, *args, **kwargs):
        today = timezone.now().date()

        # Reset hero guess attempts
        Hero.objects.all().update(hero_guesses=0, ability_guesses=0)

        # Log the reset action
        self.stdout.write(self.style.SUCCESS(
            f'Successfully reset guess attempts for all heroes on {today}.'))
