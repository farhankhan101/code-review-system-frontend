<template>
  <aside
    v-bind="$attrs"
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40  lg:w-[300px] w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-5/6  pt-2 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 custom-scrollbar">
      <button
        class="flex justify-between items-center w-full border hover:bg-gray-200 p-2 rounded-lg mt-3 mb-1 text-sm text-start px-2"
        @click="reviewStore.toggleShowModal"
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

      <!-- Dropdown Filters -->
      <div class="space-y-2 my-4">
        <div v-for="category in ['security', 'styling', 'efficiency']" :key="category">
          <button
            @click="toggleDropdown(category)"
            class="flex items-center justify-between w-full px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition-colors"
          >
            <div class="flex items-center space-x-2">
              <span v-html="getCategoryIcon(category)"></span>
              <span class="capitalize">{{ category }}</span>
            </div>
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': dropdownStates[category] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            v-show="dropdownStates[category]"
            class="ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-600"
          >
            <!-- Review listing with three-dot dropdown menu -->
            <div
              v-for="review in groupedReviews[category]"
              :key="review.route"
              class="relative flex items-center justify-between px-3 py-1.5 mx-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
              :class="{ 'bg-gray-100 dark:bg-gray-700': isRouteActive(review.route) }"

            >
              <router-link
                :to="review.route"
                class="truncate flex-grow"
              >
                {{ review.name }}
              </router-link>
              <button
                @click.stop="toggleReviewDropdown(review.route)"
                class="p-1"
              >
                <!-- Three-dot icon -->
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M6 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-4 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
                  />
                </svg>
              </button>
              <!-- Dropdown menu -->
              <div
                v-if="activeDropdown === review.route"
                class="absolute right-0 mt-8 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50"
              >
                <button
                  @click="handleRename(review.route)"
                  class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Rename
                </button>
                <button
                  @click="handleDelete(review.route)"
                  class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute sm:bottom-0 bottom-2 left-0 right-0 p-2 bg-white dark:bg-gray-800 sm:border-t border-gray-200 dark:border-gray-700">
      <div class="sm:space-y-2 space-y-0">
        <button
          class="sm:flex hidden items-center justify-start w-full gap-2 px-4 py-1.5 text-sm font-medium text-white bg-transparent border border-red-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-red-50 dark:bg-transparent dark:hover:bg-gray-100 dark:focus:ring-red-50 transition-colors"
        >
        <svg class="h-6 w-6 text-gray-500"  width="10" height="10" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="7" y="4" width="10" height="16" rx="1" />  <line x1="11" y1="5" x2="13" y2="5" />  <line x1="12" y1="17" x2="12" y2="17.01" /></svg>
        <span class="text-md text-gray-500">Get App</span>
        <span class="bg-red-500 px-2 py-1 text-sm rounded-lg">Beta</span>
        </button>
        
        <button
          class="flex items-center justify-start w-full gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
        >
          <span class="w-10 h-10 flex justify-center items-center border border-black rounded-full">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"/>
            </svg>

          </span>
          <div class="flex flex-col text-start">
            <span>UPGRADE PLAIN</span>
            <small>Get More Access</small>
          </div>
        </button>
      </div>
    </div>
  </aside>

  <!-- Modal for adding/updating reviews -->
  <fwb-modal size="md" v-if="reviewStore.isShowModal" @close="reviewStore.closeModal">
    <template #header>
      <div class="flex items-center text-lg">
        {{ reviewStore.isEditing ? "Update Review Name" : "Write name of your review" }}
      </div>
    </template>
    <template #body>
      <input
        type="text"
        class="w-full"
        placeholder="Enter Review Name"
        v-model="reviewStore.reviewName"
      />
      <!-- Only display type options when adding a new review -->
      <div v-if="!reviewStore.isEditing" class="flex gap-3 flex-wrap my-4 w-full">
        <label
          v-for="option in options"
          :key="option.value"
          class="flex flex-1 items-center justify-center gap-3 cursor-pointer border border-gray-300 rounded-md py-2 transition-all duration-200 hover:bg-gray-200"
          :class="{ 'bg-gray-200': selectedOption === option.value }"
        >
          <input
            type="radio"
            name="reviewOptions"
            :value="option.value"
            v-model="selectedOption"
            class="hidden"
          />
          <span class="text-lg font-medium">{{ option.label }}</span>
        </label>
      </div>

      <button
        :disabled="reviewStore.isEditing ? !reviewStore.reviewName : !selectedOption"
        class="w-full bg-black p-3 text-white my-4"
        @click="reviewStore.isEditing ?
          reviewStore.confirmUpdate(router) :
          reviewStore.addReview(router, selectedOption)"
      >
        Submit
      </button>
    </template>
  </fwb-modal>
