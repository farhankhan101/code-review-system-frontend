import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

export const useReviewStore = defineStore('review', () => {
  const authStore = useAuthStore();
  const currentUser = authStore.getUser();

  const isShowModal = ref(false);
  const reviewName = ref('');
  const chats = ref<any[]>([]); // All chats fetched from the backend
  const isEditing = ref(false);
  const editingChat = ref<any>(null);

  const toggleShowModal = () => {
    isShowModal.value = !isShowModal.value;
  };

  // Fetch chats from the backend API and filter only those that belong to currentUser
  const fetchChats = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v2/chat/chat/', {
        headers: {
          'Content-Type': 'application/json',
          // "Authorization": `Bearer ${authStore.getToken()}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch chats');
      }
      const data = await response.json();
      // Filter chats so that only those whose user field matches currentUser.id are stored
      chats.value = data.filter((chat: any) => chat.user === currentUser.id);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  // Create a new chat (POST request)
  const addReview = async (router, selectedOption: string) => {
    if (!reviewName.value.trim()) return;

    // Map the selected option to the expected chat_type code (S, E, or T)
    const chatTypeMap: Record<string, string> = {
      security: 'S',
      efficiency: 'E',
      styling: 'T',
    };
    const chatTypeCode = chatTypeMap[selectedOption];

    const payload = {
      name: reviewName.value,
      chat_type: chatTypeCode,
      user: currentUser.id,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v2/chat/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // "Authorization": `Bearer ${authStore.getToken()}`
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to create chat');
      }
      const newChat = await response.json();
      // Make sure the new chat belongs to the current user before adding it
      if (newChat.user === currentUser.id) {
        chats.value.push(newChat);
      }
      // Navigate to the new chat’s detail page (update route as needed)
      router.push(`/review/${newChat.id}`);
    } catch (error) {
      console.error('Error creating chat:', error);
    }

    reviewName.value = '';
    isShowModal.value = false;
  };

  // Start editing a chat (e.g. renaming)
  const updateReview = (chat: any) => {
    isEditing.value = true;
    editingChat.value = chat;
    reviewName.value = chat.name;
    isShowModal.value = true;
  };

  // Confirm update (PATCH request)
  const confirmUpdate = async (router) => {
    const updatedName = reviewName.value.trim();
    if (!updatedName || !editingChat.value) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v2/chat/chat/${editingChat.value.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // "Authorization": `Bearer ${authStore.getToken()}`
        },
        body: JSON.stringify({ name: updatedName }),
      });
      if (!response.ok) {
        throw new Error('Failed to update chat');
      }
      const updatedChat = await response.json();
      const index = chats.value.findIndex(chat => chat.id === updatedChat.id);
      if (index !== -1) {
        chats.value[index] = updatedChat;
      }
      router.push(`/review/${updatedChat.id}`);
    } catch (error) {
      console.error('Error updating chat:', error);
    }

    closeModal();
  };

  // Delete a chat (DELETE request)
  const deleteReview = async (chat: any, router) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v2/chat/chat/${chat.id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // "Authorization": `Bearer ${authStore.getToken()}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }
      chats.value = chats.value.filter(c => c.id !== chat.id);
      router.push('/');
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const closeModal = () => {
    toggleShowModal();
    reviewName.value = '';
    editingChat.value = null;
    isEditing.value = false;
  };

  return {
    isShowModal,
    reviewName,
    chats,
    isEditing,
    editingChat,
    toggleShowModal,
    fetchChats,
    addReview,
    updateReview,
    confirmUpdate,
    deleteReview,
    closeModal,
  };
});
