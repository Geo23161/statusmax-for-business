import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import LoginPage from "@/views/LoginPage.vue"
import RegisterPage from "@/views/RegisterPage.vue"
import CreatePost from "@/views/CreatePost.vue"
import TotalStat from "@/views/TotalStat.vue"
import OpenPost from "@/views/OpenPost.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path : '/login',
    component : LoginPage
  },
  {
    path : '/register',
    component : RegisterPage
  },
  {
    path : '/create',
    component : CreatePost
  },
  {
    path : '/post/:id',
    component : OpenPost
  },
  {
    path : '/stat',
    component : TotalStat
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
