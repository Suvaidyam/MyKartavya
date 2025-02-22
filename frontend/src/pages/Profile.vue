<template>
    <div class="max-w-[1920px] mx-auto p-4 bg-gray-50">
        <!-- Header Banner and Profile -->
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

        <!-- Profile Info Section -->
        <div class="mt-16 px-4">
            <div class=" flex-col sm:flex-row sm:items-center justify-between">
                <div>
                    <h1 class="text-[24px] font-semibold">{{ profile.name }}</h1>
                    <p class="text-[16px] text-gray-600">{{ profile.email }}</p>
                </div>
                <button class="mt-4 sm:mt-0 text-[14px] text-orange-500 font-medium">
                    EDIT PROFILE
                </button>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
            <!-- Personal Info Card -->
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-[20px] font-semibold mb-6">Personal Info</h2>
                <div class="space-y-4">
                    <div class="flex items-start gap-4">
                        <div class="w-6 mt-1">
                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-[14] text-gray-900">{{ profile.phone }}</p>
                            <p class="text-[12px] text-gray-500">Phone No.</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4">
                        <div class="w-6 mt-1">
                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-[14]text-gray-900">{{ profile.location }}</p>
                            <p class="text-[12px] text-gray-500">Location</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4">
                        <div class="w-6 mt-1">
                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-[14]text-gray-900">{{ profile.dob }}</p>
                            <p class="text-[12px] text-gray-500">Date of Birth</p>
                        </div>
                    </div>

                    <!-- Skills section -->
                    <div class="mt-6">
                        <h3 class=" text-[12px] font-medium mb-3">Skills</h3>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="skill in profile.skills" :key="skill"
                                class="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">
                                {{ skill }}
                            </span>
                        </div>
                    </div>

                    <!-- Attachments section -->
                    <div class="mt-6">
                        <h3 class="font-medium mb-3">Attachments</h3>
                        <div class="space-y-2">
                            <div v-for="doc in profile.documents" :key="doc.name"
                                class="flex items-center gap-2 text-gray-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span>{{ doc.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Certificates Grid -->
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-semibold mb-6">My Certificates</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div v-for="cert in profile.certificates" :key="cert.id" class="bg-gray-50 rounded-lg p-4">
                        <img :src="cert.image" :alt="cert.title" class="w-full h-40 object-cover rounded-lg mb-3" />
                        <h3 class="font-medium">{{ cert.title }}</h3>
                        <p class="text-sm text-gray-500">{{ cert.date }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfilePage",
    data() {
        return {
            profile: {
                name: "Aayush Kumar",
                email: "aayush.kumar@mail.com",
                phone: "9876543210",
                location: "Gurugram, Haryana, India",
                dob: "04-06-2024",
                organization: "Dhwani RIS",
                employeeId: "165",
                title: "NGO Worker",
                linkedin: "https://www.linkedin.com/in/username/",
                skills: ["Communication", "Teamwork", "Problem-Solving"],
                documents: [
                    { name: "Portfolio_Aayush Kumar.pdf" },
                    { name: "CV_Aayush Kumar.pdf" },
                ],
                certificates: [
                    {
                        id: 1,
                        title: "Empower the needy",
                        date: "12 Nov, 2024",
                        image: "/cert1.jpg",
                    },
                    {
                        id: 2,
                        title: "Beat the sugar",
                        date: "14 Nov, 2024",
                        image: "/cert2.jpg",
                    },
                    {
                        id: 3,
                        title: "Bright Bites",
                        date: "14 Nov, 2024",
                        image: "/cert3.jpg",
                    },
                    {
                        id: 4,
                        title: "Creation of a digital interface",
                        date: "16 Nov, 2024",
                        image: "/cert4.jpg",
                    },
                ],
            },
        };
    },
};
</script>