<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 font-inter relative overflow-hidden"
  >
    <div
      class="absolute w-36 h-36 bg-indigo-300 opacity-50 rounded-full top-10 left-10 animate-float"
    ></div>
    <div
      class="absolute w-28 h-28 bg-indigo-400 opacity-30 rounded-full bottom-20 right-20 animate-float-reverse"
    ></div>

    <div class="w-full flex justify-center">
      <img src="@/assets/aibot.gif" alt="AI bot" class="w-60 h-60 bg-transparent-gif" />
    </div>

    <h2 class="text-4xl text-center md:text-5xl font-extrabold text-gray-800 animate-fade-in">
      Welcome to <span class="text-indigo-600">AI Code Review</span>
    </h2>

    <button
      class="px-10 py-4 mt-6 bg-indigo-600 text-white text-xl font-medium rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-transform transform hover:scale-105 animate-fade-in delay-300"
      @click="reviewStore.toggleShowModal"
    >
      Get Started
    </button>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { FwbModal } from "flowbite-vue";
import { useRouter } from "vue-router";
import { useReviewStore } from "@/stores/review";

export default {
  name: "Sidebar",
  components: {
    FwbModal,
  },
  setup() {
    const reviewStore = useReviewStore();
    return {
      reviewStore,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

.font-inter {
  font-family: "Inter", sans-serif;
}

/* Background Gradient */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, #f9fafb, #c7d2fe);
}

/* Floating Elements Animation */
@keyframes float {
  0%,
  100% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(10px);
  }
}
@keyframes float-reverse {
  0%,
  100% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 6s ease-in-out infinite;
}

/* Fade-in Animation */
.animate-fade-in {
  opacity: 0;
  animation: fade-in 1.5s forwards;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.bg-transparent-gif {
  mix-blend-mode: darken;
  background: transparent;
}
/* Button Hover Effect */
button {
  transition: transform 0.3s ease, background-color 0.3s ease;
}
</style>
