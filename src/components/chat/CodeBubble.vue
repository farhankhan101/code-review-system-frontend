<template>
    <div class="space-y-6">
      <!-- Code Bubble (Readonly Code Editor) -->
      <div class="relative code-bubble group">
        <div class="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div class="flex items-center justify-between px-4 py-2 bg-gray-800">
            <div class="flex items-center space-x-4">
              <span class="font-mono text-sm text-gray-300">Code Preview</span>
            </div>
          </div>
          <div class="p-4">
            <pre class="text-sm text-white"><code class="font-mono">{{ code }}</code></pre>
          </div>
        </div>
        <div class="absolute -left-2 bottom-3 w-4 h-4 transform rotate-45 bg-gray-900"></div>
      </div>
  
      <!-- AI Review Bubble -->
      <div class="relative ai-review-bubble group">
        <div class="bg-blue-900 rounded-lg shadow-lg overflow-hidden">
          <div class="flex items-center justify-between px-4 py-2 bg-blue-800">
            <span class="font-mono text-sm text-gray-300">AI Security Analysis</span>
            <button @click="speakReview" class="text-white">
              🔊
            </button>
          </div>
          <div class="p-4 text-white">
            <p>{{ aiReview }}</p>
            <pre class="text-sm bg-gray-800 p-2 rounded-lg"><code class="font-mono">{{ improvedCode }}</code></pre>
            <button @click="downloadReport" class="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg">
              Download Report
            </button>
          </div>
        </div>
        <div class="absolute -right-2 bottom-3 w-4 h-4 transform rotate-45 bg-blue-900"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const code = ref(`function hello() {
    console.log('Hello, world!');
  }`);
  
  const aiReview = ref("The function lacks input validation and security measures. Consider adding user authentication before executing commands.");
  
  const improvedCode = ref(`function hello(user) {
    if (!user) return 'Unauthorized';
    console.log('Hello, ' + user);
  }`);
  
  const speakReview = () => {
    const utterance = new SpeechSynthesisUtterance(aiReview.value);
    speechSynthesis.speak(utterance);
  };
  
  const downloadReport = () => {
    const reportContent = `AI Security Review:\n${aiReview.value}\n\nImproved Code:\n${improvedCode.value}`;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ai_security_report.txt';
    link.click();
  };
  </script>
  
  <style scoped>
  .code-bubble, .ai-review-bubble {
    position: relative;
    max-width: 600px;
  }
  </style>
      