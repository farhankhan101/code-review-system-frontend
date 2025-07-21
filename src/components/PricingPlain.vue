<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
    </div>

    <!-- Navigation -->
    <div class="relative z-10 p-4 lg:p-6">
      <router-link
        to="/"
        class="group inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-white/50 backdrop-blur-sm"
      >
        <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        <span class="font-medium">Go to Dashboard</span>
      </router-link>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
      <!-- Header Section -->
      <div class="text-center mb-12 lg:mb-16 animate-fade-in">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent mb-4">
          Choose Your Perfect Plan
        </h1>
        <p class="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Start with a free trial, no credit card required. Upgrade anytime to unlock premium features.
        </p>
      </div>

      <!-- Pricing Cards Container -->
      <div class="max-w-7xl mx-auto">
        <!-- Mobile & Small Tablets (< md) - Vertical Stack -->
        <div class="block md:hidden space-y-6">
          <div
            v-for="(plan, index) in plans"
            :key="plan.name"
            class="relative group"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div
              class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transition-all duration-500 hover:shadow-2xl hover:scale-105"
              :class="[
                plan.isCurrent ? 'ring-2 ring-blue-500 bg-blue-50/80' : '',
                plan.name === 'Professional' ? 'border-blue-200 shadow-blue-100' : ''
              ]"
            >
              <!-- Current Plan Badge -->
              <div v-if="plan.isCurrent" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                  Current Plan
                </span>
              </div>

              <!-- Popular Badge for Professional -->
              <div v-if="plan.name === 'Professional'" class="absolute -top-3 right-4">
                <span class="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  MOST POPULAR
                </span>
              </div>

              <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ plan.name }}</h3>
                <div class="flex items-end justify-center gap-1">
                  <span class="text-4xl font-extrabold text-gray-900">${{ plan.price }}</span>
                  <span class="text-gray-500 text-lg mb-1">/month</span>
                </div>
              </div>

              <ul class="space-y-3 mb-8">
                <li v-for="feature in plan.features" :key="feature" class="flex items-start">
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span class="text-gray-600 text-sm">{{ feature }}</span>
                </li>
              </ul>

              <button
                @click="selectPlan(plan)"
                class="w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                :class="[
                  plan.isCurrent
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : plan.name === 'Professional'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black shadow-lg hover:shadow-xl'
                ]"
              >
                {{ plan.isCurrent ? "Current Plan" : plan.buttonText }}
              </button>
            </div>
          </div>
        </div>

        <!-- Medium Screens (md to lg) - 2+1 Layout -->
        <div class="hidden md:block lg:hidden">
          <!-- First Row: 2 Cards -->
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div
              v-for="(plan, index) in plans.slice(0, 2)"
              :key="plan.name"
              class="relative group"
            >
              <div
                class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transition-all duration-500 hover:shadow-2xl hover:scale-105 h-full flex flex-col"
                :class="[
                  plan.isCurrent ? 'ring-2 ring-blue-500 bg-blue-50/80' : '',
                  plan.name === 'Professional' ? 'border-blue-200 shadow-blue-100' : ''
                ]"
              >
                <!-- Current Plan Badge -->
                <div v-if="plan.isCurrent" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                    Current Plan
                  </span>
                </div>

                <!-- Popular Badge -->
                <div v-if="plan.name === 'Professional'" class="absolute -top-3 right-4">
                  <span class="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>

                <div class="text-center mb-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ plan.name }}</h3>
                  <div class="flex items-end justify-center gap-1">
                    <span class="text-3xl font-extrabold text-gray-900">${{ plan.price }}</span>
                    <span class="text-gray-500 mb-1">/month</span>
                  </div>
                </div>

                <ul class="space-y-2 mb-6 flex-1">
                  <li v-for="feature in plan.features" :key="feature" class="flex items-start">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span class="text-gray-600 text-sm">{{ feature }}</span>
                  </li>
                </ul>

                <button
                  @click="selectPlan(plan)"
                  class="w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                  :class="[
                    plan.isCurrent
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : plan.name === 'Professional'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black shadow-lg hover:shadow-xl'
                  ]"
                >
                  {{ plan.isCurrent ? "Current Plan" : plan.buttonText }}
                </button>
              </div>
            </div>
          </div>

          <!-- Second Row: 1 Card Centered -->
          <div class="flex justify-center">
            <div class="w-1/2 relative group">
              <div
                class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transition-all duration-500 hover:shadow-2xl hover:scale-105"
                :class="[
                  plans[2].isCurrent ? 'ring-2 ring-blue-500 bg-blue-50/80' : '',
                ]"
              >
                <div v-if="plans[2].isCurrent" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                    Current Plan
                  </span>
                </div>

                <div class="text-center mb-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ plans[2].name }}</h3>
                  <div class="flex items-end justify-center gap-1">
                    <span class="text-3xl font-extrabold text-gray-900">${{ plans[2].price }}</span>
                    <span class="text-gray-500 mb-1">/month</span>
                  </div>
                </div>

                <ul class="space-y-2 mb-6">
                  <li v-for="feature in plans[2].features" :key="feature" class="flex items-start">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span class="text-gray-600 text-sm">{{ feature }}</span>
                  </li>
                </ul>

                <button
                  @click="selectPlan(plans[2])"
                  class="w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black shadow-lg hover:shadow-xl"
                >
                  {{ plans[2].buttonText }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Large Screens (lg+) - Horizontal Layout -->
        <div class="hidden lg:flex lg:gap-8 xl:gap-12 justify-center">
          <div
            v-for="(plan, index) in plans"
            :key="plan.name"
            class="relative group flex-1 max-w-sm"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div
              class="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 xl:p-10 shadow-lg border border-white/50 transition-all duration-500 hover:shadow-2xl hover:scale-105 flex flex-col"
              :class="[
                plan.isCurrent ? 'ring-2 ring-blue-500 bg-blue-50/80' : '',
                plan.name === 'Professional' ? 'border-blue-200 shadow-blue-100 transform scale-105' : ''
              ]"
            >
              <!-- Current Plan Badge -->
              <div v-if="plan.isCurrent" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg">
                  Current Plan
                </span>
              </div>

              <!-- Popular Badge for Professional -->
              <div v-if="plan.name === 'Professional'" class="absolute -top-4 right-6">
                <span class="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                  MOST POPULAR
                </span>
              </div>

              <div class="text-center mb-8">
                <h3 class="text-3xl font-bold text-gray-900 mb-4">{{ plan.name }}</h3>
                <div class="flex items-end justify-center gap-2">
                  <span class="text-6xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">${{ plan.price }}</span>
                  <span class="text-gray-500 text-xl mb-2">/month</span>
                </div>
              </div>

              <ul class="space-y-4 mb-10 flex-1">
                <li v-for="feature in plan.features" :key="feature" class="flex items-start">
                  <svg class="flex-shrink-0 w-6 h-6 text-green-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span class="ml-3 text-gray-600">{{ feature }}</span>
                </li>
              </ul>

              <button
                @click="selectPlan(plan)"
                class="w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                :class="[
                  plan.isCurrent
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : plan.name === 'Professional'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black shadow-xl hover:shadow-2xl'
                ]"
              >
                {{ plan.isCurrent ? "Current Plan" : plan.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-12 lg:mt-16 text-center">
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 max-w-2xl mx-auto shadow-lg border border-white/50">
          <p class="text-gray-700 font-medium mb-2">All plans include a 14-day free trial with full features</p>
          <p class="text-gray-600">No credit card required · Cancel anytime · 24/7 support</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PricingPage",
  data() {
    return {
      plans: [
        {
          name: "Starter",
          price: 0,
          features: [
            "Basic code reviews",
            "Public repositories",
            "Up to 3 team members",
            "5 monthly reviews",
            "Community support",
            "Basic analytics",
          ],
          buttonText: "Start Free Trial",
          isCurrent: true,
        },
        {
          name: "Professional",
          price: 29,
          features: [
            "Advanced code reviews",
            "Private repositories",
            "Up to 10 team members",
            "Unlimited reviews",
            "Priority support",
            "CI/CD integration",
            "Advanced analytics",
          ],
          buttonText: "Upgrade to Pro",
          isCurrent: false,
        },
        {
          name: "Enterprise",
          price: 99,
          features: [
            "All Pro features",
            "Unlimited team members",
            "Custom workflows",
            "24/7 premium support",
            "Audit logs",
            "Single sign-on (SSO)",
            "Custom SLAs",
          ],
          buttonText: "Contact Sales",
          isCurrent: false,
        },
      ],
    };
  },
  methods: {
    selectPlan(plan) {
      if (!plan.isCurrent) {
        console.log("Selected plan:", plan.name);
        // Handle plan selection logic
        alert(`Redirecting to ${plan.name} plan selection...`);
      }
    },
    goBack() {
      // Navigate back to previous route using Vue Router
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>