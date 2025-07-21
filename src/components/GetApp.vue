<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 relative"
  >
    <!-- Close Button (X) on Top Right -->
    <router-link
      to="/"
      class="flex gap-1 cursor-pointer items-center absolute top-2 left-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
    >
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
    </svg>
      Go to Dashboard
    </router-link>

    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="flex flex-col md:flex-row">
        <!-- Left Column - App Preview -->
        <div
          class="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 p-12 flex items-center justify-center"
        >
          <div
            class="relative w-64 h-96 bg-white/10 rounded-3xl shadow-2xl backdrop-blur-sm"
          >
            <div
              class="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full"
            ></div>
            <div class="pt-16 px-6">
              <div class="h-48 bg-white/20 rounded-xl mb-4"></div>
              <div class="space-y-3">
                <div class="h-3 bg-white/30 rounded-full w-4/5"></div>
                <div class="h-3 bg-white/30 rounded-full w-3/4"></div>
                <div class="h-3 bg-white/30 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Content -->
        <div class="md:w-1/2 p-12 flex flex-col gap-8">
          <div>
            <h2 class="text-4xl font-bold text-gray-900 mb-4">
              Transform Your Code Reviews
            </h2>
            <p class="text-lg text-gray-600 mb-8">
              Experience seamless code collaboration with our mobile app. Available on all
              major platforms.
            </p>
          </div>

          <!-- Feature List in Flex with Gap -->
          <div class="flex flex-col gap-4">
            <div
              v-for="feature in features"
              :key="feature"
              class="flex items-center gap-3"
            >
              <div
                class="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span class="text-gray-700">{{ feature }}</span>
            </div>
          </div>

          <!-- Download Buttons in Flex Row with Gap -->
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              class="flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg
                class="w-6 h-6 text-white mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.687-1.497 3.717-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.049-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701"
                />
              </svg>
              <div class="text-left">
                <p class="text-xs text-gray-300">Download on the</p>
                <p class="text-white font-semibold">App Store</p>
              </div>
            </a>

            <a
              href="#"
              class="flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg
                class="w-6 h-6 text-white mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 20.29v.3c0 .39.317.71.706.71h16.588c.39 0 .706-.32.706-.71 0-.39-.317-.71-.706-.71H3.706c-.39 0-.706.32-.706.71zm16.355-7.403c-.484-.483-1.127-.748-1.81-.748H18.5V5.62c0-1.405-1.132-2.55-2.524-2.55H5.024C3.632 3.07 2.5 4.215 2.5 5.62v6.52c0 1.394 1.132 2.538 2.524 2.538h10.59c.684 0 1.326-.266 1.81-.749l1.93-1.916z"
                />
              </svg>
              <div class="text-left">
                <p class="text-xs text-gray-300">Get it on</p>
                <p class="text-white font-semibold">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        "Real-time code collaboration",
        "Instant review notifications",
        "Offline access to repositories",
        "Secure code sharing",
        "Integrated CI/CD monitoring",
        "Team management tools",
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
