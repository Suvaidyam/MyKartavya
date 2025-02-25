<template>
    <div class="max-w-[1920px] pt-[82px] pb-8 px-10 mx-auto bg-gray-50 min-h-screen">
        <div class="h-[291px] rounded-b-md bg-white">
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
                <router-link to="/updateprofile" class="text-lg text-orange-500 font-normal mt-2">EDIT PROFILE</router-link>
            </div>
        </div>
        <div class="pt-4" >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h2 class="text-xl font-semibold mb-6">Personal Info</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">{{svaUserData?.mobile_number || '---'  }}</div>
                                <div class="text-caption text-gray-500">Phone No.</div>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">   {{ svaUserData?.custom_state || '---'  }},{{ svaUserData?.custom_city || '---'  }}, {{ svaUserData?.custom_country }}</div>
                                <div class="text-caption text-gray-500">Location</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">{{svaUserData?.custom_date_of_birth || '---'  }}</div>
                                <div class="text-caption text-gray-500">Date of Birth</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">24 years</div>
                                <div class="text-caption text-gray-500">Age</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">Dhwani RIS</div>
                                <div class="text-caption text-gray-500">Organisation</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">{{svaUserData?.custom_employee_id || '---'  }}</div>
                                <div class="text-caption text-gray-500">Employee ID</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">{{svaUserData?.custom_ngo || '---'  }}</div>
                                <div class="text-caption text-gray-500">Title</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900 break-all">https://www.linkedin.com/in/username/
                                </div>
                                <div class="text-caption text-gray-500">Linkedin</div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8">
                        <h3 class="text-sm font-medium mb-3">Skills</h3>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-4 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">Communication</span>
                            <span class="px-4 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">Teamwork</span>
                            <span class="px-4 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">Problem -
                                Solving</span>
                        </div>
                    </div>
                    <div class="mt-8">
                        <h3 class="text-sm font-medium mb-3">Attachments</h3>
                        <div class="space-y-2">
                            <div class="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span class="text-gray-700">Portfolio_Aayush Kumar.pdf</span>
                            </div>
                            <div class="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span class="text-gray-700">CV_Aayush Kumar.pdf</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h2 class="text-xl font-semibold mb-6">My Certificates</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div v-for="certificate in certificates" :key="certificate.id"
                            class="bg-gray-50 rounded-lg p-3">
                            <img :src="certificate.image" :alt="certificate.title"
                                class="w-full h-40 object-cover rounded-lg mb-3" />
                            <h3 class="font-medium text-gray-900">{{ certificate.title }}</h3>
                            <p class="text-sm text-gray-500">{{ certificate.date }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref ,inject,onMounted} from 'vue';

const auth = inject('auth');
const call = inject('call')
const svaUserData=ref(null)

const certificates = ref([
    {
        id: 1,
        title: 'Empower the needy',
        date: '12 Nov, 2024',
        image: '/cert1.jpg'
    },
    {
        id: 2,
        title: 'Beat the sugar',
        date: '14 Nov, 2024',
        image: '/cert2.jpg'
    },
    {
        id: 3,
        title: 'Bright Bites',
        date: '14 Nov, 2024',
        image: '/cert3.jpg'
    },
    {
        id: 4,
        title: 'Creation of a digital interface',
        date: '16 Nov, 2024',
        image: '/placeholder4.jpg'
    },
    {
        id: 5,
        title: 'Data Management System',
        date: '18 Nov, 2024',
        image: '/placeholder5.jpg'
    }
]);

const get = async () => {
  try {
    const response = await call('mykartavya.controllers.api.sva_user_data');
    svaUserData.value = response[0];
  } catch (err) {
    // Handle the error here
    console.error('Error fetching data:', err);
  }
};

onMounted(get) 



</script>