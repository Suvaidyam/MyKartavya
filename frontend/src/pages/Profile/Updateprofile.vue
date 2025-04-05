<template>
  <div class="max-w-[1920px] mx-auto px-10 pt-[82px] pb-4 bg-gray-50">
    <div class="h-[261px] rounded-b-md bg-white">
      <div class="relative">
        <div class="w-full h-[152px] relative">
          <img v-if="formData.custom_background_image" :src="formData.custom_background_image" alt="Banner"
            class="w-full h-full object-cover" />
          <img v-else src="../../assets/Rectangle.png" alt="Banner" class="w-full h-full object-cover" />
          <!-- Background Image Upload Button -->
          <label
            class="absolute bottom-4 right-4 bg-white/90 hover:bg-white px-3 py-1.5 rounded-md shadow-sm cursor-pointer flex items-center space-x-2 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-sm text-gray-600">Change Cover</span>
            <input type="file" class="hidden" @change="handleFileUpload($event, 'custom_background_image')"
              accept="image/*" />
          </label>
        </div>
        <div class="absolute left-8 -bottom-8">
          <div class="relative">
            <div class="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <img v-if="formData.user_image" :src="formData.user_image" alt="Profile"
                class="w-full h-full object-cover" />
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-[40px] text-gray-600">
                {{ auth.cookie.full_name.charAt(0).toUpperCase() }}
              </div>
            </div>
            <!-- Profile Image Upload Button -->
            <label
              class="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md cursor-pointer hover:bg-gray-50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input type="file" class="hidden" @change="handleFileUpload($event, 'user_image')" accept="image/*" />
            </label>
          </div>
        </div>
      </div>
      <div class="pt-10 px-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-medium">{{ auth.cookie.full_name }}</h1>
            <p class="text-bodyh1 text-gray-600 mt-1">{{ auth.cookie.user_id }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">Status:</span>
            <span class="px-3 py-1 text-sm font-medium rounded-full" :class="{
              'bg-green-100 text-green-800': workflowState === 'Approved',
              'bg-yellow-100 text-yellow-800': workflowState === 'Pending Approval',
              'bg-red-100 text-red-800': workflowState === 'Rejected',
              'bg-gray-100 text-gray-800': !workflowState || workflowState === 'Not Set'
            }">
              {{ workflowState || 'Not Set' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow mt-4">
      <div class="p-6">
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-6">Personal Info</h2>
          <form @submit.prevent="onSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div v-for="(field, key) in visibleFields" :key="key" class="min-w-[300px]">
                <label class="block text-bodyh1 font-normal text-gray-700 mb-2">
                  {{ field.label }} <span class="text-red-500" v-if="field.required">*</span>
                </label>
                <div class="flex"
                  v-if="key !== 'custom_date_of_birth' && field.type !== 'select' && field.type !== 'file'">
                  <div v-if="key == 'custom_phone_number'" class="relative">
                    <select v-model="formData.country_code"
                      class="h-[42px] appearance-none border border-gray-300 text-bodyh2 rounded-l px-4 focus:outline-none focus:ring focus:ring-orange-200 min-w-[100px] flex items-center gap-2">
                      <option v-for="el in code" :key="el.dial_code" :value="el.dial_code"
                        class="flex items-center gap-2">
                        <span class="inline-block w-6">{{ el.flag }}</span>{{ el.dial_code }}
                      </option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <input v-model="formData[key]" :type="field.type" :name="key" :placeholder="field.placeholder"
                    :readonly="field.readonly" :maxlength="field.maxLength" :disabled="field.readonly"
                    class="block w-full border border-gray-300 text-bodyh2 h-[42px] px-4 focus:outline-none focus:ring focus:ring-orange-200"
                    :class="[key == 'custom_phone_number' ? 'rounded-r border-l-0' : 'rounded']"
                    @change="handleInputChange(key, $event)" />
                </div>

                <input v-else-if="key === 'custom_date_of_birth'" v-model="formData.custom_date_of_birth" type="date"
                  name="custom_date_of_birth" :max="maxDate" :min="minDate"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2.5 px-4 focus:outline-none focus:ring focus:ring-orange-200" />

                <div v-else-if="field.type === 'file'" class="flex flex-col">
                  <label
                    class="flex items-center px-4 py-3 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-500 mr-2" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span class="text-sm text-gray-600">{{ formData[key] ? 'Change File' : 'Upload File' }}</span>
                    <input type="file" class="hidden" @change="handleFileUpload($event, key)" accept="*/*" />
                  </label>

                  <!-- File Preview with Remove Button -->
                  <div v-if="formData[key]" class="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span class="text-sm text-gray-600">{{ getFileName(formData[key]) }}</span>
                      </div>
                      <button @click="removeFile(key)"
                        class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <select v-if="field.type === 'select'" v-model="formData[key]" :name="key" :disabled="field.readonly"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2.5 px-4 focus:outline-none focus:ring focus:ring-orange-200"
                  :class="{ 'bg-gray-100': field.readonly }">
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
            </div>

            <div class="mt-8 flex justify-start">
              <button type="submit"
                class="bg-orange-500 text-white font-semibold py-2.5 px-8 rounded-sm hover:bg-orange-600 transition flex items-center justify-center min-w-[120px]"
                :disabled="loading">
                <span v-if="loading"
                  class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                {{ loading ? 'UPDATING...' : 'UPDATE' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, watch, nextTick, computed } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from "vue-router";
import country_code from "@/assets/Country/Country_code.js";

// Inject API call function
const call = inject("call");
const auth = inject("auth");
const router = useRouter();
const errorFieldRef = ref(null);

const code = ref(country_code)

// Form fields and data
const fields = ref({
  first_name: {
    label: "First Name",
    type: "text",
    required: true,
    pattern: /^[A-Za-z]+$/,
    error_message: "Please enter a valid first name (letters only)",
    maxLength: 100
  },
  last_name: {
    label: "Last Name",
    type: "text",
    required: true,
    maxLength: 100
  },
  custom_phone_number: {
    label: "Phone Number",
    type: "tel",
    required: true,
    pattern: /^[0-9]{10}$/,
    error_message: "Please enter a valid 10-digit phone number",
    maxLength: 10
  },

  custom_country: { label: "Country", type: "select", required: true },
  custom_state: { label: "State", type: "select", required: true },
  custom_city: { label: "City", type: "select", required: true },
  custom_company: { label: "Organization", type: "select", required: false, readonly: false },
  custom_date_of_birth: {
    label: "Date of Birth",
    type: "date",
    required: true,
    min: "1900-01-01",
    max: new Date().toISOString().split("T")[0],
    max: "maxDate",
    error_message: "You must be at least 18 years old"
  },
  custom_gender: {
    label: "Gender",
    type: "select",
    required: true,
    options: [
      { name: "Male", label: "Male" },
      { name: "Female", label: "Female" },
      { name: "Other", label: "Other" }
    ]
  },
  custom_designation: {
    label: "Designation",
    type: "text",
    placeholder: "Enter your title",
    required: false
  },
  custom_linkedin: {
    label: "LinkedIn",
    type: "text",
    required: false
  },

  custom_cv: {
    label: "CV",
    type: "file",
    required: false
  },
  custom_portfolio: {
    label: "Portfolio",
    type: "file",
    required: false
  },
});

const formData = ref({
  first_name: "",
  last_name: "",
  custom_phone_number: "",
  country_code: "+91", // Default country code
  custom_country: "",
  custom_state: "",
  custom_city: "",
  custom_company: "",
  custom_date_of_birth: "",
  custom_linkedin: "",
  custom_cv: "",
  custom_portfolio: "",
  custom_gender: "",
  custom_designation: "",
});

// Computed property to filter out fields based on conditions
const visibleFields = computed(() => {
  const result = { ...fields.value };

  // If there's no company or it's empty, remove the company field
  if (!formData.value.custom_company) {
    delete result.custom_company;
  } else {
    // If company exists, make it readonly
    result.custom_company.readonly = true;
  }

  return result;
});

const maxDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18); // Subtract 18 years from current date
  return date.toISOString().split('T')[0];
});

const minDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 100); // Allow dates up to 100 years ago
  return date.toISOString().split('T')[0];
});

const errors = ref({});  // Errors object

const countries = ref([]);
const states = ref([]);
const cities = ref([]);
const companies = ref([]);

// First, add the loading state ref at the top with other refs
const loading = ref(false);

const workflowState = ref('');

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
  try {
    let res = await call("mykartavya.controllers.api.sva_user_data");
    if (res && res.length > 0) {
      formData.value = res[0];
      // Extract country code and phone number if they exist
      if (formData.value.custom_phone_number && formData.value.custom_phone_number.includes('-')) {
        const [countryCode, phoneNumber] = formData.value.custom_phone_number.split('-');
        formData.value.country_code = countryCode;
        formData.value.custom_phone_number = phoneNumber;
      }
      // Set the workflow state from the API response
      workflowState.value = res[0].workflow_state || 'Not Set';
      // Ensure auth.cookie.name is set
      auth.cookie.name = res[0].name;
    } else {
      throw new Error('Failed to load user details.');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    toast.error('Failed to load user details. Please try again.');
  }
};

const validateForm = () => {
  errors.value = {}; // Clear previous errors
  let valid = true;

  for (const key in formData.value) {
    const field = visibleFields.value[key];
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

    // Date of Birth Validation
    if (key === "custom_date_of_birth" && value) {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      // Adjust age if birthday hasn't occurred this year
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        const actualAge = age - 1;
        if (actualAge < 18) {
          errors.value[key] = "You must be at least 18 years old";
          valid = false;
        }
      } else if (age < 18) {
        errors.value[key] = "You must be at least 18 years old";
        valid = false;
      }

      // Check if date is too old (more than 100 years)
      if (age > 100) {
        errors.value[key] = "Please enter a valid date of birth";
        valid = false;
      }
    }

    // Phone Number Validation
    if (key === "custom_phone_number") {
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
    if (key === "first_name" && field.pattern && !field.pattern.test(value)) {
      errors.value[key] = field.error_message;
      valid = false;
    }

    if (key === "last_name" && value && field.pattern && !field.pattern.test(value)) {
      errors.value[key] = field.error_message;
      valid = false;
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

  loading.value = true;
  try {
    // Format phone number with country code
    const formattedPhoneNumber = `${formData.value.country_code}-${formData.value.custom_phone_number}`;

    const formDataToSend = {
      name: formData.value.name,
      first_name: formData.value.first_name,
      last_name: formData.value.last_name || "",
      custom_phone_number: formattedPhoneNumber, // Use the formatted phone number
      custom_date_of_birth: formData.value.custom_date_of_birth,
      custom_country: formData.value.custom_country,
      custom_state: formData.value.custom_state,
      custom_city: formData.value.custom_city,
      custom_company: formData.value.custom_company || "",
      custom_designation: formData.value.custom_designation || "",
      custom_linkedin: formData.value.custom_linkedin || "",
      custom_portfolio: formData.value.custom_portfolio || "",
      custom_cv: formData.value.custom_cv || "",
      custom_gender: formData.value.custom_gender,
      user_image: formData.value.user_image || "",
      custom_background_image: formData.value.custom_background_image || ""
    };

    let res = await call("mykartavya.controllers.api.update_sva_user", {
      data: formDataToSend
    });

    if (res.status == 200) {
      toast.success("Profile updated successfully!", { "autoClose": 2000 });
      setTimeout(() => router.push("/"), 1000);
    } else {
      throw new Error(res.message || "Failed to update profile");
    }
  } catch (error) {
    console.error('Error in form submission:', error);
    toast.error(error.message || "An error occurred while updating the profile.", { "autoClose": 2000 });
  } finally {
    loading.value = false;
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
    case "custom_gender":
      return fields.value.custom_gender.options;
    case "country_code":
      return fields.value.country_code.options;
    default:
      return [];
  }
};

// On Mounted
onMounted(async () => {
  fetchCountries();
  fetchCompanies();
  getDetails();
  if (localStorage.getItem('updateprofile') == 'true') {
    toast.error("Please update your profile to continue.", { "autoClose": 2000 });
    localStorage.removeItem('updateprofile');
  }
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

// Method to handle input change
const handleInputChange = (key, event) => {
  console.log(`Field ${key} changed to:`, event.target.value);
  // Additional logic can be added here
};

// Add these methods in the script section after the existing methods
const handleFileUpload = async (event, field) => {
  const file = event.target.files[0]
  if (!file) {
    toast.error('Please select a file.', { "autoClose": 2000 })
    return
  }
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (file.size > maxSize) {
    toast.error('File size exceeds 5 MB limit.', { "autoClose": 2000 })
    return
  }

  // For image files, validate file type
  if (field === 'user_image' || field === 'custom_background_image') {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPG, PNG, or WEBP)', { "autoClose": 2000 })
      return
    }
  }

  // Convert to Base64
  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.onload = async () => {
    try {
      const base64Data = reader.result.split(',')[1] // Convert Base64
      formData.value[field] = base64Data
      toast.success('File uploaded successfully!', { "autoClose": 2000 })
    } catch (err) {
      console.error('Error uploading file:', err)
      toast.error('Failed to upload file. Please try again.', { "autoClose": 2000 })
    }
  }
}

const removeFile = (field) => {
  formData.value[field] = null
  toast.info('File removed.', { "autoClose": 2000 })
}

const getFileName = (base64String) => {
  if (!base64String) return ''
  if (base64String.startsWith('data:')) {
    return 'Image File'
  }
  return 'Uploaded File'
}
</script>

<style scoped>
.country-select {
  background-color: white;
}

.country-select option {
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Custom styling for the select dropdown */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  cursor: pointer;
}

/* Ensure the flag and dial code are properly spaced */
select option {
  font-size: 14px;
  line-height: 1.5;
}

/* Add hover effect on options */
select option:hover {
  background-color: #f3f4f6;
}

/* Style for the selected option */
select:focus option:checked {
  background-color: #f97316;
  color: white;
}
</style>