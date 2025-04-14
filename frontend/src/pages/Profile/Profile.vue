<template>
    <div class="max-w-[1920px] pt-[82px] pb-8 px-10 mx-auto bg-gray-50 min-h-screen">
        <div class="bg-white rounded-b-md">
            <div class="relative">
                <div class="w-full h-[152px]">
                    <img v-if="svaUserData?.custom_background_image" :src="svaUserData.custom_background_image"
                        alt="Banner" class="w-full h-full object-cover" />
                    <img v-else src="../../assets/Rectangle.png" alt="Banner" class="w-full h-full object-cover" />
                </div>
                <div class="absolute left-8 -bottom-8">
                    <div class="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                        <img v-if="svaUserData?.user_image" :src="svaUserData.user_image" alt="Profile"
                            class="w-full h-full object-cover" />
                        <div v-else
                            class="w-full h-full bg-gray-200 flex items-center justify-center text-[40px] text-gray-600">
                            {{ auth.cookie.full_name.charAt(0).toUpperCase() }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-10 px-4 pb-4">
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-3xl font-medium">{{ auth.cookie.full_name }}</h1>
                        <p class="text-bodyh1 text-gray-600 mt-1">{{ auth.cookie.user_id }}</p>
                        <router-link to="/updateprofile" class="text-lg text-orange-500 font-normal mt-2">EDIT
                            PROFILE</router-link>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-500">Status:</span>
                        <span class="px-3 py-1 text-sm font-medium rounded-full" :class="{
                            'bg-green-100 text-green-800': svaUserData?.workflow_state === 'Approved',
                            'bg-yellow-100 text-yellow-800': svaUserData?.workflow_state === 'Pending Approval',
                            'bg-red-100 text-red-800': svaUserData?.workflow_state === 'Rejected',
                            'bg-gray-100 text-gray-800': !svaUserData?.workflow_state || svaUserData?.workflow_state === 'Not Set'
                        }">
                            {{ svaUserData?.workflow_state || 'Not Set' }}
                        </span>
                    </div>
                </div>
                <!-- Add Rejection Remarks Section -->
                <div v-if="svaUserData?.workflow_state === 'Rejected' && svaUserData?.custom_remarks"
                    class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div class="flex items-start gap-3">
                        <div
                            class="w-10 h-10 min-w-10 min-h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-red-800 mb-1">Rejection Reason</h3>
                            <p class="text-sm text-red-700 whitespace-pre-wrap">{{ svaUserData.custom_remarks }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pt-12">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h2 class="text-xl font-semibold mb-6">Personal Info</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex items-start gap-3">
                            <div
                                class="w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">{{ svaUserData?.custom_phone_number || '---' }}
                                </div>
                                <div class="text-caption text-gray-500">Phone Number</div>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div
                                class="w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900"> {{ svaUserData?.state || '---' }},{{
                                    svaUserData?.city || '---' }}, {{ svaUserData?.custom_country }}</div>
                                <div class="text-caption text-gray-500">Location</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div
                                class="w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">{{ svaUserData?.custom_date_of_birth || '---' }}
                                </div>
                                <div class="text-caption text-gray-500">Date of Birth</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div
                                class="w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">{{ svaUserData?.custom_gender || '---' }}</div>
                                <div class="text-caption text-gray-500">Gender</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3" v-if="svaUserData?.custom_company">
                            <div
                                class="w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">{{ svaUserData?.custom_company || '---' }}</div>
                                <div class="text-caption text-gray-500">Organisation</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3" v-if="svaUserData?.custom_company">
                            <div
                                class="w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">{{ svaUserData?.custom_employee_id || '---' }}
                                </div>
                                <div class="text-caption text-gray-500">Employee ID</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div
                                class="w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900">{{ svaUserData?.custom_designation || '---' }}
                                </div>
                                <div class="text-caption text-gray-500">Designation</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div
                                class="w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-bodyh2 text-gray-900 break-all">
                                    <a v-if="svaUserData?.custom_linkedin" :href="svaUserData.custom_linkedin"
                                        target="_blank" rel="noopener noreferrer"
                                        class="text-gray-900 hover:text-orange-500 transition-colors">
                                        {{ svaUserData.custom_linkedin }}
                                    </a>
                                    <span v-else>---</span>
                                </div>
                                <div class="text-caption text-gray-500">Linkedin</div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8">
                        <h3 class="text-sm font-medium mb-3">Skills</h3>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="skill in svaUserData?.custom_skill" :key="skill"
                                class="px-4 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">
                                {{ skill }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-8">
                        <h3 class="text-sm font-medium mb-3">Attachments</h3>
                        <div class="space-y-3">
                            <!-- Portfolio -->
                            <div v-if="svaUserData?.custom_portfolio"
                                class="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Portfolio</p>
                                        <p class="text-xs text-gray-500">
                                            {{ getFileName(svaUserData.custom_portfolio) }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <a :href="svaUserData.custom_portfolio" download
                                        class="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                                        title="Download">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div v-else class="px-4 py-3 bg-gray-50 rounded-lg text-gray-500 text-sm">
                                No portfolio uploaded
                            </div>

                            <!-- CV -->
                            <div v-if="svaUserData?.custom_cv"
                                class="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Curriculum Vitae</p>
                                        <p class="text-xs text-gray-500">
                                            {{ getFileName(svaUserData.custom_cv) }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <a :href="svaUserData.custom_cv" download
                                        class="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                                        title="Download">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div v-else class="px-4 py-3 bg-gray-50 rounded-lg text-gray-500 text-sm">
                                No CV uploaded
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h2 class="text-xl font-semibold mb-6">My Certificates</h2>
                    <div v-if="certificates.length === 0" class="text-gray-500 text-center py-8">
                        No certificates earned yet
                    </div>
                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        <div v-for="certificate in certificates" :key="certificate.name"
                            class="relative group w-full max-w-[250px] mx-auto">
                            <!-- Certificate Card -->
                            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                <!-- Certificate Preview -->
                                <div class="aspect-[1.4/1] relative">
                                    <!-- Default Certificate Background -->
                                    <iframe :src="certificate.certificate" frameborder="0" class="w-full h-full"
                                        style="aspect-ratio: 1.4 / 1; object-fit: cover; overflow: hidden; scrollbar-width: none;"></iframe>
                                    <!-- Hover Overlay -->
                                    <div
                                        class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                                        <a :href="certificate.certificate" target="_blank"
                                            class="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200">
                                            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </a>
                                        <a :href="certificate.certificate" download
                                            class="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200">
                                            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                <!-- Certificate Info -->
                                <div class="p-3 border-t border-gray-200">
                                    <h3 class="font-medium text-gray-900 text-sm line-clamp-1">
                                        {{ certificate.activity_title }}
                                    </h3>
                                    <p class="text-xs text-gray-500 mt-1">{{ certificate.date }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Add Mapped Companies Section -->
                <div v-if="!svaUserData?.custom_company" class="bg-white rounded-lg p-6 shadow-sm mt-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-semibold">My Companies</h2>
                        <Company />
                    </div>
                    <div class="space-y-4">
                        <div v-if="mappedCompanies.length === 0" class="text-gray-500 text-center py-8">
                            No companies mapped yet
                        </div>
                        <div v-for="company in mappedCompanies" :key="company.name"
                            class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p class="font-medium">{{ company.company_name }}</p>
                                <p class="text-sm text-gray-600">{{ company.volunteer_email }}</p>
                                <p class="text-xs text-gray-500">Role: {{ company.role_profile }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import Company from './Company.vue';

const auth = inject('auth');
const call = inject('call')
const svaUserData = ref(null)
const mappedCompanies = ref([]);
const certificates = ref([]);
const allSkills = ref([]);

const fetchAllSkills = async () => {
    try {
        const response = await call('mykartavya.controllers.api.get_all_skills');
        allSkills.value = response || [];
    } catch (error) {
        console.error('Error fetching all skills:', error);
    }
};

const get = async () => {
    try {
        const response = await call('mykartavya.controllers.api.sva_user_data');
        if (response && response.length > 0) {
            svaUserData.value = response[0];
            svaUserData.value.custom_skill = svaUserData.value.custom_skill.map(skillId => {
                const skill = allSkills.value.find(s => s.name === skillId);
                return skill ? skill.skill_name : skillId;
            });
        }
    } catch (err) {
        console.error('Error fetching data:', err);
    }
};

const age = computed(() => {
    if (!svaUserData.value?.custom_date_of_birth) return '---';

    const dob = new Date(svaUserData.value.custom_date_of_birth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
});

// Fetch mapped companies
const fetchMappedCompanies = async () => {
    try {
        const response = await call('frappe.client.get_list', {
            doctype: 'Volunteer Company Mapper',
            fields: ['name', 'volunteer_email', 'company_name', 'role_profile'],
            filters: {
                volunteer: auth.cookie.name,
                is_email_verified: 1
            }
        });
        mappedCompanies.value = response || [];
    } catch (error) {
        console.error('Error fetching mapped companies:', error);
        mappedCompanies.value = [];
    }
};

// Add this helper function in the script section, before onMounted
const getFileName = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1];
};

// Add this function to fetch certificates
const fetchCertificates = async () => {
    try {
        const response = await call('mykartavya.controllers.api.get_user_certificates');
        if (response.success) {
            certificates.value = response.certificates;
        } else {
            console.error('Error fetching certificates:', response.message);
        }
    } catch (error) {
        console.error('Error fetching certificates:', error);
    }
};

const closePreview = () => {
    // Close the preview modal
    const modal = document.querySelector('.group-hover\\:flex');
    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
};

// Add this function in the script section, before onMounted
const getInitials = (fullName) => {
    if (!fullName) return '';
    const names = fullName.split(' ');
    return names[0].toUpperCase();
};

onMounted(() => {
    fetchAllSkills();
    get();
    fetchCertificates();
    fetchMappedCompanies()
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePreview();
    });
})
</script>
<style scoped>
iframe {
    overflow: hidden;
    scrollbar-width: none;
}

iframe::-webkit-scrollbar {
    display: none;
}
</style>
