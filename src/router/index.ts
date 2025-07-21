import { createRouter, createWebHistory } from 'vue-router';
import { routes as autoRoutes } from 'vue-router/auto-routes'; // This plugin must be configured in your vite.config.ts
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
        // autoRoutes will automatically include your file-based routes,
        // e.g. the file views/chat/[id].vue will create a route at /chat/:id
        ...autoRoutes,
      ],
    },
    {
      path: '/auth',
      component: () => import('@/layouts/auth-layout/AuthLayout.vue'),
    },
    {
      path: '/current-plan',
      name: 'CurrentPlan',
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
      console.log('Not authenticated');
      next(false);
      if(to.path == '/auth'){
        router.push({ path: '/auth', hash: '#login' });
      }
      router.push({ path: '/auth', hash: '#login' });
    }
  } else {
    if (authStore.isAuthenticated && to.path.startsWith('/auth') && to.path == '/auth') {
      router.push('/');
    }
    next();
  }
});

export default router;
