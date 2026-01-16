<template>
  <div class="app-shell">
    <Preloader @complete="onPreloaderComplete" />
    <SpeedInsights />
    <SeasonEffects />
    <nav class="navbar">
      <router-link to="/" class="logo-link">
          <div class="logo">HS</div>
      </router-link>
      
      <!-- Mobile Toggle -->
      <button class="mobile-toggle" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Nav Links (Drawer on Mobile) -->
      <div class="nav-links" :class="{ 'mobile-open': isMenuOpen }">
        <router-link to="/" @click="closeMenu">{{ $t('nav_about') }}</router-link>
        <router-link to="/projects" @click="closeMenu">{{ $t('nav_projects') }}</router-link>
        <router-link to="/stats" @click="closeMenu">DB Stats</router-link>
        <select v-model="$i18n.locale" class="lang-switcher">
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="pt">PT</option>
            <option value="fr">FR</option>
        </select>
      </div>
    </nav>

    <main class="page-content">
        <RouterView />
    </main>
    
    <!-- Advanced Plexus Background (Canvas) -->
    <PlexusBackground />
    
    <!-- HUD Elements Only -->
    <div class="hud-line top"></div>
    <div class="hud-line bottom"></div>

    <!-- Global Footer -->
    <footer class="app-footer">
        <p>Created by Héctor Salazar</p>
    </footer>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { defineAsyncComponent } from 'vue'

const SeasonEffects = defineAsyncComponent(() => import('./components/SeasonEffects.vue'))
const Preloader = defineAsyncComponent(() => import('./components/Preloader.vue'))
const PlexusBackground = defineAsyncComponent(() => import('./components/PlexusBackground.vue'))

const { locale } = useI18n()

// Mobile Menu Logic
import { ref, provide } from 'vue'; // Import provide
import { SpeedInsights } from "@vercel/speed-insights/vue" // Vercel Speed Insights

const isMenuOpen = ref(false);
const isAppReady = ref(false); // Global Ready State

provide('isAppReady', isAppReady); // Make available to all views

const onPreloaderComplete = () => {
    isAppReady.value = true;
};

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};
</script>

<style>
/* Arknights / Rhodes Island Variables */
:root {
  --color-bg: #121212;         /* Matte Black */
  --color-card-bg: #1F1F1F;    /* Dark Tactical Grey */
  --color-surface: #2A2A2A;    /* Lighter Grey for panels */
  --color-text-main: #FFFFFF;  /* Pure White */
  --color-text-dim: #A0A0A0;   /* Technical Grey */
  --color-accent: #FFE600;     /* Warning Yellow */
  --color-secondary: #00C9FF;  /* System Cyan */
  --font-header: 'Oswald', sans-serif;
  --font-body: 'Roboto Condensed', sans-serif;
  --skew-angle: -15deg;
}

@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Roboto+Condensed:wght@300;400;700&display=swap');

body {
  margin: 0;
  background-color: var(--color-bg);
  background-image: 
    linear-gradient(45deg, #1a1a1a 25%, transparent 25%, transparent 75%, #1a1a1a 75%, #1a1a1a),
    linear-gradient(45deg, #1a1a1a 25%, transparent 25%, transparent 75%, #1a1a1a 75%, #1a1a1a);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
  color: var(--color-text-main);
  font-family: var(--font-body);
  overflow-x: hidden;
  letter-spacing: 0.5px;
}

/* Custom Scrollbar - Tactical */
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: var(--color-bg);
}
::-webkit-scrollbar-thumb {
    background: var(--color-surface);
    border-radius: 0;
    border: 1px solid var(--color-text-dim);
}
::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent);
}

.navbar {
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  height: 60px; /* Reduced from 70px */
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background: rgba(18, 18, 18, 0.95);
  border-bottom: 2px solid var(--color-accent);
  z-index: 100;
  box-sizing: border-box;
}
.navbar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background: var(--color-accent);
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
    z-index: -1;
}

.logo {
  color: #000;
  font-family: var(--font-header);
  font-weight: 800;
  font-size: 1.5rem; /* Reduced from 1.8rem */
  letter-spacing: 2px;
  padding-left: 10px;
  text-transform: uppercase;
}

.logo-link {
    text-decoration: none;
    z-index: 201;
}

.page-content {
    padding-bottom: 80px; /* Clearance for fixed footer */
    min-height: 100vh;
}

.logo span {
    color: #fff; /* If outside the yellow block */
}

.nav-links {
  display: flex;
  gap: 0;
  align-items: center;
  height: 100%;
}

.nav-links a {
  color: var(--color-text-dim);
  text-decoration: none;
  font-family: var(--font-header);
  font-weight: 500;
  font-size: 0.85rem; /* Reduced from 1rem */
  text-transform: uppercase;
  letter-spacing: 1px;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px; /* Reduced padding */
  position: relative;
  transition: all 0.2s;
}

.nav-links a:hover, .nav-links a.router-link-active {
  color: var(--color-text-main);
  background: rgba(255, 255, 255, 0.05); 
  border-bottom: 4px solid var(--color-accent);
}

/* Mobile Toggle Button */
.mobile-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 200;
}
.mobile-toggle span {
    width: 100%;
    height: 3px;
    background: var(--color-accent);
    transition: all 0.3s;
}
/* Burger Animation */
.mobile-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.mobile-toggle.active span:nth-child(2) { opacity: 0; }
.mobile-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -8px); }

