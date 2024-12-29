<template>
  <div class="flex flex-col justify-center items-center min-h-full bg-gray-100">
    <!-- Render the current step -->
    <component
      :is="steps[currentStep]"
      @next-step="goToNextStep"
      @perform-task="performTask"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// Import all step components
import Welcome from "@/components/chat/Welcome.vue";
import ChatTypeSelect from "@/components/chat/ChatTypeSelect.vue";
import LangOrFrameWork from "@/components/chat/ChoeseLangugesOrFrameWork.vue";
import CodeEditor from "@/components/chat/CodeEditor.vue";
import ChoeseReview from "@/components/chat/ChoeseTypeReview.vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    Welcome,
    ChatTypeSelect,
    LangOrFrameWork,
    CodeEditor,
    ChoeseReview,
  },
  setup() {
    // Track the current step
    const currentStep = ref(0);

    // Define all steps in order
    const steps = [
      Welcome,
      ChatTypeSelect,
      LangOrFrameWork,
      CodeEditor,
      ChoeseReview,
    ];

    // Move to the next step
    const goToNextStep = () => {
      if (currentStep.value < steps.length - 1) {
        currentStep.value += 1;
      }
    };

    // Perform a specific task if needed
    const performTask = (taskData: any) => {
      console.log("Performing specific task:", taskData);
      // Add any specific logic for this step
    };

    return {
      currentStep,
      steps,
      goToNextStep,
      performTask,
    };
  },
});
</script>
