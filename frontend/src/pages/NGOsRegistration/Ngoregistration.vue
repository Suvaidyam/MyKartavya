<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
    <div class="max-w-[1920px] mt-[20px] mx-auto p-8 bg-white rounded-xl shadow-xl">
      <form @submit.prevent="submitForm" class="space-y-8" :class="{ 'loading': loading }">
        <!-- Error Message Display -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">{{ error }}</span>
        </div>

        <!-- Progress Steps -->
        <!-- <div class="flex justify-between mb-6">
          <div v-for="(step, index) in ['Basic Info', 'Contact Details', 'Documents']" :key="index"
            class="flex flex-col items-center">
            <div class="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-medium">
              {{ index + 1 }}
            </div>
            <span class="mt-2 text-sm font-medium text-gray-700">{{ step }}</span>
          </div>
          <div class="absolute left-0 right-0 h-0.5 bg-indigo-200 top-5 -z-10"></div>
        </div> -->

        <!-- Basic Information Section -->
        <div class="bg-indigo-50 p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Basic Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- NGO Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NGO Name <span
                  class="text-red-500">*</span></label>
              <input v-model="form.ngo_name" type="text" placeholder="Enter NGO Name" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

            <!-- Website -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NGO Website</label>
              <input v-model="form.website" type="url" placeholder="https://example.org"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

            <!-- Official Contact Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Official Contact Number <span
                  class="text-red-500">*</span></label>
              <input v-model="form.official_contact_number" type="tel" placeholder="+91 XXXXX XXXXX" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email <span
                  class="text-red-500">*</span></label>
              <input v-model="form.email" type="email" placeholder="ngo@example.com" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

            <!-- Designation -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Designation <span
                  class="text-red-500">*</span></label>
              <input v-model="form.designation" type="text" placeholder="e.g., Director, Secretary" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

            <!-- License Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">License Type <span
                  class="text-red-500">*</span></label>
              <select v-model="form.license_type" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition">
                <option value="FCRA">FCRA</option>
                <option value="12A">Non-FCRA</option>
              </select>
            </div>

            <!-- Country Dropdown -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Country <span
                  class="text-red-500">*</span></label>
              <select v-model="form.country"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition">
                <option value="" disabled>Select Country</option>
                <option v-for="country in countries" :key="country.name" :value="country.name">
                  {{ country.label || country.name }}
                </option>
              </select>
            </div>

            <!-- State Dropdown -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">State <span
                  class="text-red-500">*</span></label>
              <select v-model="form.state"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition">
                <option value="" disabled>Select State</option>
                <option v-for="state in states" :key="state.name" :value="state.name">
                  {{ state.state_name || state.name }}
                </option>
              </select>
            </div>

            <!-- City Dropdown -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City <span
                  class="text-red-500">*</span></label>
              <select v-model="form.city"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition">
                <option value="" disabled>Select City</option>
                <option v-for="city in cities" :key="city.name" :value="city.name">
                  {{ city.district_name || city.name }}
                </option>
              </select>
            </div>

            <!-- Area of Work Dropdown -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Area of Work <span
                  class="text-red-500">*</span></label>
              <select v-model="form.area_of_work"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition">
                <option value="" disabled>Select Area of Work</option>
                <option v-for="area in areaOfWorkOptions" :key="area" :value="area">
                  {{ area }}
                </option>
              </select>
            </div>

            <!-- Description -->
            <div class="md:col-span-3">
              <label class="block text-sm font-medium text-gray-700 mb-1">Description <span
                  class="text-red-500">*</span></label>
              <textarea v-model="form.description" rows="4" placeholder="Describe your NGO's mission and activities"
                required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"></textarea>
            </div>
          </div>
        </div>

        <!-- Contact Information Section -->
        <div class="bg-indigo-50 p-6 rounded-lg mt-6">
          <h2 class="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Information
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Person Name <span
                  class="text-red-500">*</span></label>
              <input v-model="form.contact_person_name" type="text" placeholder="Full Name" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NGO Head Name <span
                  class="text-red-500">*</span></label>
              <input v-model="form.ngo_head_name" type="text" placeholder="Full Name" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NGO Head Email <span
                  class="text-red-500">*</span></label>
              <input v-model="form.ngo_head_email" type="email" placeholder="head@example.com" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NGO Head Mobile <span
                  class="text-red-500">*</span></label>
              <input v-model="form.ngo_head_mobile" type="tel" placeholder="+91 XXXXX XXXXX" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NGO Head Office Number</label>
              <input v-model="form.ngo_head_office_number" type="tel" placeholder="+91 XXXXX XXXXX"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code <span
                  class="text-red-500">*</span></label>
              <input v-model="form.pincode" type="text" placeholder="Enter PIN code" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

            <div class="md:col-span-3">
              <label class="block text-sm font-medium text-gray-700 mb-1">Address <span
                  class="text-red-500">*</span></label>
              <textarea v-model="form.address" rows="3" placeholder="Enter address with landmarks if any" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"></textarea>
            </div>
          </div>
        </div>

        <!-- Registration Details Section -->
        <div class="bg-indigo-50 p-6 rounded-lg mt-6">
          <h2 class="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Registration Details
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Registered with BigTech <span
                  class="text-red-500">*</span></label>
              <select v-model="form.registered_with_bigtech" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">NGO Logo</label>
              <label
                class="flex items-center px-4 py-3 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-500 mr-2" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span class="text-sm text-gray-600">Upload NGO Logo (PNG, JPG up to 2MB)</span>
                <input type="file" class="hidden" @change="handleFileUpload" accept="image/*" />
              </label>
              <div v-if="form.ngo_logo" class="mt-2 text-sm text-gray-600">
                Selected file: {{ form.ngo_logo.name }}
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-6">
          <button type="submit"
            class="w-[600px] flex justify-center mx-auto items-center text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-md transition duration-300 transform hover:-translate-y-1"
            :disabled="loading" style="background: #FF5722;">
            {{ loading ? 'Registering...' : 'Register NGO' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, watch } from "vue";
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const call = inject('call');
const router = useRouter();

const form = ref({
  registration_type: "Self Registration",
  ngo_name: "",
  website: "",
  official_contact_number: "",
  email: "",
  designation: "",
  state: "",
  city: "",
  description: "",
  license_type: "FCRA",
  contact_person_name: "",
  ngo_head_name: "",
  ngo_head_email: "",
  ngo_head_mobile: "",
  ngo_head_office_number: "",
  area_of_work: "",
  address: "",
  pincode: "",
  registered_with_bigtech: "No",
  ngo_logo: null,
  country: "India" // Default country
});

const loading = ref(false);
const error = ref(null);

// Add refs for dropdown options
const countries = ref([]);
const states = ref([]);
const cities = ref([]);
const areaOfWorkOptions = ref([
  'Education',
  'Skills',
  'Environment',
  'Financial Inclusion',
  'Accessibility and Inclusion',
  'Disaster Management',
  'Healthcare'
]);

// Fetch country, state and city data
const fetchCountries = async () => {
  try {
    loading.value = true;
    const res = await call("mykartavya.controllers.api.country_data");
    countries.value = res || [];
    console.log('Countries fetched:', countries.value);
  } catch (err) {
    console.error('Error fetching countries:', err);
    error.value = 'Failed to load countries. Please try again.';
  } finally {
    loading.value = false;
  }
};

const fetchStates = async () => {
  try {
    if (!form.value.country) return;
    loading.value = true;
    const res = await call("mykartavya.controllers.api.state_data", {
      country: form.value.country
    });
    states.value = res || [];
    form.value.state = ""; // Reset state when country changes
    form.value.city = ""; // Reset city when country changes
    console.log('States fetched:', states.value);
  } catch (err) {
    console.error('Error fetching states:', err);
    error.value = 'Failed to load states. Please try again.';
  } finally {
    loading.value = false;
  }
};

const fetchCities = async () => {
  try {
    if (!form.value.state) return;
    loading.value = true;
    const res = await call("mykartavya.controllers.api.city_data", {
      state: form.value.state
    });
    cities.value = res || [];
    form.value.city = ""; // Reset city when state changes
    console.log('Cities fetched:', cities.value);
  } catch (err) {
    console.error('Error fetching cities:', err);
    error.value = 'Failed to load cities. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Watch for changes in country and state selections
watch(() => form.value.country, (newCountry) => {
  if (newCountry) {
    fetchStates();
  }
});

watch(() => form.value.state, (newState) => {
  if (newState) {
    fetchCities();
  }
});

// Initialize data on component mount
onMounted(async () => {
  await fetchCountries();
  // If default country is set, fetch its states
  if (form.value.country) {
    await fetchStates();
  }
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      // Upload file to Frappe
      const response = await call('upload_file', {
        file: formData,
        is_private: 0,
        doctype: 'NGOs',
        fieldname: 'ngo_logo'
      });
      form.value.ngo_logo = response.file_url;
      toast.success('Logo uploaded successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error('Error uploading file:', err);
      toast.error('Failed to upload logo. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  }
};

const validateForm = () => {
  const requiredFields = [
    'ngo_name',
    'email',
    'official_contact_number',
    'designation',
    'country',
    'state',
    'city',
    'description',
    'contact_person_name',
    'ngo_head_name',
    'ngo_head_email',
    'ngo_head_mobile',
    'area_of_work',
    'address',
    'pincode'
  ];

  for (const field of requiredFields) {
    if (!form.value[field]) {
      error.value = `Please fill in ${field.replace(/_/g, ' ')}.`;
      return false;
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email) || !emailRegex.test(form.value.ngo_head_email)) {
    error.value = 'Please enter valid email addresses.';
    return false;
  }

  // Validate phone numbers
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(form.value.official_contact_number) ||
    !phoneRegex.test(form.value.ngo_head_mobile) ||
    (form.value.ngo_head_office_number && !phoneRegex.test(form.value.ngo_head_office_number))) {
    error.value = 'Please enter valid 10-digit phone numbers.';
    return false;
  }

  // Validate pincode
  if (!/^\d{6}$/.test(form.value.pincode)) {
    error.value = 'Please enter a valid 6-digit pincode.';
    return false;
  }

  return true;
};

const submitForm = async () => {
  try {
    error.value = null;
    if (!validateForm()) {
      return;
    }

    loading.value = true;

    const response = await call('mykartavya.mykartavya.api.register_ngo', {
      ...form.value
    });

    if (response.status === 'success') {
      toast.success('NGO Registration Successful! Please check your email for login credentials.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
      // Redirect to home or dashboard after a short delay
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      toast.error(response.message || 'Failed to register NGO. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  } catch (err) {
    console.error('Error submitting form:', err);
    toast.error(err.message || 'Failed to register NGO. Please try again.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.loading {
  opacity: 0.7;
  pointer-events: none;
}
</style>