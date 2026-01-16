<template>
  <div class="curtain-layer" :class="{ 'reveal': isFinished }">
    <div class="loader-sidebar">
        <!-- Vertical Progress Track -->
        <div class="progress-track-vertical">
            <div class="progress-fill-vertical" :style="{ height: progress + '%' }"></div>
        </div>
        
        <div class="loader-content">
            <!-- SVG Line Drawing Animation -->
            <svg class="logo-svg" viewBox="0 0 200 120">
                <text x="50%" y="60%" text-anchor="middle" class="logo-stroke">HS</text>
            </svg>
            
            <!-- Scramble Counter (Left Aligned) -->
            <div class="data-block">
                <div class="row">
                    <span class="label">SYS__INTEGRITY //</span>
                    <span class="val">{{ displayProgress }}%</span>
                </div>
                <div class="row status-log">
                    <span v-if="progress > 10">>> MOUNTING_KERNEL...</span>
                    <span v-if="progress > 40">>> DECRYPTING_ASSETS...</span>
                    <span v-if="progress > 80">>> ESTABLISHING_UPLINK...</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const progress = ref(0);
const isFinished = ref(false);
const emit = defineEmits(['complete']);

const displayProgress = computed(() => {
    return progress.value.toString().padStart(3, '0');
});

onMounted(() => {
    const duration = 3000;
    const intervalTime = 20;
    
    // Reset body overflow to prevent scrolling during load
    document.body.style.overflow = 'hidden';
    
    const interval = setInterval(() => {
        if (progress.value < 100) {
            let jump = Math.random() * 2;
            progress.value = Math.min(100, progress.value + jump);
        } else {
            clearInterval(interval);
            setTimeout(() => {
                isFinished.value = true;
                document.body.style.overflow = '';
                emit('complete');
            }, 800);
        }
    }, intervalTime);
});
</script>

<style scoped>
.curtain-layer {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: #000;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Left Align */
    padding-left: 80px; /* Offset from edge */
    
    transform-origin: top;
    transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
}

.curtain-layer.reveal {
    transform: translateY(-100%);
}

.loader-sidebar {
    display: flex;
    align-items: flex-end;
    gap: 40px;
}

.progress-track-vertical {
    width: 4px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
}

.progress-fill-vertical {
    position: absolute;
    bottom: 0; left: 0;
    width: 100%;
    background: var(--color-accent);
    box-shadow: 0 0 10px var(--color-accent);
    transition: height 0.1s linear;
}

.loader-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
}

.logo-svg {
    width: 150px; height: 100px;
}
.logo-stroke {
    font-family: var(--font-header);
    font-weight: 900;
    font-size: 80px;
    fill: #fff; /* Solid White */
    stroke: none;
    opacity: 0;
    animation: glitchReveal 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
    animation-delay: 0.5s;
}

@keyframes glitchReveal {
    0% { opacity: 0; transform: scale(0.9); }
    20% { opacity: 1; transform: scale(1.1); }
    40% { opacity: 0; transform: scale(0.95); }
    60% { opacity: 1; transform: scale(1.02); }
    80% { opacity: 0.5; transform: scale(0.98); }
    100% { opacity: 1; transform: scale(1); }
}

/* Removed old stroke animation @keyframes drawStroke */

.data-block {
    font-family: 'Courier Prime', monospace;
    color: var(--color-text-dim);
    font-size: 0.9rem;
}

.row {
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
}
.val {
    color: var(--color-accent);
    font-weight: bold;
}
.status-log {
    flex-direction: column;
    font-size: 0.8rem;
    color: #666;
    height: 60px; /* Fixed height to prevent jitter */
}

@keyframes drawStroke {
    to { stroke-dashoffset: 0; }
}
</style>
