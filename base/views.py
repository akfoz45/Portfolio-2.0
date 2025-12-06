from django.shortcuts import render
from .models import Profile, Skill, Project

def home(request):
    return  render(request, 'base/base.html')