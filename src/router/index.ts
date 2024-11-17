import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

import TabsMain from '@/views/TabsMain.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home',
  },
  {
    path: '/tabs/',
    component: TabsMain,
    children: [
      {
        path: '',
        redirect: '/tabs/home',
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/TabProfile.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'events',
        name: 'events',
        component: () => import('@/views/TabEvents.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/TabHome.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'subjects',
        name: 'subjects',
        component: () => import('@/views/TabSubjects.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'grades',
        name: 'grades',
        component: () => import('@/views/TabGrades.vue'),
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { requireAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach(async (to, from, next) => {
  // Check user session
  const userStore = useUserStore();
  if (!userStore.isLoggedIn) {
    const { status } = await userStore.getSessionUser();
    if (!status) {
      userStore.logoutUser();
    }
  }

  if (userStore.isLoggedIn && (to.name === 'login' || to.name === 'register')) {
    return next('/tabs/home');
  }

  if (to.meta.requireAuth && !userStore.isLoggedIn) {
    return next('/login');
  }

  next();
});

export default router;
