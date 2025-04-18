<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Alert Banner for Unapproved Users -->
    <div v-if="!isUserApproved" class="w-full bg-orange-100">
      <div class="max-w-[1920px] mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-white/20">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            <p class="ml-3 font-medium text-white">
              <span class="md:hidden">Your account is pending approval</span>
              <span class="hidden md:inline">Your account is currently pending approval. Some features may
                be limited until your account is approved.</span>
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
    <div class="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10 ">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column - Main Opportunity -->
        <div class="lg:col-span-4">
          <div class="bg-white rounded-md  overflow-hidden">
            <!-- Opportunity Image -->
            <div class="relative h-64 overflow-hidden">
              <img :src="selectedOpportunity?.activity_image" class="w-full h-full object-cover"
                alt="Opportunity Image">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-4">
                <h1 class="text-2xl font-bold text-white">{{ selectedOpportunity?.activity_name }}</h1>
                <span class="inline-block bg-orange-500 text-white px-2 py-1 rounded text-sm mt-2">{{
                  selectedOpportunity?.activity_type }}</span>
              </div>
            </div>

            <!-- Opportunity Details -->
            <div class="p-6">
              <div class="flex items-center gap-4 mb-4">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-gray-700">{{ formatDate(selectedOpportunity?.start_date) }} - {{
                    formatDate(selectedOpportunity?.end_date) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-gray-700">{{ selectedOpportunity?.hours ?? '0' }} hr</span>
                </div>
              </div>

              <div class="flex items-center gap-2 mb-6">
                <svg class="w-5 h-5 text-orange-500" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.5002 3.66602C15.5002 2.28518 12.8885 1.16602 9.66683 1.16602C6.44516 1.16602 3.8335 2.28518 3.8335 3.66602M15.5002 3.66602V6.99935C15.5002 7.84935 14.5118 8.59935 13.0002 9.05102C12.0552 9.33435 10.906 9.49935 9.66683 9.49935C8.42766 9.49935 7.2785 9.33352 6.3335 9.05102C4.82266 8.59935 3.8335 7.84935 3.8335 6.99935V3.66602M15.5002 3.66602C15.5002 4.51602 14.5118 5.26602 13.0002 5.71768C12.0552 6.00102 10.906 6.16602 9.66683 6.16602C8.42766 6.16602 7.2785 6.00018 6.3335 5.71768C4.82266 5.26602 3.8335 4.51602 3.8335 3.66602"
                    stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M0.5 6.9994V10.3327C0.5 11.1827 1.48917 11.9327 3 12.3844C3.945 12.6677 5.09417 12.8327 6.33333 12.8327C7.5725 12.8327 8.72167 12.6669 9.66667 12.3844C11.1775 11.9327 12.1667 11.1827 12.1667 10.3327V9.4994M0.5 6.9994C0.5 6.0019 1.8625 5.14107 3.83333 4.74023M0.5 6.9994C0.5 7.8494 1.48917 8.5994 3 9.05107C3.945 9.3344 5.09417 9.4994 6.33333 9.4994C6.9125 9.4994 7.47167 9.46357 8 9.39607"
                    stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="text-gray-700">{{ selectedOpportunity?.karma_points?.toLocaleString() }} Points</span>
              </div>

              <!-- Progress Bar -->
              <div class="mb-6">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-500 h-2 rounded-full"
                    :style="`width: ${selectedOpportunity?.com_percent ?? 0}%`"></div>
                </div>
                <div class="flex items-center justify-between mt-2 text-sm text-gray-600">
                  <span>{{ selectedOpportunity?.com_percent ?? 0 }}% completed</span>
                  <span>{{ selectedOpportunity?.donet_hours ? ((selectedOpportunity?.donet_hours / 60) / 60).toFixed(2)
                    : '0' }} hr</span>
                </div>
              </div>

              <!-- SDG Goals -->
              <div class="mb-6">
                <h3 class="text-lg font-medium text-gray-800 mb-3">SDG Goals</h3>
                <div class="flex flex-wrap gap-2">
                  <div v-if="selectedOpportunity?.sdgs" v-for="(sdg, index) in JSON.parse(selectedOpportunity.sdgs)"
                    :key="index"
                    class="bg-gray-100 p-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-all duration-300">
                    <img v-if="sdg?.image" :src="sdg.image" alt="SDG Icon" class="w-6 h-6">
                    <span v-else class="text-sm text-gray-700">{{ sdg?.sdgs_name }}</span>
                  </div>
                </div>
              </div>

              <!-- Activity Type -->
              <!-- <div class="mb-6">
                <h3 class="text-lg font-medium text-gray-800 mb-3">Activity Type</h3>
                <div class="flex items-center gap-2">
                  <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">{{
                    selectedOpportunity?.activity_type }}</span>
                </div>
              </div> -->

              <!-- CTA Button -->
              <button
                class="w-fit bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-sm font-medium transition-all duration-300 flex items-center justify-start gap-2">
                <svg class="w-3 h-3  " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3">
                  </path>
                </svg>
                <span class="text-sm">Act Now</span>
              </button>
            </div>
          </div>

          <!-- Volunteer Role -->
          <div class="bg-white rounded-md mt-6 p-6 h-[600px] flex flex-col sticky top-20">
            <h2 class="text-lg font-medium mb-4">Volunteer Role</h2>
            <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div class="prose prose-sm max-w-none">
                <p class="text-gray-600 whitespace-pre-wrap" v-html="selectedOpportunity?.activity_description"></p>
              </div>
            </div>
            <!-- Social Share Buttons -->
            <div class="mt-4 pt-4 border-t border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Share this opportunity</h3>
              <div class="flex items-center gap-3">
                <button @click="shareToSocial('facebook')"
                  class="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 transition-all duration-300">
                  <Facebook class="w-5 h-5" />
                </button>
                <button @click="shareToSocial('twitter')"
                  class="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 transition-all duration-300">
                  <Twitter class="w-5 h-5" />
                </button>
                <button @click="shareToSocial('linkedin')"
                  class="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 transition-all duration-300">
                  <Linkedin class="w-5 h-5" />
                </button>
                <button @click="shareToSocial('whatsapp')"
                  class="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 transition-all duration-300">
                  <MessageCircle class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Activities -->
        <div class="lg:col-span-8">
          <h2 class="text-lg font-medium mb-6">Activities</h2>

          <div v-if="loader" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 pt-1 gap-4">
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
          <div v-else>
            <div v-if="opportunitiesActivities?.length > 0"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 pt-1 gap-4">
              <Card v-for="(item) in opportunitiesActivities" :key="item.name" :item="item" :mode="'opportunity'" />
            </div>
            <div class="w-full h-[300px]" v-else>
              <NotFound />
            </div>
          </div>

          <!-- Related Opportunities -->
          <div class="mt-12">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-medium">Related Opportunities</h2>
              <div class="flex items-center gap-2">
                <button @click="!isLeftDisabled && scrollLeft" :disabled="isLeftDisabled"
                  class="p-3 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
                  <FeatherIcon name="chevron-left" class="w-6 h-6" />
                </button>
                <button @click="!isRightDisabled && scrollRight" :disabled="isRightDisabled"
                  class="p-3 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
                  <FeatherIcon name="chevron-right" class="w-6 h-6" />
                </button>
              </div>
            </div>

            <div ref="scrollContainer" class="relative">
              <div v-if="opportunities?.length > 0" class="flex gap-4 pb-4 overflow-x-auto scrollbar-hide">
                <Card v-for="(item) in opportunities" :key="item.name" :item="item" :mode="'opportunity'"
                  @click="handleCardClick(item)"
                  class="w-[280px] min-w-[280px] max-w-[280px] lg:w-[450px] lg:min-w-[450px] lg:max-w-[450px] transform hover:scale-105 transition-all duration-300 cursor-pointer" />
              </div>
              <div v-else class="w-full h-[300px]">
                <NotFound />
              </div>
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
import { useRouter, useRoute } from 'vue-router'
import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Share2,
  CloudCog,
} from 'lucide-vue-next'

