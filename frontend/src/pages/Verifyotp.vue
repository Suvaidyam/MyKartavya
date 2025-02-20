<template>
  <div class="min-h-screen flex flex-col items-center justify-start bg-gray-100">   <div class="hidden md:flex space-x-4 justify-end px-10 bg-orange-100 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <path fill="currentColor" d="M8.5 3a5.5 5.5 0 0 1 4.383 8.823l4.147 4.147a.75.75 0 0 
       1-.976 1.133l-.084-.073l-4.147-4.147A5.5 5.5 0 1 1 8.5 3m0 1.5a4 4 0 1 0 0 8a4 4 0 0 0 0-8" />
        </svg>
        <a href="#" class="text-black-500 hover:underline">Register as Company</a>
        <a href="#" class="text-black-500 hover:underline">Register as NGO</a>
    </div>

    <!-- Header -->
    <header class="w-full bg-white py-3 px-6 flex justify-start gap-[163px] items-center">
      <div class="flex items-center space-x-2">
        <img src="..//assets/mykartavya-logo (1).png" alt="MyKartavya Logo" class="h-8" />
      </div>
      <nav class="space-x-6 hidden md:flex">
        <a href="#" class="text-gray-700 hover:text-orange-500">Home</a>
        <a href="#" class="text-gray-700 hover:text-orange-500">About Us</a>
        <a href="#" class="text-gray-700 hover:text-orange-500">Features</a>
        <a href="#" class="text-gray-700 hover:text-orange-500">Kindness & Volunteering</a>
        <a href="#" class="text-gray-700 hover:text-orange-500">FAQs</a>
      </nav>
    
    </header>

    <!-- Main Content -->
    <div class="text-center mt-10">
      <h1 class="text-2xl font-semibold text-gray-900">Your Journey of Kindness Starts Here</h1>
      <div class="flex justify-center space-x-4 mt-4">
        <button class="border px-4 py-2 rounded-full text-orange-500 border-orange-500">📊 Track Your Impact</button>
        <button class="border px-4 py-2 rounded-full text-orange-500 border-orange-500">➕ Join Activities Anywhere</button>
        <button class="border px-4 py-2 rounded-full text-orange-500 border-orange-500">👥 Connect with a Community</button>
      </div>
    </div>

    <!-- OTP Verification Box -->
    <div class="bg-white p-6 mt-8 rounded-sm w-96">
      <h2 class="text-lg font-semibold text-gray-900 text-center">OTP Verification</h2>
      <p class="text-gray-600 text-center mt-1">
        We've shared a 4-digit OTP on <span class="text-orange-500 font-semibold">sample@gmail.com</span>
      </p>

      <!-- OTP Input -->
      <div class="flex justify-center space-x-4 mt-4">
        <input type="text" maxlength="1" class="w-12 h-12 border rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-orange-400">
        <input type="text" maxlength="1" class="w-12 h-12 border rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-orange-400">
        <input type="text" maxlength="1" class="w-12 h-12 border rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-orange-400">
        <input type="text" maxlength="1" class="w-12 h-12 border rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-orange-400">
      </div>

      <!-- Verify Button -->
      <router-link to="/mykarma"> <button class="w-full bg-orange-500 text-white py-2 text-[12px] mt-6 rounded-sm hover:bg-orange-600">VERIFY</button></router-link>

      <!-- Resend OTP -->
      <p class="text-center text-[14px] text-gray-600 mt-4">
        Didn’t receive? <a href="#" class="text-orange-500 font-normal text-[14px]">Resend OTP</a>
      </p>
    </div>
  </div>
</template>