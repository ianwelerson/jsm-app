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
      component: () => import('@/views/users/UserIndex.vue'),
      children: [
        {
          path: '',
          name: 'userList',
          component: () => import('@/views/users/UserList.vue'),
        },
        {
          path: ':userId',
          name: 'userDetails',
          component: () => import('@/views/users/UserDetails.vue'),
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
