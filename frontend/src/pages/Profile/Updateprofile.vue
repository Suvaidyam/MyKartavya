<template>
  <div class="max-w-[1920px] mx-auto px-10 pt-[82px] pb-4 bg-gray-50">
    <div class="h-[261px] rounded-b-md bg-white">
      <div class="relative">
        <div class="w-full h-[152px]">
          <img src="../../assets/Rectangle.png" alt="Banner" class="w-full h-full object-cover" />
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
            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
              {{ field.label }} <span class="text-red-500 pt-2" v-if="field.required">*</span>
            </label>
            <input v-if="key !== 'custom_date_of_birth' && field.type !== 'select'" v-model="formData[key]"
              :type="field.type" :name="key" :placeholder="field.placeholder"
              class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />

            <input v-else-if="key === 'custom_date_of_birth'" v-model="formData.custom_date_of_birth" type="date"
              name="custom_date_of_birth" :max="maxDate"
              class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />

            <select v-if="field.type === 'select'" v-model="formData[key]" :name="key"
              class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200">
              <option value="" disabled>Select {{ field.label }}</option>
              <option v-for="option in getOptions(key)" :key="option.name" :value="option.name">
                {{ option.label || option.name }}
              </option>
            </select>

            <!-- Validation Error Message -->
            <p v-if="errors[key]" class="text-red-500 text-[11px] mt-1">
              {{ errors[key] }}
            </p>

          </div>
          <!-- CV Upload -->
          <div>
            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">Add CV</label>
            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 text-orange-500 p-4 rounded cursor-pointer"
              @click="cvInput.click()">
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
              @click="portfolioInput.click()">
              <svg class="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7 3h10M7 3a2 2 0 00-2 2v2m2-2h10m0 0a2 2 0 012 2v2m-2-2H7m13 8V8H4v8a2 2 0 002 2h12a2 2 0 002-2z" />
              </svg>
              <span class="text-sm">Click to upload or drag and drop</span>
              <input ref="portfolioInput" type="file" accept=".pdf,.doc,.docx" class="hidden"
                @change="onPortfolioSelected" />
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit"
            class="bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm hover:bg-orange-600 transition">
            UPDATE
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, watch, nextTick } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from "vue-router";

// Inject API call function
const call = inject("call");
const auth = inject("auth");
const router = useRouter();
const errorFieldRef = ref(null);


// Form fields and data
const fields = ref({
  first_name: {
    label: "First Name",
    type: "text",
    required: true,
    pattern: /^[A-Za-z]+$/,
    error_message: "Please enter a valid first name (letters only)"
  },
  last_name: {
    label: "Last Name",
    type: "text",
    required: false,
  },
  mobile_number: {
    label: "Phone No.",
    type: "text",
    required: true,
    pattern: /^[0-9]{10}$/,  // Validates a 10-digit phone number
    error_message: "Invalid phone number "
  },
  custom_country: { label: "Country", type: "select", required: true },
  custom_state: { label: "State", type: "select", required: true },
  custom_city: { label: "City", type: "select", required: true },
  custom_company: { label: "Company", type: "select", required: false },
  custom_date_of_birth: {
    label: "Date of Birth",
    type: "date",
    required: true,
    min: "1900-01-01",
    max: new Date().toISOString().split("T")[0],
    max: "maxDate",
    error_message: "Please select a valid date of birth"
  },
  title: { label: "Title", type: "text", placeholder: "Enter your title", required: false }
});


const formData = ref({
  first_name: "",
  last_name: "",
  mobile_number: "",
  custom_country: "",
  custom_state: "",
  custom_city: "",
  custom_company: "",
  custom_date_of_birth: "",
  title: "",
});

const maxDate = ref(new Date().toISOString().split("T")[0]); // Today's date


const errors = ref({});  // Errors object

const countries = ref([]);
const states = ref([]);
const cities = ref([]);
const companies = ref([]);

const fetchCountries = async () => {
  const res = await call("mykartavya.controllers.api.country_data");
  countries.value = res || [];
};

const fetchStates = async () => {
  if (!formData.value.custom_country) return;
  const res = await call("mykartavya.controllers.api.state_data", { country: formData.value.custom_country });
  states.value = res || [];
};

