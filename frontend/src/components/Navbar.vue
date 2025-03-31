<template>
  <div v-if="!auth.isLoggedIn" class="flex space-x-4 justify-end px-6 sm:px-10 bg-[#FFBD9C] h-8 items-center w-full">
    <FeatherIcon name="search" class="size-4 cursor-pointer text-gray-700" />
    <router-link to="/company-registration" class="text-black font-normal text-xs">
      Register as Company
    </router-link>

    <router-link to="/ngo-registration" class="text-[#000000] font-normal text-[12px]">Register as NGO</router-link>
  </div>
  <div class="bg-white h-[60px] shadow-md">
    <nav
      v-if="['/', '/volunteering-opportunities', '/profile', '/activity', '/updateprofile', '/all-activity', '/all-volunteer'].includes('/' + route.fullPath.split('/')[1])"
      class="flex items-center justify-between w-full px-3 sm:px-[36px] max-w-[1920px] mx-auto h-full">
      <a href="#" @click="handleLogoClick" class="flex items-center space-x-4">
        <img src="../assets/mykartavya-logo (1).png" alt="MyKartavya" class="h-8" />
      </a>
      <div class="hidden md:flex space-x-8 text-gray-700">
        <router-link to="/" :class="[route.fullPath == '/' ? 'font-medium' : 'font-normal', 'text-sm']">My
          Karma</router-link>
        <router-link to="/volunteering-opportunities"
          :class="[route.fullPath == '/volunteering-opportunities' ? 'font-medium' : 'font-normal', 'text-sm']">Volunteering
          Opportunities</router-link>
      </div>
      <div class="flex items-center gap-5 justify-center">
        <!--  -->
        <Dropdown :options="[
          {
            label: 'My Beneficiaries',
            onClick: () => { },
            icon: () => h(FeatherIcon, { name: 'user' }),
          },
          {
            label: 'Support',
            onClick: () => { },
            icon: () => h(FeatherIcon, { name: 'help-circle' }),
          },
          {
            label: 'FAQs',
            onClick: () => { },
            icon: () => h(FeatherIcon, { name: 'message-circle' }),
          },
        ]">
          <Button class="bg-white rounded-full">
            <template #icon>
              <FeatherIcon name="settings" class="size-5 text-gray-700" />
            </template>
          </Button>
        </Dropdown>
        <!--  -->
        <p class="border-r h-8"></p>
        <!--  -->
        <Notifications />
        <Dropdown :options="dropdown">
          <Button class="w-9 h-9 min-w-9 min-h-9 rounded-full">
            <template #icon>
              <Avatar class="w-9 h-9 min-w-9 min-h-9" :shape="'circle'" :ref_for="true" :image="auth?.user_image"
                :label="auth?.cookie?.full_name" size="md" />
            </template>
          </Button>
        </Dropdown>
      </div>
    </nav>
    <!--  -->
    <nav v-else class="flex items-center justify-between h-full px-3 sm:px-[36px] max-w-[1920px] mx-auto">
      <a href="#" @click="handleLogoClick" class="flex items-center space-x-4">
        <img src="../assets/mykartavya-logo (1).png" alt="MyKartavya" class="w-44 sm:w-auto sm:h-8" />
      </a>
      <div class="hidden lg:flex space-x-8 text-gray-700">
        <a href="#" @click="handleLogoClick"
          :class="[route.fullPath == '/landin' ? 'font-medium' : 'font-normal', 'text-sm']">Home</a>
        <a href="#" @click="handleAboutClick"
          :class="[route.fullPath == '/about-us' ? 'font-medium' : 'font-normal', 'text-sm']">About Us</a>
        <router-link v-if="auth.isLoggedIn" to="/"
          :class="[route.fullPath == '/' ? 'font-medium' : 'font-normal', 'text-sm']">My Karma</router-link>
        <router-link v-if="auth.isLoggedIn" to="/volunteering-opportunities"
          :class="[route.fullPath == '/volunteering-opportunities' ? 'font-medium' : 'font-normal', 'text-sm']">Volunteering
          Opportunities</router-link>
        <router-link to="/kindness-volunteering"
          :class="[route.fullPath.split('/')[1] == 'kindness-volunteering' ? 'font-medium' : 'font-normal', 'text-sm']">
          Volunteering</router-link>
        <a href="#" @click="handleFaqClick"
          :class="[route.fullPath == '/faqs' ? 'font-medium' : 'font-normal', 'text-sm']">FAQs</a>
      </div>
      <div class="flex items-center gap-2 sm:gap-5 justify-center">
        <router-link v-if="route.fullPath.split('?')[0] != '/login' && route.fullPath.split('?')[0] != '/verify' && !auth.isLoggedIn" to="/login"
          class="h-8 md:h-9 flex items-center justify-center bg-secondary rounded-sm px-2 sm:px-4 text-white text-[11px] sm:text-base font-medium">
          Start Volunteering Now</router-link>
        <Dropdown class="block lg:hidden" :options="[
          {
            label: 'Home',
            onClick: () => { handleHomeClick() },
            icon: () => h(FeatherIcon, { name: 'home' }),
          },
          {
            label: 'About Us',
            onClick: () => { handleAboutClick() },
            icon: () => h(FeatherIcon, { name: 'users' }),
          },
          ...(auth.isLoggedIn ? [
            {
              label: 'My Karma',
              onClick: () => { change_route('/') },
              icon: () => h(FeatherIcon, { name: 'activity' }),
            },
            {
              label: 'Volunteering Opportunities',
              onClick: () => { change_route('/volunteering-opportunities') },
              icon: () => h(FeatherIcon, { name: 'award' }),
            }
          ] : []),
          {
            label: 'Volunteering',
            onClick: () => { change_route('/kindness-volunteering') },
            icon: () => h(FeatherIcon, { name: 'heart' }),
          },
          {
            label: 'FAQs',
            onClick: () => { handleFaqClick() },
            icon: () => h(FeatherIcon, { name: 'message-circle' }),
          },
        ]">
          <Button>
            <template #icon>
              <FeatherIcon name="menu" class="h-4 w-4" />
            </template>
          </Button>
        </Dropdown>

      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, h, watch } from 'vue';
