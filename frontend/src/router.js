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
    path: '/certificate',
    name: 'Certificate',
    component: () => import('@/components/Certificate.vue'),
  },
  {
    path: '/landing',
    name: 'LandingPage',
    component: () => import('@/pages/Home.vue'),
    meta: { requiresAuth: false }
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/Auth/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/pages/Auth/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import('@/pages/Auth/Verifyotp.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/all-volunteer',
    name: 'Allvolutters',
    component: () => import('@/pages/Mykarma/Allvolutters.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/volunteering-opportunities',
    name: 'VolunteeringOpportunities',
    component: () => import('@/pages/VolunteeringOpportunities/VolunteeringOpportunities.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/activity/:name',
    name: 'Empower',
    component: () => import('@/pages/Mykarma/Empower.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/opportunity/:name',
    name: 'Opportunity',
    component: () => import('@/pages/VolunteeringOpportunities/Opportunities.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/opportunity/:name/activity/:activity',
    name: 'OpportunityActivity',
    component: () => import('@/pages/Mykarma/Empower.vue'),
    meta: { requiresAuth: true }
  },
  {
    name: 'Contact',
    path: '/contact',
    component: () => import('@/pages/Public/Contact.vue'),
    meta: { requiresAuth: false }
  },
  {
    name: 'Profile',
    path: '/profile',
    component: () => import('@/pages/Profile/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    name: 'Updateprofile',
    path: '/updateprofile',
    component: () => import('@/pages/Profile/Updateprofile.vue'),
    meta: { requiresAuth: true }
  },
  {
    name: 'KindnessVolunteering',
    path: '/kindness-volunteering',
    component: () => import('@/pages/Kindness & Volunteering/Kindness & Volunteering.vue'),
    meta: { requiresAuth: false }
  },
  {
    name: 'KVDeatails',
    path: '/kindness-volunteering/:name',
    component: () => import('@/pages/Kindness & Volunteering/KindnessDetails.vue'),
    meta: { requiresAuth: false }
  },
  {
    name: 'AllActivity',
    path: '/all-activity/:name',
    component: () => import('@/pages/View/AllActivity.vue'),
  },
  {
    name: 'Ngos',
    path: '/ngo-registration',
    component: () => import('@/pages/Company  & Ngo Registration/NgoRestation.vue'),
    meta: { requiresAuth: false }
  },
  {
    name: 'Company',
    path: '/company-registration',
    component: () => import('@/pages/Company  & Ngo Registration/CompanyRestation.vue'),
    meta: { requiresAuth: false }
  },
  {
    name: 'NgoProfile',
    path: '/ngo-profile/:name',
    component: () => import('@/pages/NGOs/ngo.vue'),
    meta: { requiresAuth: false }
  },
  
 {
    name: 'Ngodetails',
    path: '/ngo-details/:name',
    component: () => import('@/pages/NGOs/ngodetails.vue'),
    meta: { requiresAuth: false }
  },
]

const router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: 'smooth' };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
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