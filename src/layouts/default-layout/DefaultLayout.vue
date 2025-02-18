<template>
  <div class="flex min-h-screen">
    <Header />
    <div class="h-screen flex flex-col flex-1 transition-all duration-300 overflow-hidden" :class="[isSidebarVisible ? 'sm:ml-64' : 'ml-0']">
      <Sidebar
        :style="{
          position: 'absolute',
          left: isSidebarVisible ? '0px' : '-300px',
          transitionProperty: 'left',
          transitionDuration: '0.3s',
          transitionDelay: '0.01s',
        }" />
      <main class="flex-grow px-0 transition-all duration-300 overflow-hidden" :class="[isSidebarVisible ? 'left-0' : '-left-64']">
        <router-view />
      </main>
      <!-- Conditionally render Footer based on exact '/' route -->
      <Footer v-if="!isRootRoute" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute
import { useSidebarStore } from '@/stores/dashboard';
import Sidebar from '@/layouts/default-layout/components/Sidebar.vue';
import Header from '@/layouts/default-layout/components/Header.vue';
import Footer from '@/layouts/default-layout/components/Footer.vue';
import CodeArea from '@/layouts/default-layout/components/CodeArea.vue';

export default {
  name: 'DefaultLayout',
  components: {
    Sidebar,
    CodeArea,
    Header,
    Footer,
  },
  setup() {
    const sidebarStore = useSidebarStore();
    const route = useRoute(); // Get current route

    // Define the computed property for sidebar visibility
    const isSidebarVisible = computed(() => sidebarStore.sidebarDisplay);

    // Computed property to check if the route is exactly '/'
    const isRootRoute = computed(() => route.path === '/');

    return {
      sidebarStore,
      isSidebarVisible,
      isRootRoute,
    };
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
  border-radius: 5px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;
}

:hover::-webkit-scrollbar-thumb {
  background-color: #a1a1a17a;
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}
</style>
