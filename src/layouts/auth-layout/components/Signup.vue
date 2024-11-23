<template>
  <div class="flex justify-center items-center min-h-screen dark:bg-gray-900 text-white">
    <div class="border w-full max-w-md p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
      <h2 class="raleway-medium text-start text-4xl font-bold text-gray-900 dark:text-white">
        Sign Up Updated
      </h2>
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div>
          <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input 
            v-model="formValues.username"
            type="text" 
            id="firstName" 
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Username" 
            required 
          />
        </div>
        <div>
          <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            First Name
          </label>
          <input 
            v-model="formValues.first_name"
            type="text" 
            id="firstName" 
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="First Name" 
            required 
          />
        </div>
        <div>
          <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Last Name
          </label>
          <input 
            v-model="formValues.last_name"
            type="text" 
            id="lastName" 
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Last Name" 
            required 
          />
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input 
            v-model="formValues.email"
            type="email" 
            id="email" 
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
            v-model="formValues.password_1"
            type="password" 
            id="password" 
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="••••••••" 
            required 
          />
        </div>
        <div>
          <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirm Password
          </label>
          <input 
            v-model="formValues.password_2"
            type="password" 
            id="confirmPassword" 
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="••••••••" 
            required 
          />
          <label for="remember" class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              Agree with <router-link to="" class="text-blue-800 font-bold">Privacy</router-link> and <router-link to="" class="text-blue-800 font-bold">policy</router-link>
          </label>
        </div>
        <div class="flex justify-center">
          <button 
            type="submit" 
            class="w-full px-4 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Signup
          </button>
        </div>
        <div class="text-sm font-medium text-gray-900 dark:text-white text-center">
            Not registered yet? 
            <router-link to="/auth/signin" class="text-blue-600 hover:underline dark:text-blue-500">Create account</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Signup",
  setup() {
    const formValues = ref({
      username:"",
      first_name: "",
      last_name: "",
      email: "",
      password_1: "",
      password_2: ""
    });
    const BaseUrl = 'http://localhost:8000'
    const handleSubmit = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/user/users/register/`, formValues.value);
        console.log("User created successfully:", response.data);
        alert("User created successfully!");
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Error creating user!");
      }
    };

    return {
      formValues,
      handleSubmit
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap');
.raleway-medium {
  font-family: "Raleway", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
</style>
