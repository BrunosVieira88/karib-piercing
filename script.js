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
    const elements = document.querySelectorAll('.gallery-item, .service-card, .testimonial-card, .stat-card');
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

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// ============================================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================
// CTA BUTTON CLICK
// ============================================================

document.querySelector('.cta-button').addEventListener('click', () => {
    const bookingSection = document.querySelector('#contact');
    bookingSection.scrollIntoView({ behavior: 'smooth' });
});

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

console.log('% cPIERCING Studio - Landing Page Carregada com Sucesso!', 'color: #8b2e5f; font-size: 16px; font-weight: bold');
