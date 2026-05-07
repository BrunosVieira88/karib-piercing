// ============================================================
// SCROLL ANIMATIONS
// ============================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add reveal class to elements
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.gallery-item, .service-card, .testimonial-card, .stat-card, .jewelry-showcase');
    elements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});

// ============================================================
// NAVBAR MOBILE TOGGLE
// ============================================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function isMobileNav() {
    return window.matchMedia('(max-width: 768px)').matches;
}

hamburger?.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (isMobileNav()) {
            navMenu.style.display = 'none';
            hamburger.classList.remove('active');
        }
    });
});

window.addEventListener('resize', () => {
    if (!isMobileNav()) {
        navMenu.style.display = 'flex';
        hamburger?.classList.remove('active');
    } else {
        navMenu.style.display = 'none';
    }
});

// ============================================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================================

function scrollToSection(target) {
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            scrollToSection(target);
        }
    });
});

// ============================================================
// CTA BUTTON CLICK
// ============================================================

document.querySelector('.cta-button').addEventListener('click', () => {
    const bookingSection = document.querySelector('#contact');
    scrollToSection(bookingSection);
});

// ============================================================
// JEWELRY CAROUSEL
// ============================================================

const jewelryImages = [
    'img/joias/img01.png',
    'img/joias/img02.png',
    'img/joias/img03.png',
    'img/joias/img04.png',
    'img/joias/img05.png',
    'img/joias/img06.png',
    'img/joias/img07.png'
];

const carouselPrevImage = document.querySelector('.carousel-image-prev');
const carouselMainImage = document.querySelector('.carousel-image-main');
const carouselNextImage = document.querySelector('.carousel-image-next');
const carouselPrevButton = document.querySelector('.carousel-btn-prev');
const carouselNextButton = document.querySelector('.carousel-btn-next');
const carouselDots = document.querySelector('.carousel-dots');
let activeJewelryIndex = 0;

function getCarouselIndex(index) {
    return (index + jewelryImages.length) % jewelryImages.length;
}

function renderJewelryCarousel() {
    if (!carouselPrevImage || !carouselMainImage || !carouselNextImage || !carouselDots) {
        return;
    }

    const prevIndex = getCarouselIndex(activeJewelryIndex - 1);
    const nextIndex = getCarouselIndex(activeJewelryIndex + 1);

    carouselPrevImage.src = jewelryImages[prevIndex];
    carouselMainImage.src = jewelryImages[activeJewelryIndex];
    carouselNextImage.src = jewelryImages[nextIndex];
    carouselMainImage.alt = `Joia para piercing em destaque ${activeJewelryIndex + 1}`;

    carouselDots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === activeJewelryIndex);
        dot.setAttribute('aria-current', index === activeJewelryIndex ? 'true' : 'false');
    });
}

if (carouselDots) {
    jewelryImages.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Mostrar joia ${index + 1}`);
        dot.addEventListener('click', () => {
            activeJewelryIndex = index;
            renderJewelryCarousel();
        });
        carouselDots.appendChild(dot);
    });
}

carouselPrevButton?.addEventListener('click', () => {
    activeJewelryIndex = getCarouselIndex(activeJewelryIndex - 1);
    renderJewelryCarousel();
});

carouselNextButton?.addEventListener('click', () => {
    activeJewelryIndex = getCarouselIndex(activeJewelryIndex + 1);
    renderJewelryCarousel();
});

renderJewelryCarousel();

// ============================================================
// FORM HANDLING
// ============================================================

const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(bookingForm);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        tipo_piercing: formData.get('tipo_piercing'),
        data: formData.get('data'),
        mensagem: formData.get('mensagem')
    };

    // Add loading state
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
    submitBtn.disabled = true;

    // Build WhatsApp message
    const whatsappNumber = '5511932356422';
    const whatsappMessage = `Olá, gostaria de agendar um piercing.%0A%0A` +
        `Nome: ${encodeURIComponent(data.nome)}%0A` +
        `Email: ${encodeURIComponent(data.email)}%0A` +
        `Telefone: ${encodeURIComponent(data.telefone)}%0A` +
        `Tipo de piercing: ${encodeURIComponent(data.tipo_piercing)}%0A` +
        `Data desejada: ${encodeURIComponent(data.data)}%0A` +
        `Mensagem: ${encodeURIComponent(data.mensagem || 'Sem mensagem adicional')}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        showNotification('Abrindo WhatsApp para enviar seu agendamento.', 'success');

        bookingForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 800);
});

