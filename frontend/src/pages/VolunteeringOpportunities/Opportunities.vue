<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
        <!-- Alert Banner for Unapproved Users -->
        <div v-if="!isUserApproved" class="w-full bg-gradient-to-r from-yellow-400 to-yellow-500">
            <div class="max-w-[1920px] mx-auto py-3 px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between flex-wrap">
                    <div class="w-0 flex-1 flex items-center">
                        <span class="flex p-2 rounded-lg bg-white/20">
                            <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </span>
                        <p class="ml-3 font-medium text-white">
                            <span class="md:hidden">Your account is pending approval</span>
                            <span class="hidden md:inline">Your account is currently pending approval. Some features may
                                be limited
                                until your account is approved.</span>
                        </p>
                    </div>
                    <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                        <a href="/profile"
                            class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-600 bg-white hover:bg-white/90 transition-all duration-300">
                            View Profile
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main Content -->
        <div class="max-w-[1920px] mx-auto">
            <!-- Hero Section -->
            <div v-if="selectedOpportunity" class="relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent z-10"></div>
                <img :src="selectedOpportunity?.activity_image"
                    class="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transform hover:scale-105 transition-transform duration-700"
                    alt="">

                <div class="absolute inset-0 z-20">
                    <div class="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end">
                        <div class="w-full pb-8 md:pb-16">
                            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                                <div class="lg:col-span-8">
                                    <div
                                        class="bg-white/10 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 shadow-xl">
                                        <div class="flex flex-wrap items-center gap-3 mb-4 lg:mb-6">
                                            <span
                                                class="px-4 lg:px-6 py-2 bg-white/20 rounded-full text-base lg:text-xl text-white font-medium">
                                                {{ selectedOpportunity?.activity_type }}
                                            </span>
                                            <span class="flex items-center gap-2 text-base lg:text-xl text-white">
                                                <FeatherIcon name="clock" class="size-4 lg:size-6" />
                                                {{ selectedOpportunity?.hours ?? '0' }} hr
                                            </span>
                                            <span class="flex items-center gap-2 text-base lg:text-xl text-white">
                                                <svg width="20" height="18" class="lg:w-6 lg:h-6" viewBox="0 0 16 14"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M15.5002 3.66602C15.5002 2.28518 12.8885 1.16602 9.66683 1.16602C6.44516 1.16602 3.8335 2.28518 3.8335 3.66602M15.5002 3.66602V6.99935C15.5002 7.84935 14.5118 8.59935 13.0002 9.05102C12.0552 9.33435 10.906 9.49935 9.66683 9.49935C8.42766 9.49935 7.2785 9.33352 6.3335 9.05102C4.82266 8.59935 3.8335 7.84935 3.8335 6.99935V3.66602M15.5002 3.66602C15.5002 4.51602 14.5118 5.26602 13.0002 5.71768C12.0552 6.00102 10.906 6.16602 9.66683 6.16602C8.42766 6.16602 7.2785 6.00018 6.3335 5.71768C4.82266 5.26602 3.8335 4.51602 3.8335 3.66602"
                                                        stroke="#FF5722" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                    <path
                                                        d="M0.5 6.9994V10.3327C0.5 11.1827 1.48917 11.9327 3 12.3844C3.945 12.6677 5.09417 12.8327 6.33333 12.8327C7.5725 12.8327 8.72167 12.6669 9.66667 12.3844C11.1775 11.9327 12.1667 11.1827 12.1667 10.3327V9.4994M0.5 6.9994C0.5 6.0019 1.8625 5.14107 3.83333 4.74023M0.5 6.9994C0.5 7.8494 1.48917 8.5994 3 9.05107C3.945 9.3344 5.09417 9.4994 6.33333 9.4994C6.9125 9.4994 7.47167 9.46357 8 9.39607"
                                                        stroke="#FF5722" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg>
                                                {{ selectedOpportunity?.karma_points?.toLocaleString() }} Points
                                            </span>
                                        </div>
                                        <h1
                                            class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                                            {{ selectedOpportunity?.activity_name }}
                                        </h1>
                                        <div class="flex flex-wrap items-center gap-3 mb-4 lg:mb-6">
                                            <div v-if="selectedOpportunity?.sdgs"
                                                v-for="item in JSON.parse(selectedOpportunity?.sdgs)"
                                                class="bg-white/20 p-1.5 lg:p-2 rounded-xl hover:bg-white/30 transition-all duration-300">
                                                <img v-if="item?.image" :src="item.image"
                                                    class="w-8 h-8 lg:w-10 lg:h-10" />
                                                <span v-else
                                                    class="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-white/20 rounded-xl text-white text-base lg:text-xl">
                                                    {{ item?.sdgs_name?.charAt(0) }}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            class="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 text-base lg:text-xl text-white">
                                            <span class="flex items-center gap-2">
                                                <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {{ formatDate(selectedOpportunity?.start_date) }} - {{
                                                    formatDate(selectedOpportunity?.end_date)
                                                }}
                                            </span>
                                            <div class="w-full lg:flex-1">
                                                <div class="w-full bg-white/30 rounded-full h-2 lg:h-3 overflow-hidden">
                                                    <div class="bg-gradient-to-r from-green-400 to-green-500 h-2 lg:h-3 rounded-full transition-all duration-500"
                                                        :style="`width:${selectedOpportunity?.com_percent ?? 0}%`">
                                                    </div>
                                                </div>
                                                <div class="flex items-center justify-between mt-2 text-sm lg:text-xl">
                                                    <span>{{ selectedOpportunity?.com_percent ?? 0 }}% completed</span>
                                                    <span>{{ selectedOpportunity?.donet_hours ?
                                                        ((selectedOpportunity?.donet_hours / 60) /
                                                            60).toFixed(2) : '0' }} hr</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="lg:col-span-4">
                                    <div
                                        class="bg-white/10 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 shadow-xl">
                                        <h3 class="text-xl lg:text-2xl font-semibold text-white mb-4 lg:mb-6">Share
                                            Opportunity</h3>
                                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            <button v-for="icon in icons" :key="icon.name" @click="shareToSocial(icon)"
                                                class="bg-white/20 hover:bg-white/30 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl flex items-center justify-center gap-2 lg:gap-3 transition-all duration-300 hover:scale-105">
                                                <component :is="icon.svg" class="w-5 h-5 lg:w-6 lg:h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Content Section -->
            <div class="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    <!-- Main Content -->
                    <div class="lg:col-span-8">
                        <div class="bg-white rounded-md lg:p-12 mb-8 lg:mb-12 min-h-[600px] lg:min-h-[800px]">
                            <h2 class="text-2xl lg:text-4xl font-bold mb-6 lg:mb-10 text-gray-800">About the Opportunity
                            </h2>
                            <div class="prose max-w-none text-base lg:text-xl leading-relaxed space-y-6 text-gray-600"
                                v-html="selectedOpportunity?.activity_description">
                            </div>
                        </div>
                    </div>
                    <!-- Timeline Sidebar -->
                    <div class="lg:col-span-4 bg-white h-[800px] rounded-md overflow-auto">
                        <div class="p-4 md:p-6 lg:p-10">
                            <div class="flex flex-col lg:flex-row gap-10">
                                <!-- Right Section -->
                                <div class="w-full lg:w-full ">
                                    <h2 class="text-xl md:text-heading4 py-2 font-medium font-poppins"
                                        style="color: #0b0b0b">
                                        Related Activity
                                    </h2>
                                    <div v-if="loader"
                                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 pt-1 gap-4">
                                        <CardLoader />
                                        <CardLoader />
                                        <CardLoader />
                                    </div>
                                    <div class="" v-else>
                                        <div v-if="opportunitiesActivities?.length > 0"
                                            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 pt-1 items-center gap-4">
                                            <Card v-for="(item) in opportunitiesActivities" :key="item.name"
                                                :item="item" :mode="'opportunity'" />
                                        </div>
                                        <div class="w-full h-[330px]" v-else>
                                            <NotFound />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Related opportunities -->
                <div class="mt-6 lg:mt-6">
                    <div class="flex items-center justify-between mb-8 lg:mb-6">
                        <h2 class="text-2xl lg:text-4xl font-bold text-gray-800">Related opportunities</h2>
                        <div class="flex items-center gap-2 lg:gap-4">
                            <button @click="!isLeftDisabled && scrollLeft" :disabled="isLeftDisabled"
                                class="p-3 lg:p-4 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
                                <FeatherIcon name="chevron-left" class="w-6 h-6 lg:w-8 lg:h-8" />
                            </button>
                            <button @click="!isRightDisabled && scrollRight" :disabled="isRightDisabled"
                                class="p-3 lg:p-4 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
                                <FeatherIcon name="chevron-right" class="w-6 h-6 lg:w-8 lg:h-8" />
                            </button>
                        </div>
                    </div>

                    <div ref="scrollContainer" class="relative">
                        <div v-if="opportunities?.length > 0"
                            class="flex gap-4 lg:gap-8 pb-4 overflow-x-auto scrollbar-hide">
                            <Card v-for="(item) in opportunities" :key="item.name" :item="item" :mode="'opportunity'"
                                class="w-[280px] min-w-[280px] max-w-[280px] lg:w-[450px] lg:min-w-[450px] lg:max-w-[450px] transform hover:scale-105 transition-all duration-300" />
                        </div>
                        <div v-else class="w-full h-[300px] lg:h-[450px]">
                            <NotFound />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref, onMounted, watch, watchEffect, computed, onUnmounted } from 'vue'
