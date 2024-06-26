from django.shortcuts import render
from django.http import JsonResponse, StreamingHttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as Login
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import random, smtplib, os
from django.core.cache import cache
from django.views.decorators.csrf import csrf_exempt
import langchain_text_splitters
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from langchain_text_splitters import RecursiveCharacterTextSplitter
from typing import List, Dict, Tuple
import google.generativeai as genai
from dotenv import load_dotenv
from .models import userModel
import numpy as np
import psycopg2
import PyPDF2
import pymupdf
import fitz
import vecs
import time
import os
import logging
load_dotenv()
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
def home(request):
    return render(request, 'index.html')
@require_http_methods(['POST'])
# @csrf_exempt
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
    instance = userModel(userName = userName, APIkey = str(hash(userName)))
    instance.save()
    response = {
        'response':'User created'
    }
    return JsonResponse(response, status=200)    
@require_http_methods(['POST'])  
# @csrf_exempt                                                                         
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
# @csrf_exempt   
def forgotPass(request):
    response = {}
    userName = request.POST.get('userName')
    if not User.objects.filter(username = userName).exists():
        response = {
            'response': "UserName doesn't exist"
        }
        return JsonResponse(response, status=200)
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
    server.login('commonmailkishanandamar@gmail.com', password)
    server.sendmail('commonmailkishanandamar@gmail.com', email, message)
@require_http_methods(['POST'])
# @csrf_exempt
def confirm(request):
    response = {}
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
        return JsonResponse(response, status=200)
@require_http_methods(['POST'])
# @csrf_exempt
def resetPass(request):
    response = {}
    password1 = request.POST.get('password1')
    password2 = request.POST.get('password2')
    if password1 != password2: 
        response = {
            'response': "Password doesn't match try again"
        }
        return JsonResponse(response, status=200)
    userName = cache.get('userName')
    user = User.objects.filter(username=userName).first()
    user.set_password(password1)
    user.save()
    response = {
        'response': "The password has been updated"
    }
    return JsonResponse(response, status=200)
@require_http_methods(['POST'])
# @csrf_exempt
@login_required
def pdfInput_VectorDB(request):
    response = {}
    if 'pdfFile' in request.FILES:
        pdfFile = request.FILES['pdfFile']
        if(pdfFile.name[-3:]!='pdf'):
            response = {
                'response': 'Upload a pdf file',
            }
            return JsonResponse(response, status=200)
        pdf = pdf = fitz.open(stream=pdfFile.read(), filetype="pdf")
        if pdf.needs_pass:
            response = {
                'response': 'The PDF needs password'
            }
            return JsonResponse(response, status=200)
        pdfReader = PyPDF2.PdfReader(pdfFile)
        numPages = len(pdfReader.pages)
        text = ""
        for pageNum in range(numPages):
            page = pdfReader.pages[pageNum]
            text += page.extract_text()
        if(len(text)<1000):
            response = {
                'response': 'The PDF is having less than 1000 characters.'
            }
            return JsonResponse(response, status=20)
        langchain_text_splitters = RecursiveCharacterTextSplitter(
            chunk_size = 500,
            chunk_overlap=100,
            length_function=len,
            is_separator_regex=False
        )
        text = langchain_text_splitters.split_text(text)
        password_supabase = os.getenv("password_supabase")
        # password_cohere = os.getenv('password_cohere')
        password_gemini = os.getenv('password_gemini')
        genai.configure(api_key=password_gemini)
        # co = cohere.Client(password_cohere)
        # model = 'embed-english-light-v3.0'
        # input_type = "search_query"
        # res = co.embed(
        #     texts = text,
        #     model = model,
        #     input_type = input_type,
        #     embedding_types=['float']
        # )
        # embedding = res.embeddings.float
        embedding = genai.embed_content(
            model="models/embedding-001",
            content=text,
            task_type="retrieval_document",
            title="Embedding of single string"
        )
        records: List[Tuple[str, np.ndarray, Dict]] = []
        for i in range(len(text)):
            # time.wait(1) # Will see if it is necessary, might be necessary when it croses the per minute limit.
            records.append((i, embedding['embedding'][i], {"text":text[i]}))
        DB_connection = f"postgresql://postgres.gcruunzrtalzneyselps:{password_supabase}@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
        vx = vecs.create_client(DB_connection)
        instance = userModel.objects.get(userName=request.user.username)
        collectionName =  instance.APIkey
        collection = vx.get_or_create_collection(name=collectionName, dimension=768)
        collection.upsert(records)
        collection.create_index()
        response = {
            'response': "Text has been vectorised and upserted",
            'collectionName': collectionName
        }
        return JsonResponse(response, status=200)
    else:
        response = {
            'response': 'No PDF uploaded'
        }
        return JsonResponse(response, status=200)
