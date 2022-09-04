import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'appHome',
      redirect: {
        name: 'userList',
      },
    },
    {
      path: '/users',
      name: 'userList',
      meta: {
        title: 'Lista de membros',
      },
      redirect: {
        name: 'userListIndex',
      },
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'userListIndex',
          component: () => import('@/views/Users/UserList/UserList.vue'),
        },
        {
          path: ':userId',
          name: 'userDetails',
          component: () => import('@/views/Users/UserDetails/UserDetails.vue'),
          meta: {
            title: 'Dados do Membro',
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        name: 'userList',
      },
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
