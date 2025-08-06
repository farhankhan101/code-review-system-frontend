<template>
  <div class="min-h-screen bg-white text-black">
    <!-- Back Arrow -->
    <div class="pt-4 px-4 sm:pt-6 sm:px-6">
      <button
        @click="goToDashboard"
        class="flex items-center gap-2 text-gray-700 hover:text-custom-purple transition-colors duration-200 group"
      >
        <svg
          class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span class="font-medium">Back to Dashboard</span>
      </button>
    </div>

    <!-- Main Content - Full Width -->
    <div class="px-4 py-6 sm:px-6 sm:py-8 w-full">
      <!-- Page Title -->
      <div class="mb-8 sm:mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-black mb-2">Profile Settings</h1>
        <p class="text-gray-600 text-base sm:text-lg">
          Manage your personal information and account settings
        </p>
      </div>

      <!-- Profile Form -->
      <form @submit.prevent="handleSaveProfile" class="space-y-6 sm:space-y-8">
        <!-- Profile Picture Section -->
        <div
          class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-gray-200"
        >
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 bg-blue-400 rounded-full flex items-center justify-center shadow-lg mx-auto sm:mx-0"
          >
            <span class="text-2xl sm:text-3xl font-bold  text-white">
              {{ getInitials() }}
            </span>
          </div>
          <div class="text-center sm:text-left">
            <h3 class="text-lg sm:text-xl font-semibold text-black mb-1">
              Profile 
            </h3>
            <p class="text-xs sm:text-sm text-gray-500">
              Profile picture updates automatically based on your name
            </p>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="space-y-4 sm:space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 class="text-xl sm:text-2xl font-semibold text-black mb-1">
                Personal Information
              </h2>
              <p class="text-gray-600 text-sm sm:text-base">
                Update your personal details
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <!-- <button
                type="button"
                @click="toggleEditMode"
                class="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-custom-purple text-custom-purple rounded-lg hover:bg-purple-50 transition-all duration-200 shadow-sm text-sm sm:text-base"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                {{ isEditing ? "Cancel" : "Edit" }}
              </button> -->
              <!-- <button
                type="button"
                @click="openChangePasswordDialog"
                class="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm text-sm sm:text-base"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Change Password
              </button> -->
            </div>
          </div>

          <!-- Form Fields Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <!-- Username (Read-only) -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                <svg
                  class="w-4 h-4 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Username
              </label>
              <input
                v-model="profileData.username"
                type="text"
                disabled
                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed transition-all duration-200 shadow-sm text-sm sm:text-base"
                placeholder="Username"
              />
              <p class="text-xs text-gray-500">Username cannot be changed</p>
            </div>

            <!-- Email (Read-only) -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                <svg
                  class="w-4 h-4 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                Email Address
              </label>
              <input
                v-model="profileData.email"
                type="email"
                disabled
                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed transition-all duration-200 shadow-sm text-sm sm:text-base"
                placeholder="Email address"
              />
              <p class="text-xs text-gray-500">Email address cannot be changed</p>
            </div>

            <!-- First Name -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                <svg
                  class="w-4 h-4 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                First Name
              </label>
              <input
                v-model="profileData.firstName"
                type="text"
                :disabled="!isEditing"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-purple focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-sm sm:text-base"
                placeholder="Enter first name"
              />
            </div>

            <!-- Last Name -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                <svg
                  class="w-4 h-4 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Last Name
              </label>
              <input
                v-model="profileData.lastName"
                type="text"
                :disabled="!isEditing"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-purple focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-sm sm:text-base"
                placeholder="Enter last name"
              />
            </div>

            <!-- Mobile Number -->
            <div class="lg:col-span-2 space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                <svg
                  class="w-4 h-4 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Mobile Number
              </label>
              <input
                v-model="profileData.mobileNumber"
                type="tel"
                :disabled="!isEditing"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-purple focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-sm sm:text-base"
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          <!-- Save Button -->
          <div v-if="isEditing" class="flex justify-end pt-4 sm:pt-6">
            <button
              type="submit"
              :disabled="isSaving"
              class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-custom-purple text-white font-medium rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-sm sm:text-base"
            >
              <svg
                v-if="!isSaving"
                class="w-5 h-5"
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
              <svg v-else class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                  fill="none"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>{{ isSaving ? "Saving Changes..." : "Save Changes" }}</span>
            </button>
          </div>
        </div>
      </form>

      <!-- Success/Error Messages -->
      <div
        v-if="message"
        class="mt-4 sm:mt-6 p-4 rounded-lg flex items-start gap-3 shadow-sm text-sm sm:text-base"
        :class="
          messageType === 'success'
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        "
      >
        <svg
          v-if="messageType === 'success'"
          class="w-5 h-5 flex-shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5 flex-shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ message }}</span>
      </div>
    </div>

    <!-- Enhanced Change Password Modal -->
    <div
      v-if="showPasswordDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeChangePasswordDialog"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl sm:text-2xl font-semibold text-black">Change Password</h3>
          <button
            @click="closeChangePasswordDialog"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleChangePassword" class="space-y-5">
          <!-- Current Password -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Current Password</label
            >
            <div class="relative">
              <input
                v-model="passwordData.currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-purple focus:border-transparent transition-all duration-200 shadow-sm text-sm sm:text-base"
                placeholder="Enter current password"
              />
              <button
                type="button"
                @click="showCurrentPassword = !showCurrentPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="showCurrentPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m7.878-7.878L21 21"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- New Password -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">New Password</label>
            <div class="relative">
              <input
                v-model="passwordData.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                required
                @input="validatePasswordStrength"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-purple focus:border-transparent transition-all duration-200 shadow-sm text-sm sm:text-base"
                placeholder="Enter new password"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="showNewPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m7.878-7.878L21 21"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>

            <!-- Password Strength Indicator -->
            <div v-if="passwordData.newPassword" class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-600">Password strength:</span>
                <span
                  class="text-sm font-medium"
                  :class="{
                    'text-red-600': passwordStrength.score < 2,
                    'text-yellow-600': passwordStrength.score === 2,
                    'text-green-600': passwordStrength.score > 2,
                  }"
                >
                  {{ passwordStrength.label }}
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all duration-300"
                  :class="{
                    'bg-red-500': passwordStrength.score < 2,
                    'bg-yellow-500': passwordStrength.score === 2,
                    'bg-green-500': passwordStrength.score > 2,
                  }"
                  :style="{ width: (passwordStrength.score + 1) * 25 + '%' }"
                ></div>
              </div>

              <!-- Password Requirements -->
              <div class="space-y-1 text-xs">
                <div
                  class="flex items-center gap-2"
                  :class="passwordValidation.length ? 'text-green-600' : 'text-gray-500'"
                >
                  <svg
                    class="w-3 h-3"
                    :class="
                      passwordValidation.length ? 'text-green-600' : 'text-gray-400'
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  At least 8 characters
                </div>
                <div
                  class="flex items-center gap-2"
                  :class="
                    passwordValidation.uppercase ? 'text-green-600' : 'text-gray-500'
                  "
                >
                  <svg
                    class="w-3 h-3"
                    :class="
                      passwordValidation.uppercase ? 'text-green-600' : 'text-gray-400'
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  One uppercase letter
                </div>
                <div
                  class="flex items-center gap-2"
                  :class="
                    passwordValidation.lowercase ? 'text-green-600' : 'text-gray-500'
                  "
                >
                  <svg
                    class="w-3 h-3"
                    :class="
                      passwordValidation.lowercase ? 'text-green-600' : 'text-gray-400'
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  One lowercase letter
                </div>
                <div
                  class="flex items-center gap-2"
                  :class="passwordValidation.number ? 'text-green-600' : 'text-gray-500'"
                >
                  <svg
                    class="w-3 h-3"
                    :class="
                      passwordValidation.number ? 'text-green-600' : 'text-gray-400'
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  One number
                </div>
                <div
                  class="flex items-center gap-2"
                  :class="passwordValidation.special ? 'text-green-600' : 'text-gray-500'"
                >
                  <svg
                    class="w-3 h-3"
                    :class="
                      passwordValidation.special ? 'text-green-600' : 'text-gray-400'
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  One special character
                </div>
              </div>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Confirm Password</label
            >
            <div class="relative">
              <input
                v-model="passwordData.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                @input="validatePasswordMatch"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-purple focus:border-transparent transition-all duration-200 shadow-sm text-sm sm:text-base"
                :class="{
                  'border-red-300 focus:ring-red-500':
                    passwordData.confirmPassword && !passwordsMatch,
                  'border-green-300 focus:ring-green-500':
                    passwordData.confirmPassword && passwordsMatch,
                }"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="showConfirmPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m7.878-7.878L21 21"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>

            <!-- Password Match Indicator -->
            <div
              v-if="passwordData.confirmPassword"
              class="flex items-center gap-2 text-xs"
            >
              <svg
                v-if="passwordsMatch"
                class="w-3 h-3 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                class="w-3 h-3 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              <span :class="passwordsMatch ? 'text-green-600' : 'text-red-600'">
                {{ passwordsMatch ? "Passwords match" : "Passwords do not match" }}
              </span>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="passwordError"
            class="p-3 bg-red-50 text-red-800 rounded-lg text-sm border border-red-200 flex items-start gap-2"
          >
            <svg
              class="w-4 h-4 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ passwordError }}
          </div>

          <!-- Submit Buttons -->
          <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              @click="closeChangePasswordDialog"
              class="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isChangingPassword || !isPasswordFormValid"
              class="flex items-center justify-center gap-2 px-6 py-2 bg-custom-purple text-white font-medium rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-sm sm:text-base"
            >
              <svg
                v-if="!isChangingPassword"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <svg v-else class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                  fill="none"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>{{ isChangingPassword ? "Changing..." : "Change Password" }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";

// Router setup
const router = useRouter();

// Store setup
const store = useAuthStore();

// Component state
const isEditing = ref(false);
const isSaving = ref(false);
const showPasswordDialog = ref(false);
const isChangingPassword = ref(false);
const message = ref("");
const messageType = ref("");
const passwordError = ref("");

// Password visibility toggles
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Profile data
const profileData = reactive({
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  mobileNumber: "",
});

// Password change data
const passwordData = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Password validation state
const passwordValidation = reactive({
  length: false,
  uppercase: false,
  lowercase: false,
  number: false,
  special: false,
});

const passwordStrength = reactive({
  score: 0,
  label: "Weak",
});

// Computed properties
const getInitials = () => {
  const firstName = profileData.firstName || "";
  const lastName = profileData.lastName || "";
  const username = profileData.username || "";

  if (firstName && lastName) {
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  } else if (firstName) {
    return firstName.charAt(0).toUpperCase();
  } else if (username) {
    return username.charAt(0).toUpperCase();
  }
  return "U";
};

const passwordsMatch = computed(() => {
  return (
    passwordData.newPassword === passwordData.confirmPassword &&
    passwordData.confirmPassword !== ""
  );
});

const isPasswordFormValid = computed(() => {
  return (
    passwordData.currentPassword &&
    passwordData.newPassword &&
    passwordData.confirmPassword &&
    passwordsMatch.value &&
    passwordStrength.value.score >= 2 &&
    Object.values(passwordValidation).every((v) => v)
  );
});

// Methods
const goToDashboard = () => {
  router.push("/");
};

const loadProfileData = async () => {
  try {
    await store.fetchUserData();
    const user = store.user;

    if (user) {
      profileData.username = user.username || "";
      profileData.email = user.email || "";
      profileData.firstName = user.first_name || user.firstName || "";
      profileData.lastName = user.last_name || user.lastName || "";
      profileData.mobileNumber =
        user.mobile_number || user.mobileNumber || user.phone || "";
    }
  } catch (error) {
    console.error("Error loading profile data:", error);
    showMessage("Error loading profile data", "error");
  }
};

const toggleEditMode = () => {
  if (isEditing.value) {
    loadProfileData();
  }
  isEditing.value = !isEditing.value;
  clearMessage();
};

const handleSaveProfile = async () => {
  isSaving.value = true;
  clearMessage();

  try {
    const updateData = {
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      mobile_number: profileData.mobileNumber,
    };

    await ApiService.put("/api/v2/user/profile/", updateData);
    await store.fetchUserData();

    isEditing.value = false;
    showMessage("Profile updated successfully!", "success");
  } catch (error) {
    console.error("Error updating profile:", error);
    showMessage("Error updating profile. Please try again.", "error");
  } finally {
    isSaving.value = false;
  }
};

const validatePasswordStrength = () => {
  const password = passwordData.newPassword;

  // Reset validation
  passwordValidation.length = password.length >= 8;
  passwordValidation.uppercase = /[A-Z]/.test(password);
  passwordValidation.lowercase = /[a-z]/.test(password);
  passwordValidation.number = /\d/.test(password);
  passwordValidation.special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Calculate strength score
  const validationCount = Object.values(passwordValidation).filter((v) => v).length;
  passwordStrength.score = validationCount;

  // Set label based on score
  if (validationCount <= 2) {
    passwordStrength.label = "Weak";
  } else if (validationCount === 3) {
    passwordStrength.label = "Fair";
  } else if (validationCount === 4) {
    passwordStrength.label = "Good";
  } else {
    passwordStrength.label = "Strong";
  }
};

const validatePasswordMatch = () => {
  // This will trigger the computed property reactively
};

const openChangePasswordDialog = () => {
  showPasswordDialog.value = true;
  passwordError.value = "";
  passwordData.currentPassword = "";
  passwordData.newPassword = "";
  passwordData.confirmPassword = "";

  // Reset password visibility
  showCurrentPassword.value = false;
  showNewPassword.value = false;
  showConfirmPassword.value = false;

  // Reset validation
  Object.keys(passwordValidation).forEach((key) => {
    passwordValidation[key] = false;
  });
  passwordStrength.score = 0;
  passwordStrength.label = "Weak";
};

const closeChangePasswordDialog = () => {
  showPasswordDialog.value = false;
  passwordError.value = "";
};

const handleChangePassword = async () => {
  passwordError.value = "";

  // Additional validation
  if (!passwordsMatch.value) {
    passwordError.value = "New password and confirm password do not match";
    return;
  }

  if (passwordStrength.value.score < 2) {
    passwordError.value = "Password is too weak. Please choose a stronger password.";
    return;
  }

  if (!Object.values(passwordValidation).every((v) => v)) {
    passwordError.value = "Password does not meet all requirements";
    return;
  }

  isChangingPassword.value = true;

  try {
    await ApiService.patch("/api/v2/user/change_password/", {
      old_password: passwordData.currentPassword,
      new_password: passwordData.newPassword,
    });

    closeChangePasswordDialog();
    showMessage("Password changed successfully!", "success");
  } catch (error) {
    console.error("Error changing password:", error);
    passwordError.value =
      error.response?.data?.message ||
      "Error changing password. Please check your current password and try again.";
  } finally {
    isChangingPassword.value = false;
  }
};

const showMessage = (msg, type) => {
  message.value = msg;
  messageType.value = type;

  if (type === "success") {
    setTimeout(() => {
      clearMessage();
    }, 5000);
  }
};

const clearMessage = () => {
  message.value = "";
  messageType.value = "";
};

onMounted(() => {
  loadProfileData();
});
</script>

<style scoped>
.custom-purple {
  color: rgb(88, 80, 236);
}

.bg-custom-purple {
  background-color: rgb(88, 80, 236);
}

.border-custom-purple {
  border-color: rgb(88, 80, 236);
}

.focus\:ring-custom-purple:focus {
  --tw-ring-color: rgba(88, 80, 236, 0.5);
}

input:focus {
  outline: none;
}

.hover\:bg-purple-50:hover {
  background-color: rgba(88, 80, 236, 0.05);
}

.hover\:bg-purple-700:hover {
  background-color: rgb(67, 56, 202);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: rgb(88, 80, 236);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(67, 56, 202);
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
