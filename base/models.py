from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=50, verbose_name="Adınız Soyadınız")
    title = models.CharField(max_length=100, verbose_name="Ünvan")
    bio = models.TextField(verbose_name="Hakkımda Yazıs")
    image = models.ImageField(upload_to='profile/', blank=True, verbose_name="Profil Fotoğrafı")
    cv_file = models.FileField(upload_to='cv/', blank=True, null=True, verbose_name="CV Dosyası")
    github_link = models.URLField(blank=True, verbose_name="GitHub Linki")
    linkedin_link = models.URLField(blank=True, verbose_name="Linkedin Linki")
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Profil Ayarları"
        verbose_name_plural = "Profil Ayarları"

class Skill(models.Model):
    name = models.CharField(max_length=50, verbose_name="Yetenek")
    level = models.IntegerField(default=0, verbose_name="Yüzde (%)", help_text="0-100 arası bir değer girin")
    is_active = models.BooleanField(default=True, verbose_name="Sitede Göster")

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Yetenekı"
        verbose_name_plural = "Yetenekler"


class Project(models.Model):
    name = models.CharField(max_length=50, verbose_name="Proje Başlığı")
    description = models.TextField(verbose_name="Proje Açıklaması") 
    image = models.ImageField(upload_to="projects/", blank=True, verbose_name="Proje Görseli")
    tags = models.CharField(max_length=100, verbose_name="Etiketler (Örn: Django, React)", help_text="Virgülle ayırın")
    live_link = models.URLField(blank=True, verbose_name="Canlı Site Linki")
    source_link = models.URLField(blank=True, verbose_name="Kaynak Kodu Linki")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Proje"
        verbose_name_plural = "Projeler"


class ContactMessage(models.Model):
    name = models.CharField(max_length=50, verbose_name="Gönderen Adı")
    email = models.EmailField(verbose_name="E-posta")
    subject = models.CharField(max_length=200, verbose_name="Konu")
    message = models.TextField(verbose_name="Mesaj")
    is_read = models.BooleanField(default=False, verbose_name="Okundu mu")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "İletişim Mesajı"
        verbose_name_plural = "İletişim Mesajları"