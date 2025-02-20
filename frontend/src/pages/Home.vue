<template>
  <div class="flex flex-col items-center min-h-screen" style="background: #F5F5F5;">
    <div class="hidden md:flex space-x-4 justify-end px-10 bg-orange-100 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <path fill="currentColor" d="M8.5 3a5.5 5.5 0 0 1 4.383 8.823l4.147 4.147a.75.75 0 0 
       1-.976 1.133l-.084-.073l-4.147-4.147A5.5 5.5 0 1 1 8.5 3m0 1.5a4 4 0 1 0 0 8a4 4 0 0 0 0-8" />
        </svg>
        <a href="#" class="text-black-500 hover:underline">Register as Company</a>
        <a href="#" class="text-black-500 hover:underline">Register as NGO</a>
    </div>
    <header class="w-full bg-white h-16 flex justify-start gap-[163px]  px-8 items-center">
      <div class=" ">
        <img src="..//assets/mykartavya-logo (1).png" alt="MyKartavya" class="h-11">
      </div>
      <nav class="space-x-4">
        <a href="#" class="text-gray-700">Home</a>
        <a href="#" class="text-gray-700">About Us</a>
        <a href="#" class="text-gray-700">Features</a>
        <a href="#" class="text-gray-700">Kindness & Volunteering</a>
        <a href="#" class="text-gray-700">FAQs</a>
      </nav>
     
    </header>
    
    <main class="flex flex-col items-center text-center mt-16">
      <h1 class="text-2xl font-semibold">Your Journey of Kindness Starts Here</h1>
      <div class="flex space-x-4 mt-4">
        <button class="px-4 py-2 border rounded-full text-sm border-orange-500" >Track Your Impact</button>
        <button class="px-4 py-2 border rounded-full text-sm border-orange-500">Join Activities Anywhere</button>
        <button class="px-4 py-2 border rounded-full text-sm border-orange-500">Connect with a Community</button>
      </div>
      
        <div class="mt-8 bg-white p-6  rounded-sm w-112">
          <h2 class="text-lg font-medium mb-4">Login to your account</h2>
          <input type="email" placeholder="sample@example.com" class="w-full p-2 border rounded-sm mb-4 text-[14px]" style="color: #6E7073;">
          <router-link to="/verify"> <button class="w-full  text-white py-2 rounded-sm text-[14px]" style="background: #FF5722;">GET OTP</button></router-link>
          <p class="text-sm mt-4" style="color: #6E7073;">Don't have an account? <a href="#" class="text-orange-500">Sign up</a></p>
          <div class="flex items-center my-1">
          <hr class="flex-grow border-t border-gray-300">
          <span class="mx-1 text-gray-500 text-[12px]">OR</span>
          <hr class="flex-grow border-t border-gray-300">
        </div>

        <div class="mt-4 ">
          <button class="w-full flex items-center justify-start p-2 gap-12  border rounded-sm mb-2 text-[14px] font-normal">
            <img src="..//assets//icons8-google-48.png" alt="Google" class="h-5 mr-2"> Continue with Google
          </button>
          <button class="w-full flex items-center justify-start p-2 gap-12 border rounded-sm text-[14px]">
            <img src="..//assets/icons8-microsoft-48.png" alt="Microsoft" class="h-5 mr-2"> Continue with Microsoft
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// No additional logic needed for this static UI
</script>

<style>
/* Additional global styles if required */
</style>


