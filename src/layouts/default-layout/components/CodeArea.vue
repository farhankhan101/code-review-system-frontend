<template>
  <div class="flex justify-center items-center w-full bg-gray-100 fixed bottom-10 p-3">
    <div
      class="bg-gray-100 flex flex-col justify-between border border-gray-300 w-full md:w-[800px] rounded-md transition-all duration-300 ease-in-out"
      :class="inputFocused ? 'sm:h-[400px]' : contentHeight"
    >
      <!-- Input Field -->
      <div class="flex-1 flex items-center gap-4 p-3">
        <textarea
          v-model="inputValue"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
          placeholder="Enter Message (Shift+Enter for new line)"
          class="w-full h-full bg-transparent border-none focus:ring-0 py-2 px-4 resize-none overflow-y-auto"
          ref="textarea"
        ></textarea>
      </div>
      <div class="flex justify-end rounded-md px-4 py-3 bg-gray-100">
        <button
          :disabled="!inputValue.trim()"
          @click="handleSubmit"
          class="cursor-pointer hover:bg-gray-200 w-10 h-10 rounded-full border border-gray-300 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            class="w-6 h-6 text-gray-800"
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
              d="M12 6v13m0-13 4 4m-4-4-4 4"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "CodeArea",
  emits: ["submit"],
  setup(props, { emit }) {
    const inputValue = ref("");
    const textarea = ref(null);
    const inputFocused = ref(false);

    const handleFocus = () => {
      inputFocused.value = true;
    };

    const handleBlur = () => {
      inputFocused.value = false;
    };

    const handleKeydown = (event) => {
      if (event.key === "Enter") {
        if (!event.shiftKey) {
          // Submit message if Enter is pressed without Shift
          handleSubmit();
          event.preventDefault();
        }
        // If Shift+Enter, do nothing—browser will insert a newline.
      }
    };

    const contentHeight = computed(() => {
      return inputValue.value.trim() ? "sm:h-auto" : "sm:h-30";
    });

    const handleSubmit = () => {
      if (inputValue.value.trim()) {
        emit("submit", inputValue.value.trim());
        inputValue.value = "";
      }
    };

    return {
      inputFocused,
      contentHeight,
      inputValue,
      textarea,
      handleFocus,
      handleBlur,
      handleKeydown,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
textarea {
  outline: none;
  font-size: 16px;
}
</style>
