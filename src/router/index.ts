import { createRouter, createWebHistory } from 'vue-router';
import { routes as autoRoutes } from 'vue-router/auto-routes';
import { useAuthStore } from '@/stores/auth';

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
          name: 'Default',
          component: () => import('@/views/default/index.vue'),
        },
        ...autoRoutes,
      ],
    },
    {
      path: '/auth',
      component: () => import('@/layouts/auth-layout/AuthLayout.vue'),
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('@/components/PricingPlain.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/profileVue.vue'),
    },
    {
      path: '/getapp',
      name: 'GetApp',
      component: () => import('@/components/GetApp.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.middleware === 'auth') {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ path: '/auth', hash: '#login' });
    }
  } else {
    if (authStore.isAuthenticated && to.path === '/auth') {
      next('/');
    } else {
      next();
    }
  }
});

export default router; // ✅ Important: default export
