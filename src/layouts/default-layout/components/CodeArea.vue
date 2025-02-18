<template>
  <div class="flex justify-center items-center w-full bg-gray-100 fixed bottom-10 p-3">
      <div
          class="bg-gray-100 flex flex-col justify-between border  border-gray-300 w-full md:w-[800px] rounded-md transition-all duration-300 ease-in-out"
          :class="inputFocused ? 'sm:h-[400px]' : contentHeight"
      >
          <!-- Input Field -->
          <div class="flex-1 flex items-center gap-4 p-3">
              <textarea
                  v-model="inputValue"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @keydown="handleKeydown"
                  placeholder="Enter Code (Shift+Enter for new line)"
                  class="w-full h-full bg-transparent border-none focus:ring-0 py-2 px-4 resize-none overflow-y-auto"
                  ref="textarea"
              ></textarea>
          </div>
          <!-- Multiple Select Options -->
          <!-- <div
              v-if="inputValue.trim()"
              class="flex justify-between items-center px-4 py-3 bg-gray-100"
          >
            <div class="flex flex-col">  
              <label class="text-lg font-medium mb-2">Select For Review:</label>
              <div class="flex gap-3 flex-wrap">
                  <label
                      v-for="option in options"
                      :key="option.value"
                      class="flex hover:bg-gray-200 items-center justify-center gap-3 cursor-pointer border border-gray-300 rounded-md px-3 py-2 transition-all duration-200"
                      :class="{ 'bg-gray-200': selectedOptions.includes(option.value) }"
                  >
                      <input
                          type="checkbox"
                          :value="option.value"
                          v-model="selectedOptions"
                          class="hidden"
                      />
                      <span class="text-lg font-medium">{{ option.label }}</span>
                  </label>
              </div>
            </div>
              <button
                  :disabled="!inputValue.trim() || selectedOptions.length === 0"
                  @click="handleSubmit"
                  class="cursor-pointer hover:bg-gray-200 w-10 h-10 rounded-full border border-gray-300 p-2 mt-3 self-end disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div> -->
          <div
              class="flex justify-end rounded-md px-4 py-3 bg-gray-100"
          >
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
  name: "InputField",
  setup() {
      const inputFocused = ref(false);
      const inputValue = ref("");
      const selectedOptions = ref([]);
      const textarea = ref(null);

      const options = [
          { value: "security", label: "Security" },
          { value: "efficiency", label: "Efficiency" },
          { value: "styling", label: "Styling" },
      ];

      const contentHeight = computed(() => {
          if (inputValue.value.trim()) {
              return "sm:h-auto";
          }
          return "sm:h-30";
      });

      const handleFocus = () => {
          inputFocused.value = true;
      };

      const handleBlur = () => {
          inputFocused.value = false;
      };

      const handleKeydown = (event) => {
          if (event.key === "Enter") {
              if (event.shiftKey) {
                  inputValue.value += "\n";
                  event.preventDefault();
              } else {
                  handleSubmit();
                  event.preventDefault();
              }
          }
      };

      const handleSubmit = () => {
          if (inputValue.value.trim() && selectedOptions.value.length > 0) {
              alert(`Input Submitted: ${inputValue.value}\nSelected Options: ${selectedOptions.value.join(", ")}`);
              inputValue.value = ""; // Clear input
              selectedOptions.value = []; // Clear selected options
          }
      };

      return {
          inputFocused,
          inputValue,
          selectedOptions,
          textarea,
          options,
          contentHeight,
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
