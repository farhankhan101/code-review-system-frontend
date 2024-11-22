<template>
  <RouterView />
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout.vue';

const route = useRoute();

// Compute the layout to use; defaults to `DefaultLayout` if not specified in route meta
const layout = computed(() => route.meta.layout || DefaultLayout);
</script>

<style scoped>
/* Optional: Add any global styling for your app here */
</style>
