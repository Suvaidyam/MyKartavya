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
                  v-if="key !== 'custom_date_of_birth' && !['select', 'file', 'multiselect'].includes(field.type)">
                  <div v-if="key == 'custom_phone_number'" class="relative">
                    <div class="relative country-code-wrapper">
                      <div
                        class="flex items-center h-[42px] border border-gray-300 rounded-l px-3 min-w-[120px] cursor-pointer"
                        @click.stop="toggleDropdown">
                        <div class="flex items-center gap-2 flex-1">
                          <span>{{ selectedCountry.flag }}</span>
                          <span>{{ selectedCountry.dial_code }}</span>
                        </div>
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      <!-- Dropdown -->
                      <div v-if="showCountryDropdown"
                        class="absolute left-0 z-50 w-[280px] max-h-60 bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                        <div class="p-2 border-b">
                          <input type="text" v-model="countrySearch" placeholder="Search country..."
                            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                            @click.stop />
                        </div>
                        <div class="overflow-y-auto max-h-[188px] country-dropdown">
                          <div v-for="country in filteredCountryCodes" :key="selectedCountry.dial_code"
                            @click.stop="selectCountryCode(country)"
                            class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            :class="{ 'bg-orange-50': country.dial_code === formData.country_code }">
                            <span class="w-6">{{ country.flag }}</span>
                            <span class="text-gray-600">{{ country.name }}</span>
                            <span class="text-gray-500 ml-auto">{{ country.dial_code }}</span>
                          </div>
                        </div>
                      </div>
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

                <!-- Replace the existing select element with new searchable select -->
                <SearchableSelect v-if="field.type === 'select'" v-model="formData[key]" :options="getOptions(key)"
                  :label="field.label" :placeholder="`Select ${field.label}`" :required="field.required" />

                <!-- Add multi-select component for skills -->
                <div v-if="key === 'custom_skill'" class="w-full">
                  <Multiselect v-model="formData.custom_skill" :options="getOptions('custom_skill')" :multiple="true"
                    placeholder="Select skills" label="label" track-by="name" :preselect-first="false"
                    class="multiselect-orange">
                    <template slot="selection">
                      <span class="multiselect__single" v-if="values.length && !isOpen">
                        {{ values.length }} skills selected
                      </span>
                    </template>
                  </Multiselect>
                </div>

                <!-- Add multi-select component for languages known -->
                <div v-if="key === 'custom_languages_known'" class="w-full">
                  <Multiselect v-model="formData.custom_languages_known" :options="getOptions('custom_languages_known')" :multiple="true"
                    placeholder="Select languages" label="label" track-by="name" :preselect-first="false"
                    class="multiselect-orange">
                    <template slot="selection">
                      <span class="multiselect__single" v-if="values.length && !isOpen">
                        {{ values.length }} languages selected
                      </span>
                    </template>
                  </Multiselect>
                </div>

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
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import SearchableSelect from '@/components/SearchableSelect.vue';

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
    required: false,
    maxLength: 100
  },
  custom_phone_number: {
    label: "Phone Number",
    type: "tel",
    required: true,
    pattern: /^[0-9]{10}$/,
    error_message: "Please enter a valid 10-digit phone number",
    maxLength: 15
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
  custom_skill: {
    label: "Skills",
    type: "multiselect",
    required: true
  },
  custom_languages_known: {
    label: "Languages Known",
    type: "multiselect",
    required: true
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
  custom_skill: [],
  custom_languages_known: [],
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
const skills = ref([]);
const languages = ref([]);

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

const fetchSkills = async () => {
  try {
    const res = await call("mykartavya.controllers.api.get_all_skills");
    skills.value = res || [];
  } catch (error) {
    console.error('Error fetching skills:', error);
    toast.error('Failed to load skills. Please try again.');
  }
};

const fetchLanguages = async () => {
  try {
    const res = await call("mykartavya.controllers.api.get_all_languages");
    languages.value = res || [];
  } catch (error) {
    console.error('Error fetching languages:', error);
    toast.error('Failed to load languages. Please try again.');
  }
};

watch(() => formData.value.custom_country, fetchStates);
watch(() => formData.value.custom_state, fetchCities);

// Get user details
const getDetails = async () => {
  try {
    // First fetch skills and languages to ensure we have the data
    await fetchSkills();
    await fetchLanguages();

    let res = await call("mykartavya.controllers.api.sva_user_data");
    if (res && res.length > 0) {
      formData.value = res[0];

      // Extract country code and phone number if they exist
      if (formData.value.custom_phone_number && formData.value.custom_phone_number.includes('-')) {
        const [countryCode, phoneNumber] = formData.value.custom_phone_number.split('-');
        formData.value.country_code = countryCode;
        formData.value.custom_phone_number = phoneNumber;
      }

      // Handle skills - map skill IDs to skill objects
      if (formData.value.custom_skill && formData.value.custom_skill.length > 0) {
        // Map skill IDs to skill objects
        formData.value.custom_skill = formData.value.custom_skill.map(skillId => {
          const skill = skills.value.find(s => s.name === skillId);
          return skill ? { name: skill.name, label: skill.skill_name } : skillId;
        });
      } else {
        formData.value.custom_skill = []; // Ensure it's always an array
      }

      // Handle languages - map language IDs to language objects
      if (formData.value.custom_languages_known && formData.value.custom_languages_known.length > 0) {
        // Map language IDs to language objects
        formData.value.custom_languages_known = formData.value.custom_languages_known.map(languageId => {
          const language = languages.value.find(l => l.name === languageId);
          return language ? { name: language.name, label: language.language_name } : languageId;
        });
      } else {
        formData.value.custom_languages_known = []; // Ensure it's always an array
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
    toast.error('Failed to load user details. Please try again.', {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
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
    // Ensure country code is set, default to +91 if not set
    const countryCode = formData.value.country_code || "+91";

    // Format phone number with country code, ensuring no undefined values
    const phoneNumber = formData.value.custom_phone_number || "";
    const formattedPhoneNumber = `${countryCode}-${phoneNumber}`;

    // Prepare skills data - ensure we're sending just the skill names
    const skillsData = formData.value.custom_skill.map(skill => {
      // If skill is an object, use the name property, otherwise use the skill directly
      return typeof skill === 'object' ? skill.name : skill;
    });

    // Prepare languages data - ensure we're sending just the language names
    const languagesData = formData.value.custom_languages_known.map(language => {
      // If language is an object, use the name property, otherwise use the language directly
      return typeof language === 'object' ? language.name : language;
    });

    const formDataToSend = {
      name: formData.value.name,
      first_name: formData.value.first_name,
      last_name: formData.value.last_name || "",
      custom_phone_number: formattedPhoneNumber,
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
      custom_background_image: formData.value.custom_background_image || "",
      custom_skill: skillsData || [], // Ensure we always send an array, even if empty
      custom_languages_known: languagesData || [], // Ensure we always send an array, even if empty
    };

    let res = await call("mykartavya.controllers.api.update_sva_user", {
      data: formDataToSend
    });

    if (res.status == 200) {
      await toast.success("Profile updated successfully!", {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        router.push('/').then(() => {
          // Reload the page after route push
          window.location.reload();
        });
      }, 1000)
    } else {
      throw new Error(res.message || "Failed to update profile");
    }
  } catch (error) {
    console.error('Error in form submission:', error);
    toast.error(error.message || "An error occurred while updating the profile.", {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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
    case "custom_skill":
      return skills.value.map(skill => ({ name: skill.name, label: skill.skill_name }));
    case "custom_languages_known":
      return languages.value.map(language => ({ name: language.name, label: language.language_name }));
    default:
      return [];
  }
};

// On Mounted
onMounted(async () => {
  fetchCountries();
  fetchCompanies();
  fetchSkills();
  fetchLanguages();
  getDetails();

  if (localStorage.getItem('updateprofile') == 'true') {
    toast.error("Please update your profile to continue.", {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    localStorage.removeItem('updateprofile');
  }

  // Single click handler for closing dropdown
  document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.country-code-wrapper');
    if (!wrapper?.contains(e.target)) {
      showCountryDropdown.value = false;
      countrySearch.value = '';
    }
  });

  // Add click handler for all dropdowns
  document.addEventListener('click', (e) => {
    const selectWrappers = document.querySelectorAll('.select-wrapper');
    let clickedInside = false;

    selectWrappers.forEach(wrapper => {
      if (wrapper.contains(e.target)) {
        clickedInside = true;
      }
    });

    if (!clickedInside) {
      activeDropdown.value = null;
      Object.keys(searchQueries.value).forEach(key => {
        searchQueries.value[key] = '';
      });
    }
  });
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
    toast.error('Please select a file.', {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    return
  }
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (file.size > maxSize) {
    toast.error('File size exceeds 5 MB limit.', {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    return
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if ((field === 'user_image' || field === 'custom_background_image') && !allowedTypes.includes(file.type)) {
    toast.error('Please upload a valid image file (JPG, PNG, or WEBP)', { autoClose: 2000 })
    return
  }
  // Convert to Base64
  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.onload = async () => {
    try {
      // const base64Data = reader.result.split(',')[1] // Convert Base64
      formData.value[field] = reader.result
      // formData.value[field] = base64Data
      toast.success('File uploaded successfully!', { "autoClose": 1000 })
    } catch (err) {
      console.error('Error uploading file:', err)
      toast.error('Failed to upload file. Please try again.', {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }
}

const removeFile = (field) => {
  formData.value[field] = null
  toast.info('File removed.', {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

const getFileName = (base64String) => {
  if (!base64String) return ''
  if (base64String.startsWith('data:')) {
    return 'Image File'
  }
  return 'Uploaded File'
}

const countrySearch = ref('');
const showCountryDropdown = ref(false);
const selectedCountry = computed(() => {
  return code.value.find(c => c.dial_code === formData.value.country_code) || {
    flag: "🇮🇳",
    dial_code: "+91",
    name: "India"
  };
});

const filteredCountryCodes = computed(() => {
  const search = countrySearch.value.toLowerCase();
  return code.value.filter(country =>
    country.dial_code.toLowerCase().includes(search) ||
    country.name.toLowerCase().includes(search) ||
    country.flag.toLowerCase().includes(search)
  ).sort((a, b) => {
    // Sort by match priority
    const aNameMatch = a.name.toLowerCase().includes(search);
    const bNameMatch = b.name.toLowerCase().includes(search);
    const aCodeMatch = a.dial_code.toLowerCase().includes(search);
    const bCodeMatch = b.dial_code.toLowerCase().includes(search);

    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;
    if (aCodeMatch && !bCodeMatch) return -1;
    if (!aCodeMatch && bCodeMatch) return 1;
    return a.name.localeCompare(b.name);
  });
});

const selectCountryCode = (country) => {
  formData.value.country_code = country.dial_code;
  countrySearch.value = '';
  showCountryDropdown.value = false;
};

const toggleDropdown = () => {
  showCountryDropdown.value = !showCountryDropdown.value;
};

// Add these new refs and methods in the script section
const activeDropdown = ref(null);
const searchQueries = ref({});

const toggleFieldDropdown = (field) => {
  if (activeDropdown.value === field) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = field;
  }
};

const getFilteredOptions = (key) => {
  const options = getOptions(key);
  const search = (searchQueries.value[key] || '').toLowerCase();

  return options.filter(option =>
    option.name.toLowerCase().includes(search) ||
    (option.label && option.label.toLowerCase().includes(search))
  );
};

const selectOption = (field, option) => {
  formData.value[field] = option.name;
  searchQueries.value[field] = '';
  activeDropdown.value = null;
};

const getSelectedLabel = (field, value) => {
  if (!value) return '';
  const option = getOptions(field).find(opt => opt.name === value);
  return option ? (option.label || option.name) : value;
};
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

.multiselect-orange {
  --ms-tag-bg: #f97316;
  --ms-tag-color: #fff;
  --ms-option-bg-selected: #f97316;
  --ms-option-color-selected: #fff;
  --ms-ring-color: #f97316;
}

.multiselect-orange :deep(.multiselect__tags) {
  @apply border border-gray-300 rounded-md;
}

.multiselect-orange :deep(.multiselect__tag) {
  @apply bg-orange-500 text-white;
}

.multiselect-orange :deep(.multiselect__option--highlight) {
  @apply bg-orange-500 text-white;
}

.multiselect-orange :deep(.multiselect__option--highlight::after) {
  @apply bg-orange-500 text-white;
}

.country-dropdown {
  scrollbar-width: thin;
  scrollbar-color: #f97316 #f3f4f6;
}

.country-dropdown::-webkit-scrollbar {
  width: 4px;
}

.country-dropdown::-webkit-scrollbar-track {
  background: #f3f4f6;
}

.country-dropdown::-webkit-scrollbar-thumb {
  background-color: #f97316;
  border-radius: 2px;
}

.country-code-wrapper {
  position: relative;
  display: inline-block;
}

.select-dropdown {
  scrollbar-width: thin;
  scrollbar-color: #f97316 #f3f4f6;
}

.select-dropdown::-webkit-scrollbar {
  width: 4px;
}

.select-dropdown::-webkit-scrollbar-track {
  background: #f3f4f6;
}

.select-dropdown::-webkit-scrollbar-thumb {
  background-color: #f97316;
  border-radius: 2px;
}

.select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}
</style>