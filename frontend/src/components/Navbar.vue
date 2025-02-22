<template>
  <nav class="flex items-center justify-between bg-white p-4 shadow-md px-[36px]">
    <div class="flex items-center space-x-4">
      <img src="..//assets/mykartavya-logo (1).png" alt="MyKartavya" class="h-8" />
      <!-- <img src="/nasscom-logo.png" alt="Nasscom Foundation" class="h-6" /> -->
    </div>
    <div class="hidden md:flex space-x-8 text-gray-700">
      <router-link to="/mykarma">My Karma</router-link>
      <router-link to="/volunteering">Volunteering Opportunities</router-link>
    </div>
    <div class="flex items-center space-x-4">
      <button class="hidden md:block text-gray-600 hover:text-black">
        <i class="fas fa-cog"></i>
      </button>
      <button class="hidden md:block text-gray-600 hover:text-black">
        <i class="fas fa-bell"></i>
      </button>
      <Dropdown :options="dropdown">
        <Button class="rounded-full h-8 w-8">
          <template #icon>
            <img src="..//assets/download (3).jpeg" alt="Profile" class="h-8 w-8 rounded-full" />
          </template>
        </Button>
      </Dropdown>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted,h } from 'vue';
import { Dropdown, Button,FeatherIcon } from 'frappe-ui';
import { inject } from 'vue';

const session = inject('session');

const baseDropdown = [
  {
    label: 'Logout',
    onClick: () => {
      session.logout();
    },
    icon: ()=> h(FeatherIcon, { name: 'log-out' }),
  },
];

const mobileDropdown = [
  {
    label: 'My Karma',
    onClick: () => {},
    icon: ()=> h(FeatherIcon, { name: 'activity' }),
  },
  {
    label: 'Volunteering Opportunities',
    onClick: () => {},
    icon: ()=> h(FeatherIcon, { name: 'award' }),
  },
  {
    label: 'Settings',
    onClick: () => {},
    icon: ()=> h(FeatherIcon, { name: 'settings' }),
  },
  {
    label: 'Notifications',
    onClick: () => {},
    icon: ()=> h(FeatherIcon, { name: 'bell' }),
  },
];

const dropdown = ref([...baseDropdown]);

function updateDropdown() {
  if (window.innerWidth < 767) {
    dropdown.value = [ ...mobileDropdown,...baseDropdown];
  } else {
    dropdown.value = [...baseDropdown];
  }
}

// Run on mount and on window resize
onMounted(() => {
  updateDropdown();
  window.addEventListener('resize', updateDropdown);
});
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
</style>