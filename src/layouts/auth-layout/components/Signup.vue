<template>
  <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
    <div class="w-full">
      <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
        Get your free account now.
      </h1>

      <p class="mt-4 text-gray-500 dark:text-gray-400">
        Let’s get you all set up so you can verify your personal account and begin setting up your profile.
      </p>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
        <div v-for="(label, field) in fields" :key="field">
          <label :for="field" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            {{ label }}
          </label>
          <input
            v-model="formValues[field]"
            :type="field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'"
            :placeholder="'Enter your ' + label.toLowerCase()"
            class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border rounded-lg focus:ring-blue-400 focus:border-blue-400"
            @input="validateField(field)"
          />
          <p v-if="errors[field]" class="mt-1 text-sm text-red-500">{{ errors[field] }}</p>
        </div>
        <button
          type="submit"
          class="w-full px-6 py-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Sign Up
        </button>
      </form>
        <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?
          <router-link to="/auth/signin" class="text-blue-600 hover:underline dark:text-blue-500">
            Signin
          </router-link>
        </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { z } from "zod";

const signupFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password_1: z.string().min(6, "Password must be at least 6 characters"),
  password_2: z.string().min(6, "Password must be at least 6 characters"),
});

export default defineComponent({
  name: "Signup",
  setup() {
    const formValues = reactive({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password_1: "",
      password_2: "",
    });

    const errors = reactive({});
    const fields = {
      username: "User Name",
      first_name: "First Name",
      last_name: "Last Name",
      email: "Email",
      password_1: "Password",
      password_2: "Confirm Password",
    };

    const validateField = (field) => {
      try {
        if (field === "password_2" && formValues.password_1 !== formValues.password_2) {
          errors[field] = "Passwords must match";
        } else {
          const fieldSchema = z.object({ [field]: signupFormSchema.shape[field] });
          fieldSchema.parse({ [field]: formValues[field] });
          delete errors[field];
        }
      } catch (err) {
        errors[field] = err.errors[0].message;
      }
    };

    const handleSubmit = () => {
      try {
        signupFormSchema
          .refine((data) => data.password_1 === data.password_2, {
            message: "Passwords must match",
            path: ["password_2"],
          })
          .parse(formValues);
        alert("Form submitted successfully!");
      } catch (err) {
        err.errors.forEach((e) => {
          errors[e.path[0]] = e.message;
        });
      }
    };

    return {
      formValues,
      errors,
      fields,
      validateField,
      handleSubmit,
    };
  },
});
</script>
