from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as Login
from django.views.decorators.http import require_http_methods
import random, smtplib, os
def home(request):
    return render(request, 'index.html')
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
def forgotPass(request):
    response = {}
    if request.method == 'POST':
        global userName
        userName = request.POST.get('userName')
        if not User.objects.filter(username = userName).exists():
            response = {
                'response': "UserName doesn't exist"
            }
            return response
        user = User.objects.get(username = userName)
        email = user.email
        global OTP
        OTP = random.randint(1000, 99999)
        sendEmail(email, OTP)
        response = {
            'response': "Email sent",
            'userName': userName,
            'OTP': OTP
        }
        return response    
def sendEmail(email, OTP):
    password = os.environ.get('password')
    subject = 'Reset Pass OTP'
    text = OTP
    message = 'Subject: {}\n\n{}'.format(subject, text)
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login('payadikishan@gmail.com', password)
    server.sendmail('payadikishan@gmail.com', email, message)
@require_http_methods(['POST'])
def confirm(request):
    resposne = {}
    comp = request.POST.get('OTP')
    if comp == OTP:
        response = {
            'response': 'OTP confirmed'
        }
        return JsonResponse(resposne)
    else:
        response = {
            'response': "OTP didn't match"
        }
        return JsonResponse(response)
@require_http_methods['POST']
def resetPass(request):
    password1 = request.POST.get('password1')
    password2 = request.POST.get('password2')
    response = {}
    if password1 != password2: 
        response = {
            'response': "Password doesn't match try again"
        }
        return response
    user = User.objects.filter(username=userName)
    user.savepassword(password1)
    user.save()
    response = {
        'response': "The password has been updated"
    }
    return response 

def pdfInput():
    pass

def askLLM():
    pass