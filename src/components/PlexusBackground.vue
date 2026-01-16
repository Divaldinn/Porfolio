<template>
  <div class="plexus-container" ref="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const container = ref(null);
const canvas = ref(null);
let ctx = null;
let animationFrameId = null;
let particles = [];

// Configuration
// Configuration
const particleCount = window.innerWidth < 768 ? 25 : 60; // Mobile Optimization (25 vs 60)
const connectionDistance = 150;
const moveSpeed = 0.5;

class Particle {
    constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * moveSpeed;
        this.vy = (Math.random() - 0.5) * moveSpeed;
        this.size = Math.random() * 2 + 1;
    }

    update(w, h) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
    }
}

const resizeCanvas = () => {
    if (!container.value || !canvas.value) return;
    canvas.value.width = container.value.clientWidth;
    canvas.value.height = container.value.clientHeight;
};

const animate = () => {
    if (!canvas.value) return;
    const w = canvas.value.width;
    const h = canvas.value.height;
    
    ctx.clearRect(0, 0, w, h);
    
    // Update and Draw Particles
    particles.forEach(p => {
        p.update(w, h);
        p.draw(ctx);
    });
    
    // Draw Connections (Plexus Effect)
    // O(N^2) check - acceptable for low N (<100)
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < connectionDistance) {
                const opacity = 1 - (dist / connectionDistance);
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`; // Low opacity lines
                ctx.lineWidth = 1;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
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
    
    // Init Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.value.width, canvas.value.height));
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
    z-index: -10; /* Behind everything */
    background: #0f0f0f; /* Base bg */
    pointer-events: none;
}
canvas {
    display: block;
}
</style>
