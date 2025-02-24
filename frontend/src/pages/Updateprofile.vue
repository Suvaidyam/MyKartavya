<template>
  <div class="max-w-[1920px] mx-auto px-10 pt-[82px] pb-4 bg-gray-50">
    <div class="h-[261px] rounded-b-md bg-white">
      <div class="relative">
        <div class="w-full h-[152px]">
          <img src="../assets/Rectangle.png" alt="Banner" class="w-full h-full object-cover" />
        </div>
        <div class="absolute left-8 -bottom-8">
            <div class="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                <img v-if="auth.user_image" :src="auth.user_image" alt="Profile" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-[40px] text-gray-600">
                    {{ auth.cookie.full_name.charAt(0) }}
                </div>
            </div>
        </div>
      </div>
      <div class="pt-10 px-4">
        <h1 class="text-3xl font-medium">{{ auth.cookie.full_name }}</h1>
        <p class="text-bodyh1 text-gray-600 mt-1">{{ auth.cookie.user_id }}</p>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow mt-4 p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Personal Info</h2>
      <form @submit.prevent="onSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(field, key) in fields" :key="key">
            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">{{ field.label }}</label>
            <input
              v-model="formData[key]"
              :type="field.type"
              :placeholder="field.placeholder"
              class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
            />
          </div>
          
          <!-- CV Upload -->
          <div>
            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">Add CV</label>
            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 text-orange-500 p-4 rounded cursor-pointer"
              @click="cvInput.click()"
            >
              <svg class="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7 3h10M7 3a2 2 0 00-2 2v2m2-2h10m0 0a2 2 0 012 2v2m-2-2H7m13 8V8H4v8a2 2 0 002 2h12a2 2 0 002-2z" />
              </svg>
              <span class="text-bodyh1">Click to upload or drag and drop</span>
              <input ref="cvInput" type="file" accept=".pdf,.doc,.docx" class="hidden" @change="onCvSelected" />
            </div>
          </div>

          <!-- Portfolio Upload -->
          <div>
            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">Add Portfolio</label>
            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 text-orange-500 p-4 rounded cursor-pointer"
              @click="portfolioInput.click()"
            >
              <svg class="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7 3h10M7 3a2 2 0 00-2 2v2m2-2h10m0 0a2 2 0 012 2v2m-2-2H7m13 8V8H4v8a2 2 0 002 2h12a2 2 0 002-2z" />
              </svg>
              <span class="text-sm">Click to upload or drag and drop</span>
              <input ref="portfolioInput" type="file" accept=".pdf,.doc,.docx" class="hidden" @change="onPortfolioSelected" />
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" class="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition">
            UPDATE
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";

// Inject API call function
const call = inject("call");
const auth = inject("auth");

// Form fields and data
const fields = ref({
  first_name: { label: "First Name", type: "text", placeholder: "Enter your first name" },
  last_name: { label: "Last Name", type: "text", placeholder: "Enter your last name" },
  mobile_number: { label: "Phone No.", type: "text", placeholder: "Enter phone number" },
  custom_country: { label: "Country", type: "text", placeholder: "Enter country" },
  custom_state: { label: "State", type: "text", placeholder: "Enter state" },
  custom_city: { label: "City", type: "text", placeholder: "Enter city" },
  custom_date_of_birth: { label: "Date of Birth", type: "date", placeholder: "" },
  custom_ngo: { label: "Organization Name", type: "text", placeholder: "Enter organization name" },
  title: { label: "Title", type: "text", placeholder: "Enter your title" },
  custom_employee_id: { label: "Employee ID", type: "text", placeholder: "Enter employee ID" },
  linkedin: { label: "LinkedIn Profile", type: "url", placeholder: "Enter LinkedIn URL" },
});

// Form Data
const formData = ref({
  first_name: "",
  last_name: "",
  mobile_number: "",
  custom_country: "",
  custom_state: "",
  custom_city: "",
  custom_date_of_birth: "",
  custom_ngo: "",
  title: "",
  custom_employee_id: "",
  linkedin: "",
});

// Refs for File Inputs
const cvInput = ref(null);
const portfolioInput = ref(null);

// Fetch details from API
const getDetails = async () => {
  let res = await call("mykartavya.controllers.api.sva_user_data");
  if (res) {
    formData.value = res[0]; // Populate form with fetched data
  }
};

onMounted(() => {
  getDetails();
});

// File selection handlers
const onCvSelected = (event) => {
  const file = event.target.files[0];
  if (file) console.log("CV File Selected:", file.name);
};

const onPortfolioSelected = (event) => {
  const file = event.target.files[0];
  if (file) console.log("Portfolio File Selected:", file.name);
};

// Form Submission
const onSubmit = () => {
  console.log("Form data:", formData.value);
  alert("Form submitted!");
};
</script>

<style scoped></style>
