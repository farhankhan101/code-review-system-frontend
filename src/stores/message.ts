import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import DOMPurify from 'dompurify';

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

declare global {
  interface Window {
    responsiveVoice?: {
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

export const useMessageStore = defineStore("message", () => {
  const authStore = useAuthStore();
  const currentUser = computed(() => authStore.getUser());

  const messages = ref<Message[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isStreaming = ref(false);

  const isSpeaking = ref(false);
  const isPaused = ref(false);
  const currentSpeakingText = ref<string>("");
  const ttsSettings = ref({
    voice: "UK English Male",
    rate: 1.0,
    pitch: 1.0,
    volume: 0.8,
    autoSpeak: false,
  });

  const generateId = () => {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const initTTS = () => {
    if (typeof window !== "undefined") {
      if (window.responsiveVoice) {
        const apiKey = import.meta.env.VITE_RESPONSIVEVOICE_API_KEY;
        if (!apiKey) {
          console.warn(
            "ResponsiveVoice API key not found. Falling back to Web Speech API."
          );
          return "webspeech";
        }
        return "responsivevoice";
      }
      if ("speechSynthesis" in window) {
        return "webspeech";
      }
    }
    return false;
  };

  const cleanTextForTTS = (text: string): string => {
    if (!text) return "";

    return text
      .replace(/<[^>]*>/g, "")
      .replace(/```[\s\S]*?```/g, " [Code block] ")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/#{1,6}\s/g, "")
      .replace(/\n{2,}/g, ". ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\.\s*\./g, ".")
      .trim();
  };

  const getAvailableVoices = () => {
    const ttsType = initTTS();
    if (ttsType === "responsivevoice" && window.responsiveVoice) {
      return window.responsiveVoice.getVoices();
    } else if (ttsType === "webspeech") {
      return speechSynthesis.getVoices().map((voice) => ({
        name: voice.name,
        gender: voice.name.includes("Female") ? "female" : "male",
        lang: voice.lang,
      }));
    }
    return [];
  };

  const speakText = (
    text: string,
    options: {
      voice?: string;
      rate?: number;
      pitch?: number;
      volume?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (error: any) => void;
    } = {}
  ) => {
    try {
      const ttsType = initTTS();
      if (!ttsType) return false;

      if (isSpeaking.value) {
        stopSpeaking();
      }

      const cleanText = cleanTextForTTS(text);
      if (!cleanText) return false;

      const voiceSettings = {
        voice: options.voice || ttsSettings.value.voice,
        rate: options.rate ?? ttsSettings.value.rate,
        pitch: options.pitch ?? ttsSettings.value.pitch,
        volume: options.volume ?? ttsSettings.value.volume,
      };

      if (ttsType === "responsivevoice" && window.responsiveVoice) {
        const responsiveVoiceOptions = {
          rate: voiceSettings.rate,
          pitch: voiceSettings.pitch,
          volume: voiceSettings.volume,
          onstart: () => {
            isSpeaking.value = true;
            isPaused.value = false;
            currentSpeakingText.value = cleanText;
            options.onStart?.();
          },
          onend: () => {
            isSpeaking.value = false;
            isPaused.value = false;
            currentSpeakingText.value = "";
            options.onEnd?.();
          },
          onerror: (error: any) => {
            isSpeaking.value = false;
            isPaused.value = false;
            currentSpeakingText.value = "";
            options.onError?.(error);
          },
        };
        window.responsiveVoice.speak(
          cleanText,
          voiceSettings.voice,
          responsiveVoiceOptions
        );
      } else if (ttsType === "webspeech") {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = voiceSettings.rate;
        utterance.pitch = voiceSettings.pitch;
        utterance.volume = voiceSettings.volume;

        const voices = speechSynthesis.getVoices();
        const voice =
          voices.find((v) => v.name === voiceSettings.voice) || voices[0];
        if (voice) utterance.voice = voice;

        utterance.onstart = () => {
          isSpeaking.value = true;
          isPaused.value = false;
          currentSpeakingText.value = cleanText;
          options.onStart?.();
        };

        utterance.onend = () => {
          isSpeaking.value = false;
          isPaused.value = false;
          currentSpeakingText.value = "";
          options.onEnd?.();
        };

        utterance.onerror = (error) => {
          isSpeaking.value = false;
          isPaused.value = false;
          currentSpeakingText.value = "";
          options.onError?.(error);
        };

        speechSynthesis.speak(utterance);
      }

      return true;
    } catch (error) {
      isSpeaking.value = false;
      isPaused.value = false;
      return false;
    }
  };

  const stopSpeaking = () => {
    try {
      const ttsType = initTTS();
      if (ttsType === "responsivevoice" && window.responsiveVoice) {
        window.responsiveVoice.cancel();
      } else if (ttsType === "webspeech") {
        speechSynthesis.cancel();
      }
      isSpeaking.value = false;
      isPaused.value = false;
      currentSpeakingText.value = "";
    } catch (error) {
      console.error("Error stopping speech:", error);
    }
  };

  const pauseSpeaking = () => {
    try {
      const ttsType = initTTS();
      if (
        ttsType === "responsivevoice" &&
        window.responsiveVoice &&
        isSpeaking.value
      ) {
        window.responsiveVoice.pause();
        isPaused.value = true;
      } else if (ttsType === "webspeech" && isSpeaking.value) {
        speechSynthesis.pause();
        isPaused.value = true;
      }
    } catch (error) {
      console.error("Error pausing speech:", error);
    }
  };

  const resumeSpeaking = () => {
    try {
      const ttsType = initTTS();
      if (
        ttsType === "responsivevoice" &&
        window.responsiveVoice &&
        isPaused.value
      ) {
        window.responsiveVoice.resume();
        isPaused.value = false;
      } else if (ttsType === "webspeech" && isPaused.value) {
        speechSynthesis.resume();
        isPaused.value = false;
      }
    } catch (error) {
      console.error("Error resuming speech:", error);
    }
  };

  const toggleSpeech = (text: string) => {
    if (isSpeaking.value) {
      stopSpeaking();
    } else {
      speakText(text);
    }
  };

  const updateTTSSettings = (
    newSettings: Partial<typeof ttsSettings.value>
  ) => {
    ttsSettings.value = { ...ttsSettings.value, ...newSettings };

    const ttsType = initTTS();
    if (ttsType === "responsivevoice" && window.responsiveVoice) {
      if (newSettings.voice)
        window.responsiveVoice.setDefaultVoice(newSettings.voice);
      if (newSettings.rate !== undefined)
        window.responsiveVoice.setDefaultRate(newSettings.rate);
      if (newSettings.pitch !== undefined)
        window.responsiveVoice.setDefaultPitch(newSettings.pitch);
      if (newSettings.volume !== undefined)
        window.responsiveVoice.setDefaultVolume(newSettings.volume);
    }
  };

  const speakAIMessage = (
    message: string,
    options?: {
      skipIfSpeaking?: boolean;
      priority?: "high" | "normal";
    }
  ) => {
    const opts = { skipIfSpeaking: false, priority: "normal", ...options };

    if (opts.skipIfSpeaking && isSpeaking.value) {
      return false;
    }

    return speakText(message);
  };

  const fetchMessages = async (chatId: string) => {
    isLoading.value = true;
    error.value = null;
    messages.value = [];

    try {
      const response = await ApiService.query(
        `/api/v2/chat/message/?chat_id=${chatId}`,
        {}
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.data.results;
      messages.value = data.filter((msg: any) => msg.chat === chatId);
    } catch (err: any) {
      error.value = err.message || "Error fetching messages";
      console.error("Error fetching messages:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const sendMessage = async (
    chatId: string,
    messageText: string,
    codeContext: any = {}
  ) => {
    error.value = null;

    try {
      // Generate unique temporary IDs
      const tempUserId = `temp_user_${Date.now()}`;
      const tempAiId = `temp_ai_${Date.now()}`;

      // 1. Add user message immediately to UI
      const userMessage = {
        id: tempUserId,
        chat: chatId,
        sender: "U",
        message: messageText,
        timestamp: new Date().toISOString(),
        is_streaming: false,
      };

      messages.value.push(userMessage);

      // 2. Add AI placeholder message with streaming indicator
      const aiMessage = {
        id: tempAiId,
        chat: chatId,
        sender: "A",
        message: "",
        timestamp: new Date().toISOString(),
        is_streaming: true,
      };

      messages.value.push(aiMessage);
      isStreaming.value = true;

      // 3. Send API request
      const payload = {
        chat: chatId,
        message: messageText,
        code_context: codeContext,
      };

      const response = await ApiService.post(
        "/api/v2/chat/stream/message/",
        payload
      );

      if (response.status !== 200) {
        throw new Error("Failed to send message");
      }

      // 4. Handle response and replace temporary messages
      if (response.data && response.data.results) {
        // Remove temporary messages safely
        messages.value = messages.value.filter((m) => {
          const messageId = String(m.id); // Convert to string for comparison
          return messageId !== tempUserId && messageId !== tempAiId;
        });

        // Add real messages from server
        if (Array.isArray(response.data.results)) {
          messages.value.push(...response.data.results);
        } else {
          messages.value.push(response.data.results);
        }

        // Check if AI message is still streaming
        const lastMessage = messages.value[messages.value.length - 1];
        if (
          lastMessage &&
          lastMessage.sender === "A" &&
          lastMessage.is_streaming
        ) {
          // Start polling for updates
          startPolling(chatId, String(lastMessage.id));
        } else {
          isStreaming.value = false;
        }
      }
    } catch (err: any) {
      error.value = err.message || "Error sending message";
      console.error("Error sending message:", err);

      // Remove temporary AI message safely
      messages.value = messages.value.filter((m) => {
        const messageId = String(m.id);
        return messageId !== tempAiId;
      });

      // Mark user message with error
      const userMsg = messages.value.find((m) => {
        const messageId = String(m.id);
        return messageId === tempUserId;
      });
      if (userMsg) {
        userMsg.error = true;
      }

      isStreaming.value = false;
      throw err;
    }
  };

  // Polling function for streaming updates
  const pollForMessageUpdates = async (chatId: string, messageId: string) => {
    const maxAttempts = 60; // 1 minute max polling
    let attempts = 0;

    const poll = async () => {
      try {
        attempts++;

        // Find the message in our array
        const messageIndex = messages.value.findIndex(
          (m) => String(m.id) === String(messageId)
        );
        if (messageIndex === -1) return;

        const currentMessage = messages.value[messageIndex];
        if (!currentMessage.is_streaming) {
          isStreaming.value = false;
          return;
        }

        // Fetch latest messages for this chat
        const response = await ApiService.get(
          `/api/v2/chat/${chatId}/messages/`
        );

        if (response.data && response.data.results) {
          const updatedMessage = response.data.results.find(
            (msg: any) => String(msg.id) === String(messageId)
          );

          if (updatedMessage) {
            // Update the message
            messages.value[messageIndex] = {
              ...messages.value[messageIndex],
              ...updatedMessage,
            };

            // Continue polling if still streaming and haven't exceeded max attempts
            if (updatedMessage.is_streaming && attempts < maxAttempts) {
              setTimeout(poll, 2000); // Poll every 2 seconds
            } else {
              isStreaming.value = false;
            }
          }
        }
      } catch (error) {
        console.error("Error polling for message updates:", error);
        isStreaming.value = false;
      }
    };

    // Start polling after initial delay
    setTimeout(poll, 2000);
  };

  // Store polling intervals for cleanup
  const activePolls = new Set();

  // Enhanced polling with cleanup
  const startPolling = (chatId: string, messageId: string) => {
    const pollId = `${chatId}-${messageId}`;
    if (activePolls.has(pollId)) return; // Already polling this message

    activePolls.add(pollId);
    pollForMessageUpdates(chatId, messageId).finally(() => {
      activePolls.delete(pollId);
    });
  };

  // Stop all polling
  const stopAllPolling = () => {
    activePolls.clear();
    isStreaming.value = false;
  };
  const regenerateResponse = async (messageId: string) => {
    error.value = null;
    isStreaming.value = true;

    try {
      const response = await ApiService.post(
        `/api/v2/chat/message/${messageId}/regenerate/`,
        {}
      );

      const messageIndex = messages.value.findIndex(
        (msg) => msg.id === messageId
      );
      if (messageIndex !== -1) {
        messages.value[messageIndex] = {
          ...messages.value[messageIndex],
          is_streaming: true,
          message: "",
        };
      }

      const baseUrl = import.meta.env.VITE_APP_API_URL || "";
      const token = JwtService.getAccessToken();

      const eventSource = new EventSource(
        `${baseUrl}/api/v2/chat/stream/message/`
      );

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.message_id === messageId) {
            const msgIndex = messages.value.findIndex(
              (msg) => msg.id === messageId
            );
            if (msgIndex !== -1) {
              messages.value[msgIndex] = {
                ...messages.value[msgIndex],
                message: messages.value[msgIndex].message + data.content,
                is_streaming: !data.is_complete,
              };
            }

            if (data.is_complete) {
              eventSource.close();
              isStreaming.value = false;

              const completedMessage = messages.value.find(
                (msg) => msg.id === messageId
              );
              if (
                completedMessage &&
                completedMessage.message &&
                ttsSettings.value.autoSpeak
              ) {
                setTimeout(() => {
                  speakAIMessage(completedMessage.message, {
                    skipIfSpeaking: true,
                  });
                }, 500);
              }
            }
          }
        } catch (parseError) {
          console.error("Error parsing regeneration data:", parseError);
          eventSource.close();
          isStreaming.value = false;
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        isStreaming.value = false;
      };
    } catch (err: any) {
      error.value = err.message || "Error regenerating response";
      console.error("Error regenerating response:", err);
      isStreaming.value = false;
      throw err;
    }
  };

  const clearMessages = () => {
    messages.value = [];
    error.value = null;
    stopSpeaking();
  };

  return {
    messages,
    isLoading,
    isStreaming,
    error,
    isSpeaking,
    isPaused,
    currentSpeakingText,
    ttsSettings,
    fetchMessages,
    sendMessage,
    regenerateResponse,
    clearMessages,
    speakText,
    speakAIMessage,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    toggleSpeech,
    updateTTSSettings,
    getAvailableVoices,
    stopAllPolling,
    initTTS,
  };
});
