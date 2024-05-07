from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as Login
import random, smtplib, os
def register(request):
    response = {}
    if request.meathod == 'POST':
        userName = request.POST.get('userName')
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = User.objects.filter(username = userName)
        capitalAlphabets="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        smallAlphabets="abcdefghijklmnopqrstuvwxyz"
        specialChar="$@_"
        digits="0123456789"
        if(user.exists()):
            response = {
                'response': 'User already exist'
            }
            return JsonResponse(response, status=400)
        elif password not in capitalAlphabets and smallAlphabets and specialChar and digits:
            response = {
                'response': 'Pick a strong passord'
            }
        user = User.objects.create_user(
            username = userName,
            email = email
        )
        user.set_password(password)
        user.save()
        response = {
            'response':'User created'
        }
        return JsonResponse(response, status=400)
    else:
        response = {
            'response': 'Only Post request is allowed'
        }
        return JsonResponse(response, status=400)
def login(request):
    response = {}
    if request.method == 'POST':
        userName = request.POST.get('userName')
        password = request.POST.get('password')
        user = User.objects.filter(username = userName)
        if not user.exists:
            response = {
                'response': 'User dont exist'
            }
            return JsonResponse(response, status=400)
        user = authenticate(username = userName, password = password)
        if user is None:
            response = {
                'response': 'Invalid Password'
            }
            return JsonResponse(response, status=400)
        Login(request, user)
        response = {
            'response': 'Login sucessfull'
        }
        return JsonResponse(response, status=400)
    else:
        response = {
            'response': 'only POST method accepted',
            'API-key': str(hash(userName)),
        }
        return JsonResponse(response, status=400) 
    



def forgotPass():
    pass

def pdfInput():
    pass

def askLLM():
    pass