<template>
  <div
    class="sm:w-1/2 mt-10 sm:mt-0 p-4 sm:p-0 flex flex-col sm:items-stretch items-center"
  >
    <h1 class="sm:text-4xl text-3xl text-center my-4">
      Now! What you need review in your code?
    </h1>
    <div class="flex flex-col items-center md:flex-row justify-between gap-4">
      <!-- Button 1 -->
      <button
        v-for="option in options"
        :key="option.value"
        :class="[
          'group relative w-52 h-14 bg-transparent border border-black text-lg font-semibold overflow-hidden shadow-md transition-transform transform hover:scale-105',
          selectedOptions.includes(option.value)
            ? 'bg-black text-white'
            : 'text-black hover:bg-black hover:text-white',
        ]"
        @click="toggleOption(option.value)"
      >
        <span
          :class="[
            'absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 transition-opacity',
            selectedOptions.includes(option.value)
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100',
          ]"
        ></span>
        <span
          :class="[
            'hover:absolute hover:inset-0 hover:bg-black group-hover:animate-pulse',
            selectedOptions.includes(option.value) ? 'animate-pulse' : '',
          ]"
        ></span>
        <span class="relative z-10">{{ option.label }}</span>
      </button>
    </div>
    <button
      class="sm:w-full w-52 my-4 p-3 border border-black hover:bg-black hover:text-white"
      @click="saveToLocalStorage"
    >
      Next
    </button>
  </div>
  <Loading v-if="analyzing" />
</template>
<script>
import { defineComponent, ref } from "vue";
import Loading from "@/components/chat/Loading.vue";
export default defineComponent({
  components: {
    Loading,
  },
  name: "ChooseTypeReview",
  setup(_, { emit }) {
    const analyzing = ref(false);
    const options = ref([
      { value: "security", label: "Security" },
      { value: "efficiency", label: "Efficiency" },
      { value: "styling", label: "Styling" },
    ]);

    const selectedOptions = ref([]);

    const toggleOption = (option) => {
      if (selectedOptions.value.includes(option)) {
        selectedOptions.value = selectedOptions.value.filter(
          (selected) => selected !== option
        );
      } else {
        selectedOptions.value.push(option);
      }
    };

    const saveToLocalStorage = () => {
      localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions.value));
      analyzing.value = true;
    };

    return { options, selectedOptions, toggleOption, saveToLocalStorage, analyzing };
  },
});
</script>
