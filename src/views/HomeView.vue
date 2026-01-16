<template>
  <main class="home-container">
    <section id="hero" class="hero-section">
      <div class="content">
        <!-- Logs Removed as requested -->
        <p class="hi-text" data-aos="fade-up">{{ $t('hero_hi') }}</p>
        <div class="typing-container">
            <h1 class="glitch" data-aos="fade-up" data-aos-delay="100">
                <ScrambleText v-if="isAppReady" text="Héctor Salazar." :duration="2000" />
            </h1>
        </div>
        <h2 class="subtitle" data-aos="fade-up" data-aos-delay="200">{{ $t('hero_subtitle') }}</h2>
        <p class="description" data-aos="fade-up" data-aos-delay="300">{{ $t('hero_desc') }}</p>
        <div class="cta-group" data-aos="fade-up" data-aos-delay="400">
          <router-link to="/projects" class="cyber-btn primary">{{ $t('hero_cta') }}</router-link>
          
           <a :href="cvLink" target="_blank" class="cyber-btn secondary">
            <i class="fas fa-file-download"></i> Resume / CV
          </a>
        </div>
      </div>
    </section>

    <!-- Tech Marquee -->
    <section class="marquee-section">
        <div class="marquee-content">
            <!-- Duplicate content for smooth infinite scroll -->
            <span>VUE.JS</span> <span>VITE</span> <span>JAVASCRIPT</span> <span>PYTHON</span> <span>C++</span> <span>DOCKER</span> <span>LINUX</span> <span>GIT</span> 
            <span>VUE.JS</span> <span>VITE</span> <span>JAVASCRIPT</span> <span>PYTHON</span> <span>C++</span> <span>DOCKER</span> <span>LINUX</span> <span>GIT</span>
        </div>
    </section>

    <section id="about" class="section" data-aos="fade-up">
      <TechCard :title="$t('about_title')" :enableScramble="true">
        <template #header><i class="fas fa-user-circle"></i></template>
        <div class="about-content">
            <p>{{ $t('about_p1') }}</p>
            <p>{{ $t('about_p2') }}</p>
        </div>
      </TechCard>
    </section>

    <section id="skills" class="section" data-aos="fade-up">
        <h2 class="section-title">
            <span class="number">02.</span> <ScrambleText :text="$t('skills_title')" />
        </h2>
        <div class="skills-grid">
            <TechCard :title="$t('skill_cat_lang')" :delay="0">
                <template #header><i class="fas fa-code"></i></template>
                <ul>
                    <li>C++ (Memory Management)</li>
                    <li>Python (Scripting & AI)</li>
                    <li>Java (OOP and Logic)</li>
                    <li>JavaScript (ES6+)</li>
                    <li>Bash / Shell Scripting</li>
                </ul>
            </TechCard>
            <TechCard :title="$t('skill_cat_tech')" :delay="200">
                <template #header><i class="fas fa-terminal"></i></template>
                 <ul>
                    <li>Linux (Arch, Ubuntu, Mint)</li>
                    <li>Process Management (systemd)</li>
                    <li>Google Apps Script</li>
                    <li>Django Framework</li>
                    <li>Docker (Basic)</li>
                    <li>{{ $t('skill_db_mod') }}</li>
                </ul>
            </TechCard>
            <TechCard :title="$t('skill_cat_fund')" :delay="400">
                 <template #header><i class="fas fa-cogs"></i></template>
                 <ul>
                    <li>Data Structures & Algorithms</li>
                    <li>Network Protocols (TCP/IP)</li>
                    <li>Computer Architecture</li>
                    <li>Cybersecurity Basics</li>
                </ul>
            </TechCard>
        </div>
    </section>

    <section id="automation" class="section" data-aos="fade-up">
        <h2 class="section-title">
            <span class="number">03.</span> <ScrambleText text="Automation & Scripting" />
        </h2>
        <div class="automation-grid">
            <TechCard title="Excel & Macros" :delay="100">
                 <template #header><i class="fas fa-file-excel"></i></template>
                 <p>Automating complex data workflows with VBA and Power Query.</p>
            </TechCard>
             <TechCard title="Power Automate" :delay="300">
                 <template #header><i class="fas fa-bolt"></i></template>
                 <p>Streamlining business processes and cross-app integrations.</p>
            </TechCard>
             <TechCard title="Bash Scripting" :delay="500">
                 <template #header><i class="fas fa-terminal"></i></template>
                 <p>Linux server maintenance, backups, and resource monitoring.</p>
            </TechCard>
        </div>
    </section>

    <section id="education" class="section" data-aos="fade-up">
        <h2 class="section-title">
            <span class="number">04.</span> <ScrambleText :text="$t('edu_title')" />
        </h2>
        <TechCard :title="$t('edu_degree')" class="edu-tech-card">
            <span class="edu-badge">{{ $t('edu_status') }}</span>
            <p class="school">Technological University of Mexico (UNITEC)</p>
            <div class="edu-body">
                <h4>{{ $t('edu_courses_title') }}</h4>
                <ul class="course-list">
                    <li><i class="fas fa-check"></i> {{ $t('course_1') }}</li>
                    <li><i class="fas fa-check"></i> {{ $t('course_2') }}</li>
                    <li><i class="fas fa-check"></i> {{ $t('course_3') }}</li>
                    <li><i class="fas fa-check"></i> {{ $t('course_4') }}</li>
                </ul>
                <div class="edu-footer">
                    <p class="next-steps"><strong>{{ $t('edu_next') }}</strong> {{ $t('edu_next_desc') }}</p>
                </div>
            </div>
        </TechCard>
    </section>
    
    <section id="contact" class="section" data-aos="fade-up">
        <h2 class="section-title">
            <span class="number">05.</span> <ScrambleText :text="$t('contact_next')" />
        </h2>
        <h1 class="contact-title">{{ $t('contact_title') }}</h1>
        <p class="contact-desc">{{ $t('contact_desc') }}</p>
        <div class="social-links">
            <a href="https://github.com/Divaldinn" target="_blank"><i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/hectorsalazarherbadez" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="mailto:hectore.salazar83@gmail.com"><i class="fas fa-envelope"></i></a>
        </div>
        <div class="contact-form-container">
            <form @submit.prevent="sendEmail" class="contact-form">
                 <input type="text" v-model="form.name" placeholder="Name" required>
                 <input type="text" v-model="form.subject" placeholder="Subject" required>
                 <textarea v-model="form.body" placeholder="Message" rows="5" required></textarea>
                 <button type="submit" class="cyber-btn primary">{{ $t('contact_btn') }}</button>
            </form>
        </div>
    </section>
  </main>
