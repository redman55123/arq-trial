// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handler para o formulário de contato (prevenir submit padrão)
document.querySelector('.contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Message sent! (This is a demo - in production you would connect a backend.)');
    this.reset();
});
