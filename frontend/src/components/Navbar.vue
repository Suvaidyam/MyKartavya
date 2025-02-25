<template>
  <div v-if="['/login', '/verify'].includes(route.fullPath)"
    class="hidden md:flex space-x-4 justify-end px-10 bg-orange-100 h-8 items-center w-full">
    <FeatherIcon name="search" class="size-4 cursor-pointer text-gray-700" />
    <a class="text-[#000000] font-normal text-[12px]">Register as Company</a>
    <a class="text-[#000000] font-normal text-[12px]">Register as NGO</a>
  </div>
<div class="bg-white h-[60px] shadow-md">
  <nav v-if="['/', '/volunteering', '/profile', '/empower', '/updateprofile', '/'].includes(route.fullPath)"
    class="flex items-center justify-between w-full px-[36px] max-w-[1920px] mx-auto h-full">
    <router-link to="/" class="flex items-center space-x-4">
      <img src="../assets/mykartavya-logo (1).png" alt="MyKartavya" class="h-8" />
    </router-link>
    <div class="hidden md:flex space-x-8 text-gray-700">
      <router-link to="/" :class="[route.fullPath=='/'?'font-medium':'font-normal','text-sm']">My Karma</router-link>
      <router-link to="/volunteering" :class="[route.fullPath=='/volunteering'?'font-medium':'font-normal','text-sm']">Volunteering Opportunities</router-link>
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
  <nav v-else class="flex items-center justify-between h-full px-[36px] max-w-[1920px] mx-auto">
    <router-link to="/" class="flex items-center space-x-4">
      <img src="../assets/mykartavya-logo (1).png" alt="MyKartavya" class="h-8" />
    </router-link> 
    <div class="hidden md:flex space-x-8 text-gray-700">
      <router-link to="/landing" :class="[route.fullPath=='/landing'?'font-medium':'font-normal','text-sm']">Home</router-link>
      <router-link to="/about-us" :class="[route.fullPath=='/about-us'?'font-medium':'font-normal','text-sm']">About Us</router-link>
      <router-link to="/features" :class="[route.fullPath=='/features'?'font-medium':'font-normal','text-sm']">Features</router-link>
      <router-link to="/kindness-volunteering" :class="[route.fullPath.split('/')[1]=='kindness-volunteering'?'font-medium':'font-normal','text-sm']">Kindness & Volunteering</router-link>
      <router-link to="/faqs" :class="[route.fullPath=='/faqs'?'font-medium':'font-normal','text-sm']">FAQs</router-link>
    </div>
    <div class="flex items-center gap-5 justify-center">
      <Dropdown class="block md:hidden" :options="[
        {
          label: 'Home',
          onClick: () => { },
          icon: () => h(FeatherIcon, { name: 'home' }),
        },
        {
          label: 'About Us',
          onClick: () => { },
          icon: () => h(FeatherIcon, { name: 'users' }),
        },
        {
          label: 'Features',
          onClick: () => { },
          icon: () => h(FeatherIcon, { name: 'layers' }),
        },
        {
          label: 'Kindness & Volunteering',
          onClick: () => { },
          icon: () => h(FeatherIcon, { name: 'heart' }),
        },
        {
          label: 'FAQs',
          onClick: () => { },
          icon: () => h(FeatherIcon, { name: 'message-circle' }),
        },
      ]">
        <Button>
          <template #icon>
            <FeatherIcon name="menu" class="h-4 w-4" />
          </template>
        </Button>
      </Dropdown>
      <router-link v-if="route.fullPath=='/landing'" to="/login" class="h-9 flex items-center justify-center bg-secondary rounded-sm px-4 text-white text-base font-medium">Continue as volunteer</router-link>
    </div>
  </nav>
</div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue';
import { Dropdown, Button, FeatherIcon, Avatar, Tooltip } from 'frappe-ui';
import { inject } from 'vue';
import Notifications from './Notifications.vue';
import { useRouter, useRoute } from 'vue-router';

const session = inject('session');
const auth = inject('auth');
const router = useRouter();
const route = useRoute();
const baseDropdown = [
  {
    label: 'Logout',
    onClick: () => {
      session.logout.submit();
    },
    icon: () => h(FeatherIcon, { name: 'log-out' }),
  },
];

const mobileDropdown = [
  {
    label: 'My Karma',
    onClick: () => change_route('/mykarma'),
    icon: () => h(FeatherIcon, { name: 'activity' }),
  },
  {
    label: 'Volunteering Opportunities',
    onClick: () => change_route('/volunteering'),
    icon: () => h(FeatherIcon, { name: 'award' }),
  },
  {
    label: 'Settings',
    onClick: () => { },
    icon: () => h(FeatherIcon, { name: 'settings' }),
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
onMounted(() => {
  updateDropdown();
  window.addEventListener('resize', updateDropdown);
});
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
</style>