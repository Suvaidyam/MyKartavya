<template>
    <div class="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-[1920px] mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-[47px] font-semibold text-gray-900">Contact Us</h1>
          <p class="mt-2 text-[16px] text-gray-600">Got any query? Write to us</p>
        </div>
  
        <div class="bg-white rounded-sm shadow-lg overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <!-- Contact Form -->
            <div class="p-8">
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div>
                  <label for="name" class="block text-[14px] font-medium text-gray-700">Your name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="formData.name"
                    placeholder="Enter your name"
                    class="mt-1 block  w-full px-3 py-2 border border-gray-300  text-[14px] rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
  
                <div>
                  <label for="email" class="block text-[14px] font-medium text-gray-700">Email address</label>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    placeholder="sample@mail.com"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 text-[14px] rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
  
                <div>
                  <label for="organisation" class="block text-[14px] font-medium text-gray-700">Organisation</label>
                  <input
                    type="text"
                    id="organisation"
                    v-model="formData.organisation"
                    placeholder="Enter your organisation name"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 text-[14px] rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
  
                <div>
                  <label for="query" class="block text-[14px] font-medium text-gray-700">Your query</label>
                  <textarea
                    id="query"
                    v-model="formData.query"
                    rows="4"
                    placeholder="Write to us"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 text-[14px] rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  ></textarea>
                </div>
  
                <div class="flex justify-end">
                  <button
                    type="submit"
                    class=" bg-orange-500 py-3 px-4 border border-transparent rounded-sm shadow-sm text-[14px] font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 "
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
  
            <!-- Map Section -->
            <div class="relative h-[400px] lg:h-auto">
                <!-- Replace with actual map implementation -->
                <div class="absolute inset-0 bg-gray-200">
                  <img class="h-full w-90"  src="https://s3-alpha-sig.figma.com/img/7738/4a25/0c7efac837da226447fbb1d86771bf01?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YCtgUK28nHcIfeiSk1Jo13TgocX6JzyJUBVY5KJjbrnsWA1ewT2nd9Xpl9S3rxHPxVQ8dyz5JW9KZJyx0gh7ZF-lWIOm8hD0Kdb55M0BHdhLeMctudHJuTRb1hhW88M5UAKV8Qeunlt1k7zzD1dIbfD4PxahwNMLvbC4cpclcSvEW5OAtAGerN7-kSWz944BITFwynzHCxhFViVhFTQBiFjobW03MkonaJCOv2Tq37xiQ0DU14HCc4AsULhU1uAejiRjvTacWi7jhAUqAbyVKoQu49GH~STMlpcaS9GAG7OuHNoNGqIDSj-h0nSorxng15d6ZVWDp4tDrOzm0Fqp9w__" alt="" srcset="">
                <div class="p-6 bg-white rounded-sm shadow-sm absolute top-4 left-4 max-w-sm">
                  <h3 class="text-lg font-bold text-gray-900">nasscom</h3>
                  <p class="mt-1 text-gray-600">Plot No. 7 to 10, Raipur Khadar,</p>
                  <p class="text-gray-600">Sector 126, Noida, Uttar Pradesh 201303</p>
                  <div class="mt-2 flex items-center">
                    <span class="text-orange-500 font-bold">4.5</span>
                    <div class="flex text-orange-500 ml-1">
                      ★★★★½
                    </div>
                    <span class="ml-2 text-blue-500">211 reviews</span>
                  </div>
                  <a href="#" class="text-blue-500 hover:text-blue-700 mt-2 inline-block">View larger map</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          organisation: '',
          query: ''
        }
      }
    },
    methods: {
      handleSubmit() {
        // Handle form submission logic here
        console.log('Form submitted:', this.formData)
      }
    }
  }
  </script>