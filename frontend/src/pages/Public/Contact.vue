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
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 text-bodyh2 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                <div v-if="errors.name" class="text-red-500 text-sm py-2">{{ errors.name }}</div>
              </div>
              <div>
                <label for="email" class="block text-bodyh2 font-medium text-gray-700">Email address</label>
                <input type="email" id="email" v-model="formData.email" placeholder="sample@mail.com"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 text-bodyh2 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                <div v-if="errors.email" class="text-red-500 text-sm py-2">{{ errors.email }}</div>
              </div>

              <div>
                <label for="organisation" class="block text-bodyh2 font-medium text-gray-700">Organisation</label>
                <input type="text" id="organisation" v-model="formData.organisation"
                  placeholder="Enter your organisation name"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 text-bodyh2 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                <div v-if="errors.organisation" class="text-red-500 text-sm py-2">{{ errors.organisation }}</div>
              </div>

              <div>
                <label for="query" class="block text-bodyh2 font-medium text-gray-700">Your query</label>
                <textarea id="query" v-model="formData.query" rows="4" placeholder="Write to us"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 text-bodyh2 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
                <div v-if="errors.query" class="text-red-500 text-sm py-2">{{ errors.query }}</div>
              </div>

              <div class="flex justify-end">
                <button type="submit"
                  class="bg-secondary py-2 w-full md:w-auto px-6 rounded-sm shadow-sm text-bodyh2 font-medium text-white hover:bg-orange-600 f focus:ring-orange-500">
                  SUBMIT
                </button>
              </div>
            </form>
          </div>

          <div class="relative h-[400px] lg:h-auto">
            <div class="absolute inset-0 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7664317.010568194!2d77.18455012401961!3d20.286094357954926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce67f88a2e13d%3A0x55d1ea3694cd5a00!2snasscom!5e0!3m2!1sen!2sin!4v1741071924445!5m2!1sen!2sin"
                style="border: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen=""
                loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
import { ref } from 'vue';
import Footer from '../../components/Footer.vue';

const formData = ref({
  name: '',
  email: '',
  organisation: '',
  query: ''
});

const errors = ref({});

const validateFields = () => {
  const newErrors = {};
  if (!formData.value.name.trim()) {
    newErrors.name = "Name is required.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.value.email.trim()) {
    newErrors.email = "Email address is required.";
  } else if (!emailPattern.test(formData.value.email)) {
    newErrors.email = "Invalid email address.";
  }

  if (!formData.value.organisation.trim()) {
    newErrors.organisation = "Organisation is required.";
  }

  if (!formData.value.query.trim()) {
    newErrors.query = "Query is required.";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (validateFields()) {
    console.log("Form submitted successfully:", formData.value);
    formData.value = { name: '', email: '', organisation: '', query: '' };
    errors.value = {};
  } else {
    console.error("Validation failed:", errors.value);
  }
};
</script>