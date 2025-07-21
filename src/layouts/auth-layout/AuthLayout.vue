<template>
    <section class="bg-white dark:bg-gray-900">
      <div class="flex justify-center min-h-screen">
          <div class="auth_background hidden bg-cover lg:block lg:w-2/5" >
          </div>
          <!-- <router-view /> -->
          <SignIn v-if="route.hash == '#login'" />
          <SignUp v-if="route.hash == '#signup'" />
      </div>
  </section>
</template>
<script>
import { computed, defineComponent } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import SignIn from '../auth-layout/components/Signin.vue'
import SignUp from '../auth-layout/components/Signup.vue'
export default defineComponent({
  name: 'AuthLayout',
  components: {
    SignIn, SignUp,
  },
  methods: {
    goToLogin() {
      this.$router.push({ path: '/auth', hash: '#login' })
    },
    goToSignUp() {
      this.$router.push({ path: '/auth', hash: '#signup' })
    }
  },
  setup() {
    const route = useRoute();
    const authStore = useAuthStore();

    const isAuthenticated = authStore.isAuthenticated;    
    return {
        route
    };
  },
});
</script>
<style scope>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap');
.raleway-medium {
  font-family: "Raleway", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
.auth_background{
    background-image: url(../../assets/bot1.jpg);
}

</style>