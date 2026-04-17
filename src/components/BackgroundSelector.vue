<template>
  <div class="bg-selector">
    <div class="selector-title">[ SYS_BG_OVERRIDE ]</div>
    <div class="btn-grid">
      <button 
        v-for="opt in options" 
        :key="opt.id"
        :class="{ active: modelValue === opt.id }"
        @click="$emit('update:modelValue', opt.id)"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String
});

defineEmits(['update:modelValue']);

const options = [
  { id: 'matrix', label: 'Matrix' },
  { id: 'topo', label: 'Topografía' }
];
</script>

<style scoped>
.bg-selector {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(10, 10, 10, 0.9);
  border: 1px solid var(--color-accent);
  padding: 15px;
  z-index: 9999;
  font-family: var(--font-header);
  box-shadow: 0 0 15px rgba(255, 230, 0, 0.1);
  backdrop-filter: blur(5px);
}
.selector-title {
  color: var(--color-accent);
  font-size: 0.8rem;
  margin-bottom: 10px;
  text-align: center;
  letter-spacing: 1px;
}
.btn-grid {
  display: flex;
  gap: 10px;
}
button {
  background: transparent;
  color: var(--color-text-dim);
  border: 1px solid var(--color-text-dim);
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
}
button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-main);
}
button.active {
  background: var(--color-accent);
  color: #000;
  border-color: var(--color-accent);
  box-shadow: 0 0 10px var(--color-accent);
}
</style>
