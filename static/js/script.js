// --- İLETİŞİM FORMU KODLARI ---
document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const btn = document.getElementById('submitBtn');
            const spinner = document.getElementById('loadingSpinner');
            
            if(btn) {
                btn.disabled = true;
                btn.classList.add('opacity-75', 'cursor-not-allowed');
            }
            if(spinner) spinner.classList.remove('hidden');

            const formData = new FormData(this);

            fetch('/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.reset(); 
                    
                    Swal.fire({
                        title: 'Harika!',
                        text: 'Mesajınız başarıyla ulaştı. En kısa sürede döneceğim.',
                        icon: 'success',
                        confirmButtonText: 'Tamam',
                        confirmButtonColor: '#4f46e5',
                        background: '#1e293b',
                        color: '#fff',
                        iconColor: '#4f46e5'
                    });
                }
            })
            .catch(error => {
                console.error('Hata:', error);
                Swal.fire({
                    title: 'Hata!',
                    text: 'Bir sorun oluştu. Lütfen daha sonra tekrar deneyin.',
                    icon: 'error',
                    confirmButtonText: 'Tamam',
                    confirmButtonColor: '#ef4444',
                    background: '#1e293b',
                    color: '#fff'
                });
            })
            .finally(() => {
                if(btn) {
                    btn.disabled = false;
                    btn.classList.remove('opacity-75', 'cursor-not-allowed');
                }
                if(spinner) spinner.classList.add('hidden');
            });
        });
    }
});

// --- PROJE SLIDER (GALERİ) KODLARI ---
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.classList.remove('opacity-0', 'pointer-events-none');
            slide.classList.add('opacity-100', 'z-10');
        } else {
            slide.classList.add('opacity-0', 'pointer-events-none');
            slide.classList.remove('opacity-100', 'z-10');
        }
    });

    if (dots.length > 0) {
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('bg-green');
                dot.classList.remove('bg-white/50');
            } else {
                dot.classList.add('bg-white/50');
                dot.classList.remove('bg-green');
            }
        });
    }
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function goToSlide(index) {
    showSlide(index);
}