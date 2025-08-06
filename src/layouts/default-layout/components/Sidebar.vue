<template>
  <aside
    v-bind="$attrs"
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 lg:w-[300px] w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    
    <div class="h-5/6 pt-2 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 custom-scrollbar">
      <button
        class="flex justify-between items-center w-full border hover:bg-gray-200 p-2 rounded-lg mt-3 mb-1 text-sm text-start px-2 transition-colors"
        :disabled="reviewStore.isLoading"
        @click="reviewStore.toggleShowModal"
      >
        <span>New Review</span>
        <div v-if="reviewStore.isLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
        <svg
          v-else
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
            d="M10.779 17.779L4.36 19.918 6.5 13.5m4.279 4.279l8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14l6.213-6.504M12.75 7.04L17 11.28"
          />
        </svg>
      </button>

      <!-- Loading state -->
      <div v-if="reviewStore.isLoading && reviewStore.chats.length === 0" class="text-center py-4">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Loading reviews...</p>
      </div>

      <!-- Error state -->
      <div v-if="reviewStore.error" class="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
        {{ reviewStore.error }}
        <button @click="reviewStore.clearError()" class="ml-2 text-red-500 hover:text-red-700">✕</button>
      </div>

      <!-- Empty state -->
      <div v-if="!reviewStore.isLoading && reviewStore.chats.length === 0" class="text-center py-8">
        <div class="text-4xl mb-4">📝</div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">No reviews yet</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">Create your first code review to get started</p>
      </div>

      <!-- Dropdown Filters -->
      <div v-else class="space-y-2 my-4">
        <div v-for="category in ['security', 'styling', 'efficiency']" :key="category">
          <button
            @click="toggleDropdown(category)"
            class="flex items-center justify-between w-full px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition-colors"
          >
            <div class="flex items-center space-x-2">
              <span v-html="getCategoryIcon(category)"></span>
              <span class="capitalize">{{ category }}</span>
              <span v-if="groupedChats[category]" class="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                {{ groupedChats[category].length }}
              </span>
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
            <!-- Empty category state -->
            <div v-if="!groupedChats[category] || groupedChats[category].length === 0" class="px-3 py-2 text-xs text-gray-400 dark:text-gray-500">
              No {{ category }} reviews yet
            </div>

            <!-- Chat listing with three-dot dropdown menu -->
            <div
              v-for="chat in groupedChats[category] || []"
              :key="chat.id"
              class="relative flex items-center justify-between px-3 py-1.5 mx-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
              :class="{ 'bg-gray-100 dark:bg-gray-700': isRouteActive(chat.id) }"
            >
              <router-link
                :to="`/review/${chat.id}`"
                class="truncate flex-grow min-w-0 pr-2"
                @click="activeDropdown = null"
              >
                <div class="truncate">{{ chat.name }}</div>
                <!-- Analysis status indicator -->
                <div v-if="chat.analysis_status && chat.analysis_status !== 'C'" class="flex items-center space-x-1 mt-1">
                  <div class="w-2 h-2 rounded-full animate-pulse"
                       :class="{
                         'bg-yellow-400': chat.analysis_status === 'P',
                         'bg-blue-400': chat.analysis_status === 'A',
                         'bg-red-400': chat.analysis_status === 'F'
                       }">
                  </div>
                  <span class="text-xs text-gray-500">
                    {{ getAnalysisStatusText(chat.analysis_status) }}
                  </span>
                </div>
              </router-link>
              
              <button
                @click.stop="toggleReviewDropdown(chat.id)"
                class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                :class="{ 'bg-gray-200 dark:bg-gray-600': activeDropdown === chat.id }"
              >
                <!-- Three-dot icon -->
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-4 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                </svg>
              </button>
              
              <!-- Dropdown menu -->
              <div
                v-if="activeDropdown === chat.id"
                class="absolute right-0 top-8 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
              >
                <button
                  @click="handleRename(chat)"
                  class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg transition-colors"
                >
                  Rename
                </button>
                <button
                  @click="handleDelete(chat)"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg transition-colors"
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
          class="sm:flex hidden items-center justify-start w-full gap-2 px-4 py-1.5 text-sm font-medium text-white bg-blue-50 border border-blue-600  rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-red-50 dark:bg-transparent dark:hover:bg-gray-100 dark:focus:ring-red-50 transition-colors"
          @click="goToAppDownlaoad"
        >
          <svg class="h-6 w-6 text-black" width="10" height="10" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="7" y="4" width="10" height="16" rx="1" />
            <line x1="11" y1="5" x2="13" y2="5" />
            <line x1="12" y1="17" x2="12" y2="17.01" />
          </svg>
          <span class="text-md text-black">Get App</span>
          <span class="bg-blue-600 px-2 py-1 text-sm rounded-lg">Beta</span>
        </button>

        <button
          class="flex items-center justify-start w-full gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
          @click="goToPricing()"
        >
          <span class="w-10 h-10 flex justify-center items-center border border-black rounded-full">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"/>
            </svg>
          </span>
          <div class="flex flex-col text-start">
            <span>UPGRADE PLAN</span>
            <small>Get More Access</small>
          </div>
        </button>
      </div>
    </div>
  </aside>

  <!-- Click outside to close dropdown -->
  <div
    v-if="activeDropdown"
    @click="activeDropdown = null"
    class="fixed inset-0 z-30"
  ></div>

  <!-- Teleport the modal to the body so it shows full screen -->
  <teleport to="body">
    <fwb-modal size="md" v-if="reviewStore.isShowModal" @close="reviewStore.closeModal">
      <template #header>
        <div class="flex items-center text-lg">
          {{ reviewStore.isEditing ? "Update Review" : "Create New Review" }}
        </div>
      </template>
      <template #body>
        <div class="space-y-4">
          <!-- Review Name Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Review Name *
            </label>
            <input
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter Review Name"
              v-model="reviewStore.reviewName"
              :disabled="reviewStore.isLoading"
            />
          </div>

          <!-- GitHub URL Input -->
          <div v-if="!reviewStore.isEditing">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              GitHub Repository URL *
            </label>
            <input
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://github.com/username/repository"
              v-model="reviewStore.reviewGithubURL"
              :disabled="reviewStore.isLoading"
            />
            <p class="text-xs text-gray-500 mt-1">Enter the full GitHub repository URL</p>
          </div>

          <!-- Review Type Selection (only for new reviews) -->
          <div v-if="!reviewStore.isEditing">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Review Type *
            </label>
            <div class="grid grid-cols-1 gap-2">
              <label
                v-for="option in options"
                :key="option.value"
                class="flex items-center gap-3 cursor-pointer border border-gray-300 rounded-md p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
                :class="{ 
                  'bg-blue-50 border-blue-500 dark:bg-blue-900/20': selectedOption === option.value,
                  'cursor-not-allowed opacity-50': reviewStore.isLoading
                }"
              >
                <input
                  type="radio"
                  name="reviewOptions"
                  :value="option.value"
                  v-model="selectedOption"
                  :disabled="reviewStore.isLoading"
                  class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div class="flex items-center gap-2">
                  <span v-html="getCategoryIcon(option.value)"></span>
                  <div>
                    <div class="font-medium">{{ option.label }}</div>
                    <div class="text-xs text-gray-500">{{ option.description }}</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Error Display -->
          <div v-if="reviewStore.error" class="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {{ reviewStore.error }}
          </div>

          <!-- Submit Button -->
          <button
            :disabled="!canSubmit || reviewStore.isLoading"
            class="w-full bg-black text-white p-3 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            @click="handleSubmit"
          >
            <div v-if="reviewStore.isLoading" class="flex items-center justify-center">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {{ reviewStore.isEditing ? 'Updating...' : 'Creating...' }}
            </div>
            <span v-else>
              {{ reviewStore.isEditing ? 'Update Review' : 'Create Review' }}
            </span>
          </button>
        </div>
      </template>
    </fwb-modal>
  </teleport>
