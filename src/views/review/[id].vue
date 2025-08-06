<template>
  
  <div class="flex flex-col items-center min-h-full bg-gray-50">
    <!-- Chat Details Header -->
    <div v-if="chat" class="mb-4 p-4 md:bg-transparent md:mt-0 mt-2 bg-transparent rounded-md w-full sm:max-w-4xl text-center">
      <h2 class="sm:text-sm text-xs">{{ chat.name || chat.id }}</h2>
      
      <!-- Repository Analysis Status -->
      <div v-if="chat.github_repo_url" class="mt-2">
        <div class="text-xs text-gray-600 mb-1">
          Repository: <a :href="chat.github_repo_url" target="_blank" class="text-blue-600 hover:underline">{{ chat.github_repo_url }}</a>
        </div>
        <div 
          v-if="reviewStore.analysisStatus !== 'C'" 
          class="flex items-center justify-center space-x-2 text-xs"
        >
          <div class="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
          <span class="text-gray-600">
            {{ getAnalysisStatusText(reviewStore.analysisStatus) }}
          </span>
        </div>
        <div v-else class="text-xs text-green-600">
          ✓ Analysis Complete
        </div>
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="messageStore.error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full sm:max-w-4xl text-center text-sm">
      {{ messageStore.error }}
      <button @click="messageStore.error = null" class="ml-2 text-red-500 hover:text-red-700">✕</button>
    </div>

    <!-- Chat messages container -->
    <div class="content md:w-[800px] w-full md:mt-0 
      h-[65vh] max-h-[65vh] 
      sm:h-[65vh] sm:max-h-[65vh] 
      md:w-[800px] md:h-[60vh] md:max-h-[60vh] 
      lg:h-[60vh] lg:max-h-[60vh] 
      xl:h-[59vh] 2xl:max-h-[59vh]
      2xl:h-[63vh] 2xl:max-h-[63vh]
      
    sm:p-0 p-3 overflow-y-auto scrollbar-hide" ref="messagesContainer">
      <!-- Loading State -->
      <div v-if="messageStore.isLoading" class="text-center p-4">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
        Loading messages...
      </div>
      
      <!-- Repository Overview Display (Accordion) -->
      <div v-else-if="repoOverview" class="mb-6">
        <div class="flex items-start space-x-3 max-w-[90%] md:max-w-[80%]">
          <!-- AI Avatar -->
          <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mt-1">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          
          <!-- Message Content -->
          <div class="flex-1">
            <div class="flex items-center mb-2">
              <span class="text-sm font-medium text-gray-900">AI Assistant</span>
              <span class="ml-2 text-xs text-gray-500">Repository Analysis</span>
              
              <!-- TTS Button for Repository Overview -->
              <button 
                @click="handleTTSClick(repoOverview, 'repo-overview')"
                :disabled="!canUseTTS"
                class="ml-3 p-1.5 rounded-full transition-colors duration-200"
                :class="{
                  'bg-blue-100 hover:bg-blue-200 text-blue-600': !isCurrentlySpeaking('repo-overview'),
                  'bg-red-100 hover:bg-red-200 text-red-600': isCurrentlySpeaking('repo-overview'),
                  'opacity-50 cursor-not-allowed': !canUseTTS
                }"
                :title="getTTSButtonTitle('repo-overview')"
              >
                <svg v-if="!isCurrentlySpeaking('repo-overview')" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5 7l6-3v16l-6-3V7z"></path>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10h6v4H9z"></path>
                </svg>
              </button>
            </div>
            
            <!-- Accordion Container -->
            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <!-- Accordion Header -->
              <button 
                @click="toggleAccordion"
                class="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left flex items-center justify-between transition-colors duration-200"
              >
                <span class="font-medium text-gray-800">📋 Repository Overview</span>
                <svg 
                  class="w-5 h-5 text-gray-500 transition-transform duration-200"
                  :class="{ 'rotate-180': isAccordionOpen }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- Accordion Body -->
              <div 
                v-show="isAccordionOpen"
                class="px-4 py-4 bg-white border-t border-gray-200"
              >
                <div class="formatted-content" v-html="formatAIMessage(repoOverview)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="messageStore.messages.length === 0 && !repoOverview" class="text-center p-8 text-gray-500">
        <div class="text-4xl mb-4">💬</div>
        <p class="text-lg mb-2">Start a conversation</p>
        <p class="text-sm">
          {{ reviewStore.analysisStatus === 'C' 
            ? 'Ask questions about your code repository.' 
            : 'Please wait for the repository analysis to complete.' 
          }}
        </p>
      </div>
      
      <!-- Messages -->
      <div
  v-for="msg in messageStore.messages"
  :key="msg.id"
  class="mb-6"
