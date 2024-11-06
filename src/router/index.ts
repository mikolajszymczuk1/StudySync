import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
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
      },
      {
        path: 'events',
        name: 'events',
        component: () => import('@/views/TabEvents.vue'),
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/TabHome.vue'),
      },
      {
        path: 'subjects',
        name: 'subjects',
        component: () => import('@/views/TabSubjects.vue'),
      },
      {
        path: 'grades',
        name: 'grades',
        component: () => import('@/views/TabGrades.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
