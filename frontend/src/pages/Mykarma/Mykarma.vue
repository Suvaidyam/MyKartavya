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
                  <NotFound v-else />
                </div>
                <div v-if="current_commitments.length > 0" class="flex justify-center">
                  <button class="border px-3 h-7 text-xs font-normal border-[#FF5722] rounded-sm text-secondary">View
                    All</button>
                </div>
              </div>
            </div>
          </section>

          <!-- Available Commitments Section -->
          <section class="p-4 mt-5 border rounded-[12px] bg-white">
            <h2 class="text-lg font-medium pb-3">Available Commitments</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="(item, key) in available_commitments" :key="key"
                class="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
                <div class="relative">
                  <img :src="item.image" :alt="item.title" class="w-full rounded-md h-40 object-cover" />
                  <div
                    class="absolute top-2 left-2 bg-orange-500 text-white font-medium text-xs flex items-center px-3 h-6 rounded-br-lg">
                    {{ item.status }}
                  </div>
                  <div
                    class="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 h-6 rounded-full shadow flex items-center gap-1">
                    <span class="font-medium text-xs">{{ item.points }} Points</span>
                  </div>
                  <div
                    class="absolute left-2 bottom-2 flex items-center space-x-2 text-sm text-gray-700 font-medium mb-2">
                    <span class="bg-white text-black px-2 py-1 rounded text-xs">{{ item.sdg }}</span>
                  </div>
                </div>
                <div class="py-2">
                  <div class="flex flex-col gap-2 pt-2">
                    <h3 class="text-bodyh1 font-medium">{{ item.title }}</h3>
                    <p class="text-xs font-normal">{{ item.time }}</p>
                    <p class="text-xs font-normal">{{ item.hours }} hr</p>
                  </div>
                  <div class="flex items-center mt-3">
                    <div class="flex -space-x-2">
                      <img v-for="(user, idx) in item.participant_users" :key="idx" :src="user" :alt="`User ${idx + 1}`"
                        class="w-8 h-8 rounded-full border-2 border-white" />
                      <div
                        class="w-8 h-8 bg-gray-200 text-gray-600 flex items-center justify-center rounded-full text-sm font-medium border-2 border-white">
                        +5
                      </div>
                    </div>
                    <button class="ml-auto text-orange-600 flex items-center justify-center font-semibold text-sm">ACT
                      NOW
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb34dd02beac2ec2e17320d59938a8e4f1f75c978b7f31db85369770609c9c38?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                        alt="" class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                    </button>
                  </div>
                </div>
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
const loader = ref(false);
const current_commitments = ref([]);
const call = inject('call');
const scrollContainer = ref(null);

// Scroll state
const isLeftDisabled = ref(true);
const isRightDisabled = ref(false);

const commitments = async (filter) => {
  loader.value = true;
  try {
    const response = await call('mykartavya.controllers.api.get_activity_data', {
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

const available_commitments = ref([
  {
    title: 'Empower the needy',
    description: 'This Women’s Entrepreneurship Day, let’s empower underserved women running small business.',
    image: 'https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__',
    points: 40,
    sdg: 'SDG 10 : Reduced Inequalities',
    time: '01 Oct, 2024 - 30 Nov, 2024',
    hours: 50,
    status: 'On-Ground',
    participant_users: [
      '../../assets/download (3).jpeg',
      '../../assets/download (2).jpeg',
      '../../assets/download (1).jpeg',
    ],
  },
]);
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
  commitments();
});

// Watch filter changes
watch(() => filter.value, (newVal) => {
  if (newVal) {
    commitments(newVal);
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