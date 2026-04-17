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
let time = 0;

const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

const onMouseMove = (e) => {
    const rect = canvas.value.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
};

const onMouseLeave = () => {
    mouse.targetX = -1000;
    mouse.targetY = -1000;
};

const resizeCanvas = () => {
    if (!canvas.value) return;
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
};

const animate = () => {
    if (!canvas.value) return;
    const w = canvas.value.width;
    const h = canvas.value.height;
    
    ctx.clearRect(0, 0, w, h);
    
    // Smooth mouse follow
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;
    
    time += 0.005;
    
    ctx.strokeStyle = "rgba(255, 230, 0, 0.15)"; // Tactical Yellow
    ctx.lineWidth = 1;
    
    // Draw topographic lines
    const lineSpacing = 40;
    for (let y = -50; y < h + 100; y += lineSpacing) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 20) {
            
            // Multiple sine waves to simulate terrain contour
            let ny = y + Math.sin(x * 0.005 + time) * 30 
                       + Math.sin(x * 0.01 - time * 0.5) * 15;
            
            // Mouse Interaction: Magnetic Repulsion / Distorsion
            const dx = x - mouse.x;
            const dy = ny - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 250) {
                // Creates a bubble pushing lines away
                const force = (250 - dist) / 3;
                ny += force * (dy / dist);
                ctx.strokeStyle = "rgba(0, 201, 255, 0.4)"; // Cyan highlight near mouse
            } else {
                ctx.strokeStyle = "rgba(100, 100, 100, 0.2)"; // Dim gray normally
            }
            
            if (x === 0) ctx.moveTo(x, ny);
            else ctx.lineTo(x, ny);
        }
        ctx.stroke();
    }
    
    animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
    ctx = canvas.value.getContext('2d');
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
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
    pointer-events: none;
}
canvas {
    display: block;
}
</style>
