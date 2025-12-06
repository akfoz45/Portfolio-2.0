from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from .models import Profile, Skill, Project, ContactMessage

def home(request):

    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        ContactMessage.objects.create(
            name = name,
            email = email,
            subject = subject,
            message = message,
        )

        messages.success(request, "Mesajınız başarıyla gönderildi! En kısa zamanda size dönüş yapacağım.")
        return JsonResponse({'success': True, 'message': 'Mesajınız başarıyla gönderildi!'})

    profile = Profile.objects.first()
    skills = Skill.objects.filter(is_active=True)
    projects = Project.objects.all().order_by('-created_at')

    context = {
        'profile': profile,
        'skills': skills,
        'projects': projects,
    }

    return render(request, 'base/home.html', context)