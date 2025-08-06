<template>
  <nav class="fixed top-0 z-50 w-full bg-transparent dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
      <!-- Sidebar Toggle & Logo (UI text remains unchanged) -->
      <div class="flex items-center">
        <button @click="sidebarStore.toggleSidebar" class="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400">
          <span class="sr-only">Open sidebar</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path clip-rule="evenodd" fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
          </svg>
        </button>
        <router-link
          v-if="sidebarStore.sidebarDisplay"
          to="/"
          class="ml-2 text-xl font-semibold text-black dark:text-white md:visible transition-all duration-500 ease-out"
          :class="{
            'opacity-100 translate-x-0': sidebarStore.sidebarDisplay,
            'opacity-0 -translate-x-5': !sidebarStore.sidebarDisplay
          }"
        >
          <span class="flex font-bold flex-col space-y-0 transform transition-all duration-500 ease-out">
            <span class="text-sm">Ai Powered</span>
            <span class="text-sm">Code Review System</span>
          </span>
        </router-link>

      </div>

      <!-- Language Selector (only controls voice language) -->
      <!-- <div class="flex items-center">
        <select v-model="selectedLanguage" @change="switchLanguage"
          class="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white">
          <option value="en">English</option>
          <option value="ur">اردو</option>
        </select>
      </div> -->

      <!-- User Dropdown -->
      <div class="relative">
        <button @click="toggleDropdown" ref="buttonRef" class="w-10 h-10 rounded-full bg-blue-600 text-white">
          <span class="text-lg">{{ userInitial }}</span>
        </button>
        <div v-show="showDropdown" ref="dropdownRef" class="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg py-0 dark:bg-gray-700">
          <div class="px-4 py-3 border-b dark:border-gray-600">
            <p class="text-base text-gray-900 dark:text-white">{{ currentUser.username.toUpperCase() }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentUser.email }}</p>
          </div>
          <ul>
            <li>
              <router-link to="/profile" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                Profile
              </router-link>
            </li>
            <li>
              <router-link to="/getapp" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                Get App
              </router-link>
            </li>
            <li>
              <router-link to="/pricing" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                Current Plan
              </router-link>
            </li>
          </ul>
          <button @click="logout" class="w-full text-left px-4 py-4 border-t dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useSidebarStore } from '@/stores/dashboard';
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const sidebarStore = useSidebarStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const showDropdown = ref(false);
    const selectedLanguage = ref(localStorage.getItem('lang') || 'en');
    const currentUser = authStore.getUser();
    const speechSynthesis = window.speechSynthesis;
    let speechUtterance = new SpeechSynthesisUtterance();

    // Computed first letter of username remains unchanged
    const userInitial = computed(() => currentUser.username ? currentUser.username.charAt(0).toUpperCase() : '?');

    // Define welcome messages only for voice synthesis; UI text remains static
    // const voiceMessages = {
    //   en: "Hello User! Welcome to AI-Powered Code Review System. I help review security, efficiency, and styling professionally.",
    //   ur: "ہیلو صارف! اے آئی پاورڈ کوڈ ریویو سسٹم میں خوش آمدید۔ میں آپ کے کوڈ کا سیکیورٹی، افادیت اور اسٹائلنگ کے لحاظ سے جائزہ لیتا ہوں۔"
    // };

    // Function to speak text using appropriate language code
    // const speakText = (text, langCode) => {
    //   if (speechSynthesis.speaking) speechSynthesis.cancel(); // Cancel current speech if any
    //   speechUtterance = new SpeechSynthesisUtterance(text);
    //   speechUtterance.lang = langCode;
    //   speechSynthesis.speak(speechUtterance);
    // };

    // Play welcome message based on selected language
    // const playWelcomeMessage = () => {
    //   const langCode = selectedLanguage.value === 'en' ? 'en-US' : 'ur-PK';
    //   speakText(voiceMessages[selectedLanguage.value], langCode);
    // };

    // Change the voice message dynamically without affecting UI text
    const switchLanguage = () => {
      localStorage.setItem('lang', selectedLanguage.value); // Save preference
      const langCode = selectedLanguage.value === 'en' ? 'en-US' : 'ur-PK';
      speakText(voiceMessages[selectedLanguage.value], langCode);
    };

    // Dropdown handling for clicking outside
    const dropdownRef = ref(null);
    const buttonRef = ref(null);
    const handleClickOutside = (event) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target) &&
          buttonRef.value && !buttonRef.value.contains(event.target)) {
        showDropdown.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      // playWelcomeMessage();
    });
    onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const logout = () => {
      authStore.logout();
      showDropdown.value = false;
    };

    return {
      sidebarStore,
      currentUser,
      userInitial,
      showDropdown,
      toggleDropdown,
      logout,
      dropdownRef,
      buttonRef,
      selectedLanguage,
      switchLanguage,
    };
  },
};
</script>
