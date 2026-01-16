<template>
  <span class="scramble-text">{{ displayText }}</span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 1500
  }
});

const displayText = ref('');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

const scramble = () => {
    const target = props.text;
    const len = target.length;
    let iteration = 0;
    
    // Fill with random width initially
    displayText.value = target.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
    
    const interval = setInterval(() => {
        displayText.value = target
            .split('')
            .map((letter, index) => {
                if (index < iteration) {
                    return target[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if (iteration >= len) { 
            clearInterval(interval);
        }
        
        iteration += 1 / 3; // Slow down the reveal speed relative to framerate
    }, 30);
};

onMounted(() => {
    scramble();
});

watch(() => props.text, () => {
    scramble();
});
</script>

<style scoped>
.scramble-text {
    font-family: 'Courier Prime', monospace; /* Tech feel */
    display: inline-block;
}
</style>
