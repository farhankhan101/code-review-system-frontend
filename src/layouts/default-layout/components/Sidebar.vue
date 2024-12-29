<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div
      class="h-5/6 pt-2 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 custom-scrollbar"
    >
      <button
        class="flex justify-between items-center w-full border hover:bg-gray-200 p-2 rounded-lg mt-3 mb-1 text-sm text-start px-2"
        @click="isShowModal = true"
      >
        <span>New Review</span>
        <svg
          class="w-5 h-5 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
          />
        </svg>
      </button>
      <h3 class="my-3 text-lg font-semibold text-gray-900 dark:text-white">
        All Reviews
      </h3>

      <ul class="space-y-2 font-medium">
        <li
          v-for="(review, index) in historyReview"
          :key="index"
          :class="{ 'bg-gray-100 rounded-md': isRouteActive(review.route) }"
        >
          <router-link
            :to="review.route"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <span class="ms-3">{{ review.name }}</span>
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

  <fwb-modal size="xs" v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">Write name of your review</div>
    </template>
    <template #body>
      <input
        type="text"
        class="w-full"
        placeholder="Enter Review Name"
        v-model="reviewName"
      />
      <button class="w-full bg-black p-3 text-white my-4" @click="addReview">
        Submit
      </button>
    </template>
  </fwb-modal>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { FwbModal } from 'flowbite-vue'

export default {
  components: {
    FwbModal,
  },
  name: "Sidebar",
  setup() {
    const isShowModal = ref(false);
    const reviewName = ref("");
    const historyReview = ref([]);

    // Load reviews from localStorage
    onMounted(() => {
      const savedReviews = JSON.parse(localStorage.getItem("historyReview") || "[]");
      historyReview.value = savedReviews;
    });

    const closeModal = () => {
      isShowModal.value = false;
    };

    const addReview = () => {
      if (!reviewName.value.trim()) return;

      const newReview = {
        name: reviewName.value,
        route: `/${reviewName.value.replace(/\s+/g, "-").toLowerCase()}`, // Create route dynamically
      };

      historyReview.value.push(newReview);
      localStorage.setItem("historyReview", JSON.stringify(historyReview.value)); // Save to localStorage
      reviewName.value = "";
      isShowModal.value = false;
    };

    const isRouteActive = (route: string) => {
      return location.pathname === route;
    };

    return {
      isShowModal,
      reviewName,
      historyReview,
      closeModal,
      addReview,
      isRouteActive,
    };
  },
};
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
}
</style>