>
  <div class="flex items-start space-x-3" :class="{'flex-row-reverse space-x-reverse': msg.sender === 'U'}">
    <!-- Avatar -->
    <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1" 
         :class="msg.sender === 'U' ? 'bg-blue-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'">
      <!-- User Avatar -->
      <span v-if="msg.sender === 'U'" class="text-white text-sm font-medium">
        {{ getUserInitial() }}
      </span>
      <!-- AI Avatar -->
      <svg v-else class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    
    <!-- Message Content -->
    <div class="flex-1 max-w-[85%]" :class="{'text-right': msg.sender === 'U'}">
      <!-- Message Header -->
      <div class="flex items-center mb-2" :class="{'justify-end': msg.sender === 'U'}">
        <span class="text-sm font-medium text-gray-700">
          {{ msg.sender === 'U' ? 'You' : 'AI Assistant' }}
        </span>
        
        <!-- Action buttons container -->
        <div class="ml-2 flex items-center space-x-2" :class="{'order-first mr-2 ml-0': msg.sender === 'U'}">
          <!-- TTS Button for completed AI messages only -->
          <button 
            v-if="msg.sender === 'A' && msg.message && !msg.is_streaming && !msg.error"
            @click="handleTTSClick(msg.message, msg.id)"
            :disabled="!canUseTTS"
            class="p-1.5 rounded-full transition-colors duration-200"
            :class="{
              'bg-blue-100 hover:bg-blue-200 text-blue-600': !isCurrentlySpeaking(msg.id),
              'bg-red-100 hover:bg-red-200 text-red-600': isCurrentlySpeaking(msg.id),
              'opacity-50 cursor-not-allowed': !canUseTTS
            }"
            :title="getTTSButtonTitle(msg.id)"
          >
            <svg v-if="!isCurrentlySpeaking(msg.id)" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5 7l6-3v16l-6-3V7z"></path>
            </svg>
            <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10h6v4H9z"></path>
            </svg>
          </button>

          <!-- Enhanced Streaming indicator -->
          <div v-if="msg.is_streaming" class="flex items-center space-x-2 text-xs text-blue-600">
            <div class="flex space-x-1">
              <div class="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
              <div class="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
            <span class="font-medium">
              {{ msg.sender === 'A' ? 'AI responding...' : 'Sending...' }}
            </span>
          </div>
          
          <!-- Regenerate button for completed AI messages -->
          <button 
            v-else-if="msg.sender === 'A' && !messageStore.isStreaming && !msg.error"
            @click="regenerateMessage(msg.id)"
            class="text-gray-400 hover:text-gray-600 text-xs px-2 py-1 rounded hover:bg-gray-100 transition-colors"
            title="Regenerate response"
          >
            ↻
          </button>
        </div>
      </div>
      
      <!-- Message Text -->
      <div class="text-sm leading-relaxed">
        <!-- User Message -->
        <div v-if="msg.sender === 'U'" class="text-gray-800">
          {{ msg.message }}
        </div>
        
        <!-- AI Message -->
        <div v-else>
          <!-- Show message content if available -->
          <div v-if="msg.message && msg.message.trim()" class="formatted-content" v-html="formatAIMessage(msg.message)"></div>
          
          <!-- Show thinking placeholder when streaming with no content yet -->
          <div v-else-if="msg.is_streaming" class="flex items-center space-x-2 text-gray-500 italic">
            <div class="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-500"></div>
            <span>Thinking...</span>
          </div>
          
          <!-- Empty state for completed but empty messages -->
          <div v-else class="text-gray-400 italic">
            No response generated
          </div>
        </div>
        
        <!-- Error state -->
        <div v-if="msg.error" class="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Failed to get response. Please try again.</span>
          </div>
        </div>
        
        <!-- Streaming cursor for AI messages with content -->
        <span v-if="msg.is_streaming && msg.message && msg.sender === 'A'" class="animate-pulse text-blue-400 ml-1 font-bold">▋</span>
      </div>
    </div>
  </div>
</div>

<!-- Global Streaming indicator at bottom (when any message is streaming) -->
<div v-if="messageStore.isStreaming" class="text-center py-4 mb-4">
  <div class="inline-flex items-center space-x-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
    <div class="animate-spin rounded-full h-4 w-4 border-2 border-blue-300 border-t-blue-600"></div>
    <span class="text-sm font-medium">AI is responding...</span>
  </div>
