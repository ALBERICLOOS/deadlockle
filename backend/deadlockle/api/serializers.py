import base64

from rest_framework import serializers
from .models import Hero, Ability


class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ["id", "name", "image"]


class AbilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ability
        fields = ["id", "hero", "name", "image"]


class HeroDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = "__all__"


class AbilityDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ability
        fields = "__all__"


class DailyAbilitySerializer(serializers.ModelSerializer):
    image_base64 = serializers.SerializerMethodField()

    class Meta:
        model = Ability
        fields = ["image_base64"]

    def get_image_base64(self, obj):
        with obj.image.open("rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')


class GuessSerializer(serializers.Serializer):
    hero_id = serializers.IntegerField()
