from django.contrib import admin
from .models import Profile, Project, Skill, ContactMessage, Education, Experience, ProjectImage


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title')

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'tags', 'created_at')
    inlines = [ProjectImageInline]

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'level', 'icon', 'is_active')
    list_filter = ('category', 'is_active')
    list_editable = ('level', 'is_active', 'icon')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read',)
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')

@admin.register(Education)
class EducationAmin(admin.ModelAdmin):
    list_display = ('school_name', 'major', 'duration')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'position', 'duration')


