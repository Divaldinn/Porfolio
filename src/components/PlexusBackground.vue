<template>
  <div class="plexus-container" ref="container">
    <canvas ref="canvas" @mousemove="onMouseMove" @mouseleave="onMouseLeave"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const container = ref(null);
const canvas = ref(null);
let ctx = null;
let animationFrameId = null;

let particles = [];
const particleCount = window.innerWidth < 768 ? 40 : 100;
const connectionDistance = 150;
const mouseRadius = 200;

const mouse = { x: -1000, y: -1000, active: false };

const onMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
};

const onMouseLeave = () => {
    mouse.active = false;
    mouse.x = -1000;
    mouse.y = -1000;
};

class NodeParticle {
    constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.baseSize = Math.random() * 1.5 + 0.5;
        this.color = Math.random() > 0.95 ? '#FFE600' : (Math.random() > 0.9 ? '#00C9FF' : '#555555');
    }

    update(w, h) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse interaction (slight attraction/repulsion)
        if (mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < mouseRadius) {
                // gentle push away
                this.x -= (dx / dist) * 0.5;
                this.y -= (dy / dist) * 0.5;
            }
        }
    }

    draw(ctx, isLight) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.baseSize, 0, Math.PI * 2);
        
        let finalColor = this.color;
        // Dynamically override colors in Light Mode rendering
        if (isLight) {
            if (this.color === '#555555' || this.color === '#FFE600') {
               finalColor = '#000000'; // Make grey passing and yellow passing particles Black
            } else {
               finalColor = '#007BFF'; // Cyan passing becomes Tech Blue
            }
        }
        
        ctx.fillStyle = finalColor;
        ctx.fill();
    }
}

const resizeCanvas = () => {
    if (!canvas.value) return;
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
};

const animate = () => {
    if (!canvas.value) return;
    const w = canvas.value.width;
    const h = canvas.value.height;
    
    // Clear transparently
    ctx.clearRect(0, 0, w, h);
    
    const isLight = document.documentElement.classList.contains('light-theme');
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(w, h);
        particles[i].draw(ctx, isLight);
        
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < connectionDistance) {
                ctx.beginPath();
                // Closer = more opaque
                const opacity = 1 - (dist / connectionDistance);
                // Highlight yellow if near mouse
                let isNearMouse = false;
                if (mouse.active) {
                    const mdx = particles[i].x - mouse.x;
                    const mdy = particles[i].y - mouse.y;
                    if (Math.sqrt(mdx*mdx + mdy*mdy) < mouseRadius) isNearMouse = true;
                }
                
                const defaultLine = isLight ? `rgba(0, 0, 0, ${opacity * 0.3})` : `rgba(100, 100, 100, ${opacity * 0.2})`;
                const hoverLine = isLight ? `rgba(0, 123, 255, ${opacity * 0.6})` : `rgba(0, 201, 255, ${opacity * 0.5})`;
                
                ctx.strokeStyle = isNearMouse ? hoverLine : defaultLine;
                ctx.lineWidth = isNearMouse ? 1.5 : 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
    ctx = canvas.value.getContext('2d');
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Init points
    for (let i = 0; i < particleCount; i++) {
        particles.push(new NodeParticle(canvas.value.width, canvas.value.height));
    }
    
    animate();
});

onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas);
    cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.plexus-container {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: -10; 
    background: transparent;
    pointer-events: auto; /* Required to catch mouse events for particles */
}
canvas {
    display: block;
}
</style>
