<template>
    <div class="sm:w-2/3 sm:mt-[50px] p-14 sm:p-0">
      <h1 class="text-4xl my-4">Enter Your Code for Review</h1>
      
      <div class="editor-container sm:w-full sm:h-[350px] h-[300px] rounded-sm shadow-lg" ref="monacoContainer"></div>
  
      <button
        class="w-full my-2 p-3 border border-black hover:bg-black hover:text-white"
        @click="submitCode"
      >
        Submit
      </button>
    </div>
  </template>
  
  <script>
  import * as monaco from 'monaco-editor';
  import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
  
  export default defineComponent({
    name: "CodeEditor",
    setup() {
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
  
      const copyCode = () => {
        const code = editor.getValue();
        navigator.clipboard.writeText(code).then(() => {
          alert("Code copied to clipboard!");
        }).catch(() => {
          alert("Failed to copy code.");
        });
      };
  
      const clearCode = () => {
        editor.setValue(""); // Clear the editor content
      };
  
      const submitCode = () => {
        const code = editor.getValue();
        alert("Code submitted for review:\n" + code);
      };
  
      return {
        monacoContainer,
        copyCode,
        clearCode,
        submitCode,
      };
    },
  });
  </script>
  
  <style scoped>
  .editor-container {
    border: 1px solid #ddd;
    overflow: hidden;
  }
  
  button {
    margin-top: 10px;
  }
  </style>