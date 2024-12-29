<template>
 <div class="flex flex-col justify-center items-center min-h-full bg-gray-100">
  <Welcome />
  <!-- <ChatTypeSelect /> -->
  <!-- <LangOrFrameWork /> -->
  <!-- <CodeEditor /> -->
  <!-- <ChoeseReview /> -->
  <Loading />
</div>

</template>

<script>
import { defineComponent, ref } from "vue";
import Welcome from "@/components/chat/Welcome.vue";
import ChatTypeSelect from "@/components/chat/ChatTypeSelect.vue";
import LangOrFrameWork from "@/components/chat/ChoeseLangugesOrFrameWork.vue";
import CodeEditor from "@/components/chat/CodeEditor.vue";
import ChoeseReview from "@/components/chat/ChoeseTypeReview.vue";
import Loading from "@/components/chat/Loading.vue";
export default defineComponent({
  components: {
    Welcome,
    ChatTypeSelect,
    LangOrFrameWork,
    CodeEditor,
    ChoeseReview,
    Loading
  },
  name: "About",
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>
