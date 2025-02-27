<template>
  <div class="max-w-[1920px] w-full pt-[62px] mx-auto">
    <div class="w-full flex flex-col lg:flex-row px-5">
      <Filters :filter="filter" />
      <div class="w-full lg:pl-[270px] flex flex-col xl:flex-row">
        <main class="w-full xl:w-3/4 px-3 py-3 bg-gray-50">
          <!-- Current Commitments Section -->
          <div class="flex justify-between mb-2">
            <h1 class="text-[23px] font-normal">My Karma</h1>
            <button class="border rounded-md px-2 py-1.5 h-8 w-8 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 6h18M3 12h12M3 18h6" />
              </svg>
            </button>
          </div>
          <section class="p-4 border rounded-[12px] bg-white h-[390px]">
            <div class="w-full h-full">
              <div class="flex justify-between items-center w-full">
                <h2 class="text-lg font-medium">Current Commitments</h2>
                <div class="flex items-center">
                  <FeatherIcon @click="scrollLeft"
                    :class="['size-5 cursor-pointer', isLeftDisabled ? 'text-gray-500 disabled' : 'text-gray-700']"
                    name="chevron-left" :disabled="isLeftDisabled" />
                  <FeatherIcon @click="scrollRight"
                    :class="['size-5 cursor-pointer', isRightDisabled ? 'text-gray-500 disabled' : 'text-gray-700']"
                    name="chevron-right" :disabled="isRightDisabled" />

                </div>
              </div>
              <div v-if="loader" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <CardLoader />
                <CardLoader />
                <CardLoader />
              </div>
              <div v-else class="w-full">
                <div ref="scrollContainer" class="py-4 w-full overflow-x-scroll">
                  <div v-if="current_commitments.length > 0" class="flex items-center gap-4">
                    <Card v-for="item in current_commitments" :key="item.name" :item="item" type="card"
                      class="w-[245px] min-w-[245px]" />
                  </div>
                  <div class="w-full h-[330px]" v-else>
                    <NotFound />
                  </div>
                </div>
                <div v-if="current_commitments.length > 0" class="flex justify-center">
                  <button class="border px-3 h-7 text-xs font-normal border-[#FF5722] rounded-sm text-secondary">View
                    All</button>
                </div>
              </div>
            </div>
          </section>

          <!-- Available Commitments Section -->
          <section class="px-4 mt-5 border rounded-[12px] bg-white overflow-y-auto min-h-[330px] max-h-[660px]">
            <div class="w-full h-12 flex items-center bg-white sticky top-0 z-10">
              <h2 class="text-lg font-medium">Available Commitments</h2>
            </div>
            <div v-if="loader" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </div>
            <div v-else class="w-full pb-4">
              <div v-if="available_commitments.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card v-for="item in available_commitments" :key="item.name" :item="item"/>
              </div>
              <div class="w-full h-[330px]" v-else>
                <NotFound />
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
import { onMounted, ref, inject, watch, watchEffect } from 'vue';
import Filters from '@/components/Filters.vue';
import MyDetails from './MyDetails.vue';
import Card from '@/components/Card.vue';
import CardLoader from '@/components/CardLoader.vue';
import NotFound from '../../components/NotFound.vue';
import { FeatherIcon } from 'frappe-ui';

// Data for Current Commitments
const filter = ref({
  sdgs: [],
  volunteering_hours: '',
  activity_type: [],
  karma_points: ''
});
const current_commitments = ref([]);
const available_commitments = ref([]);
const loader = ref(false);
const call = inject('call');
const scrollContainer = ref(null);

// Scroll state
const isLeftDisabled = ref(true);
const isRightDisabled = ref(false);

const cur_commitments = async (filter) => {
  loader.value = true;
  try {
    const response = await call('mykartavya.controllers.api.current_commitments', {
      'filter': filter ?? {}
    });
    current_commitments.value = response;
    setTimeout(() => {
      loader.value = false;
      checkScrollButtons(); // Check button states after loading
    }, 1000);
  } catch (err) {
    loader.value = false;
    console.error('Error fetching Kindness data:', err);
  }
};
const avai_commitments = async (filter) => {
  loader.value = true;
  try {
    const response = await call('mykartavya.controllers.api.available_commitments', {
      'filter': filter ?? {}
    });
    available_commitments.value = response;
    setTimeout(() => {
      loader.value = false;
      checkScrollButtons(); // Check button states after loading
    }, 1000);
  } catch (err) {
    loader.value = false;
    console.error('Error fetching Kindness data:', err);
  }
};

// Scroll settings
const cardWidth = 245;
const scrollStep = cardWidth;

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

onMounted(() => {
  cur_commitments();
  avai_commitments();
});

// Watch filter changes
watch(() => filter.value, (newVal,oldVal) => {
  if (newVal == oldVal) {
    cur_commitments(newVal);
    avai_commitments(newVal);
  }
}, { deep: true, immediate: true });
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
  /* Thin width */
  height: 0px;
}

::-webkit-scrollbar-thumb {
  background: #b0b3b0;
  /* Scrollbar color */
  border-radius: 8px;
}

::-webkit-scrollbar-track {
  background: #f0f0f0;
  /* Track color */
}

.scroll-smooth {
  scroll-behavior: smooth;
}
</style>