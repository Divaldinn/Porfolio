<template>
  <div class="certifications-page">
    <h2 class="page-title" data-aos="fade-down">
        {{ $t('cert_title') }}
    </h2>
    
    <div class="certifications-grid">
        <TechCard v-for="(cert, index) in certifications" :key="index" :title="cert.title" :enableScramble="false" :delay="0" class="cert-card interactive-card">
             <template #header><i :class="cert.icon"></i></template>
             <div class="cert-body">
                 <p class="cert-issuer">{{ $t(cert.issuer) }}</p>
                 <a :href="`/certifications/${cert.file}`" target="_blank" class="cyber-link">
                     {{ $t('cert_view_btn') }} <i class="fas fa-external-link-alt"></i>
                 </a>
             </div>
        </TechCard>
    </div>
  </div>
</template>

<script setup>
import TechCard from '../components/TechCard.vue';

const certifications = [
    { title: "CCNA: Enterprise Networking, Security, & Automation", file: "CCNA-_Enterprise_Networking-_Security-_and_Automation_certificate_hector-salazar33-my-unitec-edu-mx_672a4bd0-767a-4ef1-9945-eae894647c68.pdf", issuer: "cert_issuer_cisco", icon: "fas fa-network-wired" },
    { title: "CCNA: Fundamentos de Conmutación y Enrutamiento", file: "_certificate_hector-salazar33-my-unitec-edu-mx_6c385382-8624-4c2a-aad5-719cdf944bf3.pdf", issuer: "cert_issuer_cisco", icon: "fas fa-route" },
    { title: "CCNA: Introducción a las Redes", file: "_certificate_hector-salazar33-my-unitec-edu-mx_18896bc3-67c1-4f54-8ef0-1164e4a3d628.pdf", issuer: "cert_issuer_cisco", icon: "fas fa-project-diagram" },
    { title: "Endpoint Security (Seguridad de Puntos Finales)", file: "Endpoint_Security_certificate_hector-salazar33-my-unitec-edu-mx_667b5198-07e6-468c-bf4d-085499c0106e.pdf", issuer: "cert_issuer_cisco", icon: "fas fa-shield-alt" },
    { title: "Data Analytics Essentials", file: "Data_Analytics_Essentials_certificate_hector-salazar33-my-unitec-edu-mx_9c32da10-4158-47d9-bb6b-545748fdf7ae.pdf", issuer: "cert_issuer_cisco", icon: "fas fa-chart-line" },
    { title: "Introducción a la Ciencia de Datos", file: "_certificate_hector-salazar33-my-unitec-edu-mx_e109c6f0-7d6a-4e24-855e-c1c4019f333f.pdf", issuer: "cert_issuer_cisco", icon: "fas fa-database" },
    { title: "Excel Intermedio a Avanzado", file: "1852_hectore.salazar83@gmail.com.pdf", issuer: "cert_issuer_santander", icon: "fas fa-file-excel" },
    { title: "Scrum Guide: Metodologías Ágiles", file: "Scrum Guide (2020 Update)_ An Overview Replay.pdf", issuer: "cert_issuer_santander", icon: "fas fa-tasks" }
];
</script>

<style scoped>
.certifications-page {
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.page-title {
    font-family: var(--font-header);
    text-transform: uppercase;
    font-size: 2.5rem;
    color: var(--color-text-main);
    margin-bottom: 20px;
}
.page-title .number {
    color: var(--color-accent);
    margin-right: 15px;
}
.certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 30px;
}
.cert-card {
    display: flex;
    flex-direction: column;
}
.cert-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}
.cert-issuer {
    color: var(--color-text-dim);
    font-size: 0.85rem;
    margin-bottom: 15px;
    font-style: italic;
}
.cyber-link {
    color: var(--color-accent);
    text-decoration: none;
    font-weight: bold;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}
.cyber-link:hover {
    color: var(--color-text-main);
    text-shadow: 0 0 8px var(--color-accent);
}
.interactive-card {
    cursor: pointer;
}
.interactive-card:hover {
    transform: translateY(-5px);
    transition: transform 0.3s;
}
</style>
