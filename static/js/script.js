function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. FOOTER YIL GÜNCELLEME ---
    const yearSpan = document.getElementById("year");
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. İLETİŞİM FORMU (AJAX - GÜVENLİ) ---
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
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': csrftoken 
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.reset(); 
                    
                    Swal.fire({
                        title: 'Mesajınız Alındı!',
                        text: 'En kısa sürede size dönüş yapacağım.',
                        icon: 'success',
                        background: '#112240', 
                        color: '#e6f1ff',
                        iconColor: '#64ffda',
                        buttonsStyling: false, 
                        customClass: {
                            popup: 'bg-[#112240] border border-[#233554] rounded-xl shadow-2xl p-8',
                            title: 'text-[#e6f1ff] font-bold text-2xl font-sans mb-2',
                            htmlContainer: 'text-[#8892b0] text-base font-sans',
                            confirmButton: 'bg-[#64ffda] text-[#0a192f] font-bold font-mono py-3 px-8 rounded hover:bg-opacity-80 transition duration-300 mt-4 focus:outline-none',
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Hata:', error);
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

    // --- 3. PROJE "DAHA FAZLA / DAHA AZ GÖSTER" (ANİMASYONLU) ---
    const items = document.querySelectorAll('.project-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    const projectsSection = document.getElementById('projects');
    
    const itemsToShow = 3; 
    let isExpanded = false;

    if (items.length > itemsToShow) {
        loadMoreContainer.classList.remove('hidden');

        for (let i = itemsToShow; i < items.length; i++) {
            items[i].classList.add('hidden');
        }

        loadMoreBtn.addEventListener('click', function() {
            if (!isExpanded) {
                let delay = 0; 
                
                items.forEach((item, index) => {
                    if (index >= itemsToShow) {
                        item.classList.remove('hidden');
                        
                        item.classList.remove('fade-out'); 
                        item.classList.add('fade-in-up');
                        item.style.animationDelay = delay + 's';
                        
                        item.addEventListener('animationend', () => {
                            item.style.animationDelay = '';
                            item.style.opacity = ''; 
                            item.style.transform = '';
                        }, { once: true });

                        delay += 0.1; 
                    }
                });

                loadMoreBtn.innerHTML = '<i class="fa-solid fa-angle-up mr-2"></i> Daha Az Göster';
                isExpanded = true;

            } else {
                
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                let delay = 0;
                for (let i = items.length - 1; i >= itemsToShow; i--) {
                    const item = items[i];
                    item.classList.remove('fade-in-up'); 
                    item.classList.add('fade-out');
                    item.style.animationDelay = (delay / 2) + 's'; 
                    delay += 0.1;
                }

                setTimeout(() => {
                    items.forEach((item, index) => {
                        if (index >= itemsToShow) {
                            item.classList.add('hidden');
                            item.classList.remove('fade-out'); 
                            item.style.animationDelay = '';
                            item.style.opacity = '';
                            item.style.transform = '';
                        }
                    });
                    
                    loadMoreBtn.textContent = 'Daha Fazla Göster';
                }, 600 + (delay * 100)); 

                isExpanded = false;
            }
        });
    }
});


// --- 4. PROJE SLIDER (GLOBAL FONKSİYONLAR) ---
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


// --- 5. BACK TO TOP & SCROLL REVEAL ---
const backToTopBtn = document.getElementById("backToTop");

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150; 

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", function() {
    if (backToTopBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.remove("translate-y-20", "opacity-0");
        } else {
            backToTopBtn.classList.add("translate-y-20", "opacity-0");
        }
    }
    
    reveal();
});

reveal();