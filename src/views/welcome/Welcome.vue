<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r bg-gray-100">
    <div
      class="max-w-2xl bg-transparent cursor-pointer border border-black border-dashed  rounded-lg  p-10 text-center transform transition-transform duration-500 hover:scale-105"
    >
      <h1 class="text-4xl text-start text-black-600 mb-4">
        Welcome to CodeMaster AI
      </h1>
      <p class="text-lg text-start text-gray-700 mb-4 leading-relaxed">
        Revolutionize the way you code with AI-driven insights. CodeMaster AI
        provides precise feedback to optimize your code's quality, performance,
        and security.
      </p>
      <p class="p-2 border border-dashed rounded-md text-red-500 border-red-700">
        For Review the code, please click the new Review button in the top right corner.
      </p>
      <!-- <p class="text-lg text-gray-700 mb-6 leading-relaxed">
        Whether you're a beginner or a seasoned developer, our platform helps
        you write better, cleaner, and more efficient code with ease.
      </p> -->
      <!-- <button
        class="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
      >
        Get Started
      </button> -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LandingPage",
});
</script>

<style scoped>
/* Custom Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

div.max-w-4xl {
  animation: fadeIn 1s ease-out forwards;
}
</style>
