// Pug Paradise - Interactive JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        this.classList.add('active');

        // Get the target section
        const targetId = this.getAttribute('href');

        // Show a pug bark notification
        showPugNotification(`Woof! ${this.textContent} section coming soon!`);
    });
});

// Pug notification system
function showPugNotification(message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.pug-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'pug-notification';
    notification.innerHTML = `
        <span class="notification-icon">🐶</span>
        <span class="notification-message">${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #D4A574 0%, #E8B87E 100%);
        color: #2C1810;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(44, 24, 16, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
        font-weight: 600;
        border: 2px solid #8B6F47;
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-icon {
        font-size: 1.5rem;
        animation: wiggle 0.5s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Button interactions
document.querySelectorAll('.pug-button').forEach(button => {
    button.addEventListener('click', function() {
        // Create pug emoji animation
        createPugEmoji(this);

        // Show notification
        const featureName = this.closest('.feature-card').querySelector('h3').textContent;
        showPugNotification(`${featureName} will be available soon! 🐾`);
    });
});

// Create floating pug emoji on button click
function createPugEmoji(button) {
    const emoji = document.createElement('div');
    emoji.textContent = '🐶';
    emoji.style.cssText = `
        position: fixed;
        font-size: 3rem;
        pointer-events: none;
        z-index: 999;
        animation: floatUp 2s ease-out forwards;
    `;

    const rect = button.getBoundingClientRect();
    emoji.style.left = `${rect.left + rect.width / 2}px`;
    emoji.style.top = `${rect.top}px`;

    document.body.appendChild(emoji);

    setTimeout(() => emoji.remove(), 2000);
}

// Add float up animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatStyle);

// Random pug facts rotation
const pugFacts = [
    "Did you know? Pugs were bred to be companions for Chinese emperors!",
    "A group of pugs is called a 'grumble'!",
    "Pugs can run up to 3-5 miles per hour!",
    "Pugs originated in China over 2,000 years ago!",
    "The name 'Pug' likely comes from the Latin word 'pugnus' meaning 'fist'!",
    "Pugs are one of the oldest dog breeds in the world!",
    "Napoleon's wife Josephine had a pug named Fortune!",
    "Pugs were the official dog of the House of Orange in Holland!"
];

// Rotate facts every 5 seconds
let factIndex = 0;
setInterval(() => {
    const factItems = document.querySelectorAll('.fact-item');
    if (factItems.length > 0) {
        factItems.forEach((item, index) => {
            item.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                factIndex = (factIndex + 1) % pugFacts.length;
                item.textContent = pugFacts[(factIndex + index) % pugFacts.length];
                item.style.animation = 'fadeIn 0.5s ease';
            }, 500);
        });
    }
}, 8000);

// Add fade animations
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }

    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
    }
`;
document.head.appendChild(fadeStyle);

// Easter egg: Click on ASCII pug
const pugAscii = document.querySelector('.pug-ascii');
if (pugAscii) {
    pugAscii.style.cursor = 'pointer';
    pugAscii.addEventListener('click', function() {
        this.style.animation = 'shake 0.5s ease';
        showPugNotification('You found the secret pug! 🎉');

        // Create confetti effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 50);
        }

        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
}

// Confetti animation
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.textContent = ['🐾', '❤️', '⭐', '🦴'][Math.floor(Math.random() * 4)];
    confetti.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -50px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 999;
        animation: fall ${2 + Math.random() * 2}s linear forwards;
    `;

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
}

// Fall animation
const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) rotate(-5deg); }
        20%, 40%, 60%, 80% { transform: translateX(10px) rotate(5deg); }
    }
`;
document.head.appendChild(fallStyle);

// Welcome message on load
window.addEventListener('load', () => {
    setTimeout(() => {
        showPugNotification('Welcome to Pug Paradise! 🐶');
    }, 500);
});

// Add paw print trail on mouse move (subtle effect)
let lastPawTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastPawTime > 200) {
        createPawPrint(e.clientX, e.clientY);
        lastPawTime = now;
    }
});

function createPawPrint(x, y) {
    const paw = document.createElement('div');
    paw.textContent = '🐾';
    paw.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 1;
        opacity: 0.3;
        animation: fadePaw 2s ease-out forwards;
    `;

    document.body.appendChild(paw);

    setTimeout(() => paw.remove(), 2000);
}

const pawFadeStyle = document.createElement('style');
pawFadeStyle.textContent = `
    @keyframes fadePaw {
        0% { opacity: 0.3; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.5); }
    }
`;
document.head.appendChild(pawFadeStyle);

console.log('🐶 Pug Paradise loaded successfully! Stay pugly! 🐾');
