<template>
    <div v-if="isLoading" class="loading-overlay">
      <div class="blob-container">
        <img src="../../assets/loading1.gif" class="w-full h-full" alt="">
        <div class="loading-text">{{ loadingPercentage }}%</div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  
  export default {
    name: "BlobLoading",
    setup() {
      const isLoading = ref(true);
      const loadingPercentage = ref(0);
      const waveHeight = ref(0);
  
      const blobPath = ref(
        "M44.7,-59.6C59.7,-46.5,72.3,-33,73.6,-18.6C74.9,-4.2,64.8,11.1,54.4,25.2C44.1,39.3,33.5,52.1,20.1,58.4C6.7,64.7,-9.5,64.4,-25.2,58.3C-40.9,52.2,-56,40.3,-63.4,25.8C-70.7,11.4,-70.3,-5.6,-63.1,-18.5C-55.8,-31.5,-41.7,-40.3,-27.8,-53.2C-14,-66,-7,-83,5.5,-89.4C18,-95.8,36,-91.8,44.7,-59.6Z"
      );
  
      const updateLoading = () => {
        let percentage = 0;
        const interval = setInterval(() => {
          if (percentage >= 100) {
            clearInterval(interval);
            isLoading.value = false;
          } else {
            percentage += 1;
            loadingPercentage.value = percentage;
            waveHeight.value = (percentage / 100) * 200;
          }
        }, 50);
      };
  
      onMounted(() => {
        updateLoading();
      });
  
      return {
        isLoading,
        loadingPercentage,
        waveHeight,
        blobPath,
      };
    },
  };
  </script>
  
  <style scoped>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .blob-container {
    position: relative;
    width: 350px;
    height: 210px;
  }
  
  svg {
    width: 100%;
    height: 100%;
  }
  
  .loading-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }
  </style>
  