<template>
  <div class="skeleton-card">
    <div class="skeleton-image shimmer"></div>
    <div class="skeleton-content">
        <div class="skeleton-line title shimmer"></div>
        <div class="skeleton-line shimmer"></div>
        <div class="skeleton-line short shimmer"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
    background: var(--color-card-bg);
    border: 1px solid var(--color-text-dim);
    height: 300px; /* Approx card height */
    position: relative;
    overflow: hidden;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
}

.skeleton-image {
    height: 150px;
    background: #333;
    margin-bottom: 20px;
}

.skeleton-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.skeleton-line {
    height: 12px;
    background: #333;
    width: 100%;
}

.skeleton-line.title {
    height: 20px;
    width: 60%;
    margin-bottom: 10px;
}

.skeleton-line.short {
    width: 40%;
}

/* Shimmer Effect */
.shimmer {
    position: relative;
    overflow: hidden;
}
.shimmer::after {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: shimmerMove 1.5s infinite;
}

@keyframes shimmerMove {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}
</style>
