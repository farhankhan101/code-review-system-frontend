import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSidebarStore = defineStore('sidebar', () => {
  const sidebarDisplay = ref(true);

  const toggleSidebar = () => {
    sidebarDisplay.value = !sidebarDisplay.value;
  };
  
  return {
    sidebarDisplay,
    toggleSidebar,
  };
});
