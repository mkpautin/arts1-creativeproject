// ============================================
// AI & ART SYLLABUS - JAVASCRIPT
// ============================================

// ============ CONFIGURATION ============
const CONFIG = {
    // The prompt that will be typed out
    prompt: "Create a comprehensive syllabus for a course exploring the relationship between artificial intelligence and art, examining how technology shapes the future of artistic expression.",
    
    // Typing speeds (in milliseconds)
    promptTypingSpeed: 30,
    contentTypingSpeed: 5,
    
    // Loading screen messages
    loadingMessages: [
        "Initializing AI model...",
        "Analyzing art history data...",
        "Processing creative algorithms...",
        "Generating module content...",
        "Compiling resources...",
        "Formatting syllabus structure...",
        "Finalizing response..."
    ],
    
    // Delays (in milliseconds)
    loadingMessageInterval: 600,
    loadingDuration: 4000,
    delayBetweenElements: 50
};

// ============ DOM ELEMENTS ============
const elements = {
    promptOverlay: document.getElementById('aiPromptOverlay'),
    loadingOverlay: document.getElementById('aiLoadingOverlay'),
    mainContent: document.getElementById('mainContent'),
    promptText: document.getElementById('promptText'),
    generateBtn: document.getElementById('generateBtn'),
    loadingStatus: document.getElementById('loadingStatus'),
    responseHeader: document.getElementById('aiResponseHeader')
};

// ============ NEURAL NETWORK BACKGROUND ============
function initNeuralBackground() {
    const canvas = document.getElementById('neural-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    
    const nodes = [];
    const numNodes = 300;
    const connectionDistance = 150;
    
    // Create nodes
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#6366f1';
            ctx.fill();
        });
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    window.addEventListener('resize', resizeCanvas);
}

// ============ TYPING EFFECT FOR PROMPT ============
function typePrompt() {
    return new Promise((resolve) => {
        const text = CONFIG.prompt;
        let i = 0;
        
        // Clear existing content but keep cursor
        elements.promptText.innerHTML = '<span class="prompt-cursor"></span>';
        
        function type() {
            if (i < text.length) {
                // Insert character before cursor
                const cursor = elements.promptText.querySelector('.prompt-cursor');
                const charSpan = document.createElement('span');
                charSpan.textContent = text.charAt(i);
                elements.promptText.insertBefore(charSpan, cursor);
                i++;
                setTimeout(type, CONFIG.promptTypingSpeed);
            } else {
                resolve();
            }
        }
        
        // Start typing after a short delay
        setTimeout(type, 500);
    });
}

// ============ LOADING SCREEN ============
function showLoading() {
    return new Promise((resolve) => {
        // Hide prompt overlay
        elements.promptOverlay.classList.add('hidden');
        
        // Show loading overlay
        setTimeout(() => {
            elements.loadingOverlay.classList.add('active');
        }, 300);
        
        // Cycle through loading messages
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (messageIndex < CONFIG.loadingMessages.length) {
                elements.loadingStatus.textContent = CONFIG.loadingMessages[messageIndex];
                messageIndex++;
            } else {
                clearInterval(messageInterval);
            }
        }, CONFIG.loadingMessageInterval);
        
        // Resolve after loading duration
        setTimeout(() => {
            clearInterval(messageInterval);
            resolve();
        }, CONFIG.loadingDuration);
    });
}

// ============ REVEAL MAIN CONTENT ============
function revealContent() {
    return new Promise((resolve) => {
        // Hide loading overlay
        elements.loadingOverlay.classList.add('hidden');
        
        // Show main content
        setTimeout(() => {
            elements.mainContent.classList.add('visible');
            
            // Show response header
            setTimeout(() => {
                elements.responseHeader.classList.add('visible');
            }, 300);
            
            // Start typewriter animation for content
            animateContent().then(resolve);
        }, 500);
    });
}

