<template>
  <div class="project-detail" v-if="project">
    <div class="back-link">
        <router-link to="/projects"><i class="fas fa-arrow-left"></i> {{ $t('nav_projects') }}</router-link>
    </div>
    
    <header class="detail-header" data-aos="fade-down">
        <div class="icon-wrapper">
            <i :class="project.icon"></i>
        </div>
        <h1>{{ $t(project.i18nKey + '_title') }}</h1>
        <div class="links">
            <a :href="project.repoUrl" target="_blank" class="cyber-btn primary">
                <i class="fab fa-github"></i> Repository
            </a>
        </div>
    </header>

    <div class="content-grid">
        <div class="main-info" data-aos="fade-up">
            <div class="info-block">
                <h3>{{ $t('label_desc') }}</h3>
                <p>{{ $t(project.i18nKey + '_desc') }}</p>
            </div>
            
            <div class="info-block" v-if="hasAchievement">
                <h3>{{ $t('label_achieve') }}</h3>
                <p>{{ $t(project.i18nKey + '_achieve') }}</p>
            </div>
        </div>

        <div class="sidebar" data-aos="fade-left">
            <div class="tech-card">
                <h3>Technologies</h3>
                <div class="tags">
                    <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
  <div v-else class="not-found">
    <h2>Project Not Found</h2>
    <router-link to="/projects" class="cyber-btn">Return Home</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { projects } from '../data/projects';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t, te } = useI18n();

const project = computed(() => {
    return projects.find(p => p.id === route.params.id);
});

const hasAchievement = computed(() => {
    return project.value && te(project.value.i18nKey + '_achieve');
});
</script>

<style scoped>
.project-detail {
    padding: 100px 20px;
    max-width: 1000px;
    margin: 0 auto;
}
.back-link a {
    color: var(--color-accent);
    text-decoration: none;
    font-family: var(--font-mono);
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 40px;
}
.detail-header {
    text-align: center;
    margin-bottom: 60px;
    border-bottom: 2px solid var(--color-accent);
    padding-bottom: 40px;
    background: transparent;
    position: relative;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), 50% 100%, 0 calc(100% - 20px));
}
.detail-header::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: var(--color-accent);
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}
.icon-wrapper {
    font-size: 4rem;
    color: var(--color-accent);
    margin-bottom: 20px;
    text-shadow: none;
}
h1 {
    font-size: 3rem;
    color: var(--color-text-main);
    margin-bottom: 30px;
    font-family: var(--font-header);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.tech-card {
    background: var(--color-surface);
    padding: 20px;
    border: none;
    border-left: 2px solid var(--color-secondary);
}
.tech-card h3 {
    color: var(--color-text-dim);
    margin-bottom: 15px;
    font-size: 1rem;
    font-family: var(--font-header);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 5px;
    text-transform: uppercase;
}
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.tag {
    background: transparent;
    color: var(--color-secondary);
    padding: 5px 10px;
    border: 1px solid var(--color-secondary);
    font-size: 0.85rem;
    font-family: var(--font-body);
    font-weight: bold;
    text-transform: uppercase;
}
.not-found {
    text-align: center;
    padding: 100px;
}
</style>
