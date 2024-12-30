import { createRouter, createWebHistory } from 'vue-router';
import { routes as autoRoutes } from 'vue-router/auto-routes'; // Import auto-generated routes

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
          path: '',
          name: 'Welcome',
          component: () => import('@/views/welcome/Welcome.vue'),
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

export default router;
