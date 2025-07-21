<template>
    <div class="sm:w-1/2 p-10 pt-20 sm:p-0 sm:pt-0">
        <div class="flex flex-col">
            <div class="flex flex-col">
                <h1 class="text-4xl my-4">Select Your Choise For Reviewing Code</h1>
                <select name="lang" v-model="selectedChoise">
                    <option value="" disabled>Select Your Option</option>
                    <option v-for="(option,index) in options" :key="index" :value="index">{{ option }}</option>
                </select>
            </div>
            <div v-if="selectedChoise == 'prog'" class="flex flex-col">
                <h1 class="text-4xl my-4">Select The Programing Langugage</h1>
                <select name="lang" v-model="programingLanguage">
                    <option value="" disabled>Select Your Option</option>
                    <option v-for="(lang,index) in programingLanguages" :key="index" :value="index">{{ lang }}</option>
                </select>
            </div>
            <div v-else-if="selectedChoise == 'Frk'" class="flex flex-col">
                <h1 class="text-4xl my-4">Select The Frame Work that You prefer</h1>
                <select name="lang" v-model="framework">
                    <option value="" disabled>Select Your Option</option>
                    <option v-for="(framework,index) in frameworks" :key="index" :value="index">{{ framework }}</option>
                </select>
            </div>
        </div>
        
        <button @click="savedAndNext()" class="w-full my-2 p-3 border border-black hover:bg-black hover:text-white">Next</button>
    </div>    
</template>
  
  <script>
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    name: "LangOrFrameWork",
    setup(_, { emit }) {
        const selectedChoise = ref('')
      const options = ref({
        'prog' : "Programing Langugage",
        'Frk' :  "Frame work"  
      })
      const programingLanguage = ref("");
      const framework = ref("")
      const programingLanguages = ref({
            'py' : 'Python',
            'java' : 'Java',
            'js' : 'JavaScript',
            'c++' : 'C++',
            'csh' : 'C sharp',
            'dart' : 'Dart'
      })
      const frameworks = ref({
            'django' : 'Django',
            'react' : 'React',
            'next' : 'Next Js',
            'vue' : 'Vue Js',
            'flutter' : 'Flutter'
        })
        const savedAndNext = () => {
            localStorage.setItem("choise", selectedChoise.value);
            if(selectedChoise.value == 'prog'){
                localStorage.setItem("programingLanguage", programingLanguage.value);
            }else{
                localStorage.setItem("framework", framework.value);
            }
            emit('next-step')
        }

      return { programingLanguage, programingLanguages, selectedChoise, options,framework, frameworks,savedAndNext };
    },
  });
  </script>
  
  <style scoped>
  </style>
  