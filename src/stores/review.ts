import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import ApiService from '@/core/services/ApiService';
import Swal from 'sweetalert2'

export const useReviewStore = defineStore('review', () => {
  const authStore = useAuthStore();
  const currentUser = computed(() => authStore.getUser());

  const isShowModal = ref(false);
  const reviewName = ref('');
  const reviewGithubURL = ref('');
  const chats = ref<any[]>([]);
  const isEditing = ref(false);
  const editingChat = ref<any>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Current chat details and analysis status
  const currentChat = ref<any>(null);
  const analysisStatus = ref<string>('');
  const repoOverview = ref<string>('');

  const toggleShowModal = () => {
    isShowModal.value = !isShowModal.value;
  };

  /**
   * Fetch all chats from the backend API and filter by current user
   */
  const fetchChats = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await ApiService.get('/api/v2/chat/chat');
      if (response.status !== 200) {
        console.log(response  )
        throw new Error('Failed to fetch chats');
      }
      const data = await response.data.results;
      console.log(data)
      // Filter chats for current user
      chats.value = data.filter((chat: any) => chat.user === currentUser.value?.id);
    } catch (err: any) {
      error.value = err.message || 'Error fetching chats';
      console.error('Error fetching chats:', err);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Get chat status and analysis information
   */
  const getChatStatus = async (chatId: string) => {
    try {
      const response = await ApiService.get(`/api/v2/chat/chat/${chatId}/status`);
      console.log( 'stauts',response)
      if (response.status !== 200) {
        throw new Error('Failed to get chat status');
      }
      const data = await response.data;
      
      analysisStatus.value = data.analysis_status;
      repoOverview.value = data.repo_overview;
      // Update current chat with status info
      if (currentChat.value && currentChat.value.id === chatId) {
        currentChat.value = {
          ...currentChat.value,
          analysis_status: data.analysis_status,
          analysis_status_display: data.analysis_status_display,
          repo_overview: data.repo_overview,
          analysis_error: data.analysis_error
        };
      }
      
      return data;
    } catch (err: any) {
      error.value = err.message || 'Error getting chat status';
      console.error('Error getting chat status:', err);
      throw err;
    }
  };

  /**
   * Create a new chat with GitHub repository analysis
   */
  const addReview = async (router: any, selectedOption: string) => {
    if (!reviewName.value.trim()) {
      error.value = 'Review name is required';
      return;
    }

    if (!reviewGithubURL.value.trim()) {
      error.value = 'GitHub URL is required';
      return;
    }

    // Map the selected option to the expected chat_type code
    const chatTypeMap: Record<string, string> = {
      security: 'S',
      efficiency: 'E',
      styling: 'T',
    };
    const chatTypeCode = chatTypeMap[selectedOption];

    if (!chatTypeCode) {
      error.value = 'Invalid chat type selected';
      return;
    }

    const payload = {
      name: reviewName.value.trim(),
      chat_type: chatTypeCode,
      github_repo_url: reviewGithubURL.value.trim(),
    };

    isLoading.value = true;
    error.value = null;

    try {
      const response = await ApiService.post('/api/v2/chat/chat/', payload);
      console.log(response)   
      if (response.status !== 201) {
        throw new Error('Failed to create chat');
      }
      // const newChat = response.data;
      fetchChats()
      
      // chats.value.push(newChat);
      // Add to chats list if it belongs to current user
      // if (newChat.user === currentUser.value?.id) {
      // }
      
      // Set as current chat
      // currentChat.value = newChat;
      
      // Navigate to the new chat
      // router.push(`/review/${newChat.id}`);
      
      // Close modal and reset form
      closeModal();
    } catch (err: any) {
      error.value = err.message || 'Error creating chat';
      console.error('Error creating chat:', err);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Set current chat for editing
   */
  const updateReview = (chat: any) => {
    isEditing.value = true;
    editingChat.value = chat;
    reviewName.value = chat.name;
    reviewGithubURL.value = chat.github_repo_url || '';
    isShowModal.value = true;
  };

  /**
   * Confirm update (PATCH request)
   */
  const confirmUpdate = async (router: any) => {
    const updatedName = reviewName.value.trim();
    if (!updatedName || !editingChat.value) {
      error.value = 'Review name is required';
      return;
    }

    const payload: any = {
      name: updatedName,
    };

    // Include GitHub URL if it was changed
    if (reviewGithubURL.value.trim() !== editingChat.value.github_repo_url) {
      payload.github_repo_url = reviewGithubURL.value.trim();
    }

    isLoading.value = true;
    error.value = null;

    try {
      const response = await ApiService.patch(`/api/v2/chat/chat/${editingChat.value.id}/`, payload);
      if (response.status !== 200) {
        throw new Error('Failed to update chat');
      }
      const updatedChat = await response.data;
      
      // Update in chats list
      const index = chats.value.findIndex(chat => chat.id === updatedChat.id);
      if (index !== -1) {
        chats.value[index] = updatedChat;
      }
      
      // Update current chat if it's the same
      if (currentChat.value && currentChat.value.id === updatedChat.id) {
        currentChat.value = updatedChat;
      }
      
      router.push(`/review/${updatedChat.id}`);
      closeModal();
    } catch (err: any) {
      error.value = err.message || 'Error updating chat';
      console.error('Error updating chat:', err);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Delete a chat
   */
  const deleteReview = async (chat: any, router: any) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this review? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })

    if (!result.isConfirmed) return

    isLoading.value = true
    error.value = null

    try {
      const response = await ApiService.delete(`/api/v2/chat/chat/${chat.id}/`)

      if (response.status !== 204) {
        throw new Error('Failed to delete chat')
      }

      // Remove from chats list
      chats.value = chats.value.filter(c => c.id !== chat.id)

      // Clear current chat if it was deleted
      if (currentChat.value && currentChat.value.id === chat.id) {
        currentChat.value = null
      }

      await Swal.fire({
        title: 'Deleted!',
        text: 'The review has been deleted.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })

      router.push('/')
    } catch (err: any) {
      error.value = err.message || 'Error deleting chat'
      console.error('Error deleting chat:', err)

      await Swal.fire({
        title: 'Error!',
        text: error.value,
        icon: 'error'
      })
    } finally {
      isLoading.value = false
    }
  }
  /**
   * Set current chat (for navigation)
   */
  const setCurrentChat = async (chatId: string) => {
    const chat = chats.value.find(c => c.id === chatId);
    if (chat) {
      currentChat.value = chat;
      // Fetch latest status
      await getChatStatus(chatId);
    } else {
      // If chat not in list, fetch it directly
      try {
        const response = await ApiService.get(`/api/v2/chat/chat/${chatId}`);
          if (response.status === 200) {
          const chatData = await response.data;
          if (chatData.user === currentUser.value?.id) {
            currentChat.value = chatData;
            // Add to chats if not already there
            if (!chats.value.find(c => c.id === chatId)) {
              chats.value.push(chatData);
            }
            await getChatStatus(chatId);
          }
        }
      } catch (err) {
        console.error('Error fetching chat:', err);
      }
    }
  };

  /**
   * Close modal and reset form
   */
  const closeModal = () => {
    isShowModal.value = false;
    reviewName.value = '';
    reviewGithubURL.value = '';
    editingChat.value = null;
    isEditing.value = false;
    error.value = null;
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    isShowModal,
    reviewGithubURL,
    reviewName,
    chats,
    isEditing,
    editingChat,
    isLoading,
    error,
    currentChat,
    analysisStatus,
    repoOverview,
    
    // Computed
    currentUser,
    
    // Actions
    toggleShowModal,
    fetchChats,
    getChatStatus,
    addReview,
    updateReview,
    confirmUpdate,
    deleteReview,
    setCurrentChat,
    closeModal,
    clearError,
  };
});