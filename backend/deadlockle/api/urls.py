from django.urls import path
from . import views


urlpatterns = [
    path("heroes/", views.HeroList.as_view(), name="hero-list"),
    path("heroes/<int:pk>/", views.HeroDetail.as_view(), name="hero-detail"),

    path("abilities/", views.AbilityList.as_view(), name="ability-list"),
    path("abilities/<int:pk>/", views.AbilityDetail.as_view(), name="ability-detail"),

    path("guess/hero/", views.GuessHero.as_view(), name="guess-hero"),
    path("guess/ability/", views.GuessAbility.as_view(), name="guess-ability"),

    path("daily/ability/", views.GetDailyAbility.as_view(), name="daily-ability"),
]