// ============ ANIMATE CONTENT WITH TYPEWRITER EFFECT ============
function animateContent() {
    return new Promise((resolve) => {
        // Get all elements to animate
        const elementsToAnimate = [
            // Navigation
            { el: document.querySelector('nav'), delay: 0 },
            
            // Hero section
            { el: document.querySelector('.hero h1'), delay: 100, typewriter: true },
            { el: document.querySelector('.hero .subtitle'), delay: 200, typewriter: true },
            
            // Description section
            { el: document.querySelector('#description .section-title'), delay: 300, typewriter: true },
            { el: document.querySelector('#description .section-divider'), delay: 350 },
            ...Array.from(document.querySelectorAll('#description .description-content > *')).map((el, i) => ({
                el, delay: 400 + (i * 100), typewriter: el.tagName === 'P'
            })),
            
            // Modules section
            { el: document.querySelector('#modules .section-title'), delay: 800, typewriter: true },
            { el: document.querySelector('#modules .section-divider'), delay: 850 },
            ...Array.from(document.querySelectorAll('.module-card')).map((el, i) => ({
                el, delay: 900 + (i * 200)
            })),
            
            // Gallery section
            { el: document.querySelector('#gallery .section-title'), delay: 1900, typewriter: true },
            { el: document.querySelector('#gallery .section-divider'), delay: 1950 },
            { el: document.querySelector('#gallery .gallery-intro'), delay: 2000, typewriter: true },
            ...Array.from(document.querySelectorAll('.gallery-item')).map((el, i) => ({
                el, delay: 2100 + (i * 100)
            })),
            
            // References section
            { el: document.querySelector('#references .section-title'), delay: 2500, typewriter: true },
            { el: document.querySelector('#references .section-divider'), delay: 2550 },
            ...Array.from(document.querySelectorAll('.reference-list li')).map((el, i) => ({
                el, delay: 2600 + (i * 80)
            })),
            
            // Footer
            { el: document.querySelector('footer'), delay: 3100 }
        ];
        
        // Filter out null elements
        const validElements = elementsToAnimate.filter(item => item.el);
        
        // Hide all elements initially
        validElements.forEach(item => {
            if (item.el) {
                item.el.classList.add('typewriter-hidden');
            }
        });
        
        // Animate each element
        validElements.forEach(item => {
            setTimeout(() => {
                if (item.el) {
                    item.el.classList.remove('typewriter-hidden');
                    item.el.classList.add('typewriter-visible');
                    
                    // Add typewriter effect for text elements
                    if (item.typewriter) {
                        typewriterEffect(item.el);
                    }
                }
            }, item.delay);
        });
        
        // Resolve when all animations complete
        const maxDelay = Math.max(...validElements.map(item => item.delay));
        setTimeout(resolve, maxDelay + 1000);
    });
}

// ============ TYPEWRITER EFFECT FOR INDIVIDUAL ELEMENTS ============
function typewriterEffect(element) {
    const text = element.textContent;
    const originalHTML = element.innerHTML;
    
    // Check if it's a simple text element
    if (element.children.length === 0) {
        element.textContent = '';
        element.classList.add('typing-cursor');
        
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, CONFIG.contentTypingSpeed);
            } else {
                element.classList.remove('typing-cursor');
            }
        }
        type();
    }
}

// ============ BUTTON CLICK HANDLER ============
function handleGenerate() {
    // Disable button
    elements.generateBtn.disabled = true;
    elements.generateBtn.style.opacity = '0.7';
    elements.generateBtn.style.cursor = 'not-allowed';
    
    // Start the sequence
    showLoading()
        .then(() => revealContent())
        .then(() => {
            console.log('Syllabus generation complete!');
            initNeuralBackground();
        });
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI & Art Syllabus - Initializing...');
    
    // Type the prompt automatically when page loads
    typePrompt().then(() => {
        console.log('Prompt typed successfully');
    });
    
    // Add click event to generate button
    if (elements.generateBtn) {
        elements.generateBtn.addEventListener('click', handleGenerate);
    }
    
    // Also allow pressing Enter to generate
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !elements.promptOverlay.classList.contains('hidden')) {
            handleGenerate();
        }
    });
});

// ============ OPTIONAL: Skip intro for development ============
// Uncomment the line below to skip the intro animation during development
// window.onload = () => { elements.promptOverlay.classList.add('hidden'); elements.mainContent.classList.add('visible'); initNeuralBackground(); };