// ============================================================
// NOTIFICATION SYSTEM
// ============================================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            max-width: 350px;
        }

        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .notification-content {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        .notification-success {
            border-left: 4px solid #4facfe;
            color: #4facfe;
        }

        .notification-success i {
            font-size: 1.3rem;
        }

        .notification.removing {
            animation: slideOutRight 0.3s ease;
        }

        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;

    if (!document.querySelector('style[notification-styles]')) {
        style.setAttribute('notification-styles', '');
        document.head.appendChild(style);
    }

    // Auto remove notification
    setTimeout(() => {
        notification.classList.add('removing');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ============================================================
// NUMBERS COUNTER ANIMATION
// ============================================================

const statsSection = document.querySelector('.stats-section');
const statNumbers = document.querySelectorAll('.stat-number');

const countUp = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const originalText = element.textContent;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = originalText;
            clearInterval(interval);
        } else {
            if (originalText.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (originalText.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current);
            }
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            statNumbers.forEach(num => {
                const target = parseInt(num.textContent);
                countUp(num, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================================
// PARALLAX EFFECT
// ============================================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');

    parallaxElements.forEach(element => {
        if (element.parentElement.offsetTop > window.innerHeight) return;
        element.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// ============================================================
// ACTIVE NAV LINK HIGHLIGHT
// ============================================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary);
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ============================================================
// FORM INPUT ANIMATIONS
// ============================================================

const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ============================================================
// LAZY LOAD IMAGES (if added in future)
// ============================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================================
// SOCIAL LINKS
// ============================================================

document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Replace with actual social media URLs
        const platforms = {
            instagram: 'https://instagram.com/kaique__tattoo',
            facebook: 'https://facebook.com',
            whatsapp: 'https://wa.me/5511987654321',
            youtube: 'https://youtube.com'
        };

        // You would need to update this based on which social link is clicked
        // For now, this is just a placeholder
    });
});

// ============================================================
// CONTEXT MENU FOR CONTACT INFO
// ============================================================

document.querySelectorAll('.info-item').forEach(item => {
    item.addEventListener('click', function () {
        const text = this.textContent;
        console.log('Contact info clicked:', text);
    });
});

// ============================================================
// PRELOADER / LOADING STATE
// ============================================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================================
// KEYBOARD NAVIGATION
// ============================================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    }

    // Quick navigation with number keys
    const sections = {
        '1': '#home',
        '2': '#gallery',
        '3': '#services',
        '4': '#about',
        '5': '#contact'
    };

    if (e.ctrlKey && sections[e.key]) {
        const section = document.querySelector(sections[e.key]);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============================================================
// DARK MODE TOGGLE (OPTIONAL)
// ============================================================

let isDarkMode = false;

// Uncomment and implement if needed

/*
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
});
document.body.appendChild(darkModeToggle);
*/

// ============================================================
// PAGE VISIBILITY HANDLING
// ============================================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User left the page');
    } else {
        console.log('User returned to the page');
    }
});

// ============================================================
// DYNAMIC FORM SUBMISSION HANDLER
// ============================================================

// Get form inputs
const formInputs = {
    nome: bookingForm.querySelector('input[type="text"]'),
    email: bookingForm.querySelector('input[type="email"]'),
    telefone: bookingForm.querySelector('input[type="tel"]'),
    tipo: bookingForm.querySelector('select'),
    data: bookingForm.querySelector('input[type="date"]'),
    mensagem: bookingForm.querySelector('textarea')
};

// Add input event listeners for real-time validation
if (formInputs.email) {
    formInputs.email.addEventListener('input', function () {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
        this.style.borderColor = isValid || !this.value ? 'var(--border)' : '#ff6b6b';
    });
}

if (formInputs.telefone) {
    formInputs.telefone.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });
}

// Piercing type image preview
const piercingPreviewImage = document.getElementById('piercingPreviewImage');
const piercingPreviewTitle = document.getElementById('piercingPreviewTitle');

