document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const btn = document.getElementById('submitBtn');
            const spinner = document.getElementById('loadingSpinner');
            
            btn.disabled = true;
            btn.classList.add('opacity-75', 'cursor-not-allowed');
            spinner.classList.remove('hidden');

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
                btn.disabled = false;
                btn.classList.remove('opacity-75', 'cursor-not-allowed');
                spinner.classList.add('hidden');
            });
        });
    }
});