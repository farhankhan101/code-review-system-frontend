<template>
  <aside
    v-bind="$attrs"
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
          class="relative"
        >
          <router-link
            :to="review.route"
            class="flex justify-between items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <span class="">{{ review.name }}</span>
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
              @click="showPopover(index)"
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
                stroke-width="2"
                d="M12 6h.01M12 12h.01M12 18h.01"
              />
            </svg>
          </router-link>
          <div
            v-if="popoverIndex === index"
            class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 z-50"
          >
            <button
              class="w-full text-left p-2 hover:bg-gray-200"
              @click="updateReview(index)"
            >
              Update Name
            </button>
            <button
              class="w-full text-left p-2 text-red-500 hover:bg-gray-200"
              @click="deleteReview(index)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>

      <div class="bg-white absolute bottom-0 left-0 w-full px-3 py-2">
        <button
          class="w-full bg-red-500 text-white p-3 rounded-lg text-sm hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    </div>
  </aside>
  <fwb-modal size="xs" v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">
        {{ isEditing ? "Update Review Name" : "Write name of your review" }}
      </div>
    </template>
    <template #body>
      <input
        type="text"
        class="w-full"
        placeholder="Enter Review Name"
        v-model="reviewName"
      />
      <button
        class="w-full bg-black p-3 text-white my-4"
        @click="isEditing ? confirmUpdate() : addReview()"
      >
        Submit
      </button>
    </template>
  </fwb-modal>
</template>

<script lang="ts">
import { ref, onMounted, watch } from "vue";
import { FwbModal } from "flowbite-vue";
import { useRouter } from "vue-router";


export default {
  // inheritAttrs: false,
  components: {
    FwbModal,
  },
  name: "Sidebar",
  setup() {
    const isShowModal = ref(false);
    const reviewName = ref("");
    const historyReview = ref([]);
    const popoverIndex = ref(null);
    const isEditing = ref(false);
    const editingIndex = ref(null);
    const router = useRouter();

    onMounted(() => {
      const savedReviews = JSON.parse(localStorage.getItem("historyReview") || "[]");
      historyReview.value = savedReviews;
    });

    const closeModal = () => {
      isShowModal.value = false;
      reviewName.value = "";
      popoverIndex.value = null;
    };

    const addReview = () => {
      if (!reviewName.value.trim()) return;

      const newReview = {
        name: reviewName.value,
        route: `/${reviewName.value.replace(/\s+/g, "-").toLowerCase()}`,
      };

      historyReview.value.push(newReview);
      localStorage.setItem("historyReview", JSON.stringify(historyReview.value));
      router.addRoute({
        path: newReview.route,
        name: newReview.name,
        component: () => import("@/views/dashboard/index.vue"),
      });
      reviewName.value = "";
      isShowModal.value = false;
    };

    const updateReview = (index) => {
      isEditing.value = true;
      editingIndex.value = index;
      reviewName.value = historyReview.value[index].name;
      isShowModal.value = true;
    };

    const confirmUpdate = () => {
      const updatedName = reviewName.value.trim();
      if (!updatedName) return;

      const review = historyReview.value[editingIndex.value];
      review.name = updatedName;
      review.route = `/${updatedName.replace(/\s+/g, "-").toLowerCase()}`;
      historyReview.value.splice(editingIndex.value, 1, review);
      localStorage.setItem("historyReview", JSON.stringify(historyReview.value));
      router.addRoute({
        path: review.route,
        name: review.name,
        component: () => import("@/views/dashboard/index.vue"),
      });
      closeModal();
    };

    const deleteReview = (index) => {
      historyReview.value.splice(index, 1);
      localStorage.setItem("historyReview", JSON.stringify(historyReview.value));
      popoverIndex.value = null;
    };

    const showPopover = (index) => {
      popoverIndex.value = popoverIndex.value === index ? null : index;
    };

    const isRouteActive = (route) => {
      return location.pathname === route;
    };
    watch(historyReview, () => {
      router.replace({ path: router.currentRoute.value.fullPath });
    });

    return {
      isShowModal,
      reviewName,
      historyReview,
      popoverIndex,
      isEditing,
      editingIndex,
      closeModal,
      addReview,
      updateReview,
      confirmUpdate,
      deleteReview,
      showPopover,
      isRouteActive,
    };
  },
};
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #d4d4d4 transparent;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d4d4d4;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
</style>
