<template>
  <div class="max-w-[1920px] w-full mx-auto"
    :class="{ 'pt-[62px]': !isUserApproved && svaUserData?.workflow_state !== 'Rejected' }">
    <!-- Alert Banner for Unapproved Users -->
    <div v-if="!isUserApproved && svaUserData?.workflow_state !== 'Rejected'" class="w-full bg-orange-100">
      <div class="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="flex p-1.5 rounded-lg bg-orange-100">
              <svg class="h-4 w-4 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            <p class="ml-2 text-sm font-medium text-orange-800">
              <span class="md:hidden">Account pending approval</span>
              <span class="hidden md:inline">Your account is pending approval. Some features may be limited.</span>
            </p>
          </div>
          <button @click="showReqForApproval = true"
            class="bg-orange-100 hover:bg-orange-200 px-4 py-1.5 rounded-sm text-sm font-medium text-orange-800 flex items-center gap-1.5 transition-all duration-200 button-animation">
            Request for Approval
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Add Rejection Remarks Section -->
    <div v-if="svaUserData?.workflow_state === 'Rejected' && svaUserData?.custom_remarks" class="w-full bg-red-50/50"
      :class="{ 'mt-16': !isUserApproved }">
      <div class="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 min-w-8 min-h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-medium text-red-800">Rejection Reason</h3>
              <span class="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Account Rejected</span>
            </div>
            <p class="text-sm text-red-700 mt-1 line-clamp-2">{{ svaUserData.custom_remarks }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Request for Approval Popup -->
    <ReqForApproval v-model="showReqForApproval" />

    <div class="w-full flex flex-col lg:flex-row px-4 sm:px-5"
      :class="{ 'mt-[8px]': !isUserApproved, 'mt-[60px]': isUserApproved }">
      <Filters />
      <div class="w-full lg:pl-[270px] flex flex-col xl:flex-row">
        <main class="w-full px-2 sm:px-3 py-3 bg-gray-50">
          <!-- Current Commitments Section -->
          <div class="flex justify-between mb-2">
            <h1 class="text-[20px] sm:text-[23px] font-normal">My Karma</h1>
            <Sorting />
          </div>
          <section class="p-3 sm:p-4 border rounded-[12px] bg-white">
            <div class="w-full">
              <div class="flex justify-between items-center w-full">
                <h2 class="text-base sm:text-lg font-medium">Current Commitments & Opportunities</h2>
                <div class="flex items-center lg:hidden">
                  <FeatherIcon @click="scrollLeft" :class="[
                    'size-5 cursor-pointer',
                    isLeftDisabled
                      ? 'text-gray-500 disabled'
                      : 'text-gray-700',
                  ]" name="chevron-left" :disabled="isLeftDisabled" />
                  <FeatherIcon @click="scrollRight" :class="[
                    'size-5 cursor-pointer',
                    isRightDisabled
                      ? 'text-gray-500 disabled'
                      : 'text-gray-700',
                  ]" name="chevron-right" :disabled="isRightDisabled" />
                </div>
              </div>
              <div v-if="loader" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardLoader />
                <CardLoader />
                <CardLoader />
              </div>
              <div v-else class="w-full">
                <div ref="scrollContainer" class="py-4 w-full overflow-x-auto lg:overflow-x-visible">
                  <div v-if="current_commitments?.length > 0 || current_opportunities.length > 0"
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card v-for="item in combinedSortedItems" :key="item.name" :item="item"
                      :mode="item.doctype === 'Volunteer Activity' ? 'activity' : 'opportunity'" type="card" />
                  </div>
                  <div class="w-full h-[280px]" v-if="combinedSortedItems.length === 0">
                    <NotFound />
                  </div>
                </div>
                <div v-if="combinedSortedItems.length > 0 && (!isLeftDisabled || !isRightDisabled)"
                  class="flex justify-center mt-2 lg:hidden">
                  <button
                    class="border px-3 h-7 text-xs font-normal border-[#FF5722] rounded-sm text-secondary hover:bg-orange-50 transition-colors">
                    View All
                  </button>
                </div>
              </div>
            </div>
          </section>
          <!-- Available Commitments Section -->
          <section class="px-3 sm:px-4 mt-5 border rounded-[12px] bg-white overflow-y-auto">
            <div class="w-full h-12 flex items-center bg-white sticky top-0 z-10">
              <h2 class="text-base sm:text-lg font-medium">Available Commitments</h2>
              <div class="flex items-center ml-auto lg:hidden">
                <FeatherIcon @click="scrollLeftAvailable" :class="[
                  'size-5 cursor-pointer',
                  isLeftDisabledAvailable
                    ? 'text-gray-500 disabled'
                    : 'text-gray-700',
                ]" name="chevron-left" :disabled="isLeftDisabledAvailable" />
                <FeatherIcon @click="scrollRightAvailable" :class="[
                  'size-5 cursor-pointer',
                  isRightDisabledAvailable
                    ? 'text-gray-500 disabled'
                    : 'text-gray-700',
                ]" name="chevron-right" :disabled="isRightDisabledAvailable" />
              </div>
            </div>
            <div v-if="loader" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </div>

            <div v-else class="w-full pb-4">
              <div ref="scrollContainerAvailable" class="py-2 w-full overflow-x-auto lg:overflow-x-visible">
                <div v-if="available_commitments.length > 0"
                  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card v-for="item in available_commitments" :key="item.name" :item="item" :mode="'activity'" />
                </div>
                <div class="w-full h-[280px]" v-else>
                  <NotFound message="Available Commitments not Found!" />
                </div>
              </div>
              <div v-if="available_commitments.length > 0 && (!isLeftDisabledAvailable || !isRightDisabledAvailable)"
                class="flex justify-center mt-2 lg:hidden">
                <button
                  class="border px-3 h-7 text-xs font-normal border-[#FF5722] rounded-sm text-secondary hover:bg-orange-50 transition-colors">
                  View All
                </button>
              </div>
            </div>
          </section>
          <section class="px-3 sm:px-4 mt-5 border rounded-[12px] bg-white overflow-y-auto">
            <div class="w-full h-12 flex items-center bg-white sticky top-0 z-10">
              <h2 class="text-base sm:text-lg font-medium">Available Opportunities</h2>
              <div class="flex items-center ml-auto lg:hidden">
                <FeatherIcon @click="scrollLeftAvailable" :class="[
                  'size-5 cursor-pointer',
                  isLeftDisabledAvailable
                    ? 'text-gray-500 disabled'
                    : 'text-gray-700',
                ]" name="chevron-left" :disabled="isLeftDisabledAvailable" />
                <FeatherIcon @click="scrollRightAvailable" :class="[
                  'size-5 cursor-pointer',
                  isRightDisabledAvailable
                    ? 'text-gray-500 disabled'
                    : 'text-gray-700',
                ]" name="chevron-right" :disabled="isRightDisabledAvailable" />
              </div>
            </div>
            <div v-if="loader" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </div>

            <div v-else class="w-full pb-4">
              <div ref="scrollContainerAvailable" class="py-2 w-full overflow-x-auto lg:overflow-x-visible">
                <div v-if="opportunitiy?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card v-for="item in opportunitiy" :key="item.name" :item="item" :mode="'opportunity'" />
                </div>
                <div class="w-full h-[280px]" v-else>
                  <NotFound message="Available Commitments not Found!" />
                </div>
              </div>
              <div v-if="available_commitments?.length > 0 && (!isLeftDisabledAvailable || !isRightDisabledAvailable)"
                class="flex justify-center mt-2 lg:hidden">
                <button
                  class="border px-3 h-7 text-xs font-normal border-[#FF5722] rounded-sm text-secondary hover:bg-orange-50 transition-colors">
                  View All
                </button>
              </div>
            </div>
          </section>
        </main>
        <MyDetails />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject, watch, watchEffect, computed } from 'vue'
