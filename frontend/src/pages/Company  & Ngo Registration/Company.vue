<template>
  <div class="max-w-[1920px] mx-auto pt-[82px] pb-4 bg-gray-50">
    <section class="relative w-full h-[250px] md:h-[300px] lg:h-[247px] bg-cover bg-center bg-no-repeat banner">
      <!-- Absolute Positioned Text -->
      <div class="absolute inset-0 flex items-center justify-start px-6 md:px-12 lg:px-16">
        <h1 class="text-white font-semibold text-heading2">
          Register For Company
        </h1>
      </div>
    </section>
    <div class="px-10">
      <div class="bg-white rounded-sm shadow mt-4">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            <!-- Company Registration -->
          </h2>
          <form @submit.prevent="submitForm" class="space-y-8" :class="{ loading: loading }">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Basic Information -->
              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Company Name <span class="text-red-500 pt-2">*</span>
                </label>
                <input v-model="form.company_name" type="text" name="company_name"
                  @input="handle_input_change('company_name')" placeholder="Enter Company Name"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                <p v-if="errors.company_name" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.company_name }}
                </p>
              </div>

              <div>
                <label for="registration_date" class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Registration Date <span class="text-red-500 pt-2">*</span>
                </label>
                <input v-model="form.registration_date" id="registration_date" type="date" name="registration_date"
                  @input="handle_input_change('registration_date')"
                  :max="today"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                <p v-if="errors.registration_date" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.registration_date }}
                </p>
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Email <span class="text-red-500 pt-2">*</span>
                </label>
                <input v-model="form.email" name="email" type="email" @input="handle_input_change('email')"
                  placeholder="company@example.com"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                <p v-if="errors.email" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.email }}
                </p>
              </div>

              <!-- Contact Information -->
              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  First Name <span class="text-red-500 pt-2">*</span>
                </label>
                <input v-model="form.first_name" type="text" name="first_name"
                  @input="handle_input_change('first_name')" placeholder="First Name"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                <p v-if="errors.first_name" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.first_name }}
                </p>
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Last Name <span class="text-red-500 pt-2">*</span>
                </label>
                <input v-model="form.last_name" type="text" name="last_name" @input="handle_input_change('last_name')"
                  placeholder="Last Name"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                <p v-if="errors.last_name" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.last_name }}
                </p>
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Designation <span class="text-red-500 pt-2">*</span>
                </label>
                <input v-model="form.designation" type="text" name="designation"
                  @input="handle_input_change('designation')" placeholder="e.g., Director, Manager"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                <p v-if="errors.designation" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.designation }}
                </p>
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Mobile Number <span class="text-red-500 pt-2">*</span>
                </label>
                <input v-model="form.mobile_number" type="tel" name="mobile_number"
                  @input="handle_input_change('mobile_number')" placeholder="+91 XXXXX XXXXXr" maxlength="10"
                  pattern="\d{10}"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                <p v-if="errors.mobile_number" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.mobile_number }}
                </p>
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Phone
                </label>
                <div class="flex">
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
                          :class="{ 'bg-orange-50': country.dial_code === form.phone_country_code }">
                          <span class="w-6">{{ country.flag }}</span>
                          <span class="text-gray-600">{{ country.name }}</span>
                          <span class="text-gray-500 ml-auto">{{ country.dial_code }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input v-model="form.phone" type="tel" name="phone" placeholder="XXXXX XXXXX" maxlength="10"
                    class="block w-full border border-gray-300 text-bodyh2 rounded-r py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200 border-l-0" />
                </div>
                <p v-if="errors.phone" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.phone }}
                </p>
              </div>

              <!-- Address Information -->
              <div class="md:col-span-2">
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  India Headquarters Address
                  <span class="text-red-500 pt-2">*</span>
                </label>
                <textarea v-model="form.address" @input="handle_input_change('address')" name="address" rows="3"
                  placeholder="Enter complete address with landmarks"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"></textarea>
                <p v-if="errors.address" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.address }}
                </p>
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Country <span class="text-red-500 pt-2">*</span>
                </label>
                <SearchableSelect v-model="form.country" :options="getOptions('country')" label="Country"
                  placeholder="Select Country" :required="true" />
                <p v-if="errors.country" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.country }}
                </p>
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  State <span class="text-red-500 pt-2">*</span>
                </label>
                <SearchableSelect v-model="form.state" :options="getOptions('state')" label="State"
                  placeholder="Select State" :required="true" />
                <p v-if="errors.state" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.state }}
                </p>
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  City <span class="text-red-500 pt-2">*</span>
                </label>
                <SearchableSelect v-model="form.city" :options="getOptions('city')" label="City"
                  placeholder="Select City" :required="true" />
                <p v-if="errors.city" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.city }}
                </p>
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Pincode <span class="text-red-500 pt-2">*</span>
                </label>
                <input v-model="form.pincode" type="text" name="pincode" @input="handle_input_change('pincode')"
                  placeholder="Enter PIN code" maxlength="6" pattern="\d{6}"
                  oninput="this.value=this.value.replace(/[^0-9]/g,'').slice(0,6)"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                <p v-if="errors.pincode" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.pincode }}
                </p>
              </div>

              <!-- Organization Details -->
              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Number of Employees <span class="text-red-500 pt-2">*</span>
                </label>
                <input v-model="form.number_of_employees" name="number_of_employees" type="text"
                  @input="handle_input_change('number_of_employees')" min="1"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Clear Vision <span class="text-red-500 pt-2">*</span>
                </label>
                <SearchableSelect v-model="form.clear_vision" :options="clearVisionOptions" label="Clear Vision"
                  placeholder="Select Option" :required="true" />
                <p v-if="errors.clear_vision" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.clear_vision }}
                </p>
              </div>

              <!-- Volunteering Program Details -->
              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Volunteering CSR Activities Cost (%)
                  <span class="text-red-500 pt-2">*</span>
                </label>
                <input v-model="form.volunteering_csr_activities" name="volunteering_csr_activities" type="text"
                  @input="handle_input_change('volunteering_csr_activities')" min="0" max="100"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Employee Engagement Coverage (%)
                  <span class="text-red-500 pt-2">*</span>
                </label>
                <input v-model="form.employee_engagement" name="employee_engagement" type="text"
                  @input="handle_input_change('employee_engagement')" min="0" max="100"
                  class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
              </div>

              <div>
                <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                  Company Logo <span class="text-red-500 pt-2">*</span>
                </label>
                <label
                  class="flex items-center px-4 py-3 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-500 mr-2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span class="text-sm text-gray-600">Upload Company Logo (PNG, JPG up to 2MB)</span>
                  <input type="file" class="hidden" @change="handleFileUpload" accept="image/*" />
                </label>
                <div v-if="form.company_logo" class="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span class="text-sm text-gray-600">{{ getFileName(form.company_logo) }}</span>
                    </div>
                    <button @click="removeLogo"
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
                <p v-if="errors.company_logo" class="text-red-500 text-[10px] pt-1 pl-1">
                  {{ errors.company_logo }}
                </p>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="mt-6">
              <button type="submit"
                class="bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm hover:bg-orange-600 transition"
                :disabled="loading">
                {{ loading ? 'Registering...' : 'Register Company' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import SearchableSelect from '@/components/SearchableSelect.vue'
import country_code from "@/assets/Country/Country_code.js"

const call = inject('call')
const router = useRouter()
const loading = ref(false)
const error = ref(null)
const errors = ref({})


//  Validate Registration Date 
const today = computed(() => {
  const date = new Date()
  return date.toISOString().split('T')[0]
})



const form = ref({
  registration_type: 'Self Registration',
  registration_date: '',
  company_name: '',
  first_name: '',
  last_name: '',
  email: '',
  designation: '',
  phone: '',
  phone_country_code: '+91', // Default country code for phone
  mobile_number: '',
  address: '',
  country: 'India',
  state: '',
  city: '',
  pincode: '',
  number_of_employees: '',
  clear_vision: 'Yes',
  volunteering_csr_activities: '',
  employee_engagement: '',
  company_logo: null,
})


const getFileName = (base64String) => {
  if (!base64String) return ''
  if (base64String.startsWith('data:')) {
    return 'Image File'
  }
  return 'Uploaded File'
}
// Clear vision options
const clearVisionOptions = ref([
  { name: 'Yes', label: 'Yes' },
  { name: 'No', label: 'No' }
])

const phoneRegex = /^\d{10}$/

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) {
    toast.error('Please select a file.')
    return
  }
  const allowedExtensions = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedExtensions.includes(file.type)) {
    toast.error('Invalid file type. Only JPG, PNG, and WEBP are allowed.')
    return
  }

  if (file.size > maxSize) {
    toast.error('File size exceeds 5 MB limit.')
    return
  }


  // Convert to Base64
  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.onload = async () => {
    try {
      const base64Data = reader.result.split(',')[1] // Convert Base64
      form.value.company_logo = base64Data
      toast.success('File uploaded successfully!',{ "autoClose": 1000 })
    } catch (err) {
      console.error('Error uploading file:', err)
      toast.error('Failed to upload logo. Please try again.')
    }
  }
}

