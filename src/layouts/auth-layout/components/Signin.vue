<template>
  <div class="flex justify-center items-center min-h-screen dark:bg-gray-900 text-white">
    <div class="border w-full max-w-md p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
      <h2 class="raleway-medium text-start text-4xl font-bold text-gray-900 dark:text-white">
        Sign in
      </h2>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model="formValue.email"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            v-model="formValue.password"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="••••••••"
            required
          />
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
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full px-4 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </div>
        <div class="text-sm font-medium text-gray-900 dark:text-white text-center">
          Not registered yet?
          <router-link to="/auth/signup" class="text-blue-600 hover:underline dark:text-blue-500">
            Create account
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Signin",
  setup() {
    // Reactive object to manage form values
    const formValue = reactive({
      email: "",
      password: "",
      // remember: false,
    });

    const BaseUrl = 'http://localhost:8000'
    const handleSubmit = async () => {
      try {
        console.log(formValue)
        const response = await axios.post(`${BaseUrl}/user/users/login/`, formValue);
        console.log("Response:", response.data);
        alert("Login successful!");
      } catch (error) {
        console.error("Error:", error.response || error);
        alert("Login failed! Please try again.");
      }
    };

    return {
      formValue,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap");

.raleway-medium {
  font-family: "Raleway", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
</style>
