<template>
    <div class="w-1/2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-lg rounded-xl p-6 border border-gray-300 transform scale-105">
    <div class="bg-white shadow-inner rounded-md p-4">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">
        Welcome to AI-Powered Code Review System
      </h1>
      <p class="text-center text-gray-600 mb-6">
        Analyze your code for style, efficiency, and security issues with ease.
      </p>
      <div class="text-center">
        <button class="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md transform hover:scale-110 transition-transform">
          Let's Start
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Welcome",
  setup() {
    return {};
  },
});
</script>
