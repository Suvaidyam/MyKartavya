<template>
  <div class="min-h-screen bg-pink-50 pt-[62px]">
    <div class="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 mt-10">
        <h1 class="text-heading1 font-medium text-gray-900">Contact Us</h1>
        <p class="mt-2 text-bodyh1" style="color: #666666;">Got any query? Write to us</p>
      </div>
      <div class="bg-white rounded-sm shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="p-8">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-bodyh2 font-medium text-gray-700">Your name</label>
                <input type="text" id="name" v-model="formData.name" placeholder="Enter your name"
                  :disabled="isSubmitting"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 text-bodyh2 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100" />
                <div v-if="errors.name" class="text-red-500 text-sm py-2">{{ errors.name }}</div>
              </div>

              <div>
                <label for="email" class="block text-bodyh2 font-medium text-gray-700">Email address</label>
                <input type="email" id="email" v-model="formData.email" placeholder="sample@mail.com"
                  :disabled="isSubmitting"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 text-bodyh2 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100" />
                <div v-if="errors.email" class="text-red-500 text-sm py-2">{{ errors.email }}</div>
              </div>

              <div>
                <label for="volunteer_type" class="block text-bodyh2 font-medium text-gray-700"> Filling the form as</label>
                <select id="volunteer_type" v-model="formData.volunteer_type" :disabled="isSubmitting"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 text-bodyh2 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100">
                  <option value="NGO">NGO</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Corporate">Corporate</option>
                </select>
                <div v-if="errors.volunteer_type" class="text-red-500 text-sm py-2">{{ errors.volunteer_type }}</div>
              </div>
              <div>
                <label for="contact" class="block text-bodyh2 font-medium text-gray-700">Contact Number</label>
                <input type="text" id="contact" maxlength="10" v-model="formData.contact" placeholder="Enter your contact number"
                  :disabled="isSubmitting"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 text-bodyh2 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100" />
                <div v-if="errors.contact" class="text-red-500 text-sm py-2">{{ errors.contact }}</div>
              </div>

              <div>
                <label for="organisation" class="block text-bodyh2 font-medium text-gray-700">Organisation</label>
                <input type="text" id="organisation" v-model="formData.organisation"
                  placeholder="Enter your organisation name" :disabled="isSubmitting"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 text-bodyh2 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100" />
                <div v-if="errors.organisation" class="text-red-500 text-sm py-2">{{ errors.organisation }}</div>
              </div>

              <div>
                <label for="query" class="block text-bodyh2 font-medium text-gray-700">Your query</label>
                <textarea id="query" v-model="formData.query" rows="4" placeholder="Write to us"
                  :disabled="isSubmitting"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 text-bodyh2 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"></textarea>
                <div v-if="errors.query" class="text-red-500 text-sm py-2">{{ errors.query }}</div>
              </div>

              <div class="flex justify-end">
                <button type="submit" :disabled="isSubmitting"
                  class="bg-secondary py-2 w-full md:w-auto px-6 rounded-sm shadow-sm text-bodyh2 font-medium text-white hover:bg-orange-600 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200">
                  {{ isSubmitting ? 'SUBMITTING...' : 'SUBMIT' }}
                </button>
              </div>
            </form>
          </div>

          <div class="relative h-[400px] lg:h-auto">
            <div class="absolute inset-0 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7664317.010568194!2d77.18455012401961!3d20.286094357954926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce67f88a2e13d%3A0x55d1ea3694cd5a00!2snasscom!5e0!3m2!1sen!2sin!4v1741071924445!5m2!1sen!2sin"
                style="border: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen=""
                loading="lazy" referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-14">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue';
import Footer from '../../components/Footer.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const call = inject('call');

const formData = ref({
  name: '',
  email: '',
  organisation: '',
  query: '',
  contact: '',
  volunteer_type: ''
});

const errors = ref({});
const isSubmitting = ref(false);
const submitStatus = ref('');

const validateFields = () => {
  const newErrors = {};

  if (!formData.value.name.trim()) {
    newErrors.name = "Name is required.";
  } else if (formData.value.name.trim().length < 2) {
    newErrors.name = "Name must be at least 2 characters.";
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!formData.value.email.trim()) {
    newErrors.email = "Email address is required.";
  } else if (!emailPattern.test(formData.value.email.trim())) {
    newErrors.email = "Invalid email format.";
  }

  if (!formData.value.organisation.trim()) {
    newErrors.organisation = "Organisation is required.";
  }

  const phonePattern = /^[+]?[\d\s\-()]{10,15}$/;
  if (!formData.value.contact.trim()) {
    newErrors.contact = "Contact number is required.";
  } else if (!phonePattern.test(formData.value.contact.trim())) {
    newErrors.contact = "Invalid contact number format.";
  }

  if (!formData.value.query.trim()) {
    newErrors.query = "Query is required.";
  } else if (formData.value.query.trim().length < 10) {
    newErrors.query = "Query must be at least 10 characters.";
  }

  if (!formData.value.volunteer_type) {
    newErrors.volunteer_type = "Please select a volunteer type.";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  submitStatus.value = '';
  if (!validateFields()) return;

  // isSubmitting.value = true;

try {
  const response = await call('mykartavya.controllers.contact.contacts', {
    data: JSON.stringify(formData.value)  
  });
  if (response.status !== 'error' && response.message) {
    toast.success(response.message);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    formData.value = {
      name: '',
      email: '',
      organisation: '',
      query: '',
      contact: '',
      volunteer_type: ''
    };
    errors.value = {};
  } else {
    toast.error(response.message || 'Submission failed. Please try again.');
    if (response.errors) {
      errors.value = response.errors;
    } else {
      errors.value = {};
    }
  }
} catch (err) {
  toast.error('An error occurred. Please try again.');
  console.error('Submission error:', err);
}
}

// Optional: auto-hide toast message trigger
watch(submitStatus, (status) => {
  if (status) {
    setTimeout(() => {
      submitStatus.value = '';
    }, 5000);
  }
});
</script>

<style scoped>
/* Custom styles for better user experience */
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus states for better accessibility */
input:focus,
select:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1);
}

/* Loading state for button */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Error message styling */
.text-red-500 {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Success/Error message styling */
.bg-green-100,
.bg-red-100 {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>