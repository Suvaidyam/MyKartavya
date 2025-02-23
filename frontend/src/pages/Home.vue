<template>
<div class="flex flex-col items-center min-h-screen bg-secondary" style="background: #F5F5F5;">
  <!-- Top Bar (Hidden on Mobile) -->
  <div class="hidden md:flex space-x-4 justify-end px-10 bg-orange-100 w-full">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <path fill="currentColor" d="M8.5 3a5.5 5.5 0 0 1 4.383 8.823l4.147 4.147a.75.75 0 0 1-.976 1.133l-.084-.073l-4.147-4.147A5.5 5.5 0 1 1 8.5 3m0 1.5a4 4 0 1 0 0 8a4 4 0 0 0 0-8" />
    </svg>
    <a href="#" class="text-black-500 text-[12px]">Register as Company</a>
    <a href="#" class="text-black-500 text-[12px]">Register as NGO</a>
  </div>
   <!-- Sticky Navbar -->
  <div class="w-full sticky top-0 z-50 bg-white shadow-md">
    <Navbar />
  </div>
  <!-- Main Content Centered -->
  <main class="flex flex-col items-center text-center w-full px-4 min-h-[calc(100vh-64px)] justify-center">
    <h1 class="text-[28px] md:text-[33px] font-normal font-poppins">Your Journey of Kindness Starts Here</h1>

    <div class="text-center mt-6">
      <div class="flex flex-wrap justify-center gap-2 md:gap-4">
        <button class="border px-4 py-2 bg-white rounded-full text-black border-orange-500 flex gap-1">
          <img src="../assets/Frame.png" alt=""> Track Your Impact
        </button>
        <button class="border px-4 py-2 bg-white rounded-full text-black border-orange-500 flex gap-1">
          <img src="../assets/Frame (2).png" alt=""> Join Activities Anywhere
        </button>
        <button class="border px-4 py-2 bg-white rounded-full text-black flex gap-1" style="border-color: #F185BB;">
          <img src="../assets/Frame (1).png" alt=""> Connect with a Community
        </button>
      </div>
    </div>
    <div class="mt-10 bg-white p-6 rounded-sm w-full max-w-[443px] shadow-md">
      <h2 class="text-[20px] font-normal mb-4">Login to your account</h2>
      <input type="email" placeholder="sample@example.com" class="w-full p-2 border rounded-sm mb-4 text-[14px]" style="color: #6E7073;">
      <router-link to="/verify">
        <button class="w-full text-white py-2 rounded-sm text-[14px]" style="background: #FF5722;">GET OTP</button>
      </router-link>
      <p class="text-sm mt-4 text-gray-600">Don't have an account? 
        <a href="#" class="text-orange-500">Sign up</a>
      </p>
      <div class="flex items-center my-4">
        <hr class="flex-grow border-t border-gray-300">
        <span class="mx-2 text-gray-500 text-[12px]">OR</span>
        <hr class="flex-grow border-t border-gray-300">
      </div>
      <div class="mt-4">
        <button class="w-full flex items-center justify-start p-2 border rounded-sm mb-2 text-[14px] font-normal">
          <img src="../assets/icons8-google-48.png" alt="Google" class="h-5 mr-2"> Continue with Google
        </button>
        <button class="w-full flex items-center justify-start p-2 border rounded-sm text-[14px]">
          <img src="../assets/icons8-microsoft-48.png" alt="Microsoft" class="h-5 mr-2"> Continue with Microsoft
        </button>
      </div>
    </div>
  </main>
</div>
</template>
<script setup>
import Navbar from '../components/Navbar.vue'
// No additional logic needed for this static UI
</script>
<style>
/* Additional global styles if required */
</style>


