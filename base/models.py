from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=50, verbose_name="Adınız Soyadınız")
    title = models.CharField(max_length=100, verbose_name="Ünvan")
    bio = models.TextField(verbose_name="Hakkımda Yazıs")
    image = models.ImageField(upload_to='profile/', blank=True, verbose_name="Profil Fotoğrafı")
    cv_file = models.FileField(upload_to='cv/', blank=True, null=True, verbose_name="CV Dosyası")
    email = models.EmailField(max_length=100, blank=True, verbose_name="E-posta Adresi")
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
        ('tool', 'Araç / Platform')
    )
    name = models.CharField(max_length=50, verbose_name="Yetenek")
    icon = models.CharField(max_length=500, 
                            blank=True, 
                            verbose_name="İkon (FontAwesome veya Resim Linki)", 
                            help_text="FontAwesome kodu (örn: fa-brands fa-python) VEYA resim linki (https://...)"
                            )
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='language', verbose_name="Kategori")
    level = models.IntegerField(default=0, verbose_name="Yüzde (%)", help_text="0-100 arası bir değer girin")
    is_active = models.BooleanField(default=True, verbose_name="Sitede Göster")

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Yetenekı"
        verbose_name_plural = "Yetenekler"


class Project(models.Model):
    name = models.CharField(max_length=100, verbose_name="Proje Başlığı")
    description = models.TextField(verbose_name="Proje Açıklaması") 
    tags = models.CharField(max_length=100, verbose_name="Etiketler (Örn: Django, React)", help_text="Virgülle ayırın")
    live_link = models.URLField(blank=True, verbose_name="Canlı Site Linki")
    source_link = models.URLField(blank=True, verbose_name="Kaynak Kodu Linki")
    created_at = models.DateTimeField(auto_now_add=True)
    order = models.IntegerField(default=0, verbose_name="Sıralama (Örn: 1, 2, 3)", blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Proje"
        verbose_name_plural = "Projeler"
        ordering = ['order', '-created_at']

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='projects/', verbose_name="Proje Görseli", blank=True)

    def __str__(self):
        return f"{self.project.name} Görseli"

class Education(models.Model):
    school_name = models.CharField(max_length=100, verbose_name="Okul Adı")
    major = models.CharField(max_length=50, verbose_name="Bölüm Adı", blank=True)
    duration = models.CharField(max_length=50, verbose_name="Süre (Örn: 2020 - 2024)")
    grade = models.CharField(max_length=25, verbose_name="Not ortalaması (Opsiyonel)", blank=True)
    order = models.IntegerField(default=0, verbose_name="Sıralama (Örn: 1, 2, 3)", blank=True)

    def __str__(self):
        return self.school_name

    class Meta:
        verbose_name = "Eğitim"
        verbose_name_plural = "Eğitim Bilgileri"
        ordering = ['order']


class Experience(models.Model):
    company_name = models.CharField(max_length=100, verbose_name="Şirket Adı")
    position = models.CharField(max_length=50, verbose_name="Pozisyon")
    duration = models.CharField(max_length=50, verbose_name="Çalışma Süresi")
    descreption = models.TextField(verbose_name="İş Tanımı / Açıklama")
    order = models.IntegerField(default=0, verbose_name="Sıralama (Örn: 1, 2, 3)", blank=True)

    def __str__(self):
        return self.company_name

    class Meta:
        verbose_name = "Deneyim"
        verbose_name_plural = "Deneyimler"
        ordering = ['order']

class Certificate(models.Model):
    name = models.CharField(max_length=50, verbose_name="Sertifika Adı")
    issuer = models.CharField(max_length=50, verbose_name="Veren Kurum (Örn: Udemy, Coursera)")
    date = models.DateField(verbose_name="Alınma Tarihi")
    link = models.URLField(blank=True, verbose_name="Sertifika Linki (Opsiyonel)")
    order = models.IntegerField(default=0, verbose_name="Sıralama (Örn: 1, 2, 3)", blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Sertifika"
        verbose_name_plural = "Sertifikalar"
        ordering = ['order', '-date']

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