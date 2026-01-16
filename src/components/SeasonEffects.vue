<template>
  <div class="season-overlay">
    <!-- Christmas Snow -->
    <div v-if="currentSeason === 'christmas'" class="snow-container">
        <div class="snowflake" v-for="n in flakeCount" :key="n"></div>
    </div>

    <!-- Halloween Fog/Webs -->
    <div v-if="currentSeason === 'halloween'" class="halloween-container">
        <div class="fog-layer"></div>
        <div class="spiderweb top-left"></div>
        <div class="spiderweb top-right"></div>
    </div>

    <!-- New Year Fireworks -->
    <div v-if="currentSeason === 'newyear'" class="fireworks-container">
        <div class="firework" v-for="n in 5" :key="n"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentSeason = ref(null);

onMounted(() => {
    const today = new Date();
    const month = today.getMonth() + 1; // 1-12
    const day = today.getDate();

    // Christmas: Dec 1 - Dec 30
    if (month === 12 && day >= 1 && day <= 30) {
        currentSeason.value = 'christmas';
    } 
    // New Year: Dec 31 - Jan 2
    else if ((month === 12 && day === 31) || (month === 1 && day <= 2)) {
        currentSeason.value = 'newyear';
    }
    // Halloween: Oct 20 - Nov 2
    else if ((month === 10 && day >= 20) || (month === 11 && day <= 2)) {
        currentSeason.value = 'halloween';
    }
    // Debug: Uncomment to test
    // currentSeason.value = 'christmas'; 
});

const flakeCount = window.innerWidth < 768 ? 20 : 50;
</script>

<style scoped>
.season-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none;
    z-index: 50; /* Below Navbar (100) but above content */
    overflow: hidden;
}

/* --- Christmas Snow --- */
.snow-container {
    width: 100%; height: 100%;
}
.snowflake {
    position: absolute;
    top: -10px;
    background: white;
    width: 5px; height: 5px;
    border-radius: 50%;
    opacity: 0.8;
    animation: fall linear infinite;
}
/* Randomize snowflakes via nth-child SCSS-like logic in pure CSS */
.snowflake:nth-child(2n) { width: 7px; height: 7px; animation-duration: 7s; left: 20%; }
.snowflake:nth-child(2n+1) { animation-duration: 5s; left: 80%; }
.snowflake:nth-child(3n) { animation-delay: 2s; left: 10%; }
.snowflake:nth-child(4n) { animation-duration: 10s; left: 60%; }
.snowflake:nth-child(5n) { animation-delay: 5s; left: 40%; }
/* Add more randomization strategies if supported or keep simple */

@for $i from 1 through 50 {
    .snowflake:nth-child(#{$i}) {
        left: random(100) * 1%;
        animation-duration: (random(30) * 0.1s + 3s);
        animation-delay: random(5s) * -1;
    }
}
/* Fallback for standard CSS since no preprocessor runtime */
.snowflake:nth-child(odd) { animation-duration: 4s; }
.snowflake:nth-child(even) { animation-duration: 6s; }

@keyframes fall {
    to { transform: translateY(110vh); }
}

/* --- Halloween Fog --- */
.halloween-container {
    width: 100%; height: 100%;
}
.fog-layer {
    position: absolute;
    bottom: 0; left: 0; width: 100%; height: 300px;
    background: linear-gradient(to top, rgba(100, 0, 100, 0.2), transparent);
    filter: blur(20px);
    animation: fogBreath 5s infinite alternate;
}
@keyframes fogBreath { from { opacity: 0.5; } to { opacity: 0.8; } }

.spiderweb {
    position: absolute;
    width: 200px; height: 200px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    /* Simple CSS Web approximation */
    background: repeating-radial-gradient(
        circle at 0 0, 
        transparent 0, 
        transparent 10px, 
        rgba(255, 255, 255, 0.1) 11px, 
        transparent 12px
    );
}
.spiderweb.top-left { top: 0; left: 0; border-radius: 0 0 100% 0; }
.spiderweb.top-right { top: 0; right: 0; transform: rotate(90deg); border-radius: 0 0 100% 0; }

/* --- New Year Fireworks --- */
.fireworks-container {
    width: 100%; height: 100%;
}
.firework {
    position: absolute;
    width: 10px; height: 10px;
    border-radius: 50%;
    animation: explode 2s infinite ease-out;
}
.firework:nth-child(1) { left: 20%; top: 30%; animation-delay: 0s; background: gold; }
.firework:nth-child(2) { left: 80%; top: 20%; animation-delay: 0.5s; background: cyan; }
.firework:nth-child(3) { left: 50%; top: 40%; animation-delay: 1s; background: magenta; }
.firework:nth-child(4) { left: 30%; top: 60%; animation-delay: 1.5s; background: lime; }

@keyframes explode {
    0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(255,255,255,0.5); }
    100% { transform: scale(30); opacity: 0; box-shadow: 0 0 20px 20px transparent; }
}
</style>