import { FeatherIcon } from 'frappe-ui'
import Card from '../../components/Card.vue'
import NotFound from '../../components/NotFound.vue'
import CardLoader from '../../components/CardLoader.vue'
// import CardLoader from "../../components/CardLoader.vue";
import {
    Facebook,
    Twitter,
    Linkedin,
    MessageCircle,
    Share2,
    CloudCog,
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'


const icons = [
    {
        name: 'Facebook',
        svg: Facebook,
        shareUrl: computed(() => {
            return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(activities.value?.title)}`
        })
    },
    {
        name: 'X',
        svg: Twitter,
        shareUrl: computed(() => {
            const text = `Check out ${activities.value?.title}`;
            const hashtags = activities.value?.sdgs ? JSON.parse(activities.value.sdgs).map(sdg => sdg.sdgs_name?.replace(/\s+/g, '')).join(',') : '';
            return `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}&hashtags=${hashtags}`
        })
    },
    {
        name: 'LinkedIn',
        svg: Linkedin,
        shareUrl: computed(() => {
            return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
        })
    },
    {
        name: 'WhatsApp',
        svg: MessageCircle,
        shareUrl: computed(() => {
            const text = `${activities.value?.title}\n${window.location.href}`;
            return `https://wa.me/?text=${encodeURIComponent(text)}`
        })
    },
]

