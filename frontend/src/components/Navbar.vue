<template>
  <nav class="flex items-center justify-between bg-white p-4 shadow-md px-[36px]">
    <div class="flex items-center space-x-4">
      <img src="..//assets/mykartavya-logo (1).png" alt="MyKartavya" class="h-8" />
      <!-- <img src="/nasscom-logo.png" alt="Nasscom Foundation" class="h-6" /> -->
    </div>
    <div class="hidden md:flex space-x-8 text-gray-700">
      <!-- <a href="#" class="hover:text-red-500">My Karma</a> -->
      <router-link to="/mykarma">My Karma</router-link>
      <!-- <a href="#" class="hover:text-red-500"></a> -->
       <router-link to="/volunteering">Volunteering Opportunities</router-link>
    </div>
    <div class="flex items-center space-x-4">
      <button class="hidden md:block text-gray-600 hover:text-black">
        <i class="fas fa-cog"></i>
      </button>
      <button class="hidden md:block text-gray-600 hover:text-black">
        <i class="fas fa-bell"></i>
      </button>
      <img src="..//assets/download (3).jpeg" alt="Profile" class="h-8 w-8 rounded-full" />
      <button class="md:hidden" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div v-if="isOpen" class="absolute top-16 right-4 bg-white shadow-md p-4 rounded-md md:hidden">
      <a href="#" class="block py-2">My Karma</a>
      <a href="#" class="block py-2">Volunteering Opportunities</a>
      <button class="block w-full text-left py-2">Settings</button>
      <button class="block w-full text-left py-2">Notifications</button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
</style>