</div>
      
      <!-- Streaming indicator at bottom -->
      <div v-if="messageStore.isStreaming" class="text-center py-2">
        <div class="inline-flex items-center space-x-2 text-sm text-gray-500">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span>AI is responding...</span>
        </div>
      </div>
    </div>
    
    <!-- TTS Status Bar -->
    <div 
      v-if="messageStore.isSpeaking" 
      class="w-full sm:max-w-4xl mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span class="text-sm text-blue-800 font-medium">Speaking...</span>
          </div>
          <span class="text-xs text-blue-600 max-w-md truncate">
            {{ getTruncatedSpeakingText() }}
          </span>
        </div>
        
        <div class="flex items-center space-x-2">
          <!-- Pause/Resume Button -->
          <button 
            @click="togglePauseResume"
            class="p-1.5 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
            :title="messageStore.isPaused ? 'Resume' : 'Pause'"
          >
            <svg v-if="!messageStore.isPaused" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
            <svg v-else class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          
          <!-- Stop Button -->
          <button 
            @click="stopTTS"
            class="p-1.5 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
            title="Stop"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Message Input Area -->
    <CodeArea 
      @submit="handleMessageSubmit" 
      :disabled="!canSendMessage"
      :placeholder="getInputPlaceholder()"
    />

    <!-- Full Page Loading Overlay -->
    <div 
      v-if="isPageLoading"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Blurred background -->
      <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      <!-- Loading content -->
      <div class="relative z-10 text-center">
        <!-- Spinning loader -->
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
        
        <!-- Loading text -->
        <div class="text-white text-lg font-medium">
          Loading...
        </div>
        
        <!-- Optional subtitle -->
        <div class="text-white text-sm opacity-75 mt-2">
          Please wait while we process your request
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, nextTick, ref, onUnmounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import CodeArea from '@/layouts/default-layout/components/CodeArea.vue';
import { useMessageStore } from '@/stores/message';
import { useAuthStore } from '@/stores/auth';
import { useReviewStore } from '@/stores/review';
import DOMPurify from 'dompurify';

// Import highlight.js for syntax highlighting
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import sql from 'highlight.js/lib/languages/sql';
import bash from 'highlight.js/lib/languages/bash';
import 'highlight.js/styles/github-dark.css';

// Register languages
hljs.registerLanguage('json', json);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);