const removeLogo = () => {
  form.value.company_logo = null
  toast.info('File removed.',{ "autoClose": 2000 })
}

const validateForm = () => {
  // Reset error
  error.value = null

  // Required fields validation
  const requiredFields = [
    'company_name',
    'registration_date',
    'email',
    'first_name',
    'last_name',
    'designation',
    'mobile_number',
    'address',
    'country',
    'state',
    'city',
    'pincode',
    'number_of_employees',
    'clear_vision',
    'volunteering_csr_activities',
    'employee_engagement',
    'company_logo',
  ]
  let firstErrorField = ref(null)

  for (const field of requiredFields) {
    if (!form.value[field]) {
      error.value = `Please fill in ${field.replace(/_/g, ' ')}.`
      errors.value[field] = ` ${field.replace(/_/g, ' ')} is required!`
      //   toast.error(error.value, {
      //     position: 'top-right',
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //   })
      if (firstErrorField.value === null) {
        firstErrorField.value = field
      }
    }
  }
  if (firstErrorField.value) {
    const errorElement = document.querySelector(
      `[name="${firstErrorField.value}"]`
    )

    if (errorElement) {
      const elementPosition =
        errorElement.getBoundingClientRect().top + window.scrollY

      window.scrollTo({
        top: elementPosition - 200, // Field ko upar se adjust karein
        behavior: 'smooth',
      })

      setTimeout(() => {
        errorElement.focus() // Field me cursor laane ke liye thoda delay de
      }, 200)
    }

    return false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    error.value = 'Please enter a valid email address.'
    toast.error(error.value, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
    })
    return false
  }

  // Phone number validation
  if (!/^\d{10}$/.test(form.value.mobile_number)) {
    this.error = 'Mobile number must be exactly 10 digits.'
    this.toast.error(this.error, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
    })
    return false
  }

  if (form.value.phone && !phoneRegex.test(form.value.phone)) {
    error.value = 'Phone number must be exactly 10 digits.'
    toast.error(error.value, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
    })
    return false
  }

  // Pincode validation
  if (!/^\d{6}$/.test(form.value.pincode)) {
    error.value = 'Pincode must be exactly 6 digits.'
    toast.error(error.value, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
    })
    return false
  }

  // Number of employees validation
  if (parseInt(form.value.number_of_employees) < 1) {
    error.value = 'Number of employees must be at least 1.'
    toast.error(error.value, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
    })
    return false
  }

  // Percentage validations
  const percentageFields = [
    'volunteering_csr_activities',
    'employee_engagement',
  ]
  for (const field of percentageFields) {
    const value = parseFloat(form.value[field])
    if (isNaN(value) || value < 0 || value > 100) {
      error.value = `${field.replace(/_/g, ' ')} must be between 0 and 100.`
      toast.error(error.value, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
      })
      return false
    }
  }

  return true
}

