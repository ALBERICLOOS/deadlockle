from random import choice

from django.utils import timezone
from rest_framework import generics, status
from rest_framework.response import Response

from .models import Hero, DailyHero
from .serializers import HeroSerializer, GuessSerializer, HeroDetailSerializer


def get_or_create_daily_hero():
    today = timezone.now().date()
    try:
        daily_hero = DailyHero.objects.get(date=today)
    except DailyHero.DoesNotExist:
        hero = choice(Hero.objects.all())
        daily_hero = DailyHero.objects.create(hero=hero, date=today)
    return daily_hero


class HeroList(generics.ListAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer


class HeroDetail(generics.RetrieveAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroDetailSerializer


class GuessHero(generics.UpdateAPIView):
    serializer_class = GuessSerializer
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                guessed_hero_id = serializer.validated_data['hero_id']
                daily_hero = get_or_create_daily_hero()
                guessed_hero = Hero.objects.get(id=guessed_hero_id)
                daily_hero_full = Hero.objects.get(id=daily_hero.hero.id)
                if daily_hero.id == guessed_hero_id:
                    daily_hero.amount_of_people += 1
                    daily_hero.save()
                    return Response(
                        {
                         "guess": True,
                         "name": guessed_hero.name == daily_hero_full.name,
                         "gender": guessed_hero.gender == daily_hero_full.gender,
                         "type": guessed_hero.type == daily_hero_full.type,
                         "release_year": guessed_hero.release_year == daily_hero_full.release_year,
                         "total_right_guesses": daily_hero.amount_of_people,
                         }
                        , status=status.HTTP_200_OK)
                return Response(
                    {
                        "guess": False,
                        "name": guessed_hero.name == daily_hero_full.name,
                        "gender": guessed_hero.gender == daily_hero_full.gender,
                        "type": guessed_hero.type == daily_hero_full.type,
                        "release_year": guessed_hero.release_year == daily_hero_full.release_year,
                        "total_right_guesses": daily_hero.amount_of_people,
                    }
                    , status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Hero.DoesNotExist:
            return Response({"error": "Hero does not exist."}, status=status.HTTP_400_BAD_REQUEST)




