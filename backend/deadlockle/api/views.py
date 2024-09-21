from rest_framework import generics, status
from rest_framework.response import Response

from .helpers import get_or_create_daily_hero, get_or_create_daily_ability
from .models import Hero, Ability
from .serializers import HeroSerializer, GuessSerializer, HeroDetailSerializer, \
    AbilitySerializer, AbilityDetailSerializer, DailyAbilitySerializer


class HeroList(generics.ListAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer


class AbilityList(generics.ListAPIView):
    queryset = Ability.objects.all()
    serializer_class = AbilitySerializer


class HeroDetail(generics.RetrieveAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroDetailSerializer


class AbilityDetail(generics.RetrieveAPIView):
    queryset = Ability.objects.all()
    serializer_class = AbilityDetailSerializer


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
                guessed_hero.hero_guesses += 1
                guessed_hero.save()
                if daily_hero.id == guessed_hero_id:
                    return Response(
                        {
                         "guess": True,
                         "name": guessed_hero.name == daily_hero_full.name,
                         "gender": guessed_hero.gender == daily_hero_full.gender,
                         "type": guessed_hero.type == daily_hero_full.type,
                         "release_year": guessed_hero.release_year == daily_hero_full.release_year,
                         "total_guesses": guessed_hero.hero_guesses,
                         }
                        , status=status.HTTP_200_OK)
                return Response(
                    {
                        "guess": False,
                        "name": guessed_hero.name == daily_hero_full.name,
                        "gender": guessed_hero.gender == daily_hero_full.gender,
                        "type": guessed_hero.type == daily_hero_full.type,
                        "release_year": guessed_hero.release_year == daily_hero_full.release_year,
                        "total_guesses": guessed_hero.hero_guesses,
                    }
                    , status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Hero.DoesNotExist:
            return Response({"error": "Hero does not exist."}, status=status.HTTP_400_BAD_REQUEST)


class GuessAbility(generics.UpdateAPIView):
    serializer_class = GuessSerializer
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                guessed_hero_id = serializer.validated_data['hero_id']
                try:
                    guessed_hero = Hero.objects.get(id=guessed_hero_id)
                    daily_ability = get_or_create_daily_ability()
                    real_hero_id = daily_ability.ability.hero.id
                    guessed_hero.ability_guesses += 1
                    guessed_hero.save()
                    if guessed_hero_id == real_hero_id:
                        return Response(
                            {
                             "guess": True,
                             "total_guesses": guessed_hero.ability_guesses,
                             }
                            , status=status.HTTP_200_OK)
                    return Response(
                        {
                            "guess": False,
                            "total_guesses": guessed_hero.ability_guesses,
                            }
                            , status=status.HTTP_200_OK)
                except Hero.DoesNotExist:
                    return Response({"error": "Hero does not exist."}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Ability.DoesNotExist:
            return Response({"error": "Ability does not exist."}, status=status.HTTP_400_BAD_REQUEST)


class GetDailyAbility(generics.RetrieveAPIView):
    serializer_class = DailyAbilitySerializer

    def get_object(self):
        return get_or_create_daily_ability().ability
