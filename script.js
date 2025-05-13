// Advanced animation and 3D effects for the table tennis poster

document.addEventListener('DOMContentLoaded', function() {
    // Animate the ping pong balls with random motion
    const balls = document.querySelectorAll('.ping-pong-ball');
    
    balls.forEach(ball => {
        // Random initial position
        const randomX = Math.random() * 30 - 15;
        const randomY = Math.random() * 30 - 15;
        
        // Set random animation delay
        const delay = Math.random() * -10;
        ball.style.animationDelay = delay + 's';
        
        // Add a subtle floating effect
        ball.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
    
    // Add 3D perspective effect on team names when hovering
    const teamElements = document.querySelectorAll('.team');
    
    teamElements.forEach(team => {
        team.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05) translateZ(20px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        team.addEventListener('mouseout', function() {
            if (this.classList.contains('team-left')) {
                this.style.transform = 'perspective(1000px) rotateY(10deg)';
            } else {
                this.style.transform = 'perspective(1000px) rotateY(-10deg)';
            }
        });
    });
    
    // Add particle effects in the background
    createParticles();
    
    // Add glow effect to the VS text
    const versus = document.querySelector('.versus');
    let glowIntensity = 0;
    let increasing = true;
    
    setInterval(() => {
        if (increasing) {
            glowIntensity += 0.5;
            if (glowIntensity >= 15) increasing = false;
        } else {
            glowIntensity -= 0.5;
            if (glowIntensity <= 5) increasing = true;
        }
        
        versus.style.textShadow = `0 0 ${glowIntensity}px var(--secondary-color)`;
    }, 100);
    
    // Add parallax effect to the poster elements
    const poster = document.querySelector('.poster');
    const content = document.querySelector('.content');
    const balls3d = document.querySelectorAll('.ping-pong-ball');
    const badge = document.querySelector('.crucial-match-badge');
    
    poster.addEventListener('mousemove', function(e) {
        // Get position of mouse cursor relative to the center of the poster
        const rect = poster.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const offsetX = (mouseX - centerX) / centerX; // -1 to 1
        const offsetY = (mouseY - centerY) / centerY; // -1 to 1
        
        // Apply subtle movement to content
        content.style.transform = `translate(${offsetX * 5}px, ${offsetY * 5}px)`;
        
        // Move balls in opposite direction for parallax effect
        balls3d.forEach(ball => {
            const ballX = offsetX * -15 * (1 + Math.random());
            const ballY = offsetY * -15 * (1 + Math.random());
            
            ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
        });
        
        // Move badge slightly
        if (badge) {
            badge.style.transform = `rotate(15deg) translate(${offsetX * 10}px, ${offsetY * 10}px)`;
        }
    });
    
    // Reset positions when mouse leaves
    poster.addEventListener('mouseleave', function() {
        content.style.transform = 'translate(0, 0)';
        
        balls3d.forEach(ball => {
            ball.style.transform = 'translate(0, 0)';
        });
        
        if (badge) {
            badge.style.transform = 'rotate(15deg)';
        }
    });
    
    // Add spotlight effect that follows cursor
    const spotlight = document.createElement('div');
    spotlight.classList.add('spotlight');
    poster.appendChild(spotlight);
    
    poster.addEventListener('mousemove', function(e) {
        const rect = poster.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 30%)`;
    });
});

// Function to create floating particles in the background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    
    const posterElement = document.querySelector('.poster');
    posterElement.appendChild(particlesContainer);
    
    // Create 30 particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        particle.style.opacity = opacity;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite linear`;
        
        // Random animation delay
        const delay = Math.random() * -30;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for the particles
    const style = document.createElement('style');
    style.textContent = `
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 2;
            pointer-events: none;
        }
        
        .particle {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
        }
        
        .spotlight {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        }
        
        @keyframes float {
            0% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(10px, 20px);
            }
            50% {
                transform: translate(20px, 0px);
            }
            75% {
                transform: translate(10px, -20px);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Add confetti animation when clicking on the call-to-action button
document.querySelector('.free-entry-badge').addEventListener('click', function() {
    createConfetti();
});

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    
    document.querySelector('.poster').appendChild(confettiContainer);
    
    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random confetti type
        const type = Math.floor(Math.random() * 3);
        if (type === 0) {
            confetti.classList.add('square');
        } else if (type === 1) {
            confetti.classList.add('circle');
        } else {
            confetti.classList.add('triangle');
        }
        
        // Random color
        const colors = ['#e94560', '#0f3460', '#1a1a2e', '#4caf50', '#ffffff'];
        const colorIndex = Math.floor(Math.random() * colors.length);
        confetti.style.backgroundColor = colors[colorIndex];
        
        // Random position, starting from the bottom
        const posX = Math.random() * 100;
        confetti.style.left = `${posX}%`;
        confetti.style.bottom = '0';
        
        // Random size
        const size = Math.random() * 10 + 5;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // Random rotation
        const rotation = Math.random() * 360;
        confetti.style.transform = `rotate(${rotation}deg)`;
        
        // Animation
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        
        confetti.style.animation = `confetti ${duration}s ${delay}s forwards`;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Add CSS for the confetti
    const style = document.createElement('style');
    style.textContent = `
        .confetti-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 100;
            pointer-events: none;
        }
        
        .confetti {
            position: absolute;
            background-color: #e94560;
            z-index: 10;
            pointer-events: none;
        }
        
        .square {
            border-radius: 0;
        }
        
        .circle {
            border-radius: 50%;
        }
        
        .triangle {
            width: 0 !important;
            height: 0 !important;
            background-color: transparent !important;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 10px solid #e94560;
        }
        
        @keyframes confetti {
            0% {
                transform: translateY(0) rotate(0);
                opacity: 1;
            }
            100% {
                transform: translateY(-500px) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}