function commonsImage(fileName) {
    return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=900`;
}

const piercingPreviewImages = {
    default: commonsImage('Captive bead ring.jpg'),
    lobe: commonsImage('Earlobe Piercing.jpg'),
    helix: commonsImage('Helix piercing.jpg'),
    conch: commonsImage('Conch-piercing.jpg'),
    tragus: commonsImage('Tragus Piercing.jpg'),
    daith: commonsImage('Daith Piercing 2.jpg'),
    rook: commonsImage('Rook Piercing.jpg'),
    transversal: commonsImage('Industrial piercing.jpg'),
    nostril: commonsImage('Nostril piercing.jpg'),
    septo: commonsImage('Septumpiercing.jpg'),
    bridge: commonsImage('Bridge piercing.jpg'),
    mouth: commonsImage('Labret Piercing.jpg'),
    verticalLabret: commonsImage('Vertical labret.png'),
    medusa: commonsImage('Medusa Piercing.jpg'),
    monroe: commonsImage('Monroe piercing.jpg'),
    eyebrow: commonsImage('Eyebrow piercing.jpg'),
    navel: commonsImage('My navel piercing.png'),
    jewelry: commonsImage('Collection of body piercing jewellery.jpg')
};

const piercingPreviewByType = {
    'Lóbulo': piercingPreviewImages.lobe,
    'Helix': piercingPreviewImages.helix,
    'Forward Helix': piercingPreviewImages.helix,
    'Double/Triple Helix': piercingPreviewImages.helix,
    'Flat': piercingPreviewImages.helix,
    'Conch': piercingPreviewImages.conch,
    'Tragus': piercingPreviewImages.tragus,
    'Anti-tragus': piercingPreviewImages.tragus,
    'Daith': piercingPreviewImages.daith,
    'Rook': piercingPreviewImages.rook,
    'Snug': piercingPreviewImages.rook,
    'Orbital': piercingPreviewImages.conch,
    'Transversal': piercingPreviewImages.transversal,
    'Nostril': piercingPreviewImages.nostril,
    'Septo': piercingPreviewImages.septo,
    'Bridge': piercingPreviewImages.bridge,
    'Austin Bar': piercingPreviewImages.nostril,
    'Nasallang': piercingPreviewImages.nostril,
    'High Nostril': piercingPreviewImages.nostril,
    'Labret': piercingPreviewImages.mouth,
    'Side Labret': piercingPreviewImages.mouth,
    'Vertical Labret': piercingPreviewImages.verticalLabret,
    'Medusa (Philtrum)': piercingPreviewImages.medusa,
    'Monroe': piercingPreviewImages.monroe,
    'Madonna': piercingPreviewImages.monroe,
    'Snake Bites': piercingPreviewImages.mouth,
    'Spider Bites': piercingPreviewImages.mouth,
    'Angel Bites': piercingPreviewImages.monroe,
    'Cyber Bites': piercingPreviewImages.mouth,
    'Dolphin Bites': piercingPreviewImages.mouth,
    'Dahlia': piercingPreviewImages.mouth,
    'Jestrum (vertical medusa)': piercingPreviewImages.monroe,
    'Ashley': piercingPreviewImages.mouth,
    'Sobrancelha': piercingPreviewImages.eyebrow,
    'Anti-sobrancelha': piercingPreviewImages.eyebrow,
    'Cheek': piercingPreviewImages.eyebrow,
    'Third Eye': piercingPreviewImages.eyebrow,
    'Umbigo': piercingPreviewImages.navel,
    'Umbigo inferior': piercingPreviewImages.navel,
    'Surface no abdômen': piercingPreviewImages.navel,
    'Microdermal': piercingPreviewImages.jewelry,
    'Mamilo horizontal': piercingPreviewImages.jewelry,
    'Mamilo vertical': piercingPreviewImages.jewelry,
    'Mamilo diagonal': piercingPreviewImages.jewelry,
    'Mamilo múltiplo': piercingPreviewImages.jewelry,
    'Christina': piercingPreviewImages.jewelry,
    'Vertical Hood (VCH)': piercingPreviewImages.jewelry,
    'Horizontal Hood (HCH)': piercingPreviewImages.jewelry,
    'Inner Labia': piercingPreviewImages.jewelry,
    'Outer Labia': piercingPreviewImages.jewelry,
    'Fourchette': piercingPreviewImages.jewelry,
    'Princess Albertina': piercingPreviewImages.jewelry,
    'Prince Albert': piercingPreviewImages.jewelry,
    'Reverse Prince Albert': piercingPreviewImages.jewelry,
    'Frenum': piercingPreviewImages.jewelry,
    'Lorum': piercingPreviewImages.jewelry,
    'Hafada': piercingPreviewImages.jewelry,
    'Apadravya': piercingPreviewImages.jewelry,
    'Ampallang': piercingPreviewImages.jewelry,
    'Dydoe': piercingPreviewImages.jewelry
};

if (formInputs.tipo && piercingPreviewImage && piercingPreviewTitle) {
    function updatePiercingPreview() {
        const selectedType = formInputs.tipo.value;

        piercingPreviewTitle.textContent = selectedType || 'Selecione uma opção';
        piercingPreviewImage.src = piercingPreviewByType[selectedType] || piercingPreviewImages.default;
        piercingPreviewImage.alt = selectedType ? `Prévia de ${selectedType}` : 'Prévia de piercing';
    }

    formInputs.tipo.addEventListener('input', updatePiercingPreview);
    formInputs.tipo.addEventListener('change', updatePiercingPreview);
}

// ============================================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================================

// Add focus styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

console.log('% cKARIB PIERCING Studio - Landing Page Carregada com Sucesso!', 'color: #8b2e5f; font-size: 16px; font-weight: bold');
