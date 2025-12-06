from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.http import JsonResponse
from .models import Profile, Skill, Project, ContactMessage, Experience, Education, Certificate

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
    skills_languages = Skill.objects.filter(is_active=True, category='language')
    skills_frameworks = Skill.objects.filter(is_active=True, category='framework')  
    skills_tools = Skill.objects.filter(is_active=True, category='tool')  
    projects = Project.objects.all().order_by('order')
    educations = Education.objects.all().order_by('-id')
    experiences = Experience.objects.all().order_by('-id')
    certificates = Certificate.objects.all().order_by('-date')

    context = {
        'profile': profile,
        'skills_languages': skills_languages,
        'skills_frameworks': skills_frameworks,
        'skills_tools': skills_tools,
        'projects': projects,
        'educations': educations,
        'experiences': experiences,
        'certificates': certificates,
    }

    return render(request, 'base/home.html', context)


def project_detail(request, pk):
    profile = Profile.objects.first()
    project = get_object_or_404(Project, pk=pk)

    context = {
        'profile' : profile,
        'project' : project
    }
    return render(request, 'base/project_detail.html', context)

       