export default defineComponent({
  name: "ChatDetail",
  components: { CodeArea },
  setup() {
    const route = useRoute();
    const messageStore = useMessageStore();
    const authStore = useAuthStore();
    const reviewStore = useReviewStore();
    const messagesContainer = ref<HTMLElement>();
    const repoOverview = ref<string>('');
    const isAccordionOpen = ref(false);
    const isPageLoading = ref(false);
    const currentSpeakingId = ref<string | null>(null);

    const currentUser = computed(() => authStore.getUser());

    // Helper function to get chat ID safely
    const getChatId = (): string | null => {
      const params = route.params as { id?: string };
      const id = params.id;
      return (id && typeof id === 'string') ? id : null;
    };

    // Get user initial for avatar
    const getUserInitial = (): string => {
      const user = currentUser.value;
      if (user && user.username) {
        return user.username.charAt(0).toUpperCase();
      }
      return 'U';
    };

    // Toggle accordion
    const toggleAccordion = () => {
      isAccordionOpen.value = !isAccordionOpen.value;
    };

    // TTS Functions
    const canUseTTS = computed(() => {
      return messageStore.initTTS();
    });

    const isCurrentlySpeaking = (messageId: string): boolean => {
      return messageStore.isSpeaking && currentSpeakingId.value === messageId;
    };

    const getTTSButtonTitle = (messageId: string): string => {
      if (!canUseTTS.value) return 'Text-to-Speech not available';
      if (isCurrentlySpeaking(messageId)) return 'Stop speaking';
      return 'Read aloud';
    };

    const getTruncatedSpeakingText = (): string => {
      const text = messageStore.currentSpeakingText;
      return text.length > 100 ? text.substring(0, 100) + '...' : text;
    };

    const handleTTSClick = (text: string, messageId: string) => {
      if (!canUseTTS.value) return;

      if (isCurrentlySpeaking(messageId)) {
        stopTTS();
      } else {
        // Stop any current speech first
        if (messageStore.isSpeaking) {
          messageStore.stopSpeaking();
        }
        
        // Start new speech
        currentSpeakingId.value = messageId;
        const success = messageStore.speakText(text, {
          onStart: () => {
            console.log('Started speaking message:', messageId);
          },
          onEnd: () => {
            currentSpeakingId.value = null;
            console.log('Finished speaking message:', messageId);
          },
          onError: (error) => {
            currentSpeakingId.value = null;
            console.error('TTS error for message:', messageId, error);
          }
        });

        if (!success) {
          currentSpeakingId.value = null;
        }
      }
    };

    const stopTTS = () => {
      messageStore.stopSpeaking();
      currentSpeakingId.value = null;
    };

    const togglePauseResume = () => {
      if (messageStore.isPaused) {
        messageStore.resumeSpeaking();
      } else {
        messageStore.pauseSpeaking();
      }
    };

    // Watch for TTS state changes
    watch(() => messageStore.isSpeaking, (isSpeaking) => {
      if (!isSpeaking) {
        currentSpeakingId.value = null;
      }
    });

    // Function to show/hide full page loading
    const showPageLoading = () => {
      isPageLoading.value = true;
    };

    const hidePageLoading = () => {
      isPageLoading.value = false;
    };

    // Compute the current chat
    const chat = computed(() => {
      const chatId = getChatId();
      if (chatId) {
        return reviewStore.currentChat || 
               reviewStore.chats.find((c: any) => c.id.toString() === chatId) || 
               null;
      }
      return null;
    });

    // Check if user can send messages
    const canSendMessage = computed(() => {
      return chat.value && 
            reviewStore.analysisStatus === 'C' && 
            !messageStore.isStreaming &&
            !messageStore.isLoading &&
            !isPageLoading.value;
    });

    // Get appropriate placeholder text
    const getInputPlaceholder = (): string => {
      if (!chat.value) return 'Loading...';
      if (reviewStore.analysisStatus === 'P') return 'Repository analysis pending...';
      if (reviewStore.analysisStatus === 'A') return 'Analyzing repository...';
      if (reviewStore.analysisStatus === 'F') return 'Analysis failed. Please try again.';
      if (messageStore.isStreaming) return 'AI is responding...';
      if (isPageLoading.value) return 'Loading...';
      return 'Ask about your code...';
    };

    // Get analysis status text
    const getAnalysisStatusText = (status: string): string => {
      const statusMap: Record<string, string> = {
        'P': 'Analysis Pending',
        'A': 'Analyzing Repository',
        'C': 'Analysis Complete',
        'F': 'Analysis Failed'
      };
      return statusMap[status] || 'Unknown Status';
    };

    // Helper function to detect and format JSON
    const tryFormatJson = (message: string): string | null => {
      try {
        const trimmed = message.trim();
        
        // Check if it starts with { or [ (JSON indicators)
        if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
          return null;
        }
        
        const parsed = JSON.parse(trimmed);
        const pretty = JSON.stringify(parsed, null, 2);
        const highlighted = hljs.highlight(pretty, { language: 'json' }).value;
        
        return `
          <div class="json-response my-4">
            <div class="bg-blue-50 border-l-4 border-blue-400 p-3 mb-2 rounded-r-md">
              <p class="text-blue-800 font-medium text-sm flex items-center">
                <span class="mr-2">📊</span> JSON Response
              </p>
            </div>
            <div class="relative group">
              <pre class="hljs bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm border"><code class="text-white">${highlighted}</code></pre>
              <button class="copy-btn absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white text-xs py-2 px-3 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100" data-code="${encodeURIComponent(pretty)}">
                <span class="flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                  Copy
                </span>
              </button>
            </div>
          </div>
        `;
      } catch (error) {
        return null;
      }
    };

    // Helper function to format array of objects as table
    const formatArrayOfObjects = (arr: any[]): string => {
      if (!Array.isArray(arr) || arr.length === 0 || typeof arr[0] !== 'object') {
        return '';
      }

      const headers = Object.keys(arr[0]);
      let html = `
        <div class="table-response my-4">
          <div class="bg-green-50 border-l-4 border-green-400 p-3 mb-2 rounded-r-md">
            <p class="text-green-800 font-medium text-sm flex items-center">
              <span class="mr-2">📋</span> Table View 
              <span class="ml-2 bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">${arr.length} items</span>
            </p>
          </div>
          <div class="overflow-x-auto rounded-lg border border-gray-200">
            <table class="min-w-full bg-white text-sm">
              <thead class="bg-gray-50">
                <tr>
      `;
      
      headers.forEach(header => {
        html += `<th class="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">${header}</th>`;
      });
      
      html += `
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
      `;
      
      arr.forEach((obj, index) => {
        html += `<tr class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150">`;
        headers.forEach(header => {
          const value = obj[header];
          let displayValue = '';
          
          if (value === null) {
            displayValue = '<span class="text-gray-400 italic">null</span>';
          } else if (value === undefined) {
            displayValue = '<span class="text-gray-400 italic">undefined</span>';
          } else if (typeof value === 'boolean') {
            displayValue = `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${value}</span>`;
          } else if (typeof value === 'number') {
            displayValue = `<span class="font-mono text-blue-600">${value}</span>`;
          } else if (typeof value === 'object') {
            displayValue = `<code class="bg-gray-100 px-1 py-0.5 rounded text-xs">${JSON.stringify(value)}</code>`;
          } else {
            displayValue = String(value);
          }
          
          html += `<td class="px-4 py-3 text-gray-800">${displayValue}</td>`;
        });
        html += '</tr>';
      });
      
      html += `
              </tbody>
            </table>
          </div>
        </div>
      `;
      
      return html;
    };

    // Helper function to clean Claude AI internal format
    const cleanAIInternalFormat = (message: string): string => {
      if (!message) return '';
      
      let cleaned = message;
      
      // Pattern 1: Remove complete Claude arrays at the beginning
      // Matches: [{'text': '...', 'type': 'text'}, {'id': '...', 'type': 'tool_use'}]
      const claudeArrayPattern = /^\[(\{[^}]*'text':\s*["']([^"']*?)["'][^}]*\}(?:,\s*\{[^}]*'type':\s*['"]tool_use['"][^}]*\})*)\]/;
      
      // Keep removing Claude arrays from the beginning until none left
      let hasMatches = true;
      while (hasMatches) {
        const match = cleaned.match(claudeArrayPattern);
        if (match) {
          try {
            // Extract the array content
            const arrayContent = match[0];
            
            // Convert single quotes to double quotes for proper JSON
            const jsonString = arrayContent.replace(/'/g, '"');
            
            const parsed = JSON.parse(jsonString);
            if (Array.isArray(parsed)) {
              // Extract only text content
              const textParts = parsed
                .filter(item => item.type === 'text' && item.text)
                .map(item => item.text)
                .join('\n\n');
              
              // Replace the array with extracted text
              cleaned = cleaned.replace(arrayContent, textParts);
            } else {
              // If parsing fails, remove the array completely
              cleaned = cleaned.replace(arrayContent, '');
            }
          } catch (error) {
            // Fallback: extract text using simple regex
            const textMatch = match[2];
            if (textMatch) {
              cleaned = cleaned.replace(match[0], textMatch);
            } else {
              cleaned = cleaned.replace(match[0], '');
            }
          }
        } else {
          hasMatches = false;
        }
      }
      
      // Pattern 2: Remove any remaining tool_use objects
      cleaned = cleaned.replace(/\{[^}]*'type':\s*['"]tool_use['"][^}]*\}/g, '');
      
      // Pattern 3: Remove empty brackets
      cleaned = cleaned.replace(/\[\s*\]/g, '');
      
      // Pattern 4: Clean up any remaining malformed arrays
      cleaned = cleaned.replace(/\[,?\s*\]/g, '');
      
      // Clean up multiple newlines and spaces
      cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
      cleaned = cleaned.replace(/\s{3,}/g, ' ');
      cleaned = cleaned.trim();
      
      return cleaned;
    };

    // Most aggressive cleaner - last resort
    const aggressiveCleanAIFormat = (message: string): string => {
      if (!message) return '';
      
      // Split message by common patterns and extract meaningful content
      let cleaned = message;
      
      // Remove everything that looks like Claude's internal format
      // This is very aggressive but should work
      cleaned = cleaned.replace(/\[?\{[^}]*'text'[^}]*\}[^\]]*\]?/g, (match) => {
        // Extract just the text content
        const textMatch = match.match(/'text':\s*["']([^"']*?)["']/);
        return textMatch ? textMatch[1] : '';
      });
      
      // Remove any remaining tool_use or id references
      cleaned = cleaned.replace(/\{[^}]*('id'|'type'|'input'|'name')[^}]*\}/g, '');
      
      // Remove empty brackets and cleanup
      cleaned = cleaned.replace(/\[\s*\]/g, '');
      cleaned = cleaned.replace(/\{\s*\}/g, '');
      cleaned = cleaned.replace(/,\s*,/g, ',');
      cleaned = cleaned.replace(/\n{2,}/g, '\n\n');
      cleaned = cleaned.trim();
      
      return cleaned;
    };

    // Alternative cleaner function if the above doesn't work
    const alternativeCleanAIFormat = (message: string): string => {
      if (!message) return '';
      
      let cleaned = message;
      
      // Simple approach: find and extract text from Claude format
      const patterns = [
        // Pattern for: [{'text': 'content', 'type': 'text'}, ...]
        /\[?\{'text':\s*["']([^"']*?)["'],?\s*'type':\s*['"]text['"][^}]*\}[^\]]*\]?/g,
        
        // Pattern for standalone text extraction
        /'text':\s*["']([^"']*?)["']/g
      ];
      
      let extractedTexts: string[] = [];
      
      // Extract all text content
      patterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(message)) !== null) {
          if (match[1] && match[1].trim()) {
            extractedTexts.push(match[1].trim());
          }
        }
      });
      
      // If we found text content, use it
      if (extractedTexts.length > 0) {
        // Remove the original Claude format from the message
        cleaned = message.replace(/\[?\{[^}]*'type':\s*['"][^'"]*['"][^}]*\}[^\]]*\]?/g, '');
        
        // Prepend extracted text
        const extractedContent = extractedTexts.join('\n\n');
        cleaned = extractedContent + '\n\n' + cleaned;
      }
      
      // Clean up
      cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
      cleaned = cleaned.trim();
      
      return cleaned;
    };

    // Enhanced message formatting for AI responses
    const formatAIMessage = (message: string): string => {
      if (!message) return '';
      
      // Step 1: Clean Claude AI internal format first - try multiple methods
      let cleanedMessage = cleanAIInternalFormat(message);
      
      // If first method doesn't work well, try alternative
      if (cleanedMessage.includes('[{') || cleanedMessage.includes("'text':")) {
        cleanedMessage = alternativeCleanAIFormat(message);
      }
      
      // If still has Claude format, use aggressive cleaning
      if (cleanedMessage.includes('[{') || cleanedMessage.includes("'text':")) {
        cleanedMessage = aggressiveCleanAIFormat(message);
      }
      
      if (!cleanedMessage) return '';
      
      // Step 2: Try to detect and format JSON (only for clean JSON, not Claude format)
      const asJson = tryFormatJson(cleanedMessage);
      if (asJson) {
        return DOMPurify.sanitize(asJson, {
          ALLOWED_TAGS: [
            'div', 'pre', 'code', 'button', 'p', 'span', 'svg', 'path'
          ],
          ALLOWED_ATTR: ['class', 'data-code', 'fill', 'viewBox', 'd', 'stroke-linecap', 'stroke-linejoin', 'stroke-width'],
          KEEP_CONTENT: true,
          ALLOW_DATA_ATTR: true
        });
      }

      // Step 3: Try to detect array of objects for table view
      try {
        const parsed = JSON.parse(cleanedMessage.trim());
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object') {
          const tableView = formatArrayOfObjects(parsed);
          if (tableView) {
            return DOMPurify.sanitize(tableView, {
              ALLOWED_TAGS: [
                'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'p', 'span', 'code'
              ],
              ALLOWED_ATTR: ['class'],
              KEEP_CONTENT: true
            });
          }
        }
      } catch (error) {
        // Not JSON, continue with markdown formatting
      }

      // Step 4: Regular markdown formatting
      let formattedMessage = cleanedMessage;
      
      // Remove common AI prefixes
      formattedMessage = formattedMessage.replace(/^Based on the comprehensive analysis,?\s*/i, '');
      formattedMessage = formattedMessage.replace(/^here's my detailed assessment:?\s*/i, '');

      // Enhanced headings with better styling
      formattedMessage = formattedMessage.replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-blue-800 mt-6 mb-3 border-b-2 border-blue-200 pb-2 flex items-center"><span class="mr-2">🔹</span>$1</h3>');
      formattedMessage = formattedMessage.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-blue-900 mt-8 mb-4 border-l-4 border-blue-500 pl-4 flex items-center"><span class="mr-2">📌</span>$1</h2>');
      formattedMessage = formattedMessage.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-8 mb-4 flex items-center"><span class="mr-2">🚀</span>$1</h1>');

      // Enhanced code blocks with language detection and syntax highlighting
      let codeBlockCounter = 0;
      formattedMessage = formattedMessage.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
        const blockId = `code-block-${codeBlockCounter++}`;
        const cleanCode = code.trim();
        const lang = language || 'plaintext';
        
        // Try to highlight the code
        let highlightedCode = cleanCode;
        try {
          if (hljs.getLanguage(lang)) {
            highlightedCode = hljs.highlight(cleanCode, { language: lang }).value;
          } else {
            // Escape HTML for safe display
            highlightedCode = cleanCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          }
        } catch (error) {
          // Fallback to escaped text
          highlightedCode = cleanCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        
        return `
          <div class="code-block-wrapper my-4 rounded-lg overflow-hidden border border-gray-300">
            <div class="bg-gray-800 text-gray-300 px-4 py-2 text-xs font-medium flex justify-between items-center">
              <span class="flex items-center">
                <span class="mr-2">💻</span>
                <span class="font-mono uppercase">${lang}</span>
              </span>
              <button class="copy-btn bg-gray-700 hover:bg-gray-600 text-white text-xs py-1 px-3 rounded transition-colors duration-200 flex items-center gap-1" data-code="${encodeURIComponent(cleanCode)}">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                </svg>
                Copy
              </button>
            </div>
            <pre class="hljs bg-gray-900 p-4 overflow-x-auto text-sm m-0"><code class="text-gray-100">${highlightedCode}</code></pre>
          </div>
        `;
      });

      // Enhanced inline code
      formattedMessage = formattedMessage.replace(/`([^`]+)`/g, '<code class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono border border-blue-200">$1</code>');
      
      // Enhanced lists with better styling
      formattedMessage = formattedMessage.replace(/^\d+\.\s+(.*)$/gm, '<li class="mb-3 text-gray-700 flex items-start"><span class="bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-bold">•</span><span class="flex-1">$1</span></li>');
      formattedMessage = formattedMessage.replace(/(<li class="mb-3 text-gray-700 flex items-start">.*<\/li>\s*)+/gs, '<ol class="space-y-1 mb-6 ml-2">$&</ol>');

      formattedMessage = formattedMessage.replace(/^-\s+(.*)$/gm, '<li class="mb-2 text-gray-700 flex items-start"><span class="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span><span class="flex-1">$1</span></li>');
      formattedMessage = formattedMessage.replace(/(<li class="mb-2 text-gray-700 flex items-start">.*<\/li>\s*)+/gs, '<ul class="space-y-2 mb-6">$&</ul>');

      // Enhanced text formatting
      formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 bg-yellow-100 px-1 rounded">$1</strong>');
      formattedMessage = formattedMessage.replace(/\*(.*?)\*/g, '<em class="italic text-blue-700">$1</em>');
      
      // Format paragraphs with better spacing
      formattedMessage = formattedMessage.replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">');
      formattedMessage = '<p class="mb-4 text-gray-700 leading-relaxed">' + formattedMessage + '</p>';
      
      // Clean up empty paragraphs
      formattedMessage = formattedMessage.replace(/<p class="mb-4 text-gray-700 leading-relaxed"><\/p>/g, '');
      
      // SANITIZE with DOMPurify
      const cleanHTML = DOMPurify.sanitize(formattedMessage, {
        ALLOWED_TAGS: [
          'p', 'div', 'span', 'br',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'strong', 'b', 'em', 'i', 'u',
          'ul', 'ol', 'li',
          'code', 'pre',
          'button', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'svg', 'path'
        ],
        ALLOWED_ATTR: [
          'class', 'data-code', 'id', 'fill', 'viewBox', 'd', 
          'stroke-linecap', 'stroke-linejoin', 'stroke-width'
        ],
        FORBID_TAGS: [
          'script', 'style', 'link', 'meta', 
          'iframe', 'object', 'embed', 'form', 
          'input', 'textarea', 'select'
        ],
        FORBID_ATTR: [
          'onclick', 'onload', 'onerror', 'onmouseover',
          'style', 'src', 'href', 'action'
        ],
        KEEP_CONTENT: true,
        ALLOW_DATA_ATTR: true
      });
      
      return cleanHTML;
    };

    // Watch for new messages and scroll to bottom
    watch(() => messageStore.messages.length, () => {
      scrollToBottom();
    });

    // Watch for message content changes (streaming)
    watch(() => messageStore.messages.map(m => m.message).join(''), () => {
      scrollToBottom();
    }, { deep: true });

    // Clear stores when user changes
    watch(currentUser, (newUser, oldUser) => {
      if (!newUser && oldUser) {
        messageStore.clearMessages();
        reviewStore.chats.length = 0;
        stopTTS(); // Stop any ongoing speech
      }
    });

    // Initialize component
    onMounted(async () => {
      showPageLoading(); // Show loading when component mounts
      
      // Initialize TTS and wait a moment for ResponsiveVoice to load
      setTimeout(() => {
        if (messageStore.initTTS()) {
          console.log('TTS initialized successfully');
        } else {
          console.warn('TTS initialization failed - ResponsiveVoice may not be loaded');
        }
      }, 1000);
      
      // Enhanced copy function with better feedback
      (window as any).copyCode = (element: HTMLElement) => {
        const codeData = element.getAttribute('data-code');
        if (codeData) {
          const text = decodeURIComponent(codeData);
          navigator.clipboard.writeText(text).then(() => {
            const originalText = element.innerHTML;
            element.innerHTML = `
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Copied!
            `;
            element.classList.add('bg-green-600');
            element.classList.remove('bg-gray-700');
            setTimeout(() => {
              element.innerHTML = originalText;
              element.classList.remove('bg-green-600');
              element.classList.add('bg-gray-700');
            }, 2000);
          }).catch(() => {
            const originalText = element.innerHTML;
            element.innerHTML = '❌ Failed';
            element.classList.add('bg-red-600');
            setTimeout(() => {
              element.innerHTML = originalText;
              element.classList.remove('bg-red-600');
            }, 2000);
          });
        }
      };

      // Add click event listener for copy buttons
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('copy-btn') || target.closest('.copy-btn')) {
          const button = target.classList.contains('copy-btn') ? target : target.closest('.copy-btn');
          (window as any).copyCode(button as HTMLElement);
        }
      });

      // Apply syntax highlighting to existing code blocks
      nextTick(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          if (!block.classList.contains('hljs')) {
            hljs.highlightElement(block as HTMLElement);
          }
        });
      });

      try {
        await reviewStore.fetchChats();
        const chatId = getChatId();
        if (chatId) {
          await reviewStore.setCurrentChat(chatId);
          await messageStore.fetchMessages(chatId);
          scrollToBottom();
          startStatusPolling();
        }
      } finally {
        hidePageLoading(); // Hide loading when done
      }
    });

    // Watch for route changes
    watch(() => (route.params as { id: string }).id, async (newId) => {
      if (newId && typeof newId === 'string') {
        showPageLoading(); // Show loading on route change
        
        try {
          if (statusInterval) {
            clearInterval(statusInterval);
            statusInterval = null;
          }
          
          // Stop any ongoing speech when changing routes
          stopTTS();
          
          messageStore.clearMessages();
          repoOverview.value = '';
          isAccordionOpen.value = false;
          await reviewStore.setCurrentChat(newId);
          await messageStore.fetchMessages(newId);
          scrollToBottom();
          startStatusPolling();
        } finally {
          hidePageLoading(); // Hide loading when done
        }
      }
    }, { immediate: false });

    // Handle message submission
    const handleMessageSubmit = async (messageText: string) => {
      const chatId = getChatId();
      if (chatId && messageText.trim() && canSendMessage.value) {
        try {
          await messageStore.sendMessage(chatId, messageText.trim());
          scrollToBottom();
        } catch (error) {
          console.error('Error sending message:', error);
          // Error is already handled in sendMessage function
        }
      }
    };

    // Regenerate AI response
    const regenerateMessage = async (messageId: string) => {
      try {
        // Stop TTS if currently speaking this message
        if (isCurrentlySpeaking(messageId)) {
          stopTTS();
        }
        await messageStore.regenerateResponse(messageId);
        scrollToBottom();
      } catch (error) {
        console.error('Error regenerating message:', error);
      }
    };

    // Polling for analysis status updates
    let statusInterval: ReturnType<typeof setInterval> | null = null;
    
    const startStatusPolling = () => {
      const chatId = getChatId();
      if (chatId && reviewStore.analysisStatus !== 'C' && reviewStore.analysisStatus !== 'F') {
        statusInterval = setInterval(async () => {
          try {
            await reviewStore.getChatStatus(chatId);
            if (reviewStore.analysisStatus === 'C' || reviewStore.analysisStatus === 'F') {
              if (reviewStore.repoOverview && !repoOverview.value) {
                repoOverview.value = reviewStore.repoOverview;
              }
              if (statusInterval) {
                clearInterval(statusInterval);
                statusInterval = null;
              }
            }
          } catch (error) {
            console.error('Error polling status:', error);
            if (statusInterval) {
              clearInterval(statusInterval);
              statusInterval = null;
            }
          }
        }, 3000);
      } else if (reviewStore.analysisStatus === 'C' && reviewStore.repoOverview && !repoOverview.value) {
        repoOverview.value = reviewStore.repoOverview;
      }
    };

    // Enhanced scroll to bottom function
    const scrollToBottom = () => {
      nextTick(() => {
        if (messagesContainer.value) {
          const container = messagesContainer.value;
          const isNearBottom = container.scrollTop > container.scrollHeight - container.clientHeight - 100;
          
          // Only auto-scroll if user is near bottom or if it's a new message
          if (isNearBottom || messageStore.isStreaming) {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth'
            });
          }
        }
      });
    };

    // Watch for streaming state changes
    watch(() => messageStore.isStreaming, (isStreaming, wasStreaming) => {
      if (isStreaming && !wasStreaming) {
        // Started streaming - scroll to bottom
        scrollToBottom();
      }
    });

    // Watch for message updates during streaming
    watch(() => messageStore.messages.map(m => m.message).join(''), () => {
      if (messageStore.isStreaming) {
        scrollToBottom();
      }
    }, { deep: true });

    // Clean up interval and TTS on unmount
    onUnmounted(() => {
      if (statusInterval) {
        clearInterval(statusInterval);
        statusInterval = null;
      }
      
      // Stop TTS
      stopTTS();
      
      // Stop any ongoing streaming/polling
      if (messageStore.stopAllPolling) {
        messageStore.stopAllPolling();
      }

      // Remove event listeners
      document.removeEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('copy-btn') || target.closest('.copy-btn')) {
          const button = target.classList.contains('copy-btn') ? target : target.closest('.copy-btn');
          (window as any).copyCode(button as HTMLElement);
        }
      });
    });

    return {
      chat,
      messageStore,
      reviewStore,
      currentUser,
      messagesContainer,
      canSendMessage,
      repoOverview,
      isAccordionOpen,
      isPageLoading,
      currentSpeakingId,
      handleMessageSubmit,
      regenerateMessage,
      formatAIMessage,
      getInputPlaceholder,
      getAnalysisStatusText,
      getUserInitial,
      toggleAccordion,
      showPageLoading,
      hidePageLoading,
      scrollToBottom,
      // TTS Functions
      canUseTTS,
      isCurrentlySpeaking,
      getTTSButtonTitle,
      getTruncatedSpeakingText,
      handleTTSClick,
      stopTTS,
      togglePauseResume,
    };
  },
});
</script>
<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Animation for typing indicator */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Smooth accordion animation */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Formatted content styling */
.formatted-content {
  line-height: 1.7;
}

.formatted-content h1,
.formatted-content h2,
.formatted-content h3,
.formatted-content h4,
.formatted-content h5,
.formatted-content h6 {
  color: #1f2937;
}

.formatted-content ul,
.formatted-content ol {
  padding-left: 0;
}

.formatted-content li {
  list-style: none;
}

.formatted-content pre {
  background: #1f2937;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.formatted-content code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

/* Code block styling */
.formatted-content pre code {
  background: transparent;
  padding: 0;
  border: none;
  color: #f9fafb;
}

/* Full page loading backdrop blur */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* TTS Button animations */
.tts-button-enter-active,
.tts-button-leave-active {
  transition: all 0.2s ease;
}

.tts-button-enter-from,
.tts-button-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Speaking indicator animation */
@keyframes speaking-pulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.speaking-indicator {
  animation: speaking-pulse 1.5s ease-in-out infinite;
}

/* Responsive height utilities */
@media (max-width: 767px) {
  .h-90vh {
    height: 90vh;
  }
  .h-10vh {
    height: 10vh;
  }
}

@media (min-width: 768px) {
  .h-80vh {
    height: 80vh;
  }
  .h-20vh {
    height: 20vh;
  }
}

/* Enhanced TTS status bar styling */
.tts-status-bar {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border: 1px solid #93c5fd;
}

.tts-status-bar .speaking-dot {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}
</style>