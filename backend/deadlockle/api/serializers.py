from rest_framework import serializers
from .models import Hero


class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ["id", "name", "image"]


class HeroDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = "__all__"


class GuessSerializer(serializers.Serializer):
    hero_id = serializers.IntegerField()