const handle_input_change = (field) => {
  if (!form.value[field].trim()) {
    errors.value[field] = ` ${field.replace(/_/g, ' ')} is required!`
  } else {
    delete errors.value[field]
  }
}

// Country code selection
const code = ref(country_code)
const countrySearch = ref('');
const showCountryDropdown = ref(false);
const selectedCountry = computed(() => {
  return code.value.find(c => c.dial_code === form.value.phone_country_code) || {
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
  form.value.phone_country_code = country.dial_code;
  countrySearch.value = '';
  showCountryDropdown.value = false;
};

const toggleDropdown = () => {
  showCountryDropdown.value = !showCountryDropdown.value;
};

const submitForm = async () => {
  try {
    if (!validateForm()) {
      return
    }

    loading.value = true

    // Format phone number with country code if it exists
    const formattedPhone = form.value.phone ?
      `${form.value.phone_country_code}-${form.value.phone}` : '';

    const response = await call('mykartavya.mykartavya.api.register_company', {
      registration_type: form.value.registration_type,
      registration_date: form.value.registration_date,
      company_name: form.value.company_name,
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email,
      designation: form.value.designation,
      phone: formattedPhone,
      mobile_number: form.value.mobile_number,
      address: form.value.address,
      country: form.value.country,
      state: form.value.state,
      city: form.value.city,
      pincode: form.value.pincode,
      number_of_employees: form.value.number_of_employees,
      clear_vision: form.value.clear_vision,
      volunteering_csr_activities: form.value.volunteering_csr_activities,
      employee_engagement: form.value.employee_engagement,
      company_logo: form.value.company_logo,
    })

    if (response.status === 'error') {
      throw new Error(response.message)
    }

    toast.success(
      'Company Registration Successful! Please check your email for login credentials.',
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
      }
    )

    // Redirect to home after a short delay
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (err) {
    console.error('Error submitting form:', err)
    toast.error(
      err.message || 'Failed to register company. Please try again.',
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
      }
    )
  } finally {
    loading.value = false
  }
}

// Fetch country, state and city data
const countries = ref([])
const states = ref([])
const cities = ref([])

const fetchCountries = async () => {
  try {
    loading.value = true
    const res = await call('mykartavya.controllers.api.country_data')
    countries.value = res || []
  } catch (err) {
    console.error('Error fetching countries:', err)
    toast.error('Failed to load countries. Please try again.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
    })
  } finally {
    loading.value = false
  }
}

