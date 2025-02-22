import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import('@/pages/Verifyotp.vue'),
  },
  {
    path: '/test',
    name: 'Try',
    component: () => import('@/pages/Try.vue'),
  },
  {
    path: '/mykarma',
    name: 'Mykarma',
    component: () => import('@/pages/Mykarma/Mykarma.vue'),
  },
  {
    path: '/volunteering',
    name: 'Volunteering',
    component: () => import('@/pages/Volunteering.vue'),
  },
  {
    path: '/empower',
    name: 'Empower',
    component: () => import('@/pages/Empower.vue'),
  },

  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },

  {
    name: 'Contact',
    path: '/contact',
    component: () => import('@/pages/Contact.vue'),
  },

  {
    name: 'Profile',
    path: '/profile',
    component: () => import('@/pages/Profile.vue'),
  },

  {
    name: 'Updateprofile',
    path: '/updateprofile',
    component: () => import('@/pages/Updateprofile.vue'),
  },
]

let router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
  } else if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
