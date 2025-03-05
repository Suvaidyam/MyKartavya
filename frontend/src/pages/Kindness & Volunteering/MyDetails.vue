<template>
  <div class="p-6">
    <h1 class="text-heading3 font-bold mb-4">Kindness & Volunteering</h1>
    <div class="flex gap-6 border-b pb-2">
      <button class="flex items-center text-bodyh1 gap-2 px-4 py-2 rounded text-gray-600">
        Acts of Random Kindness
      </button>
      <button class="flex items-center text-bodyh1 gap-2 px-4 py-2 border-b-2 border-orange-500 font-bold">
         Volunteering Opportunities
      </button>
    </div>
    <div class="grid md:grid-cols-3 gap-6 mt-6">
      <div v-for="opportunity in volunteeringOpportunities" :key="opportunity.id" class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="relative">
          <img :src="opportunity.image" :alt="opportunity.title" class="w-full h-48 object-cover" />
          <span class="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 text-sm rounded">
            {{ opportunity.type }}
          </span>
          <span class="absolute top-3 right-3 bg-white text-gray-700 px-2 py-1 text-sm rounded">
            {{ opportunity.points }}
          </span>
        </div>
        <div class="p-4">
          <h2 class="font-bold text-lg">{{ opportunity.title }}</h2>
          <p class="text-gray-600 text-sm mt-2">{{ opportunity.description }}</p>
          <div class="flex items-center text-gray-500 text-sm mt-4">
            <span class="mr-1">⏳</span> {{ opportunity.date }}
          </div>
          <div class="flex items-center text-gray-500 text-sm mt-2">
            <span class="mr-1">👥</span> +5 more
          </div>
          <button class="text-red-500 font-bold mt-4">I WANT TO HELP →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const volunteeringOpportunities = ref([
  {
    id: 1,
    type: "Online",
    title: "Empower the needy",
    description:
      "This Women’s Entrepreneurship Day, let’s empower underserved women running small business...",
    date: "01 Oct, 2024 - 30 Nov, 2024",
    hours: "50 hr",
    points: "40 Points",
    image: "https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__",
     
  },
  {
    id: 2,
    type: "On-Ground",
    title: "Bright Bites",
    description:
      "This Women’s Entrepreneurship Day, let’s empower underserved women running small business...",
    date: "01 Oct, 2024 - 30 Nov, 2024",
    hours: "50 hr",
    points: "40 Points",
    image: "https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__",

  },
  {
    id: 3,
    type: "On-Ground",
    title: "Beat the sugar",
    description:
      "This Women’s Entrepreneurship Day, let’s empower underserved women running small business...",
    date: "01 Oct, 2024 - 30 Nov, 2024",
    hours: "50 hr",
    points: "40 Points",
    image: "https://via.placeholder.com/300",
  },
]);
</script>
