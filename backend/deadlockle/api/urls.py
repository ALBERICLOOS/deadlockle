from django.urls import path
from . import views


urlpatterns = [
    path("heroes/", views.HeroList.as_view(), name="hero-list"),
    path("heroes/<int:pk>/", views.HeroDetail.as_view(), name="hero-detail"),
    path("guess/hero/", views.GuessHero.as_view(), name="guess-hero"),
]
