<template>
  <div class="h-screen w-full">
    <!-- banner section image -->
    <section>
      <div v-if="activities" class="w-full relative h-[456px] md:h-[456px] back-img flex items-center mt-10">
        <img :src="activities.activity_image" class="w-full h-full" alt="">
        <div
          class="absolute top-20 left-10 max-w-sm w-[448px] h-[312px] bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-4 justify-center">
          <div class="border-b pb-2">

            <h2 class="text-heading3 font-normal font-poppins mt-1">
              {{ activities.title }}
            </h2>
            <span class="text-secondary font-medium text-caption">Online</span>
          </div>

          <div class="flex gap-1" style="color: #666666">
            <!-- <i class="far fa-calendar-alt mr-1 h-5 w-5"></i> -->
            <FeatherIcon name="calendar" class="size-4 text-[#666666]" />

            <span class="flex items-center text-bodyh2 font-normal mr-4" style="color: #0b0b0b">
              {{ formatDate(activities.start_date) }} - {{ formatDate(activities.end_date) }}
            </span>
          </div>
          <div class="flex items-center text-gray-600 text-bodyh2 font-normal justify-between border-b pb-2">
            <span class="flex justify-center gap-1" style="color: #0b0b0b">
              <FeatherIcon name="clock" class="size-4 text-[#666666]" />
              {{ activities.hours }} hr
            </span>
            <span class="flex items-center gap-2 justify-center" style="color: #0b0b0b">
              <FeatherIcon name="database" class="size-4 text-secondary" />
              <span class="text-bodyh2 font-normal"> {{ activities.karma_points }}</span>
            </span>
          </div>
          <div class="flex space-x-2 border-b pb-2">
            <div v-if="activities.sdgs" v-for="item in JSON.parse(activities.sdgs)">
              <img v-if="item.image" :src="item.image" class="w-8 h-8" />
              <span v-else class="w-8 h-8 flex items-center justify-center bg-gray-50">{{ item.sdgs_name?.charAt(0)
                }}</span>
            </div>
          </div>

          <div class="">
            <div class="w-full bg-gray-200 rounded-full h-[5px]">
              <div class="bg-green-500 h-[5px] rounded-full" :style="`width:${activities.com_percent ?? 0}%`"></div>
            </div>
            <p class="text-caption font-normal mt-1" style="color: #0b0b0b">
              {{ activities.com_percent ?? 0 }} % completed
            </p>
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
            <div v-html="activities.activity_description"></div>
            <div class="flex items-center gap-[12px] flex-col justify-self-start mt-[220px]">
              <span class="text-gray-700 font-medium flex items-center space-x-2">
                <Share2 class="w-4 h-4 text-[#666666]" />
                <span class="text-bodyh1 font-medium font-poppins" style="color: #0b0b0b">Share activity with
                  others</span>
              </span>
              <div class="flex items-center gap-3 justify-start w-[230px]">
                <button v-for="icon in icons" :key="icon.name" :aria-label="icon.name"
                  class="p-1.5 bg-white rounded-full hover:bg-gray-300">
                  <component :is="icon.svg" class="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          <!-- Right Section - Timeline -->
          <div>
            <Stepper :activity="activities" />
          </div>
        </div>

        <!-- Related Opportunities -->
        <div class="mt-10">
          <div class="flex justify-between">
            <h2 class="text-heading4 font-medium font-poppins" style="color: #0b0b0b">
              Related Opportunities
            </h2>

            <div class="flex items-center">
              <FeatherIcon @click="scrollLeft"
                :class="['size-5 cursor-pointer', isLeftDisabled ? 'text-gray-500 disabled' : 'text-gray-700']"
                name="chevron-left" :disabled="isLeftDisabled" />
              <FeatherIcon @click="scrollRight"
                :class="['size-5 cursor-pointer', isRightDisabled ? 'text-gray-500 disabled' : 'text-gray-700']"
                name="chevron-right" :disabled="isRightDisabled" />

            </div>
          </div>
          <div ref="scrollContainer" class="py-4 w-full overflow-x-scroll">
            <div v-if="relatedactivity?.length > 0" class="flex items-center gap-4">
              <Card v-for="(item, key) in relatedactivity" :key="key" :item="item"
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
import { inject, ref, onMounted, watch, watchEffect } from 'vue'
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
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'


const icons = [
  { name: 'Facebook', svg: Facebook },
  { name: 'X', svg: Twitter },
  { name: 'LinkedIn', svg: Linkedin },
  { name: 'WhatsApp', svg: MessageCircle },
]
const call = inject('call');
const store = inject('store');
const activities = ref([]);
const route = useRoute();
const formatDate = inject('formatDate');
const scrollContainer = ref(null);
const isLeftDisabled = ref(true);
const isRightDisabled = ref(false);

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
const relatedactivity = ref([]);
const relatedOpportunities = async () => {
  try {
    const response = await call('mykartavya.controllers.api.related_opportunities', { 'name': route.params.name, sdgs: activities.value.sdgs });
    if (response) {
      relatedactivity.value = response
    }
  } catch (err) {
    console.error('Error fetching activity data:', err);
  }
}
onMounted(async () => {
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
  isRightDisabled.value = scrollLeft + clientWidth >= scrollWidth;
};

// Watch for scroll changes and update button states
watchEffect(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', checkScrollButtons);
  }
});
window.addEventListener('resize', () => {
  getScrollStep(); // Ensure it updates when the window resizes
});
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