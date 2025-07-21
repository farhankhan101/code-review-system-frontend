<template>
  <div class="flex flex-col items-center min-h-full bg-gray-100">
    <!-- (Optional) Display Chat Details from Review Store -->
    <div v-if="chat" class="mb-4 p-4 md:bg-white md:mt-0 mt-2 bg-transparent md:shadow rounded-md w-full sm:max-w-4xl text-center ">
      <h2 class="sm:text-lg text-xs font-bold">Review: {{ chat.name || chat.id }}</h2>
    </div>

    <!-- Chat messages container -->
    <div
      class="content md:w-[800px] w-full mt-14 h-[290px]"
      style="max-height: 290px; overflow-y: auto"
    >
      <div v-if="messageStore.isLoading" class="text-center p-4">
        Loading messages...
      </div>
      <div v-if="messageStore.error" class="text-red-500 text-center p-4">
        {{ messageStore.error }}
      </div>
      
      <!-- Iterate over messages and render each as a bubble -->
      <div
        v-for="msg in messageStore.messages"
        :key="msg.id"
        class="relative max-w-[90%] md:max-w-[80%] mb-4"
        :class="{'ml-auto': msg.sender === 'U', 'mr-auto': msg.sender !== 'U'}"
      >
        <div class="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div class="flex items-center px-4 py-2 bg-gray-800">
            <div class="flex space-x-2">
              <!-- Different dot colors based on message sender -->
              <div
                class="w-3 h-3 rounded-full"
                :class="msg.sender === 'U' ? 'bg-blue-500' : 'bg-red-500'"
              ></div>
              <div
                class="w-3 h-3 rounded-full"
                :class="msg.sender === 'U' ? 'bg-blue-500' : 'bg-yellow-500'"
              ></div>
              <div
                class="w-3 h-3 rounded-full"
                :class="msg.sender === 'U' ? 'bg-blue-500' : 'bg-green-500'"
              ></div>
            </div>
            <div class="ml-2 text-gray-400 text-sm font-mono">
              {{ msg.sender === 'U' ? 'You' : 'Agent' }}
            </div>
          </div>
          <div class="p-4 font-mono text-sm">
            <pre class="text-gray-300"><code>{{ msg.message }}</code></pre>
          </div>
        </div>
        <!-- Bubble tail: right for sender 'U', left otherwise -->
        <div v-if="msg.sender !== 'U'" class="absolute -left-2 bottom-3 w-4 h-4 transform rotate-45 bg-gray-900"></div>
        <!-- <div v-else class="absolute -right-3 bottom-3 w-4 h-4 transform -rotate-45 bg-red-500"></div> -->
      </div>
    </div>
    
    <!-- Message Input Area -->
    <CodeArea @submit="handleMessageSubmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import CodeArea from '@/layouts/default-layout/components/CodeArea.vue';
import { useMessageStore } from '@/stores/message';
import { useAuthStore } from '@/stores/auth';
import { useReviewStore } from '@/stores/review';

export default defineComponent({
  name: "ChatDetail",
  components: { CodeArea },
  setup() {
    const route = useRoute();
    const messageStore = useMessageStore();
    const authStore = useAuthStore();
    const reviewStore = useReviewStore();

    // Although the current user is still computed, our rendering now uses msg.sender.
    const currentUser = computed(() => authStore.getUser());

    // Watch for changes in the current user.
    watch(currentUser, (newUser, oldUser) => {
      if (!newUser && oldUser) {
        messageStore.clearMessages && messageStore.clearMessages();
        reviewStore.clearChats && reviewStore.clearChats();
      }
    });

    // Always fetch chats on mount to ensure the store is up-to-date for the current user.
    onMounted(() => {
      reviewStore.fetchChats();
      initMessages();
    });

    // Compute the current chat based on the route parameter.
    const chat = computed(() => {
      const chatId = route.params.id as string;
      return reviewStore.chats.find((c: any) => c.id.toString() === chatId) || null;
    });

    // Fetch messages for the current chat.
    const initMessages = () => {
      const chatId = route.params.id as string;
      if (chatId) {
        messageStore.fetchMessages(chatId);
      }
    };

    // Watch for changes in the route parameter (e.g., navigating to a different chat).
    watch(() => route.params.id, (newId) => {
      if (newId) {
        initMessages();
      }
    });

    // Handle message submission.
    const handleMessageSubmit = async (messageText: string) => {
      const chatId = route.params.id as string;
      if (chatId && messageText.trim()) {
        try {
          // When sending a message, we mark the sender as 'U'.
          await messageStore.sendMessage(chatId, messageText, 'U');
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
    };

    return {
      chat,
      messageStore,
      currentUser,
      handleMessageSubmit,
    };
  },
});
</script>

<style scoped>
/* Add any additional component styling here */
</style>
