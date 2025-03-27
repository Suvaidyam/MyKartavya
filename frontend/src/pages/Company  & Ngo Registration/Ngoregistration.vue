<template>
  <div class="max-w-[1920px] mx-auto px-10 pt-[82px] pb-4 bg-gray-50">
    <section
      class="relative w-full h-[250px] md:h-[300px] lg:h-[247px] bg-cover bg-center bg-no-repeat banner"
    >
      <!-- Absolute Positioned Text -->
      <div
        class="absolute left-0 inset-0 flex items-center justify-start px-6 md:px-12 lg:px-16"
      >
        <h1 class="text-white font-semibold text-heading2">Register For NGO</h1>
      </div>
    </section>
    <div class="bg-white rounded-lg shadow mt-4">
      <div class="p-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          NGO Registration
        </h2>
        <form
          @submit.prevent="submitForm"
          class="space-y-8"
          :class="{ loading: loading }"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Row 1 -->
            <div class="">
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                NGO Name <span class="text-red-500 pt-2">*</span>
              </label>
              <input
                v-model="form.ngo_name"
                name="ngo_name"
                type="text"
                placeholder="Enter NGO Name"
                @input="handle_input_change('ngo_name')"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
              <p
                v-if="errors.ngo_name"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.ngo_name }}
              </p>
            </div>

            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                Website <span class="text-red-500 pt-2">*</span>
              </label>
              <input
                v-model="form.website"
                name="website"
                type="url"
                @input="handle_input_change('website')"
                placeholder="https://example.org"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
              <p
                v-if="errors.website"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.website }}
              </p>
            </div>

            <!-- Row 2 -->
            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                Official Contact Number <span class="text-red-500 pt-2">*</span>
              </label>
              <input
                v-model="form.official_contact_number"
                name="official_contact_number"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                @input="handle_input_change('official_contact_number')"
                maxlength="10"
                pattern="\d{10}"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
              <p
                v-if="errors.official_contact_number"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.official_contact_number }}
              </p>
            </div>

            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                Email <span class="text-red-500 pt-2">*</span>
              </label>
              <input
                v-model="form.email"
                name="email"
                @input="handle_input_change('email')"
                type="email"
                placeholder="ngo@example.com"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
              <p v-if="errors.email" class="text-red-500 text-[10px] pt-1 pl-1">
                {{ errors.email }}
              </p>
            </div>

            <!-- Row 3 -->
            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                Designation <span class="text-red-500 pt-2">*</span>
              </label>
              <input
                v-model="form.designation"
                type="text"
                name="designation"
                @input="handle_input_change('designation')"
                placeholder="e.g., Director, Secretary"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
              <p
                v-if="errors.designation"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.designation }}
              </p>
            </div>

            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                License Type <span class="text-red-500 pt-2">*</span>
              </label>
              <select
                v-model="form.license_type"
                name="license_type"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              >
                <option value="FCRA">FCRA</option>
                <option value="12A">Non-FCRA</option>
              </select>
            </div>

            <!-- Row 4 -->
            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                Country <span class="text-red-500 pt-2">*</span>
              </label>
              <select
                v-model="form.country"
                name="country"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              >
                <option value="" disabled>Select Country</option>
                <option
                  v-for="country in countries"
                  :key="country.name"
                  :value="country.name"
                >
                  {{ country.label || country.name }}
                </option>
                <p
                  v-if="errors.country"
                  class="text-red-500 text-[10px] pt-1 pl-1"
                >
                  {{ errors.country }}
                </p>
              </select>
            </div>

            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                State <span class="text-red-500 pt-2">*</span>
              </label>
              <select
                v-model="form.state"
                name="state"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              >
                <option value="" disabled>Select State</option>
                <option
                  v-for="state in states"
                  :key="state.name"
                  :value="state.name"
                >
                  {{ state.state_name || state.name }}
                </option>
                <p
                  v-if="errors.state"
                  class="text-red-500 text-[10px] pt-1 pl-1"
                >
                  {{ errors.state }}
                </p>
              </select>
            </div>

            <!-- Row 5 -->
            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                City <span class="text-red-500 pt-2">*</span>
              </label>
              <select
                v-model="form.city"
                name="city"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              >
                <option value="" disabled>Select City</option>
                <option
                  v-for="city in cities"
                  :key="city.name"
                  :value="city.name"
                >
                  {{ city.district_name || city.name }}
                </option>
                <p
                  v-if="errors.city"
                  class="text-red-500 text-[10px] pt-1 pl-1"
                >
                  {{ errors.city }}
                </p>
              </select>
            </div>

            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                Area of Work <span class="text-red-500 pt-2">*</span>
              </label>
              <select
                v-model="form.area_of_work"
                name="area_of_work"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              >
                <option value="" disabled>Select Area of Work</option>
                <option
                  v-for="area in areaOfWorkOptions"
                  :key="area"
                  :value="area"
                >
                  {{ area }}
                </option>
                <p
                  v-if="errors.area_of_work"
                  class="text-red-500 text-[10px] pt-1 pl-1"
                >
                  {{ errors.area_of_work }}
                </p>
              </select>
            </div>

            <!-- Row 6 -->
            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                Contact Person Name <span class="text-red-500 pt-2">*</span>
              </label>
              <input
                v-model="form.contact_person_name"
                name="contact_person_name"
                type="text"
                placeholder="Full Name"
                @input="handle_input_change('contact_person_name')"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
              <p
                v-if="errors.contact_person_name"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.contact_person_name }}
              </p>
            </div>

            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                NGO Head Name <span class="text-red-500 pt-2">*</span>
              </label>
              <input
                v-model="form.ngo_head_name"
                type="text"
                name="ngo_head_name"
                @input="handle_input_change('ngo_head_name')"
                placeholder="Full Name"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
              <p
                v-if="errors.ngo_head_name"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.ngo_head_name }}
              </p>
            </div>

            <!-- Row 7 -->
            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                NGO Head Email <span class="text-red-500 pt-2">*</span>
              </label>
              <input
                v-model="form.ngo_head_email"
                name="ngo_head_email"
                @input="handle_input_change('ngo_head_email')"
                type="email"
                placeholder="head@example.com"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
              <p
                v-if="errors.ngo_head_email"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.ngo_head_email }}
              </p>
            </div>

            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                NGO Head Mobile <span class="text-red-500 pt-2">*</span>
              </label>
              <input
                v-model="form.ngo_head_mobile"
                name="ngo_head_mobile"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                @input="handle_input_change('ngo_head_mobile')"
                maxlength="10"
                pattern="\d{10}"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
              <p
                v-if="errors.ngo_head_mobile"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.ngo_head_mobile }}
              </p>
            </div>

            <!-- Row 8 -->
            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                NGO Head Office Number
              </label>
              <input
                v-model="form.ngo_head_office_number"
                name="ngo_head_office_number"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                @input="handle_input_change('ngo_head_office_number')"
                maxlength="10"
                pattern="\d{10}"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
              <p
                v-if="errors.ngo_head_office_number"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.ngo_head_office_number }}
              </p>
            </div>

            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                Postal Code <span class="text-red-500 pt-2">*</span>
              </label>
              <input
                v-model="form.pincode"
                name="pincode"
                type="text"
                placeholder="Enter PIN code"
                @input="handle_input_change('pincode')"
                maxlength="6"
                pattern="\d{6}"
                oninput="this.value=this.value.replace(/[^0-9]/g,'').slice(0,6)"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
              <p
                v-if="errors.pincode"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.pincode }}
              </p>
            </div>

            <!-- Row 9 (Full Width) -->
            <div class="md:col-span-2">
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                Address <span class="text-red-500 pt-2">*</span>
              </label>
              <textarea
                v-model="form.address"
                @input="handle_input_change('address')"
                name="address"
                rows="3"
                placeholder="Enter address with landmarks"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              ></textarea>
              <p
                v-if="errors.address"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.address }}
              </p>
            </div>

            <!-- Row 10 (Full Width) -->
            <div class="md:col-span-2">
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                Description <span class="text-red-500 pt-2">*</span>
              </label>
              <textarea
                v-model="form.description"
                name="description"
                @input="handle_input_change('description')"
                rows="4"
                placeholder="Describe your NGO's mission and activities"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              ></textarea>
              <p
                v-if="errors.description"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.description }}
              </p>
            </div>

            <!-- Row 11 -->
            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                Registered with BigTech <span class="text-red-500 pt-2">*</span>
              </label>
              <select
                v-model="form.registered_with_bigtech"
                name="registered_with_bigtech"
                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <p
                v-if="errors.registered_with_bigtech"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.registered_with_bigtech }}
              </p>
            </div>

            <div>
              <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                NGO Logo <span class="text-red-500 pt-2">*</span>
              </label>
              <label
                class="flex items-center px-4 py-3 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-indigo-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span class="text-sm text-gray-600"
                  >Upload NGO Logo (PNG, JPG up to 2MB)</span
                >
                <input
                  type="file"
                  class="hidden"
                  @change="handleFileUpload"
                  accept="image/*"
                />
              </label>

              <!-- Image Preview with Remove Button -->
              <div
                v-if="form.ngo_logo"
                class="py-3 flex px-4 border-2 border-dashed border-gray-300 rounded-lg justify-end"
              >
                <div class="">
                  <img
                    :src="'data:image/png;base64,' + form.ngo_logo"
                    alt="Preview"
                    class="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    @click="removeLogo"
                    class="mt-2 px-8 py-1 text-white bg-red-500 rounded-lg text-sm hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p
                v-if="errors.ngo_logo"
                class="text-red-500 text-[10px] pt-1 pl-1"
              >
                {{ errors.ngo_logo }}
              </p>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-6">
            <button
              type="submit"
              class="bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm hover:bg-orange-600 transition"
              :disabled="loading"
            >
              {{ loading ? 'Registering...' : 'Register NGO' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const call = inject('call')
const router = useRouter()

const form = ref({
  registration_type: 'Self Registration',
  ngo_name: '',
  website: '',
  official_contact_number: '',
  email: '',
  designation: '',
  state: '',
  city: '',
  description: '',
  license_type: 'FCRA',
  contact_person_name: '',
  ngo_head_name: '',
  ngo_head_email: '',
  ngo_head_mobile: '',
  ngo_head_office_number: '',
  area_of_work: '',
  address: '',
  pincode: '',
  registered_with_bigtech: 'No',
  ngo_logo: null,
  country: 'India',
})

const loading = ref(false)
const error = ref('')
const errors = ref({})

// Add refs for dropdown options
const countries = ref([])
const states = ref([])
const cities = ref([])
const areaOfWorkOptions = ref([
  'Education',
  'Skills',
  'Environment',
  'Financial Inclusion',
  'Accessibility and Inclusion',
  'Disaster Management',
  'Healthcare',
])

// Fetch country, state and city data
const fetchCountries = async () => {
  try {
    loading.value = true
    const res = await call('mykartavya.controllers.api.country_data')
    countries.value = res || []
  } catch (err) {
    console.error('Error fetching countries:', err)
    error.value = 'Failed to load countries. Please try again.'
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
    form.value.state = ''
    form.value.city = ''
  } catch (err) {
    console.error('Error fetching states:', err)
    error.value = 'Failed to load states. Please try again.'
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
    error.value = 'Failed to load cities. Please try again.'
  } finally {
    loading.value = false
  }
}

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

// Initialize data on component mount
onMounted(async () => {
  await fetchCountries()
  if (form.value.country) {
    await fetchStates()
  }
})

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
      form.value.ngo_logo = base64Data
      toast.success('Image uploaded successfully!')
    } catch (err) {
      console.error('Error uploading file:', err)
      toast.error('Failed to upload logo. Please try again.')
    }
  }
}

