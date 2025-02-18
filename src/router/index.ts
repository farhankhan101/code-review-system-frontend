import { createRouter, createWebHistory } from 'vue-router';
import { routes as autoRoutes } from 'vue-router/auto-routes'; // Import auto-generated routes
import { useAuthStore } from '@/stores/auth';

// Load saved reviews from localStorage
export const loadDynamicRoutes = () => {
  console.log('loadDynamicRoutes');
  const savedReviews = JSON.parse(localStorage.getItem("historyReview") || "[]");
  return savedReviews.map((review) => ({
    path: review.route,
    name: review.name,
    component: () => import('@//views/dashboard/index.vue'), // Use a generic component for dynamic routes
  }));
};

// Initialize router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: () => import('@/layouts/default-layout/DefaultLayout.vue'),
      children: [
        {
          path: '/',
          name: 'Default',
          component: () => import('@/views/default/index.vue'),
        },
        ...autoRoutes,
        ...loadDynamicRoutes(),
      ],
    },
    {
      path: '/auth',
      component: () => import('@/layouts/auth-layout/AuthLayout.vue'),
      children: [
        {
          path: 'signin',
          name: 'Signin',
          component: () => import('@/layouts/auth-layout/components/Signin.vue'),
        },
        {
          path: 'signup',
          name: 'Signup',
          component: () => import('@/layouts/auth-layout/components/Signup.vue'),
        },
      ],
    },
  ],
});

export const addDynamicRoute = (review) => {
  const newRoute = {
    path: review.route,
    name: review.name,
    component: () => import('@/views/dashboard/index.vue'), // Use a generic component for dynamic routes
  };
  router.addRoute(newRoute);
};

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const user = authStore.getUser();

  // authStore.checkIntegrity();

  // console.log("User: ", user);
  // console.log('AuthStore:', authStore);

  // console.log("Heading to: ", to.path);
  // console.log("Here from: ", from);
  if (to.meta.middleware === "auth") {
    // console.log("Going to auth middleware...");
    if (authStore.isAuthenticated) {
      // console.log("Authenticated");
      next();
    } else {
      console.log("Not authenticated");
      next(false);
      router.push({path: "/auth", hash: "#login"});

    }
  } else {
    if (authStore.isAuthenticated && to.path.startsWith("/auth")) {
      if (!(to.path === "/auth")) {
        router.push("/"); // Redirect to home
      }
    }
  }

  next();
  return
});
export default router;