/* Mobile Responsiveness for App Shell */
@media (max-width: 768px) {
    .navbar {
        padding: 0 20px; /* Reduce padding */
    }
    .logo {
        font-size: 1.5rem;
        z-index: 200; /* Above drawer */
    }
    .mobile-toggle {
        display: flex; /* Show toggle */
        z-index: 301; /* Must be above the menu overlay */
    }
    
    /* Drawer Menu (Full Screen Mobile) */
    .nav-links {
        position: fixed;
        top: 0; right: -100%; /* Hidden by default */
        width: 100%; /* Full Width */
        height: 100vh;
        background: #121212; /* Solid Matte Black */
        /* border-left: 2px solid var(--color-accent); Removed left border */
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: right 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        z-index: 300; /* Above Logo (200) and Navbar (100) */
        gap: 40px; /* Increased gap */
    }
    .nav-links.mobile-open {
        right: 0; /* Slide in */
    }
    
    .nav-links a {
        font-size: 1.0rem; /* Reduced from 1.5rem for better legibility */
        width: 100%;
        justify-content: center;
        padding: 15px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    
    .lang-switcher {
        margin-left: 0;
        margin-top: 20px;
        transform: scale(1.0); /* Reduced scale */
    }
    
    .hud-line {
        left: 10px; right: 10px; /* Fit strictly */
    }
    .rhodes-logo-watermark {
        font-size: 5rem; /* Smaller watermark */
        right: -50px;
    }
    .app-footer {
        font-size: 0.7rem; 
        padding-bottom: 20px;
    }
}

.lang-switcher {
    background: transparent;
    border: 1px solid var(--color-text-dim);
    color: var(--color-text-dim);
    padding: 2px 10px;
    font-family: var(--font-header);
    cursor: pointer;
    margin-left: 20px;
    text-transform: uppercase;
}
.lang-switcher option {
    background: var(--color-bg);
}

/* Tactical Buttons */
.cyber-btn {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: var(--color-surface);
    color: var(--color-text-main);
    text-decoration: none;
    font-family: var(--font-header);
    font-size: 1.1rem;
    font-weight: bold;
    text-transform: uppercase;
    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
    border: none;
    position: relative;
    transition: all 0.2s;
    cursor: pointer;
    z-index: 5;
}
.cyber-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    border: 1px solid var(--color-text-dim);
    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
    pointer-events: none;
}
.cyber-btn:hover {
    background: var(--color-accent);
    color: #000;
}
.cyber-btn:hover::before {
    border-color: #000;
}

.cyber-btn.secondary {
    background: transparent;
    color: var(--color-accent);
}
.cyber-btn.secondary::before {
    border-color: var(--color-accent);
}
.cyber-btn.secondary:hover {
    background: var(--color-accent);
    color: #000;
}

/* Topographic Background & Animations */
.topo-bg {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: -5;
    background: #0f0f0f; /* Deep Endfield Black */
    pointer-events: none;
    overflow: hidden;
}
.topo-lines {
    width: 100%; height: 100%;
    opacity: 0.5; /* Increased from 0.3 */
}
.moving-topo {
    animation: driftTerrain 60s linear infinite;
    transform-origin: center;
}
/* Grid/Radar Scan Overlay */
.radar-scan {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(180deg, transparent 0%, rgba(255, 230, 0, 0.05) 50%, transparent 100%);
    animation: radarSweep 8s linear infinite;
    z-index: -4;
}
@keyframes radarSweep {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
}

@keyframes driftTerrain {
    0% { transform:  translate(-10%, -10%) rotate(0deg) scale(1.5); }
    50% { transform: translate(0%, 0%) rotate(5deg) scale(1.6); }
    100% { transform: translate(-10%, -10%) rotate(0deg) scale(1.5); }
}

/* Atmospheric Particles */
.particle {
    position: absolute;
    background: #fff;
    border-radius: 50%;
    opacity: 0.6; /* Increased visibility */
    pointer-events: none;
    animation: floatParticle 20s infinite linear;
}
.p1 { width: 3px; height: 3px; top: 20%; left: 20%; animation-duration: 25s; }
.p2 { width: 4px; height: 4px; top: 60%; left: 80%; animation-duration: 35s; animation-delay: 2s; }
.p3 { width: 2px; height: 2px; top: 40%; left: 40%; animation-duration: 40s; animation-delay: 5s; }
.p4 { width: 3px; height: 3px; top: 80%; left: 10%; animation-duration: 30s; animation-delay: 1s; }
.p5 { width: 5px; height: 5px; top: 10%; left: 90%; animation-duration: 45s; }

@keyframes floatParticle {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    50% { opacity: 0.8; }
    100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
}

.hud-line {
    position: fixed;
    left: 50px;
    right: 50px;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    z-index: 90;
    pointer-events: none;
}
.hud-line.top { top: 100px; }
.hud-line.bottom { bottom: 50px; }
.hud-line::after {
    content: '';
    position: absolute;
    right: 0;
    top: -2px;
    width: 5px; 
    height: 5px;
    background: var(--color-accent);
}

/* Footer Credit */
.app-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 15px;
    font-size: 0.8rem;
    color: var(--color-text-dim);
    background: rgba(18, 18, 18, 0.9);
    border-top: 1px solid var(--color-text-dim);
    z-index: 95;
    font-family: 'Courier Prime', monospace;
    letter-spacing: 1px;
}
.app-footer p { margin: 0; }

/* Animations */
.glitch { /* Re-purposing glitch as static tactical header for now, or slide-in */
    animation: slideInLeft 0.5s ease-out;
}
@keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
}
</style>
