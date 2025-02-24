import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Mykarma/Mykarma.vue'),
    meta: { requiresAuth: true }  
  },
  {
    path: '/landing',
    name: 'LandingPage',
    component: () => import('@/pages/Home.vue'),
    meta: { requiresAuth: false }  
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import('@/pages/Verifyotp.vue'),
    meta: { requiresAuth: false }  
  },
  {
    path: '/test',
    name: 'Try',
    component: () => import('@/pages/Try.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/volunteering',
    name: 'Volunteering',
    component: () => import('@/pages/Volunteering.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/empower',
    name: 'Empower',
    component: () => import('@/pages/Empower.vue'),
    meta: { requiresAuth: true }
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/pages/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    name: 'Contact',
    path: '/contact',
    component: () => import('@/pages/Contact.vue'),
    meta: { requiresAuth: true }
  },
  {
    name: 'Profile',
    path: '/profile',
    component: () => import('@/pages/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    name: 'Updateprofile',
    path: '/updateprofile',
    component: () => import('@/pages/Updateprofile.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  
  // Check user authentication status
  try {
    await userResource.promise
    isLoggedIn = session.isLoggedIn // Update status after promise resolves
  } catch (error) {
    isLoggedIn = false
    console.error('Auth check failed:', error)
  }

  // Handle navigation logic
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({
      name: 'Login',
      query: { redirect: to.fullPath } // Preserve intended destination
    })
  } else if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
  } else if (to.name === 'Verify' && isLoggedIn) {
    next({ name: 'Home' })
  } else {
    next() // Proceed normally
  }
})

export default router