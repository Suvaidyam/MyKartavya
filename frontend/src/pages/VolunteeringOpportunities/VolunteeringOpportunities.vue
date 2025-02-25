<template>
  <div class=" pt-[62px]">
    <section class="flex flex-col lg:flex-row px-5">
      <Filters />
      <main class="w-full py-3 lg:pl-[270px]">
        <div class="flex justify-between items-center pb-3">
          <h2 class="text-lg font-semibold mb-4 px-3">Kindness & Volunteering</h2>
          <button class="border rounded-md px-2 py-1.5 h-8 w-8 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 6h18M3 12h12M3 18h6" />
            </svg>
          </button>
        </div>
        <div class="px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card v-for="(item, key) in current_commitments" :key="key" :item="item" type="card"/>
          <!-- Repeat similar blocks for other opportunities -->
        </div>
      </main>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from '../../components/Card.vue';
import Filters from '../../components/Filters.vue';

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

</script>

<style scoped>
/* Any additional styling can be placed here */
</style>