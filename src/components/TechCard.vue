<template>
  <div 
    class="tech-card" 
    :class="[`stage-${stage}`, { 'locked': stage === 4 }]"
    ref="cardRef"
  >
    <!-- Stage 1: Wireframe Border -->
    <div class="wireframe-border"></div>
    
    <!-- Stage 2: Background Filler -->
    <div class="card-bg"></div>

    <!-- Scanline Effect -->
    <div class="scanline"></div>

    <!-- Content Container -->
    <div class="card-content">
        <div class="header">
            <!-- Stage 3: Scramble Title (Conditional) -->
            <h3 v-if="stage >= 3" class="tech-title">
                <ScrambleText v-if="enableScramble" :text="title" :duration="800" />
                <span v-else>{{ title }}</span>
            </h3>
            <!-- Optional Subtitle/Icon -->
            <div class="header-extra">
                <slot name="header"></slot>
            </div>
        </div>
        
        <!-- Main Body -->
        <div class="body" :class="{ 'visible': stage >= 3 }">
            <slot></slot>
        </div>
    </div>
    
    <!-- Decorative Corners -->
    <div class="corner top-left"></div>
    <div class="corner bottom-right"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ScrambleText from './ScrambleText.vue';

const props = defineProps({
  title: { type: String, required: true },
  delay: { type: Number, default: 0 }, // Stagger delay in ms
  enableScramble: { type: Boolean, default: true }
});

const stage = ref(0);
const cardRef = ref(null);
let observer = null;

onMounted(() => {
    // Setup Intersection Observer for Scroll Trigger
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply stagger delay relative to detection
                setTimeout(() => {
                    runSequence();
                }, props.delay);
                
                // Stop observing once triggered
                if (cardRef.value) observer.unobserve(cardRef.value);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Offset to trigger slightly before/after
    });

    if (cardRef.value) {
        observer.observe(cardRef.value);
    }
});

import { onUnmounted } from 'vue';
onUnmounted(() => {
    if (observer) observer.disconnect();
});

const runSequence = () => {
    // Stage 1: Hardware Init (Flicker + Expand)
    stage.value = 1;
    
    // Stage 2: Signal Stabilized (Border Flash) - 0.5s after start
    setTimeout(() => {
        stage.value = 2;
    }, 500);
    
    // Stage 3: Software Load (Content + Scramble + Scanline) - 0.8s after start
    setTimeout(() => {
        stage.value = 3;
    }, 800);
    
    // Stage 4: Process Complete (Lock / Color Shift) - 2s after start
    setTimeout(() => {
        stage.value = 4;
    }, 2000);
};
</script>

<style scoped>
.tech-card {
    position: relative;
    padding: 20px;
    min-height: 200px;
    
    /* Hardware Init State */
    opacity: 0;
    transform: scaleY(0); /* Closed vertical */
    transform-origin: center; /* Expands from center like a screen */
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

@media (max-width: 768px) {
    .tech-card {
        padding: 15px; /* Reduced from 20px */
        min-height: auto; /* Allow auto height on mobile to prevent huge empty boxes */
    }
}

/* Stage 1: Hardware On (Expand + Flicker) */
.tech-card.stage-1, .tech-card.stage-2, .tech-card.stage-3, .tech-card.stage-4 {
    transform: scaleY(1);
    animation: hardware-flicker 0.4s steps(5, end) forwards;
}

@keyframes hardware-flicker {
    0% { opacity: 0; }
    20% { opacity: 1; }
    40% { opacity: 0; }
    60% { opacity: 0.5; }
    80% { opacity: 0; }
    100% { opacity: 1; }
}

/* Stage 2: Signal Flash (Border Bloom) */
.tech-card.stage-2 .wireframe-border {
    border-color: #fff;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    transition: all 0.1s;
}

/* Base Border */
.wireframe-border {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.15); /* Semi-transparent as requested */
    transition: all 0.3s;
    background: rgba(0, 20, 0, 0.05); /* Faint Grid bg */
    z-index: 0;
}

/* Scanline Effect */
.scanline {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0;
    z-index: 10;
    box-shadow: 0 0 10px var(--color-accent);
    pointer-events: none;
}

/* Run Scanline on Stage 3 */
.stage-3 .scanline {
    animation: scan-down 1.2s cubic-bezier(0.45, 0, 0.55, 1) forwards;
}

@keyframes scan-down {
    0% { top: 0; opacity: 1; }
    100% { top: 100%; opacity: 0; }
}

/* Background Expand */
.card-bg {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: var(--color-card-bg);
    opacity: 0;
    transition: opacity 0.5s;
    z-index: -1;
}
.stage-1 .card-bg, .stage-2 .card-bg, .stage-3 .card-bg, .stage-4 .card-bg {
    opacity: 1;
}

/* Content Visibility - DELAYED until Stage 3 */
.card-content {
    position: relative;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s;
}
.stage-3 .card-content, .stage-4 .card-content {
    opacity: 1; /* Content appears only after hardware stabilize */
}

.tech-title {
    margin: 0 0 10px 0;
    color: var(--color-accent);
    font-family: var(--font-header);
    font-size: 1.2rem;
    text-transform: uppercase;
}

/* Stage 4: Lock state (Color Shift) */
.locked .wireframe-border {
    border-color: var(--color-accent); /* Turns Yellow/Accent */
    box-shadow: 0 0 5px rgba(255, 230, 0, 0.2);
}

/* Decor */
.corner {
    position: absolute;
    width: 10px; height: 10px;
    border: 2px solid var(--color-secondary);
    opacity: 0;
    transition: opacity 0.3s;
}
.stage-3 .corner, .stage-4 .corner { opacity: 1; }

.top-left { top: -2px; left: -2px; border-bottom: none; border-right: none; }
.bottom-right { bottom: -2px; right: -2px; border-top: none; border-left: none; }
</style>
