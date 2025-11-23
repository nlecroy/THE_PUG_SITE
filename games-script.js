// Games Page JavaScript

// Game URLs mapping for various unblocked game sites
const gameUrls = {
    'duck-life': 'https://duck.tinyexams.com/duck-life',
    'slope-unblocked': 'https://slope-game.github.io/slope/index.html',
    'run-3': 'https://run3.io',
    'tetris': 'https://tetris.com/play-tetris',
    '2048': 'https://play2048.co',
    'tank-trouble': 'https://www.tanktrouble.com',
    'chrome-dino': 'https://chromedino.com',
    'flappy-bird': 'https://flappybird.io',
    'pacman': 'https://www.google.com/logos/2010/pacman10-i.html',
    'snake': 'https://www.google.com/fbx?fbx=snake_arcade',
    'cookie-clicker': 'https://orteil.dashnet.org/cookieclicker/',
    'geo-dash': 'https://geometry-dash.co'
};

// Embedded iframe URLs (most unblocked games work in iframes)
const embedUrls = {
    'duck-life': 'https://duck.tinyexams.com/duck-life',
    'slope-unblocked': 'https://slope-game.github.io/slope/index.html',
    'run-3': 'https://run3.io',
    'tetris': 'https://tetris.com/play-tetris',
    '2048': 'https://play2048.co',
    'tank-trouble': 'https://www.tanktrouble.com',
    'chrome-dino': 'https://chromedino.com',
    'flappy-bird': 'https://flappybird.io',
    'pacman': 'https://www.google.com/logos/2010/pacman10-i.html',
    'snake': 'https://www.google.com/fbx?fbx=snake_arcade',
    'cookie-clicker': 'https://orteil.dashnet.org/cookieclicker/',
    'geo-dash': 'https://geometry-dash.co'
};

// Add click handlers to all game cards
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', function() {
        const gameKey = this.getAttribute('data-game');
        const gameName = this.querySelector('h3').textContent;

        // Create particle explosion
        createGameParticles(this);

        // Try to load in iframe first
        loadGameInIframe(gameKey, gameName);
    });

    // Add hover effect sounds (visual feedback)
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// Load game in iframe
function loadGameInIframe(gameKey, gameName) {
    const gameFrame = document.getElementById('game-frame');
    const gameOverlay = document.querySelector('.game-overlay');

    // Show notification
    if (typeof showPugNotification === 'function') {
        showPugNotification(`🎮 Loading ${gameName}... 🎮`);
    }

    // Try to embed first
    const embedUrl = embedUrls[gameKey];
    if (embedUrl) {
        gameFrame.src = embedUrl;
        gameOverlay.style.display = 'none';

        // Scroll to game frame
        setTimeout(() => {
            document.querySelector('.embedded-game-section').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);

        // If iframe fails to load, provide fallback
        gameFrame.onerror = function() {
            gameOverlay.style.display = 'flex';
            gameOverlay.querySelector('h3').textContent = 'Having trouble loading?';
            gameOverlay.querySelector('p').innerHTML = '🐾 <a href="' + gameUrls[gameKey] + '" target="_blank" style="color: #4ECDC4;">Click here to play in a new tab!</a> 🐾';
        };
    }
}

// Create particle explosion effect
function createGameParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particles = ['🎮', '🐶', '⭐', '💜', '🌈', '✨', '🎯', '🏆'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];

            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 100 + Math.random() * 100;
            const endX = centerX + Math.cos(angle) * velocity;
            const endY = centerY + Math.sin(angle) * velocity;

            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 2rem;
                pointer-events: none;
                z-index: 9999;
                animation: explode 1s ease-out forwards;
                --end-x: ${endX - centerX}px;
                --end-y: ${endY - centerY}px;
            `;

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }, i * 20);
    }
}

// Add explosion animation
const explosionStyle = document.createElement('style');
explosionStyle.textContent = `
    @keyframes explode {
        0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translate(calc(var(--end-x) * 0.7), calc(var(--end-y) * 0.7)) scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x), var(--end-y)) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(explosionStyle);

// Mini-game handlers
document.getElementById('pug-memory')?.querySelector('.mini-game-btn')?.addEventListener('click', function() {
    if (typeof showPugNotification === 'function') {
        showPugNotification('🧠 Pug Memory Match coming soon! Stay tuned! 🐾');
    }
    createConfettiExplosion();
});

document.getElementById('pug-clicker')?.querySelector('.mini-game-btn')?.addEventListener('click', function() {
    if (typeof showPugNotification === 'function') {
        showPugNotification('👆 Pug Clicker coming soon! Click faster! 🐾');
    }
    createConfettiExplosion();
});

document.getElementById('pug-runner')?.querySelector('.mini-game-btn')?.addEventListener('click', function() {
    if (typeof showPugNotification === 'function') {
        showPugNotification('🏃 Pug Runner coming soon! Get ready to run! 🐾');
    }
    createConfettiExplosion();
});

// Create confetti explosion
function createConfettiExplosion() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = -50;
            const confetti = document.createElement('div');
            const emojis = ['🐶', '🐾', '❤️', '⭐', '💜', '🌈', '✨', '💖', '🎮', '🏆'];
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            confetti.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: 2rem;
                pointer-events: none;
                z-index: 9999;
                animation: fallConfetti ${2 + Math.random()}s linear forwards;
                filter: drop-shadow(0 0 10px rgba(199, 113, 237, 0.8));
            `;

            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 50);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fallConfetti {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(${Math.random() * 720}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Add floating animation to game cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'cardFloat 6s ease-in-out infinite, fadeIn 0.6s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe all game cards
document.querySelectorAll('.game-card, .mini-game-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add fade in animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// Add random pug emojis floating across the screen
setInterval(() => {
    const pug = document.createElement('div');
    pug.textContent = '🐶';
    pug.style.cssText = `
        position: fixed;
        left: -50px;
        top: ${Math.random() * window.innerHeight}px;
        font-size: 3rem;
        pointer-events: none;
        z-index: 1;
        animation: floatAcross ${5 + Math.random() * 3}s linear forwards;
        filter: drop-shadow(0 0 10px rgba(199, 113, 237, 0.6));
    `;
    document.body.appendChild(pug);
    setTimeout(() => pug.remove(), 8000);
}, 4000);

const floatAcrossStyle = document.createElement('style');
floatAcrossStyle.textContent = `
    @keyframes floatAcross {
        0% {
            transform: translateX(0) rotate(0deg);
            opacity: 0.7;
        }
        50% {
            transform: translateX(${window.innerWidth / 2}px) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translateX(${window.innerWidth + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatAcrossStyle);

console.log('🎮 Games page loaded! Let the games begin! 🐶');
