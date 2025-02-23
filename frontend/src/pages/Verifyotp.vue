<template>
  <div class="pt-[62px] flex flex-col items-center min-h-screen bg-secondary" style="background: #F5F5F5;">
    <!-- Main Content Centered -->
    <main class="flex flex-col items-center text-center w-full px-4 min-h-[calc(100vh-64px)] justify-center">
      <h1 class="text-[28px] md:text-[33px] font-normal font-poppins">Your Journey of Kindness Starts Here</h1>

      <div class="text-center mt-2">
        <div class="flex flex-wrap justify-center gap-2 md:gap-4">
          <button class="border px-4 h-8 items-center bg-white rounded-full text-black border-orange-500 flex gap-1">
            <img src="../assets/Frame.png" alt="Track Icon" class="w-4">
            <p class="text-[14px] font-normal">Track Your Impact</p>
          </button>
          <button class="border px-4 h-8 items-center bg-white rounded-full text-black border-orange-500 flex gap-1">
            <img src="../assets/Frame (2).png" alt="Join Icon" class="w-4">
            <p class="text-[14px] font-normal">Join Activities Anywhere</p>
          </button>
          <button class="border px-4 h-8 items-center bg-white rounded-full text-black flex gap-1"
            style="border-color: #F185BB;">
            <img src="../assets/Frame (1).png" alt="Connect Icon" class="w-4">
            <p class="text-[14px] font-normal">Connect with a Community</p>
          </button>
        </div>
      </div>

      <!-- OTP Verification Box -->
      <div class="bg-white p-6 mt-[36px] rounded-sm w-[443px] max-w-full">
        <h2 class="text-[20px] font-medium font-poppins text-gray-900 text-center">OTP Verification</h2>
        <p class="text-gray-600 text-center mt-1 text-[12px] font-normal">
          We've shared a 6-digit OTP on <span class="text-orange-500 font-semibold">{{ email || 'sample@gmail.com'
          }}</span>
        </p>

        <!-- OTP Input -->
        <div class="flex justify-center space-x-2 mt-4">
          <input v-for="(digit, index) in 6" :key="index" v-model="otp[index]" type="text" maxlength="1"
            class="w-10 h-10 border rounded-[4px] text-center text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            @input="moveToNext($event, index)">
        </div>

        <!-- Verify Button -->
        <router-link to="/mykarma">
          <button @click.prevent="verifyOTP"
            class="w-full flex items-center justify-center h-10 bg-orange-500 text-white py-2 text-[12px] mt-6 rounded-sm hover:bg-orange-600">
            <div class="h-5 w-5" v-if="loading">
              <div
                class="animate-spin h-full w-full rounded-full border-[2px] flex justify-center items-center border-dotted border-[#fff]">
                <div class="w-3 h-3 rounded-full border-dashed border-[1px] border-[#fff]"></div>
              </div>
            </div>
            <p v-else>VERIFY</p>
          </button>
        </router-link>

        <!-- Resend OTP -->
        <p class="text-center text-[14px] text-gray-600 mt-4">
          Didn’t receive?
          <a href="#" @click.prevent="resendOTP" class="text-orange-500 font-normal text-[14px]">Resend OTP</a>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const call = inject('call')
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const email = ref(route.query.email || '')
const otp = ref(['', '', '', '', '', '']) // Changed to 6 digits

const getOTP = async () => {
  if (!email.value) {
    alert('Please enter email')
    return
  }

  try {
    const response = await call('mykartavya.email.verify_otp', { email: email.value })
    if (response.status === "success") {
      alert('OTP sent successfully')
    }
  } catch (error) {
    console.error('Error sending OTP:', error)
    alert('Failed to send OTP')
  }
}

const verifyOTP = async () => {
  const otpValue = otp.value.join('')
  if (otpValue.length !== 6) { // Changed to 6
    alert('Please enter a complete 6-digit OTP')
    return
  }
  try {
    loading.value = true
    const response = await call('mykartavya.email.verify_otp', { email: route.query.email, otp: otpValue });
    if (response.status === "success") {
      loading.value = false
      router.push('/')
    }else{
      loading.value = false
    }
  } catch (error) {
    loading.value = false
    console.error('Error verifying OTP:', error)
    alert('Failed to verify OTP')
  }
}

const resendOTP = () => {
  getOTP()
}

const moveToNext = (event, currentIndex) => {
  const value = event.target.value
  if (value && currentIndex < 5) { // Changed to 5 (0-5 = 6 digits)
    const nextInput = event.target.parentElement.children[currentIndex + 1]
    nextInput.focus()
  }
}
</script>