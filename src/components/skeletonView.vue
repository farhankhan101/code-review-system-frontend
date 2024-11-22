<template>
    <div class="skeleton-view">
        <slot><div class="skeleton h-32 w-32"></div></slot>
    </div>
  </template>
  
  <script>
  import { provide, reactive } from 'vue';
  
  export default {
    name: 'SkeletonView',
    setup() {
      const isLoading = reactive(true);
  
      provide(isLoading);
  
      return {
        isLoading
      };
    }
  };
  </script>
  
  <style scoped>
  </style>