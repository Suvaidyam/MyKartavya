<template>
    <div class="max-w-4xl mx-auto">
        <div v-for="ngo in ngos" class="mt-10 border-t pt-4">
            <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-24">
                <!-- Logo and Title -->
                <div class="flex flex-col items-center text-center space-y-2">
                    <img v-if="ngo.ngo_logo" :src="ngo.ngo_logo" alt="Jan Mitra Logo"
                        class="h-40 w-40 object-contain" />
                    <h1 class="text-2xl font-semibold text-red-900">{{ ngo.ngo_name }}</h1>
                </div>
                <!-- Mission -->
                <p class="mt-6 text-gray-800 text-sm leading-relaxed text-justify">
                    <span v-html="ngo.description"></span>
                </p>
                <!-- Details -->
                <div class="mt-6 space-y-4 text-sm text-gray-800">
                    <div>
                        <span class="font-semibold">NGO Address:</span>
                        {{ ngo.address }}
                    </div>
                    <p>
                        <span class="font-semibold">NGO Website Link:</span>
                        <a :href="ngo.website" target="_blank"
                            class="ml-1 text-orange-600 cursor-pointer hover:underline bg-orange-100 px-2 py-1 rounded">
                            {{ ngo.website || 'Not Available' }}
                        </a>
                    </p>
                </div>
                <div class="mt-6">
                    <p class="font-semibold text-sm mb-2">SDGs Covered</p>
                    <div class="flex gap-2">
                        <img v-for="(img, i) in [ngo.first_priority_goal_image, ngo.second_priority_goal_image, ngo.third_priority_goal_image]"
                            :key="i" :src="img || 'https://cms.mykartavya.org/assets/images/goal13.jpg'" alt="SDG"
                            class="h-20 w-auto"
                            @error="e => e.target.src = 'https://cms.mykartavya.org/assets/images/goal11.jpg'" />
                    </div>
                </div>
                <!-- Activity Section -->
            </div>
        </div>
        <div class="mt-10 py-6">
            <p class="text-lg font-semibold pb-3 border-b">Ngo Activity</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Show activities if they exist -->
            <div v-for="act in activities" :key="act.id" class=" pt-4">
                <div class="flex justify-center items-center">
                    <div class="w-full">
                        <div
                            class="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div class="relative h-48 bg-gray-200">
                                <img :src="act.activity_image || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'"
                                    alt="Volunteers helping in emergency response" class="w-full h-full object-cover" />
                                <div class="absolute top-4 px-1">
                                    <span class="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                                        {{ act.activity_type }}
                                    </span>
                                </div>

                                <div
                                    class="absolute right-3 top-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 h-7 rounded-full shadow-sm flex items-center gap-1.5">
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.5002 3.66602C15.5002 2.28518 12.8885 1.16602 9.66683 1.16602C6.44516 1.16602 3.8335 2.28518 3.8335 3.66602M15.5002 3.66602V6.99935C15.5002 7.84935 14.5118 8.59935 13.0002 9.05102C12.0552 9.33435 10.906 9.49935 9.66683 9.49935C8.42766 9.49935 7.2785 9.33352 6.3335 9.05102C4.82266 8.59935 3.8335 7.84935 3.8335 6.99935V3.66602M15.5002 3.66602C15.5002 4.51602 14.5118 5.26602 13.0002 5.71768C12.0552 6.00102 10.906 6.16602 9.66683 6.16602C8.42766 6.16602 7.2785 6.00018 6.3335 5.71768C4.82266 5.26602 3.8335 4.51602 3.8335 3.66602"
                                            stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M0.5 6.9994V10.3327C0.5 11.1827 1.48917 11.9327 3 12.3844C3.945 12.6677 5.09417 12.8327 6.33333 12.8327C7.5725 12.8327 8.72167 12.6669 9.66667 12.3844C11.1775 11.9327 12.1667 11.1827 12.1667 10.3327V9.4994M0.5 6.9994C0.5 6.0019 1.8625 5.14107 3.83333 4.74023M0.5 6.9994C0.5 7.8494 1.48917 8.5994 3 9.05107C3.945 9.3344 5.09417 9.4994 6.33333 9.4994C6.9125 9.4994 7.47167 9.46357 8 9.39607"
                                            stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span class="font-semibold text-xs">{{ act?.karma_points?.toLocaleString() }}
                                        Points</span>
                                </div>
                            </div>

                            <div class="p-5">
                                <h3 class="text-md font-semibold text-gray-800 mb-4">
                                    {{ act.title }}
                                </h3>
                                <div class="flex gap-1.5 items-center text-xs tracking-normal text-gray-600">
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.33331 7.00033C1.33331 4.48633 1.33331 3.22899 2.11465 2.44833C2.89598 1.66766 4.15265 1.66699 6.66665 1.66699H9.33331C11.8473 1.66699 13.1046 1.66699 13.8853 2.44833C14.666 3.22966 14.6666 4.48633 14.6666 7.00033V8.33366C14.6666 10.8477 14.6666 12.105 13.8853 12.8857C13.104 13.6663 11.8473 13.667 9.33331 13.667H6.66665C4.15265 13.667 2.89531 13.667 2.11465 12.8857C1.33398 12.1043 1.33331 10.8477 1.33331 8.33366V7.00033Z"
                                            stroke="currentColor" stroke-width="0.75" />
                                        <path
                                            d="M4.66666 1.66699V0.666992M11.3333 1.66699V0.666992M1.66666 5.00033H14.3333"
                                            stroke="currentColor" stroke-width="0.75" stroke-linecap="round" />
                                        <path
                                            d="M12 10.3333C12 10.5101 11.9298 10.6797 11.8047 10.8047C11.6797 10.9298 11.5101 11 11.3333 11C11.1565 11 10.987 10.9298 10.8619 10.8047C10.7369 10.6797 10.6667 10.5101 10.6667 10.3333C10.6667 10.1565 10.7369 9.98695 10.8619 9.86193C10.987 9.7369 11.1565 9.66667 11.3333 9.66667C11.5101 9.66667 11.6797 9.7369 11.8047 9.86193C11.9298 9.98695 12 10.1565 12 10.3333ZM12 7.66667C12 7.84348 11.9298 8.01305 11.8047 8.13807C11.6797 8.2631 11.5101 8.33333 11.3333 8.33333C11.1565 8.33333 10.987 8.2631 10.8619 8.13807C10.7369 8.01305 10.6667 7.84348 10.6667 7.66667C10.6667 7.48986 10.7369 7.32029 10.8619 7.19526C10.987 7.07024 11.1565 7 11.3333 7C11.5101 7 11.6797 7.07024 11.8047 7.19526C11.9298 7.32029 12 7.48986 12 7.66667ZM8.66667 10.3333C8.66667 10.5101 8.59643 10.6797 8.4714 10.8047C8.34638 10.9298 8.17681 11 8 11C7.82319 11 7.65362 10.9298 7.5286 10.8047C7.40357 10.6797 7.33333 10.5101 7.33333 10.3333C7.33333 10.1565 7.40357 9.98695 7.5286 9.86193C7.65362 9.7369 7.82319 9.66667 8 9.66667C8.17681 9.66667 8.34638 9.7369 8.4714 9.86193C8.59643 9.98695 8.66667 10.1565 8.66667 10.3333ZM8.66667 7.66667C8.66667 7.84348 8.59643 8.01305 8.4714 8.13807C8.34638 8.2631 8.17681 8.33333 8 8.33333C7.82319 8.33333 7.65362 8.2631 7.5286 8.13807C7.40357 8.01305 7.33333 7.84348 7.33333 7.66667C7.33333 7.48986 7.40357 7.32029 7.5286 7.19526C7.65362 7.07024 7.82319 7 8 7C8.17681 7 8.34638 7.07024 8.4714 7.19526C8.59643 7.32029 8.66667 7.48986 8.66667 7.66667ZM5.33333 10.3333C5.33333 10.5101 5.2631 10.6797 5.13807 10.8047C5.01305 10.9298 4.84348 11 4.66667 11C4.48986 11 4.32029 10.9298 4.19526 10.8047C4.07024 10.6797 4 10.5101 4 10.3333C4 10.1565 4.07024 9.98695 4.19526 9.86193C4.32029 9.7369 4.48986 9.66667 4.66667 9.66667C4.84348 9.66667 5.01305 9.7369 5.13807 9.86193C5.2631 9.98695 5.33333 10.1565 5.33333 10.3333ZM5.33333 7.66667C5.33333 7.84348 5.2631 8.01305 5.13807 8.13807C5.01305 8.2631 4.84348 8.33333 4.66667 8.33333C4.48986 8.33333 4.32029 8.2631 4.19526 8.13807C4.07024 8.01305 4 7.84348 4 7.66667C4 7.48986 4.07024 7.32029 4.19526 7.19526C4.32029 7.07024 4.48986 7 4.66667 7C4.84348 7 5.01305 7.07024 5.13807 7.19526C5.2631 7.32029 5.33333 7.48986 5.33333 7.66667Z"
                                            fill="currentColor" />
                                    </svg>
                                    <time class="self-stretch my-auto font-medium">
                                        {{ formatDate(act?.start_date) }} - {{ formatDate(act?.end_date) }}
                                    </time>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Show "no data" message when activities array is empty or doesn't exist -->
        <div v-if="!activities || activities.length === 0" class="flex flex-col items-center justify-center py-20">
            <div class="w-40 h-40 mb-4">
                <img src="../../assets/no-data (1).png" alt="No data available" class="w-full h-full object-contain">
            </div>
            <p class="text-gray-500 text-center">
                There are no activites running at the moment. Please check back later.
            </p>
        </div>

        <div class="mt-10 py-6">
            <p class="text-lg font-semibold pb-3 border-b">Ngo opportunity</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Show activities if they exist -->
            <div v-for="opp in opportunities" :key="opp.id" class=" h-auto pt-4">
                <div class="flex justify-center items-center">
                    <div class="h-auto w-full">
                        <div
                            class="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div class="relative h-48 bg-gray-200">
                                <img :src="opp.opportunity_image || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'"
                                    alt="Volunteers helping in emergency response" class="w-full h-full object-cover" />
                                <div class="absolute top-4 px-1">
                                    <span class="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                                        {{ opp.opportunity_type }}
                                    </span>
                                </div>

                                <div
                                    class="absolute right-3 top-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 h-7 rounded-full shadow-sm flex items-center gap-1.5">
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.5002 3.66602C15.5002 2.28518 12.8885 1.16602 9.66683 1.16602C6.44516 1.16602 3.8335 2.28518 3.8335 3.66602M15.5002 3.66602V6.99935C15.5002 7.84935 14.5118 8.59935 13.0002 9.05102C12.0552 9.33435 10.906 9.49935 9.66683 9.49935C8.42766 9.49935 7.2785 9.33352 6.3335 9.05102C4.82266 8.59935 3.8335 7.84935 3.8335 6.99935V3.66602M15.5002 3.66602C15.5002 4.51602 14.5118 5.26602 13.0002 5.71768C12.0552 6.00102 10.906 6.16602 9.66683 6.16602C8.42766 6.16602 7.2785 6.00018 6.3335 5.71768C4.82266 5.26602 3.8335 4.51602 3.8335 3.66602"
                                            stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M0.5 6.9994V10.3327C0.5 11.1827 1.48917 11.9327 3 12.3844C3.945 12.6677 5.09417 12.8327 6.33333 12.8327C7.5725 12.8327 8.72167 12.6669 9.66667 12.3844C11.1775 11.9327 12.1667 11.1827 12.1667 10.3327V9.4994M0.5 6.9994C0.5 6.0019 1.8625 5.14107 3.83333 4.74023M0.5 6.9994C0.5 7.8494 1.48917 8.5994 3 9.05107C3.945 9.3344 5.09417 9.4994 6.33333 9.4994C6.9125 9.4994 7.47167 9.46357 8 9.39607"
                                            stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span class="font-semibold text-xs">{{ opp?.karma_points?.toLocaleString() }}
                                        Points</span>
                                </div>
                            </div>

                            <div class="p-5">
                                <h3 class="text-md font-semibold text-gray-800 mb-4">
                                    {{ opp.opportunity_name }}
                                </h3>
                                <div class="flex gap-1.5 items-center text-xs tracking-normal text-gray-600">
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.33331 7.00033C1.33331 4.48633 1.33331 3.22899 2.11465 2.44833C2.89598 1.66766 4.15265 1.66699 6.66665 1.66699H9.33331C11.8473 1.66699 13.1046 1.66699 13.8853 2.44833C14.666 3.22966 14.6666 4.48633 14.6666 7.00033V8.33366C14.6666 10.8477 14.6666 12.105 13.8853 12.8857C13.104 13.6663 11.8473 13.667 9.33331 13.667H6.66665C4.15265 13.667 2.89531 13.667 2.11465 12.8857C1.33398 12.1043 1.33331 10.8477 1.33331 8.33366V7.00033Z"
                                            stroke="currentColor" stroke-width="0.75" />
                                        <path
                                            d="M4.66666 1.66699V0.666992M11.3333 1.66699V0.666992M1.66666 5.00033H14.3333"
                                            stroke="currentColor" stroke-width="0.75" stroke-linecap="round" />
                                        <path
                                            d="M12 10.3333C12 10.5101 11.9298 10.6797 11.8047 10.8047C11.6797 10.9298 11.5101 11 11.3333 11C11.1565 11 10.987 10.9298 10.8619 10.8047C10.7369 10.6797 10.6667 10.5101 10.6667 10.3333C10.6667 10.1565 10.7369 9.98695 10.8619 9.86193C10.987 9.7369 11.1565 9.66667 11.3333 9.66667C11.5101 9.66667 11.6797 9.7369 11.8047 9.86193C11.9298 9.98695 12 10.1565 12 10.3333ZM12 7.66667C12 7.84348 11.9298 8.01305 11.8047 8.13807C11.6797 8.2631 11.5101 8.33333 11.3333 8.33333C11.1565 8.33333 10.987 8.2631 10.8619 8.13807C10.7369 8.01305 10.6667 7.84348 10.6667 7.66667C10.6667 7.48986 10.7369 7.32029 10.8619 7.19526C10.987 7.07024 11.1565 7 11.3333 7C11.5101 7 11.6797 7.07024 11.8047 7.19526C11.9298 7.32029 12 7.48986 12 7.66667ZM8.66667 10.3333C8.66667 10.5101 8.59643 10.6797 8.4714 10.8047C8.34638 10.9298 8.17681 11 8 11C7.82319 11 7.65362 10.9298 7.5286 10.8047C7.40357 10.6797 7.33333 10.5101 7.33333 10.3333C7.33333 10.1565 7.40357 9.98695 7.5286 9.86193C7.65362 9.7369 7.82319 9.66667 8 9.66667C8.17681 9.66667 8.34638 9.7369 8.4714 9.86193C8.59643 9.98695 8.66667 10.1565 8.66667 10.3333ZM8.66667 7.66667C8.66667 7.84348 8.59643 8.01305 8.4714 8.13807C8.34638 8.2631 8.17681 8.33333 8 8.33333C7.82319 8.33333 7.65362 8.2631 7.5286 8.13807C7.40357 8.01305 7.33333 7.84348 7.33333 7.66667C7.33333 7.48986 7.40357 7.32029 7.5286 7.19526C7.65362 7.07024 7.82319 7 8 7C8.17681 7 8.34638 7.07024 8.4714 7.19526C8.59643 7.32029 8.66667 7.48986 8.66667 7.66667ZM5.33333 10.3333C5.33333 10.5101 5.2631 10.6797 5.13807 10.8047C5.01305 10.9298 4.84348 11 4.66667 11C4.48986 11 4.32029 10.9298 4.19526 10.8047C4.07024 10.6797 4 10.5101 4 10.3333C4 10.1565 4.07024 9.98695 4.19526 9.86193C4.32029 9.7369 4.48986 9.66667 4.66667 9.66667C4.84348 9.66667 5.01305 9.7369 5.13807 9.86193C5.2631 9.98695 5.33333 10.1565 5.33333 10.3333ZM5.33333 7.66667C5.33333 7.84348 5.2631 8.01305 5.13807 8.13807C5.01305 8.2631 4.84348 8.33333 4.66667 8.33333C4.48986 8.33333 4.32029 8.2631 4.19526 8.13807C4.07024 8.01305 4 7.84348 4 7.66667C4 7.48986 4.07024 7.32029 4.19526 7.19526C4.32029 7.07024 4.48986 7 4.66667 7C4.84348 7 5.01305 7.07024 5.13807 7.19526C5.2631 7.32029 5.33333 7.48986 5.33333 7.66667Z"
                                            fill="currentColor" />
                                    </svg>
                                    <time class="self-stretch my-auto font-medium">
                                        {{ formatDate(opp?.start_date) }} - {{ formatDate(opp?.end_date) }}
                                    </time>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Show "no data" message when activities array is empty or doesn't exist -->
        <div v-if="!opportunities || opportunities.length == 0" class="flex flex-col items-center justify-center py-20">
            <div class="w-40 h-40 mb-4">
                <img src="../../assets/no-data (1).png" alt="No data available" class="w-full h-full object-contain">
            </div>
            <p class="text-gray-500 text-center">
                There are no opportunities running at the moment. Please check back later.
            </p>
        </div>
    </div>
    <div class="mt-40">
        <Footer />
    </div>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router'
import Footer from '@/components/Footer.vue';
const route = useRoute()
const call = inject('call');
const ngos = ref([]);
const formatDate = inject('formatDate');
const activities = ref([]);
const opportunities = ref([]);

async function get_ngos() {
    try {
        const response = await call('mykartavya.controllers.state.ngo', {
            name: route?.params?.name
        });
        if (response) {
            console.log('Response  :', response);

            ngos.value = response;
            activities.value = response[0].activities || [];
            opportunities.value = response[0].opportunity || [];
            console.log('NGOs ', activities.value);

        }
    } catch (err) {
        console.error('Error fetching NGOs:', err);
    }
}
onMounted(() => {
    get_ngos();
});
</script>