import Filters from '@/components/Filters.vue'
import Sorting from '@/components/Sorting.vue'
import MyDetails from './MyDetails.vue'
import Card from '@/components/Card.vue'
import CardLoader from '@/components/CardLoader.vue'
import NotFound from '../../components/NotFound.vue'
import ReqForApproval from '../../components/ReqForApproval.vue'
import { FeatherIcon } from 'frappe-ui'


// Data for Current Commitments
const current_commitments = ref([])
const available_commitments = ref([])
const loader = ref(false)
const call = inject('call')
const store = inject('store')
const scrollContainer = ref(null)
const isUserApproved = ref(false)
const showReqForApproval = ref(false)
const svaUserData = ref(null)
const opportunitiy = ref([])
const current_opportunities = ref([])

// Scroll state
const isLeftDisabled = ref(true)
const isRightDisabled = ref(false)

// Add new refs for Available Commitments slider
const scrollContainerAvailable = ref(null)
const isLeftDisabledAvailable = ref(true)
const isRightDisabledAvailable = ref(false)

// Scroll settings
const cardWidth = 245
const scrollStep = cardWidth

// Define avai_commitments function before it's used
const avai_commitments = async (filter) => {
  loader.value = true;
  try {
    const response = await call(
      "mykartavya.controllers.api.available_commitments",
      { filter: filter ?? {} }
    );
    available_commitments.value = response;

    setTimeout(() => {
      loader.value = false;
      checkScrollButtons();
      checkScrollButtonsAvailable();
    }, 1000);
  } catch (err) {
    loader.value = false;
    console.error("Error fetching commitments:", err);
  }
};

