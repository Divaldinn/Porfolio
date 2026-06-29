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
import { ref } from 'vue';
import ScrambleText from './ScrambleText.vue';

const props = defineProps({
  title: { type: String, required: true },
  delay: { type: Number, default: 0 },
  enableScramble: { type: Boolean, default: true }
});

const stage = ref(4); // Forzar siempre cargado
</script>

<style scoped>
.tech-card {
    position: relative;
    padding: 20px;
    min-height: 200px;
}

@media (max-width: 768px) {
    .tech-card {
        padding: 15px; /* Reduced from 20px */
        min-height: auto; /* Allow auto height on mobile to prevent huge empty boxes */
    }
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
    display: none;
}

/* Background Expand */
.card-bg {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: var(--color-card-bg);
    z-index: -1;
}
/* Content Visibility */
.card-content {
    position: relative;
    z-index: 2;
    opacity: 1;
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
}

.top-left { top: -2px; left: -2px; border-bottom: none; border-right: none; }
.bottom-right { bottom: -2px; right: -2px; border-top: none; border-left: none; }
</style>
