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
    <Navbar/>
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
    <!-- OTP Verification Box -->
<div class="bg-white p-6 mt-[36px] rounded-sm w-[443px]">
<h2 class="text-[20px] font-medium font-poppins text-gray-900 text-center">OTP Verification</h2>
<p class="text-gray-600 text-center mt-1 text-[12px] font-normal">
We've shared a 4-digit OTP on <span class="text-orange-500 font-semibold">sample@gmail.com</span>
</p>

<!-- OTP Input -->
<div class="flex justify-center space-x-4 mt-4">
<input type="text" maxlength="1" class="w-10 h-10 rounded-[4px] text-center text-lg focus:outline-none focus:ring-2 focus:ring-orange-400">
<input type="text" maxlength="1" class="w-10 h-10 border rounded-[4px] text-center text-lg focus:outline-none focus:ring-2 focus:ring-orange-400">
<input type="text" maxlength="1" class="w-10 h-10 border rounded-[4px] text-center text-lg focus:outline-none focus:ring-2 focus:ring-orange-400">
<input type="text" maxlength="1" class="w-10 h-10 border rounded-[4px] text-center text-lg focus:outline-none focus:ring-2 focus:ring-orange-400">
</div>

<!-- Verify Button -->
<router-link to="/mykarma"> <button class="w-full h-10 bg-orange-500 text-white py-2 text-[12px] mt-6 rounded-sm hover:bg-orange-600">VERIFY</button></router-link>

<!-- Resend OTP -->
<p class="text-center text-[14px] text-gray-600 mt-4">
Didn’t receive? <a href="#" class="text-orange-500 font-normal text-[14px]">Resend OTP</a>
</p>
</div>
  </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'

</script>