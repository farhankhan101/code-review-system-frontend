<template>
  <div
    class="flex flex-col justify-center items-center w-full  sm:p-0 p-8 mx-auto lg:px-12 lg:w-3/5 min-h-screen"
  >
    <h1 class="text-start text-black font-semibold text-3xl my-5 w-full ">Ai Powered Code Review System</h1>
    <div class="w-full bg-white rounded-lg dark:bg-gray-800 ">
      <h2
        class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white"
      >
        Sign in to your account
      </h2>
      <p class="mt-4 text-gray-500 dark:text-gray-400">
        Access your account by entering your credentials below.
      </p>
      <!-- VeeForm uses our Zod schema via toTypedSchema -->
      <VeeForm
        :validation-schema="validationSchema"
        v-slot="{ meta, values, errors }"
        @submit="handleSignIn"
        ref="signinForm"
        class="space-y-4"
      >
        <div class="relative w-full">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="account_image"
          >
            Account:
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-6 h-6 text-gray-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            <VeeField
              type="text"
              name="account"
              :validate-on-input="true"
              v-model="formData.account"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your username or email address"
            />
          </div>
          <VeeError name="account" class="text-red-600" />
        </div>
        <div class="relative w-full">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="account_image"
          >
            Password:
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-6 h-6 text-gray-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                />
              </svg>
            </div>
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 dark:text-gray-400"
            >
              <svg
                v-if="isPasswordVisible"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-eye"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path
                  d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-eye-closed"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
                <path d="M3 15l2.5 -3.8" />
                <path d="M21 14.976l-2.492 -3.776" />
                <path d="M9 17l.5 -4" />
                <path d="M15 17l-.5 -4" />
              </svg>
            </button>
            <VeeField
              name="password"
              v-model="formData.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <VeeError name="password" class="text-red-600" />
        </div>
        <div class="flex"></div>
        <button
          type="submit"
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 w-full"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full"
          >
            Sign In
          </span>
        </button>
      </VeeForm>
      <p class="mt-4 text-sm font-light text-gray-500 dark:text-gray-400">
        New around here?
        <router-link
          to="/auth#signup"
          class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >Register here</router-link
        >.
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { z } from "zod";
import { ref, reactive, defineComponent } from "vue";
import {
  ErrorMessage as VeeError,
  Field as VeeField,
  Form as VeeForm,
  useForm as useVeeForm,
} from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import Swal from "sweetalert2";

export default defineComponent({
  name: "SignIn",
  components: { VeeError, VeeField, VeeForm },
  setup() {
    const router = useRouter();
    const store = useAuthStore();
    const validationSchema = toTypedSchema(loginFormSchema);
    const formData = reactive({ account: "", password: "" });
    const signinForm = ref();

    const { meta } = useVeeForm({
      validationSchema,
      initialValues: formData,
    });

    const handleSignIn = async (formValues: any, { setErrors }: any) => {
      const result = loginFormSchema.safeParse(formValues);
      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
        return Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please check the form for errors.",
        });
      }

      await store.login(formValues);
      const checkError = Object.values(store.errors);
      if (checkError.length === 0) {
        router.push("/");
      } else {
        const err1 = checkError[0] as string;
        const err2 = checkError[1] as string;
        Swal.fire({
          title: err1,
          html: err2.includes("<ul")
            ? err2
            : `<span class="text-danger">${err2}</span>`,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-danger",
          },
        }).then(() => {
          store.errors = {};
        });
      }
    };

    const isPasswordVisible = ref(false);
    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
    };

    return {
      formData,
      validationSchema,
      handleSignIn,
      signinForm,
      isPasswordVisible,
      togglePasswordVisibility,
      meta,
    };
  },
});
</script>
