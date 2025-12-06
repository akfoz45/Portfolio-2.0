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
                    
                    // --- GÜNCELLENEN TASARIM ---
                    Swal.fire({
                        title: 'Mesajınız Alındı!',
                        text: 'En kısa sürede size dönüş yapacağım.',
                        icon: 'success',
                        
                        // Temel Renk Ayarları (Fallback)
                        background: '#112240', 
                        color: '#e6f1ff',
                        iconColor: '#64ffda',
                        
                        // Tailwind ile Özel Tasarım
                        buttonsStyling: false, 
                        customClass: {
                            popup: 'bg-[#112240] border border-[#233554] rounded-xl shadow-2xl p-8',
                            title: 'text-[#e6f1ff] font-bold text-2xl font-sans mb-2',
                            htmlContainer: 'text-[#8892b0] text-base font-sans',
                            confirmButton: 'bg-[#64ffda] text-[#0a192f] font-bold font-mono py-3 px-8 rounded hover:bg-opacity-80 transition duration-300 mt-4 focus:outline-none',
                            icon: 'border-[#64ffda] text-[#64ffda]'
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Hata:', error);
                
                // --- HATA MESAJI TASARIMI ---
                Swal.fire({
                    title: 'Bir Hata Oluştu!',
                    text: 'Lütfen daha sonra tekrar deneyin.',
                    icon: 'error',
                    background: '#112240',
                    color: '#e6f1ff',
                    buttonsStyling: false,
                    customClass: {
                        popup: 'bg-[#112240] border border-[#ef4444] rounded-xl shadow-2xl p-8',
                        title: 'text-[#e6f1ff] font-bold text-2xl font-sans',
                        htmlContainer: 'text-[#8892b0] text-base font-sans',
                        confirmButton: 'bg-[#ef4444] text-white font-bold font-mono py-3 px-8 rounded hover:bg-opacity-80 transition duration-300 mt-4 focus:outline-none'
                    }
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