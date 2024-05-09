from django.urls import path
from . import views
urlpatterns = [
    path('', views.home),
    path('register/', views.register),
    path('login/', views.login),
    path('forgotPass/', views.forgotPass),
    path('pdfInput/', views.pdfInput),
    path('askLLM/<str:APIkey>', views.askLLM),
]