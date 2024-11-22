import { createRouter, createWebHistory } from 'vue-router'
import { routes as autoRoutes } from 'vue-router/auto-routes' // Import auto-generated routes

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: "/dashboard",
      component: () => import('@/layouts/default-layout/DefaultLayout.vue'),
      children: [ 
        ...autoRoutes,
      ]
    },
    {
      path:'/auth',
      component: () => import('@/layouts/auth-layout/AuthLayout.vue'),
      children:[
        {
        path: 'signin',
        name: 'Signin',
        component: () => import('@/layouts/auth-layout/components/Signin.vue'),
        },
        {
          path: 'signup',
          name: 'Signup',
          component: () => import('@/layouts/auth-layout/components/Signup.vue'),
          }
      ]
    }
    ],
})

export default router