# @csrf_exempt
@login_required
def askLLM(request, APIkey):
    password_supabase = os.getenv('password_supabase')
    # password_cohere = os.getenv('password_cohere')
    password_gemini = os.getenv('password_gemini')
    safety_settings = os.getenv('safety_settings')
    instructions1 = os.getenv('instructions')
    instructions2  = ""
    if(userModel.objects.filter(APIkey=APIkey).exists()):
        instance = userModel.objects.get(APIkey=APIkey)
        if hasattr(instance, 'instructions'):
            instructions2 = instance.instructions
            # response = {
            #     'customInstructions':instructions
            # }
            # return JsonResponse(response)
        # response = {
        #     'response': "No instructions for this user"
        # }
        # return JsonResponse(response, status=200)
    conn = psycopg2.connect(
        dbname = "postgres",
        user = "postgres.gcruunzrtalzneyselps",
        password = password_supabase,
        host = "aws-0-ap-southeast-1.pooler.supabase.com",
        port = "5432"
    )
    # co = cohere.Client(password_cohere)
    genai.configure(api_key=password_gemini)
    gen_model = genai.GenerativeModel('gemini-pro')
    collection_name = APIkey
    cur = conn.cursor()
    cur.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = %s)", (collection_name,))
    exists = cur.fetchone()[0]
    if not exists:
        def generate_error():
            yield f"event: error\ndata: The API key is invalid\n\n"
        return StreamingHttpResponse(generate_error(), content_type='text/event-stream')
    query = request.POST.get('query')
    # model = "embed-english-light-v3.0"
    # input_type = "search_query"
    res = genai.embed_content(
        model="models/embedding-001",
        content=query,
        task_type="retrieval_document",
        title="Embedding of single string"
    )
    query_embedding = res['embedding']
    DB_connection = f"postgresql://postgres.gcruunzrtalzneyselps:{password_supabase}@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
    vx = vecs.create_client(DB_connection)
    collection = vx.get_or_create_collection(name=APIkey, dimension=768)
    rag = collection.query(
        query_embedding,
        limit=5,
        include_metadata=True,
        include_value=True
    )
    context = ''
    for result_id, result_distance, result_meta in rag[:]:
        context += result_meta["text"] + '\n\n'
    detailed_query = f'''
        Instructions : {instructions1} \n\n
        CustomInstructions: {instructions2}\n\n
        Context : {context} \n\n
        Query : {query}
    '''
    def generate_response():
        # Ensure the generate_content method is set to stream mode
        res = gen_model.generate_content(detailed_query, safety_settings=safety_settings, stream=True)
        # for chunks in res:
        #     print(chunks.text)
        for tokens in res:
            chunk = tokens.text
            # Tokenize by words and preserve newlines
            words_and_newlines = []
            start = 0
            for i, char in enumerate(chunk):
                if char == '\n':
                    if start < i:
                        words_and_newlines.append(chunk[start:i])
                    words_and_newlines.append(char)
                    start = i + 1
            if start < len(chunk):
                words_and_newlines.append(chunk[start:])
            
            for token in words_and_newlines:
                if token == '\n':
                    yield "event: data\ndata: \n\n"
                else:
                    yield f"event: data\ndata: {token}\n\n"
        yield "event: done\ndata: [DONE]\n\n"
    response = StreamingHttpResponse(generate_response(), content_type='text/event-stream')
    response['Cache-Control'] = 'no-cache'
    response['X-Accel-Buffering'] = 'no'
    return response
# @csrf_exempt
@login_required
@require_http_methods(['POST'])
def customInstructions(request):
    response = {}
    Instructions = request.POST.get('instructions')
    if not userModel.objects.filter(userName = request.user.username).exists():
        response = {
            'response': "Model doesn't exist"
        }
        return JsonResponse(response)
    instance = userModel.objects.get(userName = request.user.username)
    instance.instructions = Instructions
    instance.save()
    response = {
        'response': 'Instructions recorded'
    }
    return JsonResponse(response, status = 200)
# @csrf_exempt
@login_required
def Logout(request):
    response = {}
    logout(request)
    response = {
        'response': 'User is logged out'
    }
    return JsonResponse(response, status=200)
# @csrf_exempt
def loggedin(request):
    response = {}
    print(request)
    print(request.user)
    if request.user.is_authenticated:
        response = {
            'response': request.user.username
        }
    else:
        response = {
            'response': 'Not logged in'
        }
    return JsonResponse(response, status = 200)