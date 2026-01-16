<template>
  <div class="stats-page">
    <h2 class="page-title">Legacy System Database</h2>
    <div class="dashboard">
        <div class="stat-card">
            <h3>Global Visits</h3>
            <div class="stat-value" id="visit-count">{{ visits }}</div>
        </div>
        <div class="stat-card">
            <h3>System Status</h3>
            <div class="stat-value status-ok">ONLINE</div>
        </div>
        <div class="stat-card">
             <h3>Time on Page</h3>
             <div class="stat-value">{{ timeSpent }}s</div>
        </div>
    </div>
    <div class="chart-container">
        <!-- Chart.js canvas will go here -->
        <canvas id="traffic-chart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Chart from 'chart.js/auto';

const timeSpent = ref(0);
let interval = null;
let chartInstance = null;
const visits = ref("Loading...");

onMounted(() => {
    // 1. Time Tracker
    const startTime = Date.now();
    interval = setInterval(() => {
        timeSpent.value = Math.floor((Date.now() - startTime) / 1000);
    }, 1000);
    
    // 2. Fetch Visits (CountAPI)
    // Using a specific key for this demo. User can change it.
    fetch('https://api.countapi.xyz/hit/divaldinn.github.io/visits')
        .then(res => res.json())
        .then(data => {
            visits.value = data.value;
        })
        .catch(err => {
            console.error("Error fetching visits:", err);
            visits.value = "OFFLINE";
        });

    // 3. Chart.js Setup
    const ctx = document.getElementById('traffic-chart');
    if (ctx) {
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(10).fill(''),
                datasets: [{
                    label: 'NET_TRAFFIC_IN',
                    data: Array(10).fill(0).map(() => Math.floor(Math.random() * 50) + 10),
                    borderColor: '#FFE600', 
                    backgroundColor: 'rgba(255, 230, 0, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#000',
                    pointBorderColor: '#FFE600',
                    tension: 0, // Sharp lines
                    borderDash: [],
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { 
                            color: '#A0A0A0', 
                            font: { family: 'Roboto Condensed' },
                            boxWidth: 10 
                        }
                    }
                },
                scales: {
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#A0A0A0', font: { family: 'Roboto Condensed' } }
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                animation: {
                    duration: 0
                }
            }
        });

        // Simulate live updates
        setInterval(() => {
            if (chartInstance) {
                const newData = Math.floor(Math.random() * 50) + 10;
                chartInstance.data.datasets[0].data.shift();
                chartInstance.data.datasets[0].data.push(newData);
                chartInstance.update();
            }
        }, 1000);
    }
});

onUnmounted(() => {
    if (interval) clearInterval(interval);
    if (chartInstance) chartInstance.destroy();
});
</script>

<style scoped>
.stats-page {
  padding: 100px 20px;
  max-width: 1000px;
  margin: 0 auto;
}
.dashboard {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 50px;
}
.stat-card {
    background: var(--color-card-bg);
    border-left: 5px solid var(--color-secondary);
    padding: 20px;
    text-align: left;
    position: relative;
}
.stat-card::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 20px; height: 20px;
    background: linear-gradient(135deg, transparent 50%, var(--color-secondary) 50%);
    opacity: 0.5;
}
.stat-card h3 {
    color: var(--color-text-dim);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 5px;
}
.stat-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-text-main);
    font-family: var(--font-header);
}
.status-ok {
    color: var(--color-accent);
}
</style>