</template>

<script setup>
import { computed, reactive, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import ScrambleText from '../components/ScrambleText.vue'; // FUI Text Effect
import TechCard from '../components/TechCard.vue'; // FUI 4-Stage Card

const { locale } = useI18n();
const isAppReady = inject('isAppReady'); // Wait for preloader

const cvLink = computed(() => {
    // Assumes files are named CVHectorSalazar_en.pdf, CVHectorSalazar_es.pdf, etc.
    // If not found, user needs to add them. Defaulting to base or localized.
    return `/CVHectorSalazar_${locale.value}.pdf`;
});

const form = reactive({
    name: '',
    subject: '',
    body: ''
});

const sendEmail = () => {
    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(`From: ${form.name}\n\n${form.body}`);
    window.location.href = `mailto:hectore.salazar83@gmail.com?subject=${subject}&body=${body}`;
};
</script>


<style scoped>
.home-container {
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
}
/* HERO Section adjustments for fixed navbar */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 80px; /* Prevent Navbar Overlap - User requirement */
  position: relative;
}


/* Adapting Lists for TechCard */
ul {
    list-style: none;
    padding: 0;
}
li {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    margin-bottom: 8px;
    padding-left: 15px;
    position: relative;
    color: var(--color-text-dim);
}
li::before {
    content: '>';
    position: absolute;
    left: 0;
    color: var(--color-secondary);
    font-size: 0.8rem;
}

/* Education specific overrides inside TechCard */
.edu-tech-card {
    max-width: 800px;
    margin: 0 auto;
}
.edu-badge {
    background: var(--color-accent);
    color: #000;
    font-weight: bold;
    padding: 2px 8px;
    font-size: 0.8rem;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 10px;
}
.school {
    color: var(--color-text-main);
    font-weight: bold;
    margin-bottom: 20px;
}
.edu-footer {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px dashed rgba(255,255,255,0.1);
    font-size: 0.9rem;
}