import { Dropdown, Button, FeatherIcon, Avatar, Tooltip } from 'frappe-ui';
import { inject } from 'vue';
import Notifications from './Notifications.vue';
import { useRouter, useRoute } from 'vue-router';

const session = inject('session');
const auth = inject('auth');
const call = inject('call');
const router = useRouter();
const route = useRoute();

const handleLogoClick = (e) => {
  e.preventDefault();
  const currentOrigin = window.location.origin;
  // Convert from frontend port (8080) to backend port (8000)
  const backendUrl = currentOrigin.replace(':8080', ':8000');
  window.location.href = backendUrl;
};

const handleAboutClick = (e) => {
  if (e) e.preventDefault();
  const currentOrigin = window.location.origin;
  const backendUrl = currentOrigin.replace(':8080', ':8000') + '/about';
  window.location.href = backendUrl;
};

const handleHomeClick = (e) => {
  if (e) e.preventDefault();
  const currentOrigin = window.location.origin;
  const backendUrl = currentOrigin.replace(':8080', ':8000');
  window.location.href = backendUrl;
};

const handleFaqClick = (e) => {
  if (e) e.preventDefault();
  const currentOrigin = window.location.origin;
  const backendUrl = currentOrigin.replace(':8080', ':8000') + '/faqs';
  window.location.href = backendUrl;
};

const baseDropdown = [
  {
    label: 'Logout',
    onClick: () => {
      auth.logout();
    },
    icon: () => h(FeatherIcon, { name: 'log-out' }),
  },
];

const mobileDropdown = [
  {
    label: 'My Karma',
    onClick: () => change_route('/'),
    icon: () => h(FeatherIcon, { name: 'activity' }),
  },
  {
    label: 'Volunteering Opportunities',
    onClick: () => change_route('/volunteering-opportunities'),
    icon: () => h(FeatherIcon, { name: 'award' }),
  },

];

const dropdown = ref([...baseDropdown]);

function updateDropdown() {
  if (window.innerWidth < 767) {
    dropdown.value = [...
      [{
        label: 'My Profile',
        onClick: () => change_route('/profile'),
        icon: () => h(FeatherIcon, { name: 'user' }),

      }], ...mobileDropdown, ...baseDropdown];
  } else {
    dropdown.value = [...[{
      label: 'My Profile',
      onClick: () => change_route('/profile'),
      icon: () => h(FeatherIcon, { name: 'user' }),

    }], ...baseDropdown];
  }
}
const change_route = (route) => {
  router.push(route);
};
// Run on mount and on window resize
onMounted(async () => {
  updateDropdown();
  window.addEventListener('resize', updateDropdown);
});
watch(() => route.fullPath, async (value) => {
  if (value != '/updateprofile', auth.isLoggedIn) {
    let res = await call('mykartavya.controllers.api.check_user_fields', {});
    if (!res?.success) {
      localStorage.setItem('updateprofile', 'true');
      router.push('/updateprofile');
    }
  }
}, { immediate: true })
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
</style>