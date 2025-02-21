<template>
    <div class="max-w-[1920px] mx-auto p-4 bg-gray-50">
        <div class="relative">
            <div class="w-full h-48 bg-gray-200  overflow-hidden">
                <img src="../assets/Rectangle.png" alt="Profile Banner" class="w-full h-full object-cover" />
            </div>
            <div class="absolute left-8 -bottom-8">
                <div class="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                    <img src="../assets/Ellipse 9.png " alt="Profile Image" class="w-full h-full object-cover" />
                </div>
            </div>
        </div>
      <!-- Header / Profile Info -->
      <div class="bg-white shadow p-6 mb-6">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <!-- Avatar (optional) -->
          <div class="flex-shrink-0">
            <!-- Replace /avatar.jpg with actual image -->
             
          </div>
          <!-- Name and Email -->
          <div class="py-4">
            <h1 class="text-[24px] py font-semibold text-gray-700">Aayush Kumar</h1>
            <p class=" text-[16px] text-gray-500">aayush.kumar@gmail.com</p>
          </div>
        </div>
      </div>
  
      <!-- Personal Info Section -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Personal Info</h2>
  
        <!-- Form Container -->
        <form @submit.prevent="onSubmit">
          <!-- Grid for Form Inputs -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- First Name -->
            <div>
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                v-model="formData.firstName"
                placeholder="Enter your first name"
                class="block w-full border border-gray-300 text-[14px] rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
            </div>
  
            <!-- Last Name -->
            <div>
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                v-model="formData.lastName"
                placeholder="Enter your last name"
                class="block w-full border border-gray-300 text-[14px] rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
            </div>
  
            <!-- Phone No. -->
            <div>
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                Phone No.
              </label>
              <input
                type="text"
                v-model="formData.phone"
                placeholder="Enter phone number"
                class="block w-full border border-gray-300 text-[14px] rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
            </div>
  
            <!-- Country -->
            <div>
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                v-model="formData.country"
                placeholder="Enter country"
                class="block w-full border border-gray-300 text-[14px] rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
            </div>
  
            <!-- State -->
            <div>
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                v-model="formData.state"
                placeholder="Enter state"
                class="block w-full border border-gray-300 text-[14px] rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
            </div>
  
            <!-- City -->
            <div>
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                v-model="formData.city"
                placeholder="Enter city"
                class="block w-full border border-gray-300 text-[14px] rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
            </div>
  
            <!-- Date of Birth -->
            <div>
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                v-model="formData.dob"
                class="block w-full border border-gray-300 text-[14px] rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
            </div>
  
            <!-- Organization Name -->
            <div>
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                Organization Name
              </label>
              <input
                type="text"
                v-model="formData.organization"
                placeholder="Enter organization name"
                class="block w-full border border-gray-300 text-[14px] rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
            </div>
  
            <!-- Title -->
            <div>
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                v-model="formData.title"
                placeholder="Enter your title"
                class="block w-full border border-gray-300 text-[14px] rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
            </div>
  
            <!-- Employee ID -->
            <div>
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                Employee ID
              </label>
              <input
                type="text"
                v-model="formData.employeeId"
                placeholder="Enter employee ID"
                class="block w-full border border-gray-300 text-[14px] rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
            </div>
  
            <!-- LinkedIn Profile -->
            <div>
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                LinkedIn Profile
              </label>
              <input
                type="url"
                v-model="formData.linkedin"
                placeholder="Enter LinkedIn URL"
                class="block w-full border border-gray-300 text-[14px] rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"
              />
            </div>
  
            <!-- Add CV -->
            <div class="col-span-1 md:col-span-1">
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                Add CV
              </label>
              <div
                class="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 text-orange-500 p-4 rounded cursor-pointer"
                @click="onCvClick"
              >
                <svg
                  class="w-10 h-10 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 3h10M7 3a2 2 0 00-2 2v2m2-2h10m0 0a2 2 0 012 2v2m-2-2H7m13 8V8H4v8a2 2 0 002 2h12a2 2 0 002-2z"
                  />
                </svg>
                <span class="text-sm">
                  Click to upload or drag and drop
                </span>
                <input
                  ref="cvInput"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  class="hidden"
                  @change="onCvSelected"
                />
              </div>
            </div>
  
            <!-- Add Portfolio -->
            <div class="col-span-1 md:col-span-1">
              <label class="block text-[16px] font-normal text-gray-700 mb-1">
                Add Portfolio
              </label>
              <div
                class="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 text-orange-500 p-4 rounded cursor-pointer"
                @click="onPortfolioClick"
              >
                <svg
                  class="w-10 h-10 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 3h10M7 3a2 2 0 00-2 2v2m2-2h10m0 0a2 2 0 012 2v2m-2-2H7m13 8V8H4v8a2 2 0 002 2h12a2 2 0 002-2z"
                  />
                </svg>
                <span class="text-sm">
                  Click to upload or drag and drop
                </span>
                <input
                  ref="portfolioInput"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  class="hidden"
                  @change="onPortfolioSelected"
                />
              </div>
            </div>
          </div>
  
          <!-- Update Button -->
          <div class="mt-6">
            <button
              type="submit"
              class="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition"
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProfileForm",
    data() {
      return {
        formData: {
          firstName: "",
          lastName: "",
          phone: "",
          country: "",
          state: "",
          city: "",
          dob: "",
          organization: "",
          title: "",
          employeeId: "",
          linkedin: "",
        },
      };
    },
    methods: {
      onCvClick() {
        // Trigger hidden CV input
        this.$refs.cvInput.click();
      },
      onCvSelected(event) {
        const file = event.target.files[0];
        if (file) {
          // Handle the CV file
          console.log("CV File Selected:", file.name);
        }
      },
      onPortfolioClick() {
        // Trigger hidden Portfolio input
        this.$refs.portfolioInput.click();
      },
      onPortfolioSelected(event) {
        const file = event.target.files[0];
        if (file) {
          // Handle the Portfolio file
          console.log("Portfolio File Selected:", file.name);
        }
      },
      onSubmit() {
        // Handle form submission
        console.log("Form data:", this.formData);
        alert("Form submitted!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* You can add or override Tailwind classes here if needed. */
  </style>
  