const fetchStates = async () => {
  try {
    if (!form.value.country) return
    loading.value = true
    const res = await call('mykartavya.controllers.api.state_data', {
      country: form.value.country,
    })
    states.value = res || []
    form.value.state = '' // Reset state when country changes
    form.value.city = '' // Reset city when country changes
  } catch (err) {
    console.error('Error fetching states:', err)
    toast.error('Failed to load states. Please try again.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
    })
  } finally {
    loading.value = false
  }
}

const fetchCities = async () => {
  try {
    if (!form.value.state) return
    loading.value = true
    const res = await call('mykartavya.controllers.api.city_data', {
      state: form.value.state,
    })
    cities.value = res || []
    form.value.city = '' // Reset city when state changes
  } catch (err) {
    console.error('Error fetching cities:', err)
    toast.error('Failed to load cities. Please try again.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
    })
  } finally {
    loading.value = false
  }
}

// Get options for SearchableSelect
const getOptions = (key) => {
  switch (key) {
    case 'country':
      return countries.value.map(c => ({ name: c.name, label: c.label || c.name }));
    case 'state':
      return states.value.map(s => ({ name: s.name, label: s.state_name || s.name }));
    case 'city':
      return cities.value.map(c => ({ name: c.name, label: c.district_name || c.name }));
    default:
      return [];
  }
};

// Watch for changes in country and state selections
watch(
  () => form.value.country,
  (newCountry) => {
    if (newCountry) {
      fetchStates()
    }
  }
)

watch(
  () => form.value.state,
  (newState) => {
    if (newState) {
      fetchCities()
    }
  }
)

onMounted(async () => {
  await fetchCountries()
  if (form.value.country) {
    await fetchStates()
  }

  // Single click handler for closing dropdown
  document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.country-code-wrapper');
    if (!wrapper?.contains(e.target)) {
      showCountryDropdown.value = false;
      countrySearch.value = '';
    }
  });
})
</script>

<style scoped>
.loading {
  opacity: 0.7;
  pointer-events: none;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.banner {
  background-image: url('../../assets/corporate-web-min.png');
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
</style>
