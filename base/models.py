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
    CATEGORY_CHOICES = (
        ('language', 'Yazılım Dili'),
        ('framework', 'Framework / Kütüphane'),
    )
    name = models.CharField(max_length=50, verbose_name="Yetenek")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='language', verbose_name="Kategori")
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
    tags = models.CharField(max_length=100, verbose_name="Etiketler (Örn: Django, React)", help_text="Virgülle ayırın")
    live_link = models.URLField(blank=True, verbose_name="Canlı Site Linki")
    source_link = models.URLField(blank=True, verbose_name="Kaynak Kodu Linki")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Proje"
        verbose_name_plural = "Projeler"

class Education(models.Model):
    school_name = models.CharField(max_length=100, verbose_name="Okul Adı")
    major = models.CharField(max_length=50, verbose_name="Bölüm Adı")
    duration = models.CharField(max_length=50, verbose_name="Süre (Örn: 2020 - 2024)")
    grade = models.CharField(max_length=25, verbose_name="Not ortalaması (Opsiyonel)", blank=True)

    def __str__(self):
        return self.school_name

    class Meta:
        verbose_name = "Eğitim"
        verbose_name_plural = "Eğitim Bilgileri"


class Experience(models.Model):
    company_name = models.CharField(max_length=100, verbose_name="Şirket Adı")
    position = models.CharField(max_length=50, verbose_name="Pozisyon")
    duration = models.CharField(max_length=50, verbose_name="Çalışma Süresi")
    descreption = models.TextField(verbose_name="İş Tanımı / Açıklama")

    def __str__(self):
        return self.company_name

    class Meta:
        verbose_name = "Deneyim"
        verbose_name_plural = "Deneyimler"

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