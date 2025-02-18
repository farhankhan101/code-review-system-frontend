<template>
    <div class="sm:w-2/3 sm:mt-[48px] p-14 sm:p-0">
      <h1 class="text-4xl my-4">Enter Your Code for Review</h1>
        <div class="w-ful h-50px py-3 p-2 text-white" style="background-color: rgb(30, 30, 30)">Ai Powered Code Review System</div>
        <div class="editor-container sm:w-full sm:h-[300px] h-[300px]  shadow-lg" ref="monacoContainer"></div>
      
  
      <button
        class="w-full my-2 p-3 border border-black hover:bg-black hover:text-white"
        @click="savedAndContinue()"
      >
        Submit
      </button>
    </div>
    <Loading v-if="analyzing" />
  </template>
  
  <script>
  import * as monaco from 'monaco-editor';
  import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
  import Loading from "@/components/chat/Loading.vue";
  export default defineComponent({
    name: "CodeEditor",
    components: {
      Loading,
    },
    setup(_, { emit }) {
      const analyzing = ref(false);
      const monacoContainer = ref(null);
      let editor = null;
      onMounted(() => {
        editor = monaco.editor.create(monacoContainer.value, {
          value: "",
          language: "javascript",
          theme: "vs-dark",
          automaticLayout: true
        });
      });
  
      onBeforeUnmount(() => {
        if (editor) {
          editor.dispose();
        }
      });
  
      //const copyCode = () => {
        //const code = editor.getValue();
        //navigator.clipboard.writeText(code).then(() => {
          //alert("Code copied to clipboard!");
        //}).catch(() => {
        //  alert("Failed to copy code.");
        //});
      //};
  
   
      const savedAndContinue = () => {
        const code = editor.getValue();
        localStorage.setItem("code", code);
        analyzing.value = true;
        emit("next-step");
      };
  
      return {
        monacoContainer,
        analyzing,
        savedAndContinue,
      };
    },
  });
  </script>
  
  <style scoped>
  .editor-container {
    overflow: hidden;
  }
  
  button {
    margin-top: 10px;
  }
  </style>