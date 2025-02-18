<template>
  <div class="flex flex-col justify-center items-center min-h-full bg-gray-100">
    <component
      :is="steps[currentStep]"
      @next-step="goToNextStep"
      @perform-task="performTask"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CodeEditor from "@/components/chat/CodeEditor.vue";
import ChoeseReview from "@/components/chat/ChoeseTypeReview.vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    CodeEditor,
    ChoeseReview,
  },
  setup() {
    const currentStep = ref(0);

    const steps = [
      CodeEditor,
      ChoeseReview,
    ];

    const goToNextStep = () => {
      if (currentStep.value < steps.length - 1) {
        currentStep.value += 1;
      }
    };

    const performTask = (taskData: any) => {
      console.log("Performing specific task:", taskData);
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
