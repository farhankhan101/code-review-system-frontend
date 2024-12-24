<template>
  <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 min-h-screen">
    <div class="w-full bg-white rounded-lg  dark:bg-gray-800 p-8">
      <h2 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
        Sign in to your account
      </h2>

      <p class="mt-4 text-gray-500 dark:text-gray-400">
        Access your account by entering your credentials below.
      </p>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-6 mt-8">
        <div>
          <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Email
          </label>
          <input
            v-model="formValue.email"
            type="email"
            id="email"
            placeholder="Enter your email"
            class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border rounded-lg focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            @input="validateField('email')"
            required
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Password
          </label>
          <input
            v-model="formValue.password"
            type="password"
            id="password"
            placeholder="Enter your password"
            class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border rounded-lg focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            @input="validateField('password')"
            required
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember"
              v-model="formValue.remember"
              type="checkbox"
              class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="remember" class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              Remember this device
            </label>
          </div>
          <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          class="block w-full px-6 py-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Sign In
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?
        <router-link to="/auth/signup" class="text-blue-600 hover:underline dark:text-blue-500">
          Sign up here
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Signin",
  setup() {
    const formValue = reactive({
      email: "",
      password: "",
      remember: false,
    });

    const errors = reactive({
      email: "",
      password: "",
    });

    const BaseUrl = "http://localhost:8000";

    const validateField = (field) => {
      if (field === "email") {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValue.email);
        errors.email = isValidEmail ? "" : "Please enter a valid email address.";
      } else if (field === "password") {
        errors.password = formValue.password.length >= 6 ? "" : "Password must be at least 6 characters.";
      }
    };

    const handleSubmit = async () => {
      validateField("email");
      validateField("password");

      if (errors.email || errors.password) {
        alert("Please fix the errors before submitting.");
        return;
      }

      try {
        const response = await axios.post(
          `${BaseUrl}/user/users/login/`,
          formValue,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        alert("Login successful!");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Login failed! Please try again.";
        alert(errorMessage);
      }
    };

    return {
      formValue,
      errors,
      validateField,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap");

.raleway-medium {
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-style: normal;
}
</style>