const checkUserApproval = async () => {
  try {
    const response = await call('mykartavya.controllers.api.sva_user_data');
    if (response && response.length > 0) {
      svaUserData.value = response[0];
      isUserApproved.value = response[0]?.workflow_state === 'Approved';
    }
  } catch (err) {
    console.error('Error checking user approval status:', err);
  }
}

const cur_commitments = async (filter) => {
  loader.value = true
  try {
    const response = await call(
      'mykartavya.controllers.api.current_commitments',
      {
        filter: filter ?? {},
      }
    )
    current_commitments.value = response
    setTimeout(() => {
      loader.value = false
      checkScrollButtons()
    }, 1000)
  } catch (err) {
    loader.value = false
    console.error('Error fetching Kindness data:', err)
  }
}

const cur_opp = async (filter) => {
  loader.value = true
  try {
    const response = await call(
      'mykartavya.controllers.api.current_opportunity',
      {
        filter: filter ?? {},
      }
    )
    current_opportunities.value = response
    setTimeout(() => {
      loader.value = false
      checkScrollButtons()
    }, 1000)
  } catch (err) {
    loader.value = false
    console.error('Error fetching Kindness data:', err)
  }
}

const volunteering_opportunities = async (filter) => {
  loader.value = true;
  try {
    const response = await call('mykartavya.controllers.api.ava_opportunities', {
      filter: filter ?? {},
    });
    opportunitiy.value = response;
  } catch (err) {
    console.error('Error fetching Kindness data:', err);
  } finally {
    loader.value = false;
  }
};

const combinedSortedItems = computed(() => {
  const commitments = current_commitments.value.map(item => {
    const hours = parseFloat(item.hours || item.total_hours || item.duration || 0);
    return { ...item, doctype: 'Volunteer Activity', hours };
  });

  const opportunities = current_opportunities.value.map(item => {
    const hours = parseFloat(item.hours || item.total_hours || item.duration || 0);
    return { ...item, doctype: 'Opportunity', hours };
  });

  const combined = [...commitments, ...opportunities];

  // Sort by Karma Points
  const karmaSort = store.filters.karma_points;
  if (karmaSort === 'Low to High') {
    return combined.sort((a, b) => (a.karma_points || 0) - (b.karma_points || 0));
  } else if (karmaSort === 'High to Low') {
    return combined.sort((a, b) => (b.karma_points || 0) - (a.karma_points || 0));
  }

  // ✅ Sort by Volunteering Hours
  const hourSort = store.filters.volunteering_hours;
  if (hourSort === 'Low to High') {
    return combined.sort((a, b) => (a.hours || 0) - (b.hours || 0));
  } else if (hourSort === 'High to Low') {
    return combined.sort((a, b) => (b.hours || 0) - (a.hours || 0));
  }

  // Default fallback: sort by completion %
  return combined.sort((a, b) => {
    const aPercent = a.com_percent ?? -1;
    const bPercent = b.com_percent ?? -1;
    return aPercent - bPercent;
  });
});

