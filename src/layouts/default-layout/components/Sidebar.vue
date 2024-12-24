<template>
    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
     <div class="h-5/6 pt-2 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 custom-scrollbar">
       <button class="flex justify-between items-center w-full border hover:bg-gray-200 p-2 rounded-lg mt-3 mb-1 text-sm text-start px-2">
         <span>New Review</span>
         <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
         </svg>
      </button> 
       <h3 class="my-3 text-lg font-semibold text-gray-900 dark:text-white">All Reviews</h3>

       <ul class="space-y-2 font-medium">
         <li :class="{ 'bg-gray-100 rounded-md': isRouteActive('/dashboard') }">
           <router-link to="/dashboard" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
             <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
               <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
               <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
             </svg>
             <span class="ms-0">Dashboard</span>
           </router-link>
         </li>
 
         <li :class="{ 'bg-gray-100 rounded-md': isRouteActive('/about') }">
           <router-link to="/about" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
             <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
               <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
             </svg>
             <span class="ms-3">About</span>
           </router-link>
         </li>
 
         <li :class="{ 'bg-gray-100 rounded-md': isRouteActive('/sales') }">
           <router-link to="/sales" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
             <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
               <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
             </svg>
             <span class="ms-3">Sales</span>
           </router-link>
         </li>

       </ul>
 
       <div class="bg-white absolute bottom-0 left-0 w-full px-3 py-2">
         <button class="w-full bg-red-500 text-white p-3 rounded-lg text-sm hover:bg-red-700">
           Log Out
         </button>
       </div>
     </div>
   </aside>
 </template>
 
 <script lang="ts">
import { useSidebarStore } from '@/stores/dashboard';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const sidebarStore = useSidebarStore();
    const route = useRoute()
    const isRouteActive = (path: string) => route.path.startsWith(path); // Determines if the route matches the current one

    return {
      sidebarStore,
      isRouteActive
    };
  },
};
</script>
<style scoped>
/* Optional: Customize sidebar design */
#logo-sidebar {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 1px 0px inset;
}

/* Apply custom scrollbar styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  border-radius: 5px;
  background-color: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #a1a1a17a;
  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
}
</style>