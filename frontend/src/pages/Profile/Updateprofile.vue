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

    <div class="bg-white rounded-lg shadow mt-4">
      <!-- Tab Content -->
      <div class="p-6">
        <!-- Personal Info Tab -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Personal Info</h2>
          <form @submit.prevent="onSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(field, key) in visibleFields" :key="key">
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  {{ field.label }} <span class="text-red-500 pt-2" v-if="field.required">*</span>
                </label>
                <input v-if="key !== 'custom_date_of_birth' && field.type !== 'select' && field.type !== 'file'"
                  v-model="formData[key]" :type="field.type" :name="key" :placeholder="field.placeholder"
                  :readonly="field.readonly"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
                  :class="{ 'bg-gray-100': field.readonly }" />

                <input v-else-if="key === 'custom_date_of_birth'" v-model="formData.custom_date_of_birth" type="date"
                  name="custom_date_of_birth" :max="maxDate"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />

                <div v-else-if="field.type === 'file'" class="flex flex-col">
                  <input v-if="key === 'custom_portfolio'" type="file" id="portfolioInput" :name="key"
                    @change="onPortfolioSelected" class="hidden" />
                  <input v-if="key === 'custom_cv'" type="file" id="cvInput" :name="key" @change="onCvSelected"
                    class="hidden" />
                  <div class="flex items-center">
                    <button type="button" @click="triggerFileInput(key)"
                      class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-sm transition">
                      {{ formData[key] ? 'Change File' : 'Upload File' }}
                    </button>
                    <span v-if="formData[key]" class="ml-2 text-sm text-gray-600 truncate max-w-xs">
                      {{ formData[key].split('/').pop() }}
                    </span>
                  </div>
                </div>

                <select v-if="field.type === 'select'" v-model="formData[key]" :name="key" :disabled="field.readonly"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
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

            <div class="mt-6">
              <button type="submit"
                class="bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm hover:bg-orange-600 transition">
                UPDATE
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
    required: true,
  },
  mobile_number: {
    label: "Phone No.",
    type: "text",
    required: true,
    pattern: /^[0-9]{10}$/,  // Validates a 10-digit phone number
    error_message: "Invalid phone number ",
    maxLength: 15
  },
  custom_country: { label: "Country", type: "select", required: true },
  custom_state: { label: "State", type: "select", required: true },
  custom_city: { label: "City", type: "select", required: true },
  custom_company: { label: "Company", type: "select", required: false, readonly: false },
  custom_date_of_birth: {
    label: "Date of Birth",
    type: "date",
    required: true,
    min: "1900-01-01",
    max: new Date().toISOString().split("T")[0],
    max: "maxDate",
    error_message: "Please select a valid date of birth"
  },
  custom_title: {
    label: "Title",
    type: "text",
    placeholder: "Enter your title",
    required: false
  },
  custom_portfolio: {
    label: "Portfolio",
    type: "file",
    required: false
  },
  custom_cv: {
    label: "CV",
    type: "file",
    required: false
  },
  custom_linkedin: {
    label: "LinkedIn",
    type: "text",
    required: false
  }
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
  custom_title: "",
  custom_portfolio: "",
  custom_cv: "",
  custom_linkedin: ""
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

const maxDate = ref(new Date().toISOString().split("T")[0]); // Today's date

const errors = ref({});  // Errors object

const countries = ref([]);
const states = ref([]);
const cities = ref([]);
const companies = ref([]);

// Function to trigger the file input click event - FIXED VERSION
const triggerFileInput = (key) => {
  if (key === 'custom_portfolio') {
    document.getElementById('portfolioInput').click();
  } else if (key === 'custom_cv') {
    document.getElementById('cvInput').click();
  }
};

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
    if (key === "first_name" && field.pattern && !field.pattern.test(value)) {
      errors.value[key] = field.error_message;
      valid = false;
    }

    if (key === "last_name" && value && field.pattern && !field.pattern.test(value)) {
      errors.value[key] = field.error_message;
      valid = false;
    }

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
      data: {
        first_name: formData.value.first_name,
        last_name: formData.value.last_name || "",
        mobile_number: formData.value.mobile_number,
        custom_date_of_birth: formData.value.custom_date_of_birth,
        custom_country: formData.value.custom_country,
        custom_state: formData.value.custom_state,
        custom_city: formData.value.custom_city,
        custom_company: formData.value.custom_company || "",
        custom_title: formData.value.custom_title || "",
        custom_portfolio: formData.value.custom_portfolio || "",
        custom_cv: formData.value.custom_cv || "",
        custom_linkedin: formData.value.custom_linkedin || ""
      }
    });

    if (res.status == 200) {
      toast.success("Profile updated successfully!", { "autoClose": 3000 });
      setTimeout(() => router.push("/"), 3000);
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
  if (localStorage.getItem('updateprofile') == 'true') {
    toast.error("Please update your profile to continue.", { "autoClose": 3000 });
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

// Fixed File Upload Functions
const onCvSelected = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const fileFormData = new FormData();
      fileFormData.append('file', file);
      fileFormData.append('doctype', 'SVA User');
      fileFormData.append('docname', auth.cookie.name);
      fileFormData.append('fieldname', 'custom_cv');

      const response = await call('frappe.client.attach_file', fileFormData);
      if (response) {
        formData.value.custom_cv = response.file_url;
        toast.success('CV uploaded successfully!');
      }
    } catch (error) {
      console.error('CV upload error:', error);
      toast.error('Failed to upload CV');
    }
  }
};

const onPortfolioSelected = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const fileFormData = new FormData();
      fileFormData.append('file', file);
      fileFormData.append('doctype', 'SVA User');
      fileFormData.append('docname', auth.cookie.name);
      fileFormData.append('fieldname', 'custom_portfolio');

      const response = await call('frappe.client.attach_file', fileFormData);
      if (response) {
        formData.value.custom_portfolio = response.file_url;
        toast.success('Portfolio uploaded successfully!');
      }
    } catch (error) {
      console.error('Portfolio upload error:', error);
      toast.error('Failed to upload Portfolio');
    }
  }
};
</script>