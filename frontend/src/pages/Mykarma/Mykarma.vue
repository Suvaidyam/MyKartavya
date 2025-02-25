<template>
  <div class="max-w-[1920px] w-full pt-[62px] mx-auto">
    <div class="w-full flex flex-col lg:flex-row px-5">
      <Filters />
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
          <section class="p-4 border rounded-[12px] bg-white">
            <h2 class="text-lg font-medium mb-2">Current Commitments</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card v-for="(item, key) in current_commitments" :key="key" :item="item" type="card" />
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
                    <button class="ml-auto text-orange-600 font-semibold text-sm">ACT NOW →</button>
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
import { ref } from 'vue';
import Filters from '@/components/Filters.vue'; // Adjust path as needed
import MyDetails from './MyDetails.vue';       // Adjust path as needed
import Card from '@/components/Card.vue';      // Adjust path as needed

// Data for Current Commitments
const current_commitments = ref([
  {
    title: 'Empower the needy',
    image: 'https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__',
    form_date: '01 Oct, 2024',
    to_date: '30 Nov, 2024',
    status: 'On-Ground',
    points: 40,
    hours: 50,
    progress: 60,
  },
  {
    title: 'Circle of Care (National...',
    image: 'https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__',
    form_date: '07 Oct, 2024',
    to_date: '30 Nov, 2024',
    status: 'Online',
    points: 80,
    hours: 80,
    progress: 75,
  },
]);

// Data for Available Commitments
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
      '/assets/download (3).jpeg',
      '/assets/download (2).jpeg',
      '/assets/download (2).jpeg',
    ],
  },
]);
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}
</style>