// Add new scroll functions for Available Commitments
const scrollLeftAvailable = () => {
  if (scrollContainerAvailable.value) {
    scrollContainerAvailable.value.scrollTo({
      left: Math.max(0, scrollContainerAvailable.value.scrollLeft - scrollStep),
      behavior: 'smooth',
    })
  }
}

const scrollRightAvailable = () => {
  if (scrollContainerAvailable.value) {
    const maxScroll =
      scrollContainerAvailable.value.scrollWidth - scrollContainerAvailable.value.clientWidth
    scrollContainerAvailable.value.scrollTo({
      left: Math.min(maxScroll, scrollContainerAvailable.value.scrollLeft + scrollStep),
      behavior: 'smooth',
    })
  }
}

// Add new check function for Available Commitments
const checkScrollButtonsAvailable = () => {
  if (!scrollContainerAvailable.value) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainerAvailable.value
  isLeftDisabledAvailable.value = scrollLeft <= 0
  isRightDisabledAvailable.value = scrollLeft + clientWidth >= scrollWidth
}

// Scroll functions with boundary checks
const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      left: Math.max(0, scrollContainer.value.scrollLeft - scrollStep),
      behavior: 'smooth',
    })
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    const maxScroll =
      scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth
    scrollContainer.value.scrollTo({
      left: Math.min(maxScroll, scrollContainer.value.scrollLeft + scrollStep),
      behavior: 'smooth',
    })
  }
}

// Function to check if buttons should be disabled
const checkScrollButtons = () => {
  if (!scrollContainer.value) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
  isLeftDisabled.value = scrollLeft <= 0
  isRightDisabled.value = scrollLeft + clientWidth >= scrollWidth
}

// Update watchEffect to include Available Commitments
watchEffect(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', checkScrollButtons)
  }
  if (scrollContainerAvailable.value) {
    scrollContainerAvailable.value.addEventListener('scroll', checkScrollButtonsAvailable)
  }
})

onMounted(() => {
  checkUserApproval()
  cur_commitments()
  avai_commitments()
  volunteering_opportunities()
  cur_opp()
})

// Watch filter changes
watch(
  () => store.filters,
  (newVal, oldVal) => {
    if (newVal) {
      cur_commitments(newVal)
      avai_commitments(newVal)
      volunteering_opportunities(newVal)
      cur_opp(newVal)
    }
  },
  { deep: true, immediate: true }
)
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.card:hover {
  transform: scale(1.02);
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  background: #b0b3b0;
  border-radius: 8px;
}

::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.scroll-smooth {
  scroll-behavior: smooth;
}

.button-animation {
  transition: all 0.2s ease;
}

.button-animation:hover {
  transform: translateY(-1px);
}

.button-animation:active {
  transform: translateY(0);
}

/* Responsive styles */
@media screen and (max-width: 640px) {

  .w-\[280px\],
  .min-w-\[280px\] {
    width: 260px;
    min-width: 260px;
  }
}

@media screen and (min-width: 641px) and (max-width: 768px) {

  .w-\[280px\],
  .min-w-\[280px\] {
    width: 270px;
    min-width: 270px;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {

  .w-\[280px\],
  .min-w-\[280px\] {
    width: 280px;
    min-width: 280px;
  }
}

@media screen and (min-width: 1025px) and (max-width: 1280px) {

  .w-\[280px\],
  .min-w-\[280px\] {
    width: 300px;
    min-width: 300px;
  }
}

@media screen and (min-width: 1281px) {

  .w-\[280px\],
  .min-w-\[280px\] {
    width: 320px;
    min-width: 320px;
  }
}
</style>