</template>

<script lang="ts">
import { ref, watch, computed, onMounted } from "vue";
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
    const goToPricing = () => {
      router.push('/pricing')
    }
    // Call fetchChats on mount so that the menu is populated
    onMounted(() => {
      reviewStore.fetchChats();
    });
    const goToAppDownlaoad = () =>{
      router.push('/getapp')
    }
    // Dropdown states for each category in the sidebar
    const dropdownStates = ref({
      security: false,
      styling: false,
      efficiency: false,
    });

    // Map chat_type codes to category names
    const typeToCategory: Record<string, string> = {
      S: "security",
      E: "efficiency",
      T: "styling",
    };

    // Group chats by their category (derived from chat_type)
    const groupedChats = computed(() => {
      return reviewStore.chats.reduce((acc: any, chat: any) => {
        const category = typeToCategory[chat.chat_type] || "others";
        if (!acc[category]) acc[category] = [];
        acc[category].push(chat);
        return acc;
      }, {});
    });

    // Toggle dropdown for each category
    const toggleDropdown = (category: string) => {
      dropdownStates.value[category] = !dropdownStates.value[category];
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
    const isRouteActive = (id: string) =>
      router.currentRoute.value.path === `/review/${id}`;

    // Get analysis status text
    const getAnalysisStatusText = (status: string): string => {
      const statusMap: Record<string, string> = {
        'P': 'Pending',
        'A': 'Analyzing',
        'C': 'Complete',
        'F': 'Failed'
      };
      return statusMap[status] || '';
    };

    // Options for the modal form (radio buttons)
    const options = [
      { 
        label: "Security", 
        value: "security",
        description: "Find security vulnerabilities and issues"
      },
      { 
        label: "Efficiency", 
        value: "efficiency",
        description: "Optimize performance and efficiency"
      },
      { 
        label: "Styling", 
        value: "styling",
        description: "Improve code style and formatting"
      },
    ];

    // Use a single ref for radio button selection (for adding new chats)
    const selectedOption = ref<string>("");

    // Reset form when modal state changes
    watch(
      () => reviewStore.isShowModal,
      (isShow) => {
        if (!isShow) {
          selectedOption.value = "";
          reviewStore.clearError();
        }
      }
    );

    // Reset radio selection when editing state changes
    watch(
      () => reviewStore.isEditing,
      (isEditing) => {
        if (!isEditing) {
          selectedOption.value = "";
        }
      }
    );

    // Check if form can be submitted
    const canSubmit = computed(() => {
      if (reviewStore.isEditing) {
        return reviewStore.reviewName.trim().length > 0;
      } else {
        return reviewStore.reviewName.trim().length > 0 && 
               reviewStore.reviewGithubURL.trim().length > 0 && 
               selectedOption.value.length > 0;
      }
    });

    // Handle form submission
    const handleSubmit = async () => {
      if (reviewStore.isEditing) {
        await reviewStore.confirmUpdate(router);
      } else {
        await reviewStore.addReview(router, selectedOption.value);
      }
    };

    // Local state for which chat dropdown is active (by chat id)
    const activeDropdown = ref<string | null>(null);

    const toggleReviewDropdown = (id: string) => {
      activeDropdown.value = activeDropdown.value === id ? null : id;
    };

    const handleRename = (chat: any) => {
      reviewStore.updateReview(chat);
      activeDropdown.value = null;
    };

    const handleDelete = async (chat: any) => {
      await reviewStore.deleteReview(chat, router);
      activeDropdown.value = null;
    };

    return {
      reviewStore,
      router,
      dropdownStates,
      groupedChats,
      toggleDropdown,
      getCategoryIcon,
      isRouteActive,
      getAnalysisStatusText,
      options,
      selectedOption,
      canSubmit,
      handleSubmit,
      activeDropdown,
      toggleReviewDropdown,
      handleRename,
      goToPricing,
      handleDelete,
      goToAppDownlaoad,
    };
  },
};
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>