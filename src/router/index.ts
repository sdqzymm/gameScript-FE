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
    name: 'login',
    path: '/login',
    component: () =>
      import('@/views/LoginView/Login.vue' /* webpackChunkName: "login" */)
  },
  {
    name: 'register',
    path: '/register',
    component: () =>
      import(
        '@/views/RegisterView/RegisterView.vue' /*webpackChunkName: "register" */
      )
  },
  {
    name: 'detail',
    path: '/detail/:id',
    component: Detail
  },
  {
    name: 'bind',
    path: '/bind',
    component: () => import('@/views/BindCode.vue')
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
  if (to.path !== '/login' && to.path !== '/register') {
    const token = localCache.getCache('token')
    if (!token) return '/login'
  }
})

export default router
