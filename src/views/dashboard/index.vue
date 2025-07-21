<template>
  <div class="flex flex-col items-center min-h-full bg-gray-100">
    <div
      class="content md:w-[800px] w-full mt-14 h-[290px]"
      style="max-height: 290px; overflow-y: auto"
    >
    <h2 class="text-xl">{{ chat?.name }}</h2>

      <!-- Original Code Bubble -->
      <!-- <div class="relative max-w-[90%] md:max-w-[80%] mb-4 ml-4">
        <div class="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div class="flex items-center px-4 py-2 bg-gray-800">
            <div class="flex space-x-2">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="ml-2 text-gray-400 text-sm font-mono">Example.js</div>
          </div>
          <div class="p-4 font-mono text-sm">
            <pre class="text-gray-300">
<code>
<span class="text-blue-400">function</span> <span class="text-yellow-400">example</span>() {<br>
  <span class="text-gray-500">// This is a sample code block</span><br>
  <span class="text-purple-400">const</span> <span class="text-blue-300">message</span> = <span class="text-green-400">'Hello World!'</span>;<br>
  <span class="text-purple-400">console</span>.<span class="text-yellow-400">log</span>(message);<br>
}
</code>
            </pre>
          </div>
        </div>
        <div
          class="absolute -left-2 bottom-3 w-4 h-4 transform rotate-45 bg-gray-900"
        ></div>
      </div> -->

      <!-- Security Review Bubble -->
      <!-- <div class="relative max-w-[90%] md:max-w-[80%] mb-4 ml-4">
        <div class="bg-green-900 rounded-lg shadow-lg overflow-hidden">
          <div class="flex items-center justify-between px-4 py-2 bg-green-800">
            <div class="flex items-center space-x-2">
              <div class="flex space-x-2">
                <div class="w-3 h-3 rounded-full bg-white/20"></div>
                <div class="w-3 h-3 rounded-full bg-white/20"></div>
                <div class="w-3 h-3 rounded-full bg-white/20"></div>
              </div>
              <div class="ml-2 text-green-200 text-sm font-mono">
                Security Review Report.pdf
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="speakReview"
                class="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-green-100 text-sm transition-colors"
                title="Listen to Review"
              >
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9 12H5a1 1 0 010-2h4a1 1 0 010 2zM15 12h-4a1 1 0 010-2h4a1 1 0 010 2z"
                  />
                </svg>
                Speak
              </button>
              <button
                @click="downloadReport"
                class="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-green-100 text-sm transition-colors"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </button>
            </div>
          </div>

          <div class="p-4 font-mono text-sm">
            <div class="text-green-100 space-y-2">
              <div class="flex items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <span class="font-bold text-red-400">High Severity:</span>
                <span class="ml-2">Potential XSS vulnerability detected</span>
              </div>
              <div class="flex items-center">
                <div class="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <span class="font-bold text-yellow-400">Warning:</span>
                <span class="ml-2">Missing input validation</span>
              </div>
              <div class="flex items-center">
                <div class="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span class="font-bold text-green-300">Recommendation:</span>
                <span class="ml-2">Implement sanitization for user inputs</span>
              </div>
            </div>
            <div class="mt-4">
              <div class="text-green-200 font-bold mb-2">Improved Code Example:</div>
              <pre
                class="text-sm bg-gray-800 p-2 rounded-lg text-gray-300 overflow-x-auto"
              >
<code>
<span class="text-blue-400">function</span> <span class="text-yellow-400">example</span>(<span class="text-blue-300">userInput</span>) {<br>
&nbsp;&nbsp;<span class="text-blue-400">if</span> (!userInput || typeof userInput !== <span class="text-green-400">'string'</span>) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-400">console</span>.<span class="text-yellow-400">error</span>(<span class="text-green-400">"Invalid input"</span>);<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue-400">return</span>;<br>
&nbsp;&nbsp;}<br>
&nbsp;&nbsp;<span class="text-purple-400">const</span> <span class="text-blue-300">sanitizedInput</span> = <span class="text-blue-300">userInput</span>.replace(/&lt;/g, <span class="text-green-400">"&amp;lt;"</span>).replace(/&gt;/g, <span class="text-green-400">"&amp;gt;"</span>);<br>
&nbsp;&nbsp;<span class="text-purple-400">console</span>.<span class="text-yellow-400">log</span>(<span class="text-green-400">"Hello "</span> + <span class="text-blue-300">sanitizedInput</span>);<br>
}<br><br>
// Dummy sanitization function<br>
<span class="text-blue-400">function</span> <span class="text-yellow-400">sanitize</span>(<span class="text-blue-300">input</span>) {<br>
&nbsp;&nbsp;<span class="text-blue-400">return</span> <span class="text-blue-300">input</span>.replace(/&lt;/g, <span class="text-green-400">"&amp;lt;"</span>).replace(/&gt;/g, <span class="text-green-400">"&amp;gt;"</span>);<br>
}
</code>
              </pre>
            </div>
          </div>
        </div>
        <div
          class="absolute -right-2 bottom-3 w-4 h-4 transform rotate-45 bg-green-900"
        ></div>
      </div> -->
    </div>
    <CodeArea />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import CodeArea from "@/layouts/default-layout/components/CodeArea.vue";

export default defineComponent({
  name: "ChatDetail",
  components: {
    CodeArea,
  },
  setup() {
    const route = useRoute();
    const chat = ref<any>(null);
    const fetchChat = async (id: string) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v2/chat/chat/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch chat');
        }
        chat.value = await response.json();
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    };

    // Fetch chat details when the component is mounted
    onMounted(() => {
      if (route.params.id) {
        fetchChat(route.params.id as string);
      }
    });

    // In case the route changes (e.g. navigating from one chat to another), watch the parameter
    watch(
      () => route.params.id,
      (newId) => {
        if (newId) {
          fetchChat(newId as string);
        }
      }
    );
    // The review text that the TTS will read
//     const reviewText = `Security Analysis Report:
// High Severity: Potential XSS vulnerability detected.
// Warning: Missing input validation.
// Recommendation: Implement sanitization for user inputs.`;

    // Trigger Text-to-Speech for the review text
    // const speakReview = () => {
    //   const utterance = new SpeechSynthesisUtterance(reviewText);
    //   speechSynthesis.speak(utterance);
    // };

    // Download the security review report as a PDF (mock)
//     const downloadReport = () => {
//       const content = `Security Review Report

// Findings:
// 1. High Severity: Potential XSS vulnerability detected.
// 2. Warning: Missing input validation.
// 3. Recommendation: Implement sanitization for user inputs.

// Improved Code Example:

// function example(userInput) {
//   if (!userInput || typeof userInput !== 'string') {
//     console.error("Invalid input");
//     return;
//   }
//   const sanitizedInput = userInput.replace(/</g, "&lt;").replace(/>/g, "&gt;");
//   console.log("Hello " + sanitizedInput);
// }

// // Dummy sanitization function
// function sanitize(input) {
//   return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// }`;
//       const blob = new Blob([content], { type: "application/pdf" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = "security-review.pdf";
//       link.click();
//       URL.revokeObjectURL(link.href);
//     };

    return {
      chat
      // speakReview,
      // downloadReport,
    };
  },
});
</script>

<style>
/* Additional security review styling */
.text-red-400 {
  color: #f87171;
}
.text-yellow-400 {
  color: #facc15;
}
.text-green-300 {
  color: #86efac;
}
.bg-green-900 {
  background-color: #14532d;
}
.bg-green-800 {
  background-color: #166534;
}
</style>