</template>

<script lang="ts">
import { ref, watch, computed } from "vue";
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
    const router = useRouter();
    
    // Dropdown states for each category in the sidebar
    const dropdownStates = ref({
      security: false,
      styling: false,
      efficiency: false,
    });

    // Group reviews by category
    const groupedReviews = computed(() => {
      return reviewStore.historyReview.reduce((acc: any, review) => {
        review.options.forEach((option: string) => {
          if (!acc[option]) acc[option] = [];
          acc[option].push(review);
        });
        return acc;
      }, {});
    });

    const toggleDropdown = (category: string) => {
      const currentState = dropdownStates.value[category];
      // Close all dropdowns first
      Object.keys(dropdownStates.value).forEach((key) => {
        dropdownStates.value[key] = false;
      });
      // Open the clicked category if it was closed
      if (!currentState) {
        dropdownStates.value[category] = true;
      }
    };

    // Return the appropriate icon for each category
    const getCategoryIcon = (category: string) => {
      const icons = {
        security: `<svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"/>
        </svg>`,
        styling: `<svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L4.186 12.13l-.786 3.083a1 1 0 0 0 1.224 1.265l3.062-.781 5.906-5.816-2.3-2.266Z" clip-rule="evenodd"/>
        </svg>`,
        efficiency: `<svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4-4m-4 4-4-4m4 4a50.7 50.7 0 0 1 10.435 8.534L21 19.5H3l2.565-5.466A50.777 50.777 0 0 1 12 6Z"/>
        </svg>`,
      };
      return icons[category as keyof typeof icons];
    };

    // Helper to check if a route is active
    const isRouteActive = (route: string) =>
      router.currentRoute.value.path === route;

    // Options for the modal form (radio buttons)
    const options = [
      { label: "Security", value: "security" },
      { label: "Efficiency", value: "efficiency" },
      { label: "Styling", value: "styling" },
    ];
    
    // Use a single ref for radio button selection (for adding new reviews)
    const selectedOption = ref<string>("");

    // Watch for editing state changes to reset the radio selection when not editing
    watch(
      () => reviewStore.isEditing,
      (isEditing) => {
        if (!isEditing) {
          selectedOption.value = "";
        }
      }
    );

    // Local state for which review dropdown is active (by review.route)
    const activeDropdown = ref<string | null>(null);

    const toggleReviewDropdown = (route: string) => {
      activeDropdown.value = activeDropdown.value === route ? null : route;
    };

    const handleRename = (route: string) => {
      const index = reviewStore.historyReview.findIndex(
        (r) => r.route === route
      );
      if (index !== -1) {
        reviewStore.updateReview(index);
      }
      activeDropdown.value = null;
    };

    const handleDelete = (route: string) => {
      const index = reviewStore.historyReview.findIndex(
        (r) => r.route === route
      );
      if (index !== -1) {
        reviewStore.deleteReview(index, router);
      }
      activeDropdown.value = null;
    };

    return {
      reviewStore,
      router,
      dropdownStates,
      groupedReviews,
      toggleDropdown,
      getCategoryIcon,
      isRouteActive,
      options,
      selectedOption,
      activeDropdown,
      toggleReviewDropdown,
      handleRename,
      handleDelete,
    };
  },
};
</script>

<style>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
