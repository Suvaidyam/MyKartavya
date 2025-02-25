<template>
  <div class="max-w-[1920px] w-full pt-[62px] mx-auto">
    <div class="w-full flex flex-col lg:flex-row px-5">
      <Filters />
      <div class="w-full lg:pl-[270px]">
        <MyDetails />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Filters from '../../components/Filters.vue'
import MyDetails from './MyDetails.vue'

const available_commitments = ref([
  {
    title: 'Empower the needy',
    description:
      'This Women’s Entrepreneurship Day, let’s empower underserved women running small business.',
    image:
      'https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__',
    points: 40,
    sdg: 'SDG 10 : Reduced Inequalities',
    time: '01 Oct, 2024 - 30 Nov, 2024',
    hours: 50,
    status: 'On-Ground',
    participant_users: [
      'assets/download (3).jpeg',
      'assets/download (2).jpeg',
      'assets/download (2).jpeg',
    ],
  },
  {
    title: 'Empower the needy',
    description:
      'This Women’s Entrepreneurship Day, let’s empower underserved women running small business.',
    image:
      'https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__',
    points: 40,
    sdg: 'SDG 10 : Reduced Inequalities',
    time: '01 Oct, 2024 - 30 Nov, 2024',
    hours: 50,
    status: 'On-Ground',
    participant_users: [
      'assets/download (3).jpeg',
      'assets/download (2).jpeg',
      'assets/download (2).jpeg',
    ],
  },
])
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}
</style>