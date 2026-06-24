/**
 * FPPI INTERACTIVE APPLICATION SUITE
 * Configured for Serverless AWS S3 Deployments
 */

let currentSlideIndex = 0;
let carouselTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    initScrollHeader();
    initHeroCarousel();
    initIntersectionCounters();
    initFPPIOwnedChatbot();
});

function initScrollHeader() {
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.padding = '14px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.padding = '22px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
        }
    });

    document.querySelector('.mobile-toggle').addEventListener('click', () => {
        alert('Menu navigation system online and optimized for static delivery routing.');
    });
}

/**
 * HERO CAROUSEL CONTROLLER ENGINE (5 SIZED NODE CLUSTERS)
 */
function initHeroCarousel() {
    showSlide(currentSlideIndex);
    startCarouselAutoPlay();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    
    if (slides.length === 0) return;

    // Handle index bounds resetting dynamically across 5 elements
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;

    // Remove active status from all entities
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));

    // Inject active status to specific indices
    slides[currentSlideIndex].classList.add('active');
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.add('active');
    }
}

function moveCarousel(direction) {
    clearInterval(carouselTimer);
    currentSlideIndex += direction;
    showSlide(currentSlideIndex);
    startCarouselAutoPlay();
}

function setSlide(index) {
    clearInterval(carouselTimer);
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
    startCarouselAutoPlay();
}

function startCarouselAutoPlay() {
    carouselTimer = setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, 6000); // Cross-fades layouts every 6 seconds flawlessly
}

function initIntersectionCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const animationSpeed = 50;

    const startCounter = (el) => {
        const targetValue = +el.getAttribute('data-target');
        let currentVal = 0;
        const step = Math.ceil(targetValue / animationSpeed);

        const runCount = () => {
            currentVal += step;
            if (currentVal < targetValue) {
                el.innerText = currentVal;
                setTimeout(runCount, 30);
            } else {
                el.innerText = targetValue;
            }
        };
        runCount();
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
}

function initFPPIOwnedChatbot() {
    const widget = document.getElementById('chatbot-widget');
    const trigger = document.getElementById('chat-trigger');
    const closeBtn = document.getElementById('chat-close');
    const sendBtn = document.getElementById('chat-send');
    const inputField = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    trigger.addEventListener('click', () => widget.classList.remove('closed'));
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        widget.classList.add('closed');
    });

    sendBtn.addEventListener('click', processMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processMessage();
    });

    function processMessage() {
        const text = inputField.value.trim();
        if (!text) return;

        createBubble(text, 'user-msg');
        inputField.value = '';

        const loader = createLoader();
        setTimeout(() => {
            loader.remove();
            const responseText = queryKnowledgeBase(text);
            createBubble(responseText, 'bot-msg');
        }, 800);
    }

    function createBubble(content, styleClass) {
        const div = document.createElement('div');
        div.classList.add('message', styleClass);
        div.innerHTML = `<p>${content}</p>`;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
        return div;
    }

    function createLoader() {
        const div = document.createElement('div');
        div.classList.add('message', 'bot-msg', 'typing-indicator');
        div.innerHTML = '<span></span><span></span><span></span>';
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
        return div;
    }

    function queryKnowledgeBase(input) {
        const q = input.toLowerCase();

        if (q.includes('fppi') || q.includes('what is') || q.includes('association')) {
            return "FPPI stands for <strong>Fashion Photographers of the Philippines, Incorporated</strong>. We are an association of local fashion photographers and Filipino visionaries based abroad aiming to uplift fashion as a form of art and science.";
        }
        if (q.includes('model') || q.includes('face of the city')) {
            return "Our <strong>Fashion Models</strong> channel connects rising talents with real advertising opportunities. Under our flagship campaign, 'Become the Face of the City', emerging talents are transformed into public billboard icons across Metro Manila.";
        }
        if (q.includes('photographer') || q.includes('camera') || q.includes('guild')) {
            return "Our <strong>Fashion Photographers</strong> portal coordinates active image documentors. FPPI co-founder Vladimir E. Estocado leads photography pipelines alongside Urban Page Magazine and Quezon City Photo Club (QCPC).";
        }
        if (q.includes('makeup') || q.includes('hair') || q.includes('hmua') || q.includes('glam')) {
            return "The <strong>Hair and Makeup Artist</strong> track integrates creative visual teams directly with our principal design showcases and photo sessions, optimizing pageantry and editorial visual art across production clusters.";
        }
        if (q.includes('designer') || q.includes('clothing') || q.includes('artisan')) {
            return "Our <strong>Clothing Designers & Artisans</strong> track helps tailors and dressmakers gain financial independence. It coordinates directly with elite industry veterans and the ongoing ₱173M Kamuning Market project.";
        }
        if (q.includes('coordinator') || q.includes('event') || q.includes('production')) {
            return "The <strong>Event Coordinator</strong> track manages high-society show logistics, launch schedules (like our historic Crowne Plaza launch), and handles sets supporting over 120 models and 10 master designers.";
        }
        if (q.includes('launch') || q.includes('june 28') || q.includes('crowne plaza') || q.includes('2022')) {
            return "FPPI was formally launched on <strong>Tuesday, June 28, 2022</strong>, from 5:00 PM to 9:00 PM at the <strong>Jade Ballroom of the Crowne Plaza Hotel</strong> in Ortigas Center, Quezon City.";
        }

        return "Thank you for contacting the FPPI Concierge. I can provide accurate operational answers regarding our 5 core pillars: Models, Photographers, Hair & Makeup Artists, Designers, or Event Coordinators. What channel are you working with?";
    }
}