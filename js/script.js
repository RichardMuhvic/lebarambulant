gsap.registerPlugin(ScrollTrigger);

gsap.to('.airstream', {
    scrollTrigger: {
        trigger: '.airstream',
        start: 'top center',
        end: '+=800', // Augmente la distance de scroll pour ralentir l'animation
        scrub: true,
        pin: true,
        pinSpacing: true,
        markers: true,
    },
    x: '90%',  // Déplacement horizontal réduit
    y: -100,    // Déplacement vertical réduit
    scale: 1.2,
    ease: 'none',
});


gsap.to('.services-titles', {
    scrollTrigger: {
        trigger: '.services',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: self => {
            // L'espacement varie selon la progression du scroll (0 à 1)
            const progress = self.progress;
            const spacing = 0 + (progress * 60); // De 0.3em à 
            gsap.set('.services-titles', { letterSpacing: spacing + 'px' });
        }
    }
});


gsap.to('.histoire-title', {
    scrollTrigger: {
        trigger: '.histoire',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: self => {
            // L'espacement varie selon la progression du scroll (0 à 1)
            const progress = self.progress;
            const spacing = 0 + (progress * 60); // De 10px à 110px
            gsap.set('.histoire-title', { letterSpacing: spacing + 'px' });
        }
    }
});


gsap.to('.section-title', {
    scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: self => {
            // L'espacement varie selon la progression du scroll (0 à 1)
            const progress = self.progress;
            const spacing = 10 + (progress * 40); // De 10px à 110px
            gsap.set('.section-title', { letterSpacing: spacing + 'px' });
        }
    }
});


// Effet de mouvement au survol de la galerie
document.querySelector('.galerie-grid').addEventListener('mousemove', (e) => {
    const items = document.querySelectorAll('.galerie-item');

    items.forEach((item, index) => {
        if (!item.matches(':hover')) {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const moveX = x * 20;
            const moveY = y * 20;

            item.style.transform = `translate(${moveX}px, ${moveY}px) scale(0.95)`;
        }
    });
});


//FORMULAIRE
// Initialisation de la carte Leaflet
document.addEventListener('DOMContentLoaded', function () {
    // Gestion du formulaire
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Animation du bouton
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Simuler l'envoi (remplacer par votre logique d'envoi réelle)
        setTimeout(() => {
            // Afficher un message de succès
            alert('Merci pour votre demande ! Nous vous recontacterons dans les 24h.');

            // Réinitialiser le formulaire
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Validation en temps réel
    const inputs = contactForm.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });
    });

    function validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.style.borderColor = '#e74c3c';
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            field.style.borderColor = '#e74c3c';
        } else {
            field.style.borderColor = '#2C2C2C';
        }
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

document.head.insertAdjacentHTML('beforeend', markerStyles);


//TEMOIGNAGES
const carousel = document.getElementById('carousel');
const cards = carousel.querySelectorAll('.testimonial-card');
const navContainer = document.getElementById('carouselNav');
let currentIndex = 0;
let isMouseOverWindow = true;
let autoRotateInterval;

// Create navigation dots
cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('nav-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoRotate();
    });
    navContainer.appendChild(dot);
});

const dots = navContainer.querySelectorAll('.nav-dot');

function updateClasses() {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next', 'hidden');

        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('prev');
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add('next');
        } else {
            card.classList.add('hidden');
        }
    });

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateClasses();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateClasses();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateClasses();
}

// Click on cards to navigate
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (card.classList.contains('prev')) {
            prevSlide();
            resetAutoRotate();
        } else if (card.classList.contains('next')) {
            nextSlide();
            resetAutoRotate();
        }
    });
});

// Auto-rotate functionality - only when mouse is outside window
function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        if (!isMouseOverWindow) {
            nextSlide();
        }
    }, 10000); // 10 seconds
}

function stopAutoRotate() {
    clearInterval(autoRotateInterval);
}

function resetAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
}

// Track mouse position relative to window
document.addEventListener('mouseenter', () => {
    isMouseOverWindow = true;
});

document.addEventListener('mouseleave', () => {
    isMouseOverWindow = false;
});

// Also track for the entire window
window.addEventListener('blur', () => {
    isMouseOverWindow = false;
});

window.addEventListener('focus', () => {
    isMouseOverWindow = true;
});

// Mouse position tracking
document.addEventListener('mousemove', (e) => {
    if (e.clientX >= 0 && e.clientX <= window.innerWidth &&
        e.clientY >= 0 && e.clientY <= window.innerHeight) {
        isMouseOverWindow = true;
    } else {
        isMouseOverWindow = false;
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoRotate();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoRotate();
    }
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        resetAutoRotate();
    }
}

// Initialize
updateClasses();
startAutoRotate();

// CTA button animation
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('mouseenter', () => {
    ctaButton.style.transform = 'translateY(-3px) scale(1.05)';
});
ctaButton.addEventListener('mouseleave', () => {
    ctaButton.style.transform = 'translateY(0) scale(1)';
});