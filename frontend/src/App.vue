<template>
  <div>
    <div class="fixed w-full top-0 z-40">
      <Navbar />
    </div>
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import { ref } from "vue";
</script>
