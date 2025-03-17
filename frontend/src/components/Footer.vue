<template>
  <footer class="text-white py-10 px-6 md:px-16 w-full bg-[#0B0B0B]">
    <div class="  flex flex-col flex-wrap lg:flex-row md:justify-between items-start gap-10">

      <!-- Explore Section -->
      <div class="flex flex-col gap-4">
        <h3 class="text-bodyh1 font-normal text-white font-poppin">Explore</h3>
        <ul class="space-y-2">
          <li>
            <a href="/about-us" class="text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">
              About MyKartavya
            </a>
          </li>
          <li><a href="/features" class=" text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">MyKartavya Features</a>
          </li>
          <li><a href="/kindness-volunteering" class=" text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">Acts of Random
              Kindness</a></li>
          <li><a href="/kindness-volunteering" class=" text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">Volunteering
              Opportunities</a></li>
          <li><a href="/company-registration" class=" text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">MyKartavya for
              Companies</a></li>
          <li><a href="/ngo-registration" class=" text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">MyKartavya for NGOs</a>
          </li>
        </ul>
      </div>

      <!-- Resources Section -->
      <div class="flex flex-col gap-4">
        <h3 class="text-bodyh1 font-normal text-white font-poppin">Resources</h3>
        <ul class="space-y-2">
          <li><a href="#" class=" text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">Testimonials</a></li>
          <li><a href="/faqs" class=" text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">MyKartavya FAQs</a></li>
          <li><router-link to="/contact" class=" text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">Contact
              Us</router-link></li>
          <li><a href="#" class=" text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">Privacy Policy</a></li>
          <li><a href="#" class=" text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">Terms of Use</a></li>
          <li><a href="#" class=" text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300">Disclaimer</a></li>
        </ul>
      </div>

      <!-- Contact Us Section -->
      <div class="flex flex-col gap-4">
        <h3 class="text-bodyh1 font-normal text-white font-poppin">Contact Us</h3>
        <div class="space-y-3">
          <p class="flex items-center   text-bodyh1 font-normal font-poppin text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300s"><img
              src="https://res.cloudinary.com/dusyfh7fo/image/upload/v1740557767/location_uxabp5.png" class="h-5 mr-2"
              alt="">NASSCOM Plot 7 to 10, Sector 126, Noida - 201303</p>
          <p class="flex items-center   text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300"><img
              src="https://res.cloudinary.com/dusyfh7fo/image/upload/v1740557892/phone_yrlabr.png" class="h-5 mr-2"
              alt="">+91-120-4990111</p>
          <p class="flex items-center   text-bodyh1 font-normal font-poppins text-[#D9D9D9] hover:text-secondary
              transition-colors duration-300"><img
              src="https://res.cloudinary.com/dusyfh7fo/image/upload/v1740557383/message_reqg58.png" class="h-5 mr-2"
              alt="">mykartavya@nasscomfoundation.org</p>
        </div>
      </div>

      <!-- Subscribe Section -->
      <div class="bg-gray-800 p-6  w-full lg:w-[338px]">
        <h3 class="text-bodyh1 font-medium">Subscribe</h3>
        <div class="mt-4 flex">
          <input type="email" placeholder="Email address" v-model="email"
            class="w-full px-2 h-[50px] text-black rounded-l-sm">
          <button @click="handleSubscribe"
            class="bg-[#FF5722] h-[50px] w-[50px] flex items-center justify-center rounded-r-sm">
            <FeatherIcon name="arrow-right" class="size-4 text-white" />
          </button>
        </div>
        <p class="mt-2 text-caption font-normal text-gray-400">NASSCOM Foundation works with the industry to drive
          social transformation and impact through technology.</p>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div
      class="mt-10 border-t border-gray-700 pt-5 flex flex-col md:flex-row md:justify-between items-center text-gray-400 text-sm">
      <img src="https://res.cloudinary.com/dusyfh7fo/image/upload/v1740553849/image_3_njkzil.png" class="h-8"
        alt="MyKartavya">
      <div class="flex space-x-4 mt-4 md:mt-0">
        <a href="#" class="hover:underline text-white text-bodyh2 font-normal font-poppins">Terms</a>
        <a href="#" class="hover:underline text-white text-bodyh2 font-normal font-poppins">Privacy</a>
        <a href="#" class="hover:underline text-white text-bodyh2 font-normal font-poppins">Cookies</a>
      </div>
      <div class="flex space-x-4 mt-4 md:mt-0">
        <img src="https://res.cloudinary.com/dusyfh7fo/image/upload/v1740554595/Linkedin_vaecy8.png" class="h-8"
          alt="LinkedIn">
        <img src="https://res.cloudinary.com/dusyfh7fo/image/upload/v1740554676/Facebook_zxsx2q.png" class="h-8"
          alt="Facebook">
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { FeatherIcon } from 'frappe-ui';
// Reactive email variable
const email = ref('');
// Handle button click
const handleSubscribe = () => {
  if (!email.value.trim()) {
    console.log('Please enter a valid email address.');
  } else {
    console.log(email.value);
    email.value = ''; // Clear input field after submission
  }
};
</script>
