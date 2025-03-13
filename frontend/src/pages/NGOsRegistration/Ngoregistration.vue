<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
    <div class="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-xl">
      <form @submit.prevent="submitForm" class="space-y-8">
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
        <div class="bg-indigo-50  rounded-lg">
          <h2 class="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Basic Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Registration Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Registration Type</label>
              <select v-model="form.registration_type" 
                class="w-full px-4 py-3 rounded-lg border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition">
                <option value="self">Self Registration</option>
              </select>
            </div>

            <!-- NGO Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NGO Name <span class="text-red-500">*</span></label>
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
              <label class="block text-sm font-medium text-gray-700 mb-1">Official Contact Number</label>
              <input v-model="form.official_contact_number" type="tel" placeholder="+91 XXXXX XXXXX"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>

             <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email <span class="text-red-500">*</span></label>
              <input v-model="form.email" type="email" placeholder="ngo@example.com" required
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>
              <!-- Designation -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input v-model="form.designation" type="text" placeholder="e.g., Director, Secretary"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>
              <!-- State and City -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input v-model="form.state" type="text" placeholder="Begin typing for results"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input v-model="form.city" type="text" placeholder="Begin typing for results"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>
             <!-- Description -->
          <div class="mt-0">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="form.description" rows="4" placeholder="Describe your NGO's mission and activities"
              class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"></textarea>
          </div>
            <!-- License Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">License Type</label>
              <select v-model="form.license_type"
                class="w-full px-4 py-3 rounded-lg border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition">
                <option value="FCRA">FCRA</option>
                <option value="12A">Non-FCRA</option>
              </select>
            </div>
          </div>
          
         
        </div>

        <!-- Contact Information Section -->
        <div class="bg-indigo-50  rounded-lg">
          <h2 class="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact
          </h2>
     
          
          <!-- NGO Head Information -->
          <div class="mt-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Cantact Person Name</label>
                <input v-model="form.ngo_head_name" type="text" placeholder="Full Name"
                  class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">NGO Head Name</label>
                <input v-model="form.ngo_head_name" type="text" placeholder="Full Name"
                  class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">NGO Head Email</label>
                <input v-model="form.ngo_head_email" type="email" placeholder="head@example.com"
                  class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">NGO Head Mobile</label>
                <input v-model="form.ngo_head_mobile" type="tel" placeholder="+91 XXXXX XXXXX"
                  class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">NGO Head Office Number</label>
                <input v-model="form.ngo_head_mobile" type="tel" placeholder="+91 XXXXX XXXXX"
                  class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
              </div>
                <!-- Area of Work -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Area of Work</label>
              <input v-model="form.area_of_work" type="text" placeholder="e.g., Education, Healthcare, Environment"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>
             <!-- Address -->
          <div class=" w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1 w-full"> Address</label>
            <textarea v-model="form.address" rows="3" placeholder="Enter  address with landmarks if any"
              class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"></textarea>
          </div>
           <!-- Postal Code -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input v-model="form.pincode" type="text" placeholder="Enter PIN code"
                class="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" />
            </div>
            </div>
          </div>
        </div>

        <!-- Location Information Section -->
        <div class="bg-indigo-50  rounded-lg">
          <h2 class="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
           Registration Details
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- BigTech Registration -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Registered with BigTech</label>
              <select v-model="form.registered_with_bigtech"
                class="w-full px-4 py-3 rounded-lg border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>         
        </div>

        <!-- NGO Logo Upload -->
        <div class="bg-indigo-50  rounded-lg">
          <h2 class="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            NGO Logo
          </h2>
          <div class="">
            <label class="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span class="mt-2 text-base leading-normal text-gray-600">Upload NGO Logo</span>
              <span class="mt-1 text-sm text-gray-500">PNG, JPG up to 2MB</span>
              <input type="file" class="hidden" @change="handleFileUpload" accept="image/*" />
            </label>
            <div v-if="form.ngo_logo" class="mt-3 text-sm text-gray-600">
              Selected file: {{ form.ngo_logo.name }}
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-6">
          <button type="submit" class="w-full  text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-md transition duration-300 transform hover:-translate-y-1" style="background: #FF5722;">
            Register NGO
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref,inject } from "vue";
const call = inject('call')

const terms = ref(false);
const form = ref({
  registration_type: "self",
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
  registered_with_bigtech: "no",
  ngo_logo: null,
});

const handleFileUpload = (event) => {
  form.value.ngo_logo = event.target.files[0];
};

const submitForm = () => {
  if (!terms.value) {
    alert("Please agree to the Terms and Conditions before submitting.");
    return;
  }
  
  console.log("Form submitted", form.value);
  alert("NGO Registration Successful!");
};
// const response = await call('frappe.client.insert', {
//   doc: {
//     doctype: 'NGOs',
//     registration_type: registration_type.value,
//     ngo_name: ngo_name.value,
//     website: website.value,
//     official_contact_number: official_contact_number.value,
//     email: email.value,
//     designation: designation.value,
//     state: state.value,
//     city: city.value,
//     description: description.value,
//     license_type: license_type.value,
//     contact_person_name: contact_person_name.value,
//     ngo_head_name: ngo_head_name.value,
//     ngo_head_email: ngo_head_email.value,
//     ngo_head_mobile: ngo_head_mobile.value,
//     ngo_head_office_number: ngo_head_office_number.value,
//     area_of_work: area_of_work.value,
//     address: address.value,
//     pincode: pincode.value,
//     registered_with_bigtech: registered_with_bigtech.value,
//     ngo_logo: ngo_logo.value,

//     ...form.value
//   }

// });
// console.log(response,"jhgjhgjhgjh");
console.log("sdfjkljfsdlkfjsld");

</script>