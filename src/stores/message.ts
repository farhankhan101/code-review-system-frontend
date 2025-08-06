import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import ApiService from '@/core/services/ApiService';
import JwtService from "@/core/services/JwtService";

export interface Message {
  id: string;
  chat: string;
  message: string;
  sender: string;
  created: string;
  is_streaming: boolean;
  updated?: string;
  user?: number;
  code_context?: object;
  message_metadata?: any;
  sender_display?: string;
  error?: boolean;
  metadata?: any;
}

// Declare ResponsiveVoice types
declare global {
  interface Window {
    responsiveVoice: {
      speak: (text: string, voice?: string, options?: any) => void;
      cancel: () => void;
      pause: () => void;
      resume: () => void;
      isPlaying: () => boolean;
      getVoices: () => Array<{ name: string; gender: string; lang: string }>;
      setDefaultVoice: (voice: string) => void;
      setDefaultRate: (rate: number) => void;
      setDefaultPitch: (pitch: number) => void;
      setDefaultVolume: (volume: number) => void;
    };
  }
}

export const useMessageStore = defineStore('message', () => {
  const authStore = useAuthStore();
  const currentUser = computed(() => authStore.getUser());

  // State for messages, loading flag, and error messages
  const messages = ref<Message[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isStreaming = ref(false);

  // Enhanced TTS state with ResponsiveVoice
  const isSpeaking = ref(false);
  const isPaused = ref(false);
  const currentSpeakingText = ref<string>('');
  const ttsSettings = ref({
    voice: 'UK English Male', // Default voice
    rate: 1.0,    // Speed (0.1 to 1.5)
    pitch: 1.0,   // Pitch (0 to 2)
    volume: 0.8,  // Volume (0 to 1)
    autoSpeak: false, // Auto-speak AI responses
  });

  // Helper function to generate unique IDs
  const generateId = () => {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Initialize ResponsiveVoice
  const initTTS = () => {
    if (typeof window !== 'undefined' && window.responsiveVoice) {
      console.log('ResponsiveVoice initialized');
      return true;
    }
    return false;
  };

  // Clean text for TTS (remove HTML, markdown, code blocks)
  const cleanTextForTTS = (text: string): string => {
    if (!text) return '';
    
    return text
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Replace code blocks with placeholder
      .replace(/```[\s\S]*?```/g, ' [Code block] ')
      // Remove inline code backticks
      .replace(/`([^`]+)`/g, '$1')
      // Remove markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s/g, '')
      // Replace multiple newlines with periods
      .replace(/\n{2,}/g, '. ')
      // Replace single newlines with spaces
      .replace(/\n/g, ' ')
      // Remove extra spaces
      .replace(/\s+/g, ' ')
      // Clean up punctuation
      .replace(/\.\s*\./g, '.')
      .trim();
  };

  /**
   * Get available ResponsiveVoice voices
   */
  const getAvailableVoices = () => {
    if (!initTTS()) return [];
    return window.responsiveVoice.getVoices();
  };

  /**
   * Speak text using ResponsiveVoice
   */
  const speakText = (text: string, options: {
    voice?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: any) => void;
  } = {}) => {
    try {
      if (!initTTS()) {
        console.error('ResponsiveVoice not available. Please check if the library is loaded.');
        return false;
      }

      // Stop any current speech
      if (isSpeaking.value) {
        stopSpeaking();
      }

      const cleanText = cleanTextForTTS(text);
      if (!cleanText) {
        console.warn('No text to speak after cleaning');
        return false;
      }

      // Merge settings with options
      const voiceSettings = {
        voice: options.voice || ttsSettings.value.voice,
        rate: options.rate ?? ttsSettings.value.rate,
        pitch: options.pitch ?? ttsSettings.value.pitch,
        volume: options.volume ?? ttsSettings.value.volume,
      };

      // ResponsiveVoice options
      const responsiveVoiceOptions = {
        rate: voiceSettings.rate,
        pitch: voiceSettings.pitch,
        volume: voiceSettings.volume,
        onstart: () => {
          isSpeaking.value = true;
          isPaused.value = false;
          currentSpeakingText.value = cleanText;
          console.log('TTS started');
          options.onStart?.();
        },
        onend: () => {
          isSpeaking.value = false;
          isPaused.value = false;
          currentSpeakingText.value = '';
          console.log('TTS ended');
          options.onEnd?.();
        },
        onerror: (error: any) => {
          isSpeaking.value = false;
          isPaused.value = false;
          currentSpeakingText.value = '';
          console.error('TTS error:', error);
          options.onError?.(error);
        }
      };

      // Start speaking
      window.responsiveVoice.speak(cleanText, voiceSettings.voice, responsiveVoiceOptions);
      return true;

    } catch (error) {
      console.error('Error in text-to-speech:', error);
      isSpeaking.value = false;
      isPaused.value = false;
      return false;
    }
  };

  /**
   * Stop current speech
   */
  const stopSpeaking = () => {
    try {
      if (initTTS()) {
        window.responsiveVoice.cancel();
      }
      isSpeaking.value = false;
      isPaused.value = false;
      currentSpeakingText.value = '';
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  };

  /**
   * Pause current speech
   */
  const pauseSpeaking = () => {
    try {
      if (initTTS() && isSpeaking.value) {
        window.responsiveVoice.pause();
        isPaused.value = true;
      }
    } catch (error) {
      console.error('Error pausing speech:', error);
    }
  };

  /**
   * Resume paused speech
   */
  const resumeSpeaking = () => {
    try {
      if (initTTS() && isPaused.value) {
        window.responsiveVoice.resume();
        isPaused.value = false;
      }
    } catch (error) {
      console.error('Error resuming speech:', error);
    }
  };

  /**
   * Toggle speech for a message
   */
  const toggleSpeech = (text: string) => {
    if (isSpeaking.value) {
      stopSpeaking();
    } else {
      speakText(text);
    }
  };

  /**
   * Update TTS settings
   */
  const updateTTSSettings = (newSettings: Partial<typeof ttsSettings.value>) => {
    ttsSettings.value = { ...ttsSettings.value, ...newSettings };
    
    // Update ResponsiveVoice default settings
    if (initTTS()) {
      if (newSettings.voice) window.responsiveVoice.setDefaultVoice(newSettings.voice);
      if (newSettings.rate !== undefined) window.responsiveVoice.setDefaultRate(newSettings.rate);
      if (newSettings.pitch !== undefined) window.responsiveVoice.setDefaultPitch(newSettings.pitch);
      if (newSettings.volume !== undefined) window.responsiveVoice.setDefaultVolume(newSettings.volume);
    }
  };

  /**
   * Speak AI message with enhanced options
   */
  const speakAIMessage = (message: string, options?: { 
    skipIfSpeaking?: boolean;
    priority?: 'high' | 'normal';
  }) => {
    const opts = { skipIfSpeaking: false, priority: 'normal', ...options };
    
    if (opts.skipIfSpeaking && isSpeaking.value) {
      return false;
    }

    return speakText(message, {
      onStart: () => console.log('Speaking AI message'),
      onEnd: () => console.log('Finished speaking AI message'),
    });
  };

  /**
   * Fetch messages for a given chat.
   */
  const fetchMessages = async (chatId: string) => {
    isLoading.value = true;
    error.value = null;
    messages.value = [];
    
    try {
      const response = await ApiService.query(`/api/v2/chat/message/?chat_id=${chatId}`,{});
      console.log("Messages from APi",response)
      if (response.status !== 200) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.data.results;
      console.log(data)
      messages.value = data.filter((msg: any) => msg.chat === chatId);
    } catch (err: any) {
      error.value = err.message || 'Error fetching messages';
      console.error('Error fetching messages:', err);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Send a new message with streaming response.
   */
  const sendMessage = async (chatId: string, messageText: string, codeContext: any = {}) => {
    error.value = null;
    isStreaming.value = true;

    try {
      // const userMessage: Message = {
      //   id: generateId(),
      //   chat: chatId,
      //   message: messageText,
      //   sender: 'U',
      //   user: currentUser.value.id,
      //   created: new Date().toISOString(),
      //   is_streaming: false
      // };
      // messages.value.push(userMessage);

      // const aiMessage: Message = {
      //   id: generateId(),
      //   chat: chatId,
      //   message: '',
      //   sender: 'A',
      //   created: new Date().toISOString(),
      //   is_streaming: true
      // };
      // messages.value.push(aiMessage);

      const payload = {
        chat: chatId,
        message: messageText,
        code_context: codeContext
      };

      const response = await ApiService.post('/api/v2/chat/stream/message/', payload);
      console.log('Response message',response)
      if (response.status !== 200 ) {
        throw new Error('Failed to send message');
      }
      messages.value.push(response.data.results);
      

      // const baseUrl = import.meta.env.VITE_APP_API_URL || '';
      // const token = JwtService.getAccessToken();
      
      // const eventSource = new EventSource(`${baseUrl}/api/v2/chat/stream/message`);

      // eventSource.onmessage = (event) => {
      //   try {
      //     const data = JSON.parse(event.data);
          
      //     if (data.error) {
      //       console.error('Streaming error:', data.error);
      //       error.value = data.error;
      //       eventSource.close();
      //       isStreaming.value = false;
      //       return;
      //     }

      //     const aiMessageIndex = messages.value.findIndex(msg => msg.id === aiMessage.id);
      //     if (aiMessageIndex !== -1) {
      //       messages.value[aiMessageIndex] = {
      //         ...messages.value[aiMessageIndex],
      //         id: data.message_id || aiMessage.id,
      //         message: messages.value[aiMessageIndex].message + data.content,
      //         is_streaming: !data.is_complete
      //       };
      //     }

      //     if (data.is_complete) {
      //       eventSource.close();
      //       isStreaming.value = false;
            
      //       if (data.metadata) {
      //         const finalMessageIndex = messages.value.findIndex(msg => msg.id === data.message_id);
      //         if (finalMessageIndex !== -1) {
      //           messages.value[finalMessageIndex] = {
      //             ...messages.value[finalMessageIndex],
      //             is_streaming: false,
      //             metadata: data.metadata
      //           };
      //         }
      //       }

      //       // Auto-speak AI response if enabled
      //       const completedMessage = messages.value.find(msg => msg.id === data.message_id);
      //       if (completedMessage && 
      //           completedMessage.message && 
      //           ttsSettings.value.autoSpeak) {
      //         setTimeout(() => {
      //           speakAIMessage(completedMessage.message, { skipIfSpeaking: true });
      //         }, 500);
      //       }
      //     }
      //   } catch (parseError) {
      //     console.error('Error parsing streaming data:', parseError);
      //     error.value = 'Error parsing streaming response';
      //     eventSource.close();
      //     isStreaming.value = false;
      //   }
      // };

      // eventSource.onerror = (streamError) => {
      //   console.error('EventSource error:', streamError);
      //   error.value = 'Streaming connection error';
      //   eventSource.close();
      //   isStreaming.value = false;
        
      //   const aiMessageIndex = messages.value.findIndex(msg => msg.id === aiMessage.id);
      //   if (aiMessageIndex !== -1) {
      //     messages.value[aiMessageIndex] = {
      //       ...messages.value[aiMessageIndex],
      //       is_streaming: false,
      //       message: 'Failed to get response. Please try again.',
      //       error: true
      //     };
      //   }
      // };

      return;
    } catch (err: any) {
      error.value = err.message || 'Error sending message';
      console.error('Error sending message:', err);
      isStreaming.value = false;
      
      const lastMessage = messages.value[messages.value.length - 1];
      if (lastMessage && lastMessage.sender === 'A' && lastMessage.is_streaming) {
        messages.value.pop();
      }
      throw err;
    }
  };

  /**
   * Regenerate AI response for a specific message.
   */
  const regenerateResponse = async (messageId: string) => {
    error.value = null;
    isStreaming.value = true;

    try {
      const response = await ApiService.post(`/api/v2/chat/message/${messageId}/regenerate/`, {});

      const messageIndex = messages.value.findIndex(msg => msg.id === messageId);
      if (messageIndex !== -1) {
        messages.value[messageIndex] = {
          ...messages.value[messageIndex],
          is_streaming: true,
          message: ''
        };
      }

      const baseUrl = import.meta.env.VITE_APP_API_URL || '';
      const token = JwtService.getAccessToken();
      
      const eventSource = new EventSource(`${baseUrl}/api/v2/chat/stream/message/`);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.message_id === messageId) {
            const msgIndex = messages.value.findIndex(msg => msg.id === messageId);
            if (msgIndex !== -1) {
              messages.value[msgIndex] = {
                ...messages.value[msgIndex],
                message: messages.value[msgIndex].message + data.content,
                is_streaming: !data.is_complete
              };
            }

            if (data.is_complete) {
              eventSource.close();
              isStreaming.value = false;
              
              // Auto-speak regenerated response if enabled
              const completedMessage = messages.value.find(msg => msg.id === messageId);
              if (completedMessage && 
                  completedMessage.message && 
                  ttsSettings.value.autoSpeak) {
                setTimeout(() => {
                  speakAIMessage(completedMessage.message, { skipIfSpeaking: true });
                }, 500);
              }
            }
          }
        } catch (parseError) {
          console.error('Error parsing regeneration data:', parseError);
          eventSource.close();
          isStreaming.value = false;
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        isStreaming.value = false;
      };

    } catch (err: any) {
      error.value = err.message || 'Error regenerating response';
      console.error('Error regenerating response:', err);
      isStreaming.value = false;
      throw err;
    }
  };

  /**
   * Clear all messages.
   */
  const clearMessages = () => {
    messages.value = [];
    error.value = null;
    stopSpeaking();
  };

  return {
    // State
    messages,
    isLoading,
    isStreaming,
    error,
    
    // TTS State
    isSpeaking,
    isPaused,
    currentSpeakingText,
    ttsSettings,
    
    // Message functions
    fetchMessages,
    sendMessage,
    regenerateResponse,
    clearMessages,
    
    // TTS Functions
    speakText,
    speakAIMessage,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    toggleSpeech,
    updateTTSSettings,
    getAvailableVoices,
    initTTS,
  };
});