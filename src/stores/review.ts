import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useReviewStore = defineStore('review', () => {
  const isShowModal = ref(false);
  const reviewName = ref("");
  const historyReview = ref(
    JSON.parse(localStorage.getItem("historyReview") || "[]").map(review => ({
      ...review,
      // Ensure options is always an array (if not, wrap it in an array)
      options: Array.isArray(review.options) ? review.options : (review.options ? [review.options] : [])
    }))
  );
  const isEditing = ref(false);
  const editingIndex = ref(null);

  const toggleShowModal = () => {
    isShowModal.value = !isShowModal.value;
  };

  const addReview = (router, selectedOption) => {
    if (!reviewName.value.trim()) return;

    const newReview = {
      name: reviewName.value,
      route: `/${reviewName.value.replace(/\s+/g, "-").toLowerCase()}`,
      // For new reviews we still wrap the type in an array
      options: [selectedOption]
    };

    historyReview.value.push(newReview);
    localStorage.setItem("historyReview", JSON.stringify(historyReview.value));

    router.addRoute("DefaultLayout", {
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

  // Updated: Only update the review name and route when renaming.
  const confirmUpdate = (router) => {
    const updatedName = reviewName.value.trim();
    if (!updatedName) return;

    const review = historyReview.value[editingIndex.value];
    review.name = updatedName;
    review.route = `/${updatedName.replace(/\s+/g, "-").toLowerCase()}`;
    // Do not update review.options during rename

    historyReview.value.splice(editingIndex.value, 1, review);
    localStorage.setItem("historyReview", JSON.stringify(historyReview.value));

    router.addRoute("DefaultLayout", {
      path: review.route,
      name: review.name,
      component: () => import("@/views/dashboard/index.vue"),
    });

    router.push(review.route);
    closeModal();
  };

  const deleteReview = (index, router) => {
    historyReview.value.splice(index, 1);
    localStorage.setItem("historyReview", JSON.stringify(historyReview.value));
    router.push("/");
  };

  const closeModal = () => {
    toggleShowModal();
    reviewName.value = "";
    editingIndex.value = null;
    isEditing.value = false;
  };

  return {
    isShowModal,
    reviewName,
    historyReview,
    isEditing,
    editingIndex,
    toggleShowModal,
    addReview,
    updateReview,
    confirmUpdate,
    deleteReview,
    closeModal,
  };
});