/* Contact & Social */
.contact-title {
    font-size: 3rem;
    font-family: var(--font-header);
    margin-bottom: 20px;
    color: var(--color-text-main);
    text-align: center; /* Center Title */
}
.contact-desc {
    font-size: 1.1rem;
    color: var(--color-text-dim);
    margin-bottom: 30px;
    max-width: 600px;
    margin-left: auto; /* Center Block */
    margin-right: auto; /* Center Block */
    text-align: center; /* Center Text */
}
.social-links {
    display: flex;
    justify-content: center; /* Centering as requested */
    gap: 25px;
    margin-top: 40px;
    margin-bottom: 40px;
}
.social-links a { 
    color: var(--color-text-dim); 
    font-size: 2.2rem; /* Reduced from 3rem to 2.2rem for elegance */
    transition: all 0.3s; 
}
.social-links a:hover { 
    color: var(--color-accent); 
    transform: scale(1.2); 
    text-shadow: 0 0 10px var(--color-accent);
}

/* Automation & Skills Grid */
.skills-grid, .automation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

/* Section Title Scrambles */
.section-title h2 {
    font-family: var(--font-header);
    text-transform: uppercase;
}

/* Tactical Inputs */
.contact-form {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
input, textarea {
    background: rgba(42, 42, 42, 0.5);
    border: none;
    border-bottom: 2px solid var(--color-text-dim);
    color: var(--color-text-main);
    padding: 15px;
    font-family: var(--font-body);
    font-size: 1rem;
    transition: all 0.3s;
}
input:focus, textarea:focus {
    outline: none;
    border-bottom-color: var(--color-accent);
    background: rgba(255, 230, 0, 0.05);
}

/* Infinite Marquee */
.marquee-section {
    background: var(--color-accent);
    color: #000;
    overflow: hidden;
    padding: 10px 0;
    font-family: var(--font-header);
    font-weight: bold;
    font-size: 1.5rem;
    white-space: nowrap;
    border-top: 2px solid var(--color-text-main);
    border-bottom: 2px solid var(--color-text-main);
    transform: rotate(-2deg); /* Tactical Slant */
    margin: 40px 0;
    width: 105%; /* compensate for rotation */
    margin-left: -2.5%;
}
.marquee-content {
    display: inline-block;
    animation: marquee 20s linear infinite;
}
.marquee-content span {
    margin: 0 30px;
}
@keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}

/* Hero CTA Group */
.cta-group {
    display: flex;
    gap: 30px; /* Separating buttons */
    margin-top: 30px;
}

/* Mobile Responsiveness for Home */
@media (max-width: 768px) {
    .home-container {
        padding: 0 20px; /* Requested 20px padding */
        position: relative;
    }
    
    /* Tech vertical lines in gutters */
    .home-container::before, .home-container::after {
        content: '';
        position: absolute;
        top: 0; bottom: 0;
        width: 1px;
        background: rgba(255, 255, 255, 0.05); /* Faint tech lines */
        z-index: -1;
    }
    .home-container::before { left: 10px; }
    .home-container::after { right: 10px; }
    
    .hero-section {
        /* Center content on mobile */
        justify-content: center;
        text-align: center;
        padding-top: 100px; /* More space for fixed nav */
    }
    /* Override typing alignment for center */
    .typing-container {
        margin: 0 auto;
    }
    .subtitle {
        font-size: 1.5rem;
    }
    .description {
        margin: 25px auto 0; /* Center block */
    }
    .cta-group {
        flex-direction: column;
        width: 100%;
        gap: 20px; /* Slightly less gap on mobile stack */
    }
    .cyber-btn {
        width: 100%; /* Full width buttons */
        text-align: center;
        box-sizing: border-box; /* Ensure padding doesn't overflow */
    }
    .marquee-section {
        font-size: 1rem; /* Smaller marquee */
        margin: 30px 0;
    }
    .social-links {
        gap: 20px;
    }
    .social-links a {
        font-size: 2rem; /* Slightly smaller icons */
    }
    .contact-title {
        font-size: 2rem;
    }
}
</style>
