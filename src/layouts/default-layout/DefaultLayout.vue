<template>
  <div class="flex">
    <Sidebar v-if="isSidebarVisible" />
    <Header />
    <div class="flex flex-col flex-1" :class="['flex flex-col flex-1 transition-all duration-300', isSidebarVisible ? 'ml-64' : 'ml-0']">
      <main>
        <router-view />
      </main>
      <Footer :class="['fixed bottom-0', isSidebarVisible ? 'lg:w-[1140px] ms-4' : 'w-full ms-0']" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useSidebarStore } from '@/stores/dashboard';
import Sidebar from '@/layouts/default-layout/components/Sidebar.vue';
import Header from '@/layouts/default-layout/components/Header.vue';
import Footer from '@/layouts/default-layout/components/Footer.vue';
export default {
  name: 'DefaultLayout',
  components: {
    Sidebar,
    Header,
    Footer
  },
  setup() {
    const sidebarStore = useSidebarStore();

    // Define the computed property for sidebar visibility
    const isSidebarVisible = computed(() => sidebarStore.sidebarDisplay);

    return {
      sidebarStore,
      isSidebarVisible,
    };
  },
};
</script>

<style scoped>
/* Additional styles here if needed */
</style>
