<template>
  <div class="pt-[62px] flex flex-col items-center min-h-screen bg-secondary" style="background: #F5F5F5;">
    <!-- Main Content Centered -->
    <main class="flex flex-col items-center text-center w-full px-4 min-h-[calc(100vh-64px)] justify-center">
      <h1 class="text-[28px] md:text-[33px] font-normal font-poppins">Your Journey of Kindness Starts Here</h1>

      <div class="text-center mt-2">
        <div class="flex flex-wrap justify-center gap-2 md:gap-4">
          <button class="border px-4 h-8 items-center bg-white rounded-full text-black border-orange-500 flex gap-1">
            <img src="../../assets/Frame.png" alt="Track Icon" class="w-4">
            <p class="text-[14px] font-normal">Track Your Impact</p>
          </button>
          <button class="border px-4 h-8 items-center bg-white rounded-full text-black border-orange-500 flex gap-1">
            <img src="../../assets/Frame (2).png" alt="Join Icon" class="w-4">
            <p class="text-[14px] font-normal">Join Activities Anywhere</p>
          </button>
          <button class="border px-4 h-8 items-center bg-white rounded-full text-black flex gap-1"
            style="border-color: #F185BB;">
            <img src="../../assets/Frame (1).png" alt="Connect Icon" class="w-4">
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
          <div style="display: flex; flex-direction: row">
            <v-otp-input ref="otpInput" input-classes="otp-input"
              :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" separator="-" :num-inputs="6"
              v-model:value="bindValue" :should-auto-focus="true" :should-focus-order="true" @on-change="handleOnChange"
              @keyup.enter="verifyOTP" input-type="number" @on-complete="handleOnComplete"
              :placeholder="['*', '*', '*', '*', '*', '*']" />
          </div>
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
          Didn't receive?
          <a href="#" @click.prevent="resendOTP" :class="{
            'text-orange-500 hover:text-orange-600': !isResendDisabled,
            'text-gray-400 cursor-not-allowed': isResendDisabled
          }" class="font-normal text-[14px]">
            Resend OTP
            <span v-if="isResendDisabled">
              ({{ countdown }}s)
            </span>
          </a>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, inject, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const call = inject('call')
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const email = ref(route.query.email || '')
const bindValue = ref('') // Fix for OTP binding
const isResendDisabled = ref(false)
const countdown = ref(30) // 30 seconds countdown
let countdownTimer = null

const startCountdown = () => {
  isResendDisabled.value = true
  countdown.value = 30

  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer)
      isResendDisabled.value = false
    }
  }, 1000)
}

const resendOTP = async () => {
  if (isResendDisabled.value) return

  try {
    startCountdown()
    await getOTP()
  } catch (error) {
    isResendDisabled.value = false
    clearInterval(countdownTimer)
  }
}

// Cleanup timer when component unmounts
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})

const getOTP = async () => {
  if (!email.value) {
    toast.error('Please enter an email', {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return;
  }

  try {
    const response = await call('mykartavya.controllers.email.send_otp', { email: email.value })
    if (response.status === "success") {
      toast.success('OTP sent successfully', {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } else {
      isResendDisabled.value = false // Reset disabled state on error
      clearInterval(countdownTimer)
      toast.error('Failed to send OTP', {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  } catch (error) {
    isResendDisabled.value = false // Reset disabled state on error
    clearInterval(countdownTimer)
    toast.error('Failed to send OTP', {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }
}

const verifyOTP = async () => {
  if (bindValue.value.length !== 6) {
    toast.error('Please enter a 6-digit OTP', {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }
    )
    return;
  }
  if (!email.value) {
    router.push('/login');
    return;
  }
  if (route.query.full_name) {
    const response = await call('mykartavya.controllers.email.register_verify_otp', { email: email.value, otp: bindValue.value, full_name: route.query.full_name });
    if (response.status === "success") {
      toast.success('OTP verified successfully');
      // router.push('/mykarma');
      window.location.reload();
    } else {
      toast.error(response.message);
    }
  } else {
    try {
      loading.value = true
      const response = await call('mykartavya.controllers.email.verify_otp', { email: email.value, otp: bindValue.value });
      loading.value = false;

      if (response.status === "success") {
        toast.success('OTP verified successfully', {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
        )
        // router.push('/mykarma');
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      } else {
        toast.error('Invalid OTP, please try again', {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
        )
      }
    } catch (error) {
      loading.value = false;

      toast.error('Failed to verify OTP', {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
      )
    }
  }
}

// Add this function to handle OTP completion
const handleOnComplete = (value) => {
  // Automatically verify when all digits are entered
  verifyOTP();
}

// Add this function to handle OTP changes
const handleOnChange = (value) => {
  bindValue.value = value;
}
</script>

<style>
.otp-input {
  width: 40px;
  min-width: 40px !important;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}

.otp-input:focus {
  border-color: #D45A08;
}

/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input::placeholder {
  font-size: 15px;
  font-weight: 600;
}

/* Add these new styles */
.cursor-not-allowed {
  cursor: not-allowed;
}
</style>