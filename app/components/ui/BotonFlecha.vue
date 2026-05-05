<script setup lang="ts">
interface Props {
    direccion: 'anterior' | 'siguiente'
}

defineProps<Props>()
const emit = defineEmits(['click'])
</script>

<template>
    <button type="button" :aria-label="direccion === 'anterior' ? 'Slide anterior' : 'Slide siguiente'"
        class="h-10 w-10 shrink-0 bg-transparent p-0 min-[768px]:h-12 min-[768px]:w-12 transition-transform active:scale-90"
        @click="emit('click')">
        <svg viewBox="0 0 48 48" class="h-full w-full">
            <circle cx="24" cy="24" r="20" fill="none" stroke="white" stroke-width="4" />
            <!-- Flecha Izquierda -->
            <path v-if="direccion === 'anterior'" d="M27 15L18 24L27 33" fill="none" stroke="white" stroke-width="4"
                stroke-linecap="round" stroke-linejoin="round" />
            <!-- Flecha Derecha -->
            <path v-else d="M21 15L30 24L21 33" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    </button>
</template>
