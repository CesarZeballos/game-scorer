import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    redirect: { name: 'login' },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      // { path: 'login', component: () => import('pages/auth/LoginPage.vue'), name: 'login' },
    ],
  },
  {
    path: '/',
    redirect: {name: 'gameSelector'},
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'gameSelector', component: () => import('pages/main/gameSelector/GameSelectorPage.vue'), name: 'gameSelector'}
    ]
  },
  {
    path: '/playing',
    // redirect: {name: 'gameSelector'},
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'odin', component: () => import('pages/playing/odin/OdinGamePage.vue'), name: 'odin'},
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
