from django.urls import path
from . import views
urlpatterns = [
    path('', views.home),
    path('register/', views.register),
    path('login/', views.login),
    path('forgotPass/', views.forgotPass),
    path('confirm/', views.confirm),
    path('resetPass/', views.resetPass),
    path('pdfInput_VectorDB/', views.pdfInput_VectorDB),
    path('askLLM/<str:APIkey>', views.askLLM),
]