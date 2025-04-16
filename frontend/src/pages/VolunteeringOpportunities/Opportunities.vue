<template>
    <div class="h-screen w-full">
      <!-- Alert Banner for Unapproved Users -->
      <div v-if="!isUserApproved" class="w-full mt-16 bg-yellow-50 border-b border-yellow-200">
        <div class="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between flex-wrap">
            <div class="w-0 flex-1 flex items-center">
              <span class="flex p-2 rounded-lg bg-yellow-100">
                <svg class="h-6 w-6 text-yellow-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
              <p class="ml-3 font-medium text-yellow-800">
                <span class="md:hidden">Your account is pending approval</span>
                <span class="hidden md:inline">Your account is currently pending approval. Some features may be limited
                  until your account is approved.</span>
              </p>
            </div>
            <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a href="/profile"
                class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-700 bg-yellow-100 hover:bg-yellow-200">
                View Profile
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- banner section image -->
      <section :class="{ 'mt-[52px]': !isUserApproved }">
        <div v-if="selectedOpportunity" class="w-full relative h-[456px] md:h-[456px] back-img flex items-center mt-[60px]">
          <img :src="selectedOpportunity?.activity_image" class="w-full h-full" alt="">
          <div
            class="absolute top-20 left-5 sm:left-10 max-w-sm w-[448px] h-[312px] bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-4 justify-center">
            <div class="border-b pb-2">
  
              <h2 class="text-heading3 font-normal font-poppins mt-1">
                {{ selectedOpportunity?.activity_name }}
              </h2>
              <span class="text-secondary font-medium text-caption">{{ selectedOpportunity?.activity_type }}</span>
            </div>
  
            <div class="flex gap-1 items-center" style="color: #666666">
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.33331 7.00033C1.33331 4.48633 1.33331 3.22899 2.11465 2.44833C2.89598 1.66766 4.15265 1.66699 6.66665 1.66699H9.33331C11.8473 1.66699 13.1046 1.66699 13.8853 2.44833C14.666 3.22966 14.6666 4.48633 14.6666 7.00033V8.33366C14.6666 10.8477 14.6666 12.105 13.8853 12.8857C13.104 13.6663 11.8473 13.667 9.33331 13.667H6.66665C4.15265 13.667 2.89531 13.667 2.11465 12.8857C1.33398 12.1043 1.33331 10.8477 1.33331 8.33366V7.00033Z"
                  stroke="#666666" stroke-width="0.75" />
                <path d="M4.66666 1.66699V0.666992M11.3333 1.66699V0.666992M1.66666 5.00033H14.3333" stroke="#666666"
                  stroke-width="0.75" stroke-linecap="round" />
                <path
                  d="M12 10.3333C12 10.5101 11.9298 10.6797 11.8047 10.8047C11.6797 10.9298 11.5101 11 11.3333 11C11.1565 11 10.987 10.9298 10.8619 10.8047C10.7369 10.6797 10.6667 10.5101 10.6667 10.3333C10.6667 10.1565 10.7369 9.98695 10.8619 9.86193C10.987 9.7369 11.1565 9.66667 11.3333 9.66667C11.5101 9.66667 11.6797 9.7369 11.8047 9.86193C11.9298 9.98695 12 10.1565 12 10.3333ZM12 7.66667C12 7.84348 11.9298 8.01305 11.8047 8.13807C11.6797 8.2631 11.5101 8.33333 11.3333 8.33333C11.1565 8.33333 10.987 8.2631 10.8619 8.13807C10.7369 8.01305 10.6667 7.84348 10.6667 7.66667C10.6667 7.48986 10.7369 7.32029 10.8619 7.19526C10.987 7.07024 11.1565 7 11.3333 7C11.5101 7 11.6797 7.07024 11.8047 7.19526C11.9298 7.32029 12 7.48986 12 7.66667ZM8.66667 10.3333C8.66667 10.5101 8.59643 10.6797 8.4714 10.8047C8.34638 10.9298 8.17681 11 8 11C7.82319 11 7.65362 10.9298 7.5286 10.8047C7.40357 10.6797 7.33333 10.5101 7.33333 10.3333C7.33333 10.1565 7.40357 9.98695 7.5286 9.86193C7.65362 9.7369 7.82319 9.66667 8 9.66667C8.17681 9.66667 8.34638 9.7369 8.4714 9.86193C8.59643 9.98695 8.66667 10.1565 8.66667 10.3333ZM8.66667 7.66667C8.66667 7.84348 8.59643 8.01305 8.4714 8.13807C8.34638 8.2631 8.17681 8.33333 8 8.33333C7.82319 8.33333 7.65362 8.2631 7.5286 8.13807C7.40357 8.01305 7.33333 7.84348 7.33333 7.66667C7.33333 7.48986 7.40357 7.32029 7.5286 7.19526C7.65362 7.07024 7.82319 7 8 7C8.17681 7 8.34638 7.07024 8.4714 7.19526C8.59643 7.32029 8.66667 7.48986 8.66667 7.66667ZM5.33333 10.3333C5.33333 10.5101 5.2631 10.6797 5.13807 10.8047C5.01305 10.9298 4.84348 11 4.66667 11C4.48986 11 4.32029 10.9298 4.19526 10.8047C4.07024 10.6797 4 10.5101 4 10.3333C4 10.1565 4.07024 9.98695 4.19526 9.86193C4.32029 9.7369 4.48986 9.66667 4.66667 9.66667C4.84348 9.66667 5.01305 9.7369 5.13807 9.86193C5.2631 9.98695 5.33333 10.1565 5.33333 10.3333ZM5.33333 7.66667C5.33333 7.84348 5.2631 8.01305 5.13807 8.13807C5.01305 8.2631 4.84348 8.33333 4.66667 8.33333C4.48986 8.33333 4.32029 8.2631 4.19526 8.13807C4.07024 8.01305 4 7.84348 4 7.66667C4 7.48986 4.07024 7.32029 4.19526 7.19526C4.32029 7.07024 4.48986 7 4.66667 7C4.84348 7 5.01305 7.07024 5.13807 7.19526C5.2631 7.32029 5.33333 7.48986 5.33333 7.66667Z"
                  fill="#666666" />
              </svg>
  
              <span class="flex items-center text-bodyh2 font-normal mr-4" style="color: #0b0b0b">
                {{ formatDate(selectedOpportunity?.start_date) }} - {{ formatDate(selectedOpportunity?.end_date) }}
              </span>
            </div>
            <div class="flex items-center text-gray-600 text-bodyh2 font-normal justify-between border-b pb-2">
              <span class="flex justify-center items-center gap-1" style="color: #0b0b0b">
                <FeatherIcon name="clock" class="size-4 text-[#666666]" />
                {{ selectedOpportunity?.hours ?? '0' }} hr
              </span>
              <span class="flex items-center gap-2 justify-center" style="color: #0b0b0b">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.5002 3.66602C15.5002 2.28518 12.8885 1.16602 9.66683 1.16602C6.44516 1.16602 3.8335 2.28518 3.8335 3.66602M15.5002 3.66602V6.99935C15.5002 7.84935 14.5118 8.59935 13.0002 9.05102C12.0552 9.33435 10.906 9.49935 9.66683 9.49935C8.42766 9.49935 7.2785 9.33352 6.3335 9.05102C4.82266 8.59935 3.8335 7.84935 3.8335 6.99935V3.66602M15.5002 3.66602C15.5002 4.51602 14.5118 5.26602 13.0002 5.71768C12.0552 6.00102 10.906 6.16602 9.66683 6.16602C8.42766 6.16602 7.2785 6.00018 6.3335 5.71768C4.82266 5.26602 3.8335 4.51602 3.8335 3.66602"
                    stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M0.5 6.9994V10.3327C0.5 11.1827 1.48917 11.9327 3 12.3844C3.945 12.6677 5.09417 12.8327 6.33333 12.8327C7.5725 12.8327 8.72167 12.6669 9.66667 12.3844C11.1775 11.9327 12.1667 11.1827 12.1667 10.3327V9.4994M0.5 6.9994C0.5 6.0019 1.8625 5.14107 3.83333 4.74023M0.5 6.9994C0.5 7.8494 1.48917 8.5994 3 9.05107C3.945 9.3344 5.09417 9.4994 6.33333 9.4994C6.9125 9.4994 7.47167 9.46357 8 9.39607"
                    stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="text-bodyh2 font-normal"> {{ selectedOpportunity?.karma_points?.toLocaleString() }} Points</span>
              </span>
            </div>
            <div class="flex space-x-2 border-b pb-2">
              <div v-if="selectedOpportunity?.sdgs" v-for="item in JSON.parse(selectedOpportunity?.sdgs)">
                <img v-if="item?.image" :src="item.image" class="w-8 h-8" />
                <span v-else class="w-8 h-8 flex items-center justify-center bg-gray-50">{{ item?.sdgs_name?.charAt(0)
                }}</span>
              </div>
            </div>
  
            <div class="">
              <div class="w-full bg-gray-200 rounded-full h-[5px]">
                <div class="bg-green-500 h-[5px] rounded-full" :style="`width:${selectedOpportunity?.com_percent ?? 0}%`"></div>
              </div>
              <div class="flex items-center justify-between gap-2">
                <p class="text-caption font-normal mt-1" style="color: #0b0b0b">
                  {{ selectedOpportunity?.com_percent ?? 0 }} % completed
                </p>
                <div class="flex items-center gap-2 text-xs font-normal">
                  <FeatherIcon name="clock" class="size-4 text-[#666666]" />
                  {{ selectedOpportunity?.donet_hours ? ((selectedOpportunity?.donet_hours / 60) / 60).toFixed(2) : '0' }} hr
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- banner section image end -->
      <!-- main section start  -->
      <section class="w-full bg-gray-700">
        <div class="p-6 md:p-10 bg-gray-100">
          <!-- Main Content -->
          <div class="grid gap-6 lg:grid-cols-3">
            <!-- Left Section -->
            <div class="lg:col-span-2 flex flex-col justify-between items-start">
              <div class="text-[14px] text-[#666666] text-justify font-normal" v-html="selectedOpportunity?.activity_description">
              </div>
              <div class="flex items-center gap-[12px] flex-col justify-self-start mt-[220px]">
                <span class="text-gray-700 font-medium flex items-center space-x-2">
                  <Share2 class="w-4 h-4 text-[#666666]" />
                  <span class="text-bodyh1 font-medium font-poppins" style="color: #0b0b0b">Share activity with
                    others</span>
                </span>
                <div class="flex items-center gap-3 justify-start w-[230px]">
                  <button v-for="icon in icons" :key="icon.name" :aria-label="icon.name" @click="shareToSocial(icon)"
                    class="p-1.5 bg-white rounded-full hover:bg-gray-300">
                    <component :is="icon.svg" class="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
            <!-- Right Section - Timeline -->
            <div>
              <Stepper :activity="activities" :key="activities.activity" />
            </div>
          </div>
  
          <!-- Related Opportunities-->
          <div class="mt-10">
            <div class="flex justify-between">
              <h2 class="text-heading4 font-medium font-poppins" style="color: #0b0b0b">
                Related Opportunities
              </h2>
  
              <div class="flex items-center">
                <FeatherIcon @click="!isLeftDisabled && scrollLeft"
                  :class="['size-5', isLeftDisabled ? 'text-gray-500 cursor-not-allowed opacity-50' : 'text-gray-700 cursor-pointer']"
                  name="chevron-left" :disabled="isLeftDisabled" />
                <FeatherIcon @click="!isRightDisabled && scrollRight"
                  :class="['size-5', isRightDisabled ? 'text-gray-500 cursor-not-allowed opacity-50' : 'text-gray-700 cursor-pointer']"
                  name="chevron-right" :disabled="isRightDisabled" />
  
              </div>
            </div>
            <div ref="scrollContainer" class="py-4 w-full overflow-x-scroll">
              <div v-if="Opportunities?.length > 0" class="flex items-center gap-4">
                <Card v-for="(item, key) in Opportunities" :key="item.name" :item="item" :mode="'opportunity'"
                  class="w-[320px] min-w-[320px] max-w-[320px]" />
              </div>
              <div class="w-full h-[330px]" v-else>
                <NotFound />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- main section end  -->
    </div>
  </template>
  
  <script setup>
  import { inject, ref, onMounted, watch, watchEffect, computed, onUnmounted } from 'vue'
  import { FeatherIcon } from 'frappe-ui'
  import Stepper from '../../components/Stepper.vue'
  import Card from '../../components/Card.vue'
  import NotFound from '../../components/NotFound.vue'
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
  const store = inject('store');
  const activities = ref([]);
  const route = useRoute();
  const formatDate = inject('formatDate');
  const scrollContainer = ref(null);
  const isLeftDisabled = ref(true);
  const isRightDisabled = ref(false);
  const isUserApproved = ref(false)
  
  const activity = async () => {
    try {
      const response = await call('mykartavya.controllers.api.activity_details', { 'name': route.params.name });
      if (response) {
        activities.value = response
      }
    } catch (err) {
      console.error('Error fetching activity data:', err);
    }
  };
  // Sample data for the opportunities
  const Opportunities = ref([]);
  const selectedOpportunity = ref({});
  const relatedOpportunities = async () => {
    try {
      const response = await call('mykartavya.controllers.api.related_opportunities', { sdgs: activities.value.sdgs });
      if (response) {
        if(response.length > 0){
            if(route.params.name){
                Opportunities.value = response.filter(item => item.name !== route.params.name)
                selectedOpportunity.value = response.find(item => item.name === route.params.name)
            }else{
                Opportunities.value = response
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
  
  onMounted(async () => {
    await checkUserApproval()
    await activity()
    await relatedOpportunities()
  })
  watch(() => store.refresh_step, (val) => {
    if (val) {
      activity()
      store.refresh_step = false
    }
  }, { immediate: true, deep: true })
  
  watch(() => route.params.name, async (val, old) => {
    if (val != old) {
      await activity()
      await relatedOpportunities()
    }
  }, { immediate: true, deep: true })
  // scroll buttons
  
  // Scroll settings
  const cardWidth = 320;
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
  
  <style>
  /* @import "@fortawesome/fontawesome-free/css/all.min.css"; */
  </style>
  <style scoped>
  .back-img {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  
  ::-webkit-scrollbar {
    width: 4px;
    /* Thin width */
    height: 0px;
  }
  
  /* Ensures icons have smooth hover transition */
  button {
    transition: background 0.2s ease-in-out;
  }
  </style>