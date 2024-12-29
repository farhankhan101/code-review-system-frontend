<template>
    <div class="sm:w-1/2 mt-10 sm:mt-0 p-4 sm:p-0 flex flex-col sm:items-stretch items-center">
        <h1 class="sm:text-4xl text-3xl my-4 ">Select Your Coding Experience </h1>
        <div class="flex flex-col items-center md:flex-row justify-between gap-4">
            <button
            :class="[
                'group relative w-52 h-14 bg-transparent border border-black text-lg font-semibold overflow-hidden shadow-md transition-transform transform hover:scale-105',
                selectedButton === 'Beginner'
                ? 'bg-black text-white'
                : 'text-black hover:bg-black hover:text-white'
            ]"
            @click="selectButton('Beginner')"
            >
            <span
                :class="[
                'absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 transition-opacity',
                selectedButton === 'Beginner' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                ]"
            ></span>
            <span
                :class="[
                'hover:absolute hover:inset-0 hover:bg-black group-hover:animate-pulse',
                selectedButton === 'Beginner' ? 'animate-pulse' : ''
                ]"
            ></span>
            <span class="relative z-10">Beginner</span>
            </button>

            <!-- Button 2 -->
            <button
            :class="[
                'group relative w-52 h-14 bg-transparent border border-black text-lg font-semibold overflow-hidden shadow-md transition-transform transform hover:scale-105',
                selectedButton === 'Intermediate'
                ? 'bg-black text-white'
                : 'text-black hover:bg-black hover:text-white'
            ]"
            @click="selectButton('Intermediate')"
            >
            <span
                :class="[
                'absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 transition-opacity',
                selectedButton === 'Intermediate' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                ]"
            ></span>
            <span
                :class="[
                'hover:absolute hover:inset-0 hover:bg-black group-hover:animate-pulse',
                selectedButton === 'Intermediate' ? 'animate-pulse' : ''
                ]"
            ></span>
            <span class="relative z-10">Intermediate</span>
            </button>

            <!-- Button 3 -->
            <button
            :class="[
                'group relative w-52 h-14 bg-transparent border border-black text-lg font-semibold overflow-hidden shadow-md transition-transform transform hover:scale-105',
                selectedButton === 'Expert'
                ? 'bg-black text-white'
                : 'text-black hover:bg-black hover:text-white'
            ]"
            @click="selectButton('Expert')"
            >
            <span
                :class="[
                'absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 transition-opacity',
                selectedButton === 'Expert' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                ]"
            ></span>
            <span
                :class="[
                'hover:absolute hover:inset-0 hover:bg-black group-hover:animate-pulse',
                selectedButton === 'Expert' ? 'animate-pulse' : ''
                ]"
            ></span>
            <span class="relative z-10">Expert</span>
            </button>
        </div>
        <button class="sm:w-full w-52 my-4 p-3 border border-black hover:bg-black hover:text-white">Next</button>
    </div>    
</template>
  
  <script>
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    name: "ChatTypeSelect",
    setup() {
      const selectedButton = ref("Beginner");
  
      const selectButton = (button) => {
        selectedButton.value = button;
      };
  
      return { selectedButton, selectButton };
    },
  });
  </script>
  
  <style scoped>
  </style>
  