const removeLogo = () => {
  form.value.ngo_logo = null
  toast.info('Image removed.')
}

const validateForm = () => {
  const requiredFields = [
    'ngo_name',
    'website',
    'official_contact_number',
    'email',
    'designation',
    'country',
    'state',
    'city',

    'contact_person_name',
    'ngo_head_name',
    'ngo_head_email',
    'ngo_head_mobile',
    'area_of_work',
    'contact_person_name',
    'address',
    'description',
    'pincode',
  ]
  let firstErrorField = ref(null)

  for (const field of requiredFields) {
    if (!form.value[field]) {
      errors.value[field] = ` ${field.replace(/_/g, ' ')} is required!`
      if (firstErrorField.value === null) {
        firstErrorField.value = field
      }
    } else {
      delete errors.value[field]
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

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (
    !emailRegex.test(form.value.email) ||
    !emailRegex.test(form.value.ngo_head_email)
  ) {
    error.value = 'Please enter valid email addresses.'
    return false
  }

  // Validate phone numbers
  const phoneRegex = /^\d{10}$/
  if (
    !phoneRegex.test(form.value.official_contact_number) ||
    !phoneRegex.test(form.value.ngo_head_mobile) ||
    (form.value.ngo_head_office_number &&
      !phoneRegex.test(form.value.ngo_head_office_number))
  ) {
    error.value = 'Please enter valid 10-digit phone numbers.'
    return false
  }

  // Validate pincode
  if (!/^\d{6}$/.test(form.value.pincode)) {
    error.value = 'Please enter a valid 6-digit pincode.'
    return false
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

const submitForm = async () => {
  try {
    error.value = null
    if (!validateForm()) return

    if (!form.value.ngo_logo) {
      toast.error('NGO Logo is required before registration.')
      return
    }

    loading.value = true

    const response = await call('mykartavya.mykartavya.api.register_ngo', {
      ...form.value,
    })

    if (response.status === 'success') {
      toast.success(
        'NGO Registration Successful! Check your email for login credentials.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
        }
      )
      setTimeout(() => {
        router.push('/')
      }, 5000)
    } else {
      toast.error(
        response.message || 'Failed to register NGO. Please try again.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
        }
      )
    }
  } catch (err) {
    console.error('Error submitting form:', err)
    toast.error(err.message || 'Failed to register NGO. Please try again.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
    })
  } finally {
    loading.value = false
  }
}
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
.banner {
  background-image: url('../../assets/ngo-web-min.png');
}
</style>