const router = useRouter()
const call = inject('call');
const activities = ref([]);
const route = useRoute();
const formatDate = inject('formatDate');
const scrollContainer = ref(null);
const isLeftDisabled = ref(true);
const isRightDisabled = ref(false);
const isUserApproved = ref(false)
const opportunitiesActivities = ref([]);
const opportunities = ref([]);
const selectedOpportunity = ref({});
const loader = ref(true);

// Define functions first
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
    if (!route.params.name) {
      opportunitiesActivities.value = [];
      return;
    }

    // First check if the API endpoint exists
    const response = await call('mykartavya.controllers.api.get_opportunity_activity', {
      opportunity: route.params.name,
      filter: { sdgs: activities.value.sdgs }
    }).catch(err => {
      console.error('API Error:', err);
      return null;
    });

    if (!response) {
      console.warn('No response from get_opportunity_activity API');
      opportunitiesActivities.value = [];
      return;
    }

    // Process the response
    if (Array.isArray(response)) {
      const processedResponse = response.map(item => ({

        ...item,
        activity: item.activity,
        name: route.params.name
      }));
      opportunitiesActivities.value = processedResponse;
    } else {
      console.warn('Invalid response format from get_opportunity_activity API');
      opportunitiesActivities.value = [];
    }
  } catch (err) {
    console.error('Error in opportunitiesActivity:', err);
    opportunitiesActivities.value = [];
  }
}

// Handle card click to update route without refresh
const handleCardClick = (item) => {
  if (item.name !== route.params.name) {
    router.push(`/opportunities/${item.name}`);
  }
};

// Initialize data on component mount
onMounted(async () => {
  loader.value = true;
  try {
    await checkUserApproval();
    await relatedOpportunities();

    if (route.params.name) {
      try {
        await opportunitiesActivity();
      } catch (activityErr) {
        console.warn('Failed to load activities on mount:', activityErr);
        opportunitiesActivities.value = [];
      }
    }
  } catch (err) {
    console.error('Error in onMounted:', err);
  } finally {
    loader.value = false;
  }
});

// Watch for route changes to update the selected opportunity
watch(() => route.params.name, async (newName) => {
  if (newName) {
    loader.value = true;
    try {
      // First get the related opportunities
      await relatedOpportunities();

      // Then try to get activities, but don't let it break the flow
      try {
        await opportunitiesActivity();
      } catch (activityErr) {
        console.warn('Failed to load activities:', activityErr);
        opportunitiesActivities.value = [];
      }
    } catch (err) {
      console.error('Error updating opportunity:', err);
    } finally {
      loader.value = false;
    }
  } else {
    opportunitiesActivities.value = [];
  }
}, { immediate: false });

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
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(selectedOpportunity.value?.activity_name || '');
  const sdgs = selectedOpportunity.value?.sdgs ? JSON.parse(selectedOpportunity.value.sdgs) : [];
  const hashtags = sdgs.map(sdg => sdg.sdgs_name?.replace(/\s+/g, '')).join(',');

  let shareUrl = '';
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(`Check out ${title}`)}&hashtags=${hashtags}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${window.location.href}`)}`;
      break;
  }

  const width = 600;
  const height = 400;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(shareUrl, 'social-share', `width=${width},height=${height},left=${left},top=${top}`);
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

/* Custom scrollbar styling */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Ensure proper content display */
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 0.5em;
}

.prose p:last-child {
  margin-bottom: 0;
}
</style>