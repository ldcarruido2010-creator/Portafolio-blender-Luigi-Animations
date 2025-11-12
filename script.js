// =======================================================
// JAVASCRIPT PURO PARA ANIMACIONES DE VISIBILIDAD (FADE-IN)
// Y FUNCIONALIDAD DEL SLIDER .....
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // === FUNCIONALIDAD DE FADE-IN PARA SECCIONES ===
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    fadeInElements.forEach(element => {
        // Excluir elementos dentro de los slides iniciales para que el slider los controle
        if (!element.closest('.hero-slide')) {
            observer.observe(element);
        }
    });
    
    // === SMOOTH SCROLLING ===
    document.querySelector('.hero a[href="#proyectos"]').addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });

    // === FUNCIONALIDAD DEL SLIDER ===
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Asegurarse de que el índice esté dentro del rango
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Remover 'active' de todos los slides y puntos
        slides.forEach(slide => {
            slide.classList.remove('active');
            // Remover 'visible' de los elementos fade-in para que se reanimen si se desea
            slide.querySelectorAll('.fade-in').forEach(el => el.classList.remove('visible'));
        });
        dots.forEach(dot => dot.classList.remove('active'));

        // Añadir 'active' al slide y punto actual
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Re-activar las animaciones fade-in para los elementos del slide actual
        // Pequeño retardo para asegurar que la clase 'active' se aplique primero
        setTimeout(() => {
            slides[currentSlide].querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
        }, 100); 
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 7000); // Cambia cada 7 segundos
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Inicializar el slider
    showSlide(currentSlide);
    startSlider();

    // Event listeners para los puntos de navegación
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlider(); // Detener el slider al hacer click
            showSlide(index);
            startSlider(); // Reiniciar el slider después de un click manual
        });
    });

    // Detener el slider si el mouse está sobre él (opcional, para que el usuario pueda leer)
    const heroSliderContainer = document.querySelector('.hero-slider-container');
    heroSliderContainer.addEventListener('mouseenter', stopSlider);
    heroSliderContainer.addEventListener('mouseleave', startSlider);
});

