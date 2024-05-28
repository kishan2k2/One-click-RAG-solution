from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class userModel(models.Model):
    userName = models.CharField(max_length = 50)
    APIkey = models.CharField(max_length=50)
    instructions = models.CharField(max_length=255)
