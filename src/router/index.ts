import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'userList',
      },
    },
    {
      path: '/users',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'userList',
          component: () => import('@/views/Users/UserList/UserList.vue'),
        },
        {
          path: ':userId',
          name: 'userDetails',
          component: () => import('@/views/Users/UserDetails/UserDetails.vue'),
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
})

export default router