const call = inject('call');
const activities = ref([]);
const route = useRoute();
const formatDate = inject('formatDate');
const scrollContainer = ref(null);
const isLeftDisabled = ref(true);
const isRightDisabled = ref(false);
const isUserApproved = ref(false)
const opportunitiesActivities = ref([]);


// Sample data for the opportunities
const opportunities = ref([]);
const selectedOpportunity = ref({});
const relatedOpportunities = async () => {
    try {
        const response = await call('mykartavya.controllers.api.related_opportunities', { sdgs: activities.value.sdgs });
        if (response) {
            if (response.length > 0) {
                if (route.params.name) {
                    opportunities.value = response.filter(item => item.name !== route.params.name)
                    selectedOpportunity.value = response.find(item => item.name === route.params.name)
                } else {
                    opportunities.value = response
                    selectedOpportunity.value = response[0]
                }
            }
        }
    } catch (err) {
        console.error('Error fetching activity data:', err);
    }
}

const checkUserApproval = async () => {
    try {
        const response = await call('mykartavya.controllers.api.sva_user_data');
        if (response && response.length > 0) {
            isUserApproved.value = response[0]?.workflow_state === 'Approved';
        }
    } catch (err) {
        console.error('Error checking user approval status:', err);
    }
}

const opportunitiesActivity = async () => {
    try {
        const response = await call('mykartavya.controllers.api.get_opportunity_activity', { opportunity: route.params.name });
        opportunitiesActivities.value = response
    } catch (err) {
        console.error('Error fetching activity data:', err);
    }
}

onMounted(async () => {
    await checkUserApproval()
    await relatedOpportunities()
    await opportunitiesActivity()
})

// Scroll settings
const cardWidth = 450;
const scrollStep = cardWidth;
const getScrollStep = () => {
    return window.innerWidth <= 640 ? cardWidth / 2 : cardWidth; // Adjust for small screens
};
// Scroll functions with boundary checks
const scrollLeft = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollTo({
            left: Math.max(0, scrollContainer.value.scrollLeft - scrollStep),
            behavior: 'smooth',
        });
    }
};

const scrollRight = () => {
    if (scrollContainer.value) {
        const maxScroll = scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth;
        scrollContainer.value.scrollTo({
            left: Math.min(maxScroll, scrollContainer.value.scrollLeft + scrollStep),
            behavior: 'smooth',
        });
    }
};

// Function to check if buttons should be disabled
const checkScrollButtons = () => {
    if (!scrollContainer.value) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
    isLeftDisabled.value = scrollLeft <= 0;
    // Check if content is actually overflowing
    const isOverflowing = scrollWidth > clientWidth;
    isRightDisabled.value = !isOverflowing || (scrollLeft + clientWidth >= scrollWidth);
};

// Watch for scroll changes and update button states
watchEffect(() => {
    if (scrollContainer.value) {
        scrollContainer.value.addEventListener('scroll', checkScrollButtons);
        // Initial check for overflow
        checkScrollButtons();
    }
});

// Add resize observer to handle dynamic content changes
onMounted(() => {
    const resizeObserver = new ResizeObserver(() => {
        checkScrollButtons();
    });

    if (scrollContainer.value) {
        resizeObserver.observe(scrollContainer.value);
    }

    // Cleanup
    onUnmounted(() => {
        resizeObserver.disconnect();
    });
});

window.addEventListener('resize', () => {
    getScrollStep(); // Ensure it updates when the window resizes
});

const shareToSocial = (platform) => {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
        platform.shareUrl.value,
        'social-share',
        `width=${width},height=${height},left=${left},top=${top}`
    );
}
</script>

<style scoped>
.back-img {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

/* Modern glass effect */
.bg-white\/10 {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}

/* Smooth hover effects */
.hover\:bg-white\/30:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Card hover effect */
.card-hover {
    transition: all 0.3s ease;
}

.card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Gradient text effect */
.gradient-text {
    background: linear-gradient(45deg, #FF5722, #FF9800);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Hide scrollbar but keep functionality */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Smooth transitions */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}

/* Responsive text sizes */
@media (max-width: 640px) {
    .text-responsive {
        font-size: 1rem;
    }
}

@media (min-width: 641px) and (max-width: 1024px) {
    .text-responsive {
        font-size: 1.125rem;
    }
}

@media (min-width: 1025px) {
    .text-responsive {
        font-size: 1.25rem;
    }
}
</style>