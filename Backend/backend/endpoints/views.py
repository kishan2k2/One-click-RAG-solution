from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as Login
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import random, smtplib, os
import PyPDF2
from pdfminer.high_level import extract_text
from pdfminer.pdfparser import PDFSyntaxError
from pdfminer.pdfdocument import PDFPasswordIncorrect
from django.core.cache import cache
from django.views.decorators.csrf import csrf_exempt
def home(request):
    return render(request, 'index.html')
@require_http_methods(['POST'])
@csrf_exempt
def register(request):
    response = {}
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
        return JsonResponse(response, status=200)
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
    return JsonResponse(response, status=200)    
@require_http_methods(['POST'])  
@csrf_exempt                                                                         
def login(request):
    response = {}
    userName = request.POST.get('userName')
    password = request.POST.get('password')
    user = User.objects.filter(username = userName)
    if not user.exists():
        response = {
            'response': 'User dont exist'
        }
        return JsonResponse(response, status=200)
    user = authenticate(username = userName, password = password)
    if user is None:
        response = {
            'response': 'Invalid Password'
        }
        return JsonResponse(response, status=200)
    Login(request, user)
    response = {
        'response': 'Login sucessfull'
    }
    return JsonResponse(response, status=200)
@require_http_methods(['POST'])     
@csrf_exempt   
def forgotPass(request):
    response = {}
    userName = request.POST.get('userName')
    if not User.objects.filter(username = userName).exists():
        response = {
            'response': "UserName doesn't exist"
        }
        return JsonResponse(response, status=204)
    user = User.objects.get(username = userName)
    email = user.email
    OTP = random.randint(1000, 99999)
    cache_key = 'OTP'
    cache.set(cache_key, str(OTP), timeout=3000)
    cache_key = 'userName'
    cache.set(cache_key, userName, timeout=4000)
    sendEmail(email, OTP)
    response = {
        'response': "Email sent",
    }
    return JsonResponse(response, status=200)    
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
@csrf_exempt
def confirm(request):
    resposne = {}
    comp = request.POST.get('OTP')
    OTP = cache.get('OTP')
    if comp == OTP:
        response = {
            'response': 'OTP confirmed'
        }
        return JsonResponse(response, status=200)
    else:
        response = {
            'response': "OTP didn't match",
            'OTP': OTP
        }
        return JsonResponse(response, status=204)
@require_http_methods(['POST'])
@csrf_exempt
def resetPass(request):
    response = {}
    password1 = request.POST.get('password1')
    password2 = request.POST.get('password2')
    if password1 != password2: 
        response = {
            'response': "Password doesn't match try again"
        }
        return JsonResponse(response, status=204)
    userName = cache.get('userName')
    user = User.objects.filter(username=userName).first()
    user.set_password(password1)
    user.save()
    response = {
        'response': "The password has been updated"
    }
    return JsonResponse(response, status=200)
@require_http_methods(['POST'])
@csrf_exempt
@login_required
def pdfInput_VectorDB(request):
    response = {}
    if 'pdfFile' in request.FILES:
        pdfFile = request.FILES['pdfFile']
        try:
            pdfReader = PyPDF2.PdfReader(pdfFile)
            numPages = len(pdfReader.pages)
            text = ""
            for pageNum in range(numPages):
                page = pdfReader.pages[pageNum]
                text += page.extract_text()
            # Continue from here.
            response = {
                'response': text
            }
            return JsonResponse(response, status=200)
        except PDFPasswordIncorrect:
            response = {
                'response': 'PDF is password protected'
            }
            return JsonResponse(response, status=204)
        except PDFSyntaxError:
            response = {
                'response': 'Invalid PDF file format'
            }
            return JsonResponse(response, status=204)
    else:
        response = {
            'response': 'No PDF uploaded'
        }
        return JsonResponse(response, status=204)
@csrf_exempt
@login_required
def askLLM():
    # Continue from here
    pass