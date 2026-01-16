<template>
  <div class="projects-page">
    <h2 class="page-title" data-aos="fade-down">
        <span class="number">03.</span> <ScrambleText :text="$t('projects_title')" :duration="1500" />
    </h2>
    
    <div class="projects-grid">
        <TechCard 
            v-for="(project, index) in projects" 
            :key="project.id"
            :title="$t(project.i18nKey + '_title')"
            :delay="index * 200"
            :enableScramble="false"
            @click="goToProject(project.id)"
            class="interactive-card"
        >
            <template #header>
                <i class="far fa-folder folder-icon"></i>
            </template>
            
            <p class="proj-desc">{{ $t(project.i18nKey + '_desc') }}</p>
            
            <div class="tech-stack">
                <span v-for="tag in project.tags" :key="tag">
                    <ScrambleText :text="tag" :duration="500" />
                </span>
            </div>
            
            <!-- Link Icon Overlay -->
            <a :href="project.repoUrl" target="_blank" @click.stop class="ext-link">
                <i class="fas fa-external-link-alt"></i>
            </a>
        </TechCard>
    </div>
  </div>
</template>

<script setup>
import { projects } from '../data/projects';
import { useRouter } from 'vue-router';
import TechCard from '../components/TechCard.vue';
import ScrambleText from '../components/ScrambleText.vue';

const router = useRouter();

const goToProject = (id) => {
    router.push(`/projects/${id}`);
};
</script>

<style scoped>
.projects-page {
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 30px;
}
.folder-icon {
    font-size: 1.5rem;
    color: var(--color-text-dim);
}
.proj-desc {
    color: var(--color-text-dim);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 20px;
}
.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
}
.tech-stack span {
    background: #000;
    color: var(--color-secondary);
    padding: 2px 6px;
    font-size: 0.7rem;
    text-transform: uppercase;
    border: 1px solid var(--color-secondary);
}
.ext-link {
    position: absolute;
    top: 20px; right: 20px;
    color: var(--color-text-dim);
    font-size: 1.2rem;
    transition: color 0.2s;
}
.ext-link:hover {
    color: var(--color-accent);
}
.interactive-card {
    cursor: pointer;
}
.interactive-card:hover {
    transform: translateY(-5px);
    transition: transform 0.3s;
}
</style>
