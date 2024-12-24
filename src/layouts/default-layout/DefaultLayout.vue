<template>
  <div class="flex min-h-screen">
    <!-- <TopHeader /> -->
    <Sidebar :style="{
        position: 'absolute',
        left: isSidebarVisible ? '0' : '-285px',
        transitionProperty: 'left',
        transitionDuration: '0.5s',
        transitionDelay: '0.01s',
      }" />
    <Header />
    <div class="flex flex-col flex-1 transition-all duration-300 overflow-hidden" :class="[isSidebarVisible ? 'sm:ml-64' : 'ml-0']">
      <main class="flex-grow px-5">
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useSidebarStore } from '@/stores/dashboard';
import Sidebar from '@/layouts/default-layout/components/Sidebar.vue';
import Header from '@/layouts/default-layout/components/Header.vue';
// import TopHeader from '@/layouts/default-layout/components/TopHeader.vue';
import Footer from '@/layouts/default-layout/components/Footer.vue';

export default {
  name: 'DefaultLayout',
  components: {
    Sidebar,
    Header,
    Footer,
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
-webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
}

::-webkit-scrollbar-thumb:active {
background-color: #a1a1a1;
}

::-webkit-scrollbar-thumb:hover {
background-color: #a1a1a1;
-webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
}

</style>