const fetchCities = async () => {
  if (!formData.value.custom_state) return;
  const res = await call("mykartavya.controllers.api.city_data", { state: formData.value.custom_state });
  cities.value = res || [];
};

const fetchCompanies = async () => {
  const res = await call("mykartavya.controllers.api.company_data");
  companies.value = res || [];
};

watch(() => formData.value.custom_country, fetchStates);
watch(() => formData.value.custom_state, fetchCities);

// Get user details
const getDetails = async () => {
  let res = await call("mykartavya.controllers.api.sva_user_data");
  if (res && res.length > 0) {
    formData.value = res[0];
  }
};

const validateForm = () => {
  errors.value = {}; // Clear previous errors
  let valid = true;

  for (const key in formData.value) {
    const field = fields.value[key];
    const value = formData.value[key];

    if (!field) {
      continue;
    }

    // Required Field Validation
    if (field.required && !value) {
      errors.value[key] = `${field.label} is required.`;
      valid = false;

      if (!errorFieldRef.value) {
        errorFieldRef.value = key;  // Store the first invalid field
      }
    }

    // Phone Number Validation
    if (key === "mobile_number") {
      // Trim the value to ensure no extra spaces
      const trimmedValue = value?.trim();

      // Check if the mobile number doesn't match the 10-digit pattern
      if (!field.pattern?.test(trimmedValue)) {
        if (trimmedValue?.length === 0) {
          errors.value[key] = "Phone number is required.";
        } else if (trimmedValue?.length !== 10) {
          errors.value[key] = "Phone number must be exactly 10 digits.";
        } else {
          errors.value[key] = field.error_message;  // Default error message for invalid phone number
        }
        valid = false;
      }
    }

    // First and Last Name Validation (only letters)
    console.log(value);
    if (key === "first_name" && field.pattern && !field.pattern.test(value)) {
      errors.value[key] = field.error_message;
      valid = false;
    }

    if (key === "last_name" && field.pattern && !field.pattern.test(value)) {
      errors.value[key] = field.error_message;
      valid = false;
    }
    // Date of Birth Validation
    // Date of Birth Validation
    if (key === "custom_date_of_birth") {
      if (!value) {
        errors.value[key] = "Date of birth is required.";
        valid = false;
      } else {
        const dob = new Date(value);
        const today = new Date();

        if (dob > today) {
          errors.value[key] = "You cannot select a future date.";
          valid = false;
        } else {
          delete errors.value[key]; // Clear errors if valid
        }
      }
    }



  }

  // Return whether the form is valid or not
  return valid;
};

// On Submit
const onSubmit = async () => {
  if (!validateForm()) {
    scrollToFirstError();
    return;
  }

  try {
    let res = await call("mykartavya.controllers.api.update_sva_user", {
      data: JSON.stringify(formData.value)
    });

    if (res.success) {
      toast.success("Profile updated successfully!", { "autoClose": 3000 });
      setTimeout(() => router.back(-1), 3000)
    } else {
      toast.error(res.message || "Failed to update profile.");
    }
  } catch (error) {
    toast.error("An error occurred while updating the profile.");
  }
};

// Get Options for Select fields
const getOptions = (key) => {
  switch (key) {
    case "custom_country":
      return countries.value.map(c => ({ name: c.name, label: c.label || c.name }));
    case "custom_state":
      return states.value.map(s => ({ name: s.name, label: s.state_name || s.name }));
    case "custom_city":
      return cities.value.map(c => ({ name: c.name, label: c.district_name || c.name }));
    case "custom_company":
      return companies.value.map(comp => ({ name: comp.name, label: comp.company_name || comp.name }));
    default:
      return [];
  }
};

// On Mounted
onMounted(() => {
  fetchCountries();
  fetchCompanies();
  getDetails();
});

const scrollToFirstError = async () => {
  if (errorFieldRef.value) {
    await nextTick();  // Ensure the DOM updates first
    const element = document.querySelector(`[name="${errorFieldRef.value}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.focus();
    }
    errorFieldRef.value = null;  // Reset after scrolling
  }
};

</script>
