import { defineStore } from 'pinia';
import { computed } from 'vue';
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export const useMessageStore = defineStore('message', () => {
  const authStore = useAuthStore();
  const currentUser = computed(() => authStore.getUser());

  // State for messages, a loading flag, and any error messages.
  const messages = ref<any[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Fetch messages for a given chat.
   * Clears previous messages before fetching.
   *
   * @param chatId - The id of the chat to fetch messages for.
   */
  const fetchMessages = async (chatId: string) => {
    isLoading.value = true;
    error.value = null;
    messages.value = []; // Clear previous messages
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v2/chat/message/', {
        params: { chat: chatId },
        headers: { 'Content-Type': 'application/json' },
      });
      const data = response.data;
      // Ensure only messages for the current chat are stored.
      messages.value = data.filter((msg: any) =>
        msg.chat === chatId &&
        (msg.sender === 'A' || (msg.sender === 'U' && msg.user === currentUser.value.id))
      );
    } catch (err: any) {
      error.value = err.message || 'Error fetching messages';
      console.error('Error fetching messages:', err);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Send a new message.
   *
   * @param chatId - The id of the chat.
   * @param messageText - The text of the message.
   * @param sender - The sender type ('U' for User, 'A' for Agent).
   */
  const sendMessage = async (chatId: string, messageText: string, sender: string = 'U') => {
    error.value = null;
    try {
      const payload = {
        chat: chatId,
        message: messageText,
        sender: sender,
        user: currentUser.value.id,
      };
      const response = await axios.post('http://127.0.0.1:8000/api/v2/chat/message/', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      const newMessage = response.data;
      // Append the new message to the store.
      messages.value.push(newMessage);
      return newMessage;
    } catch (err: any) {
      error.value = err.message || 'Error sending message';
      console.error('Error sending message:', err);
      throw err;
    }
  };

  return {
    messages,
    isLoading,
    error,
    fetchMessages,
    sendMessage,
  };
});
