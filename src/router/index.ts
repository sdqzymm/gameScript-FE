import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// import Home from '@/views/HomeView.vue'
import Detail from '@/views/DetailView/DetailView.vue'
import localCache from '@/utils/cache'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    redirect: '/detail/1'
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import('@/views/LoginView/Login.vue' /* webpackChunkName: "login" */)
  },
  {
    name: 'detail',
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) return '/login'
  }
})

export default router
