<template>
  <div class="max-w-[1920px] mx-auto">
    <div class="sticky top-0 z-40">
      <Navbar />
    </div>
    <div class="  flex flex-col lg:flex-row px-5">
      <Filters />
      <div class="flex flex-col xl:flex-row px-4 gap-3 pt-3">
        <main class="w-full xl:w-3/4 ">
          <div class="flex justify-between">
            <h1 class="text-2xl font-semibold mb-4 ">My Karma</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 6h18M3 12h12M3 18h6" />
            </svg>

          </div>
          <section class="p-6 border rounded-[12px]">
            <h2 class="text-[16px] font-medium mb-2">Current Commitments</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div class="card bg-white">
                <router-link to="/empower"> <img
                    src="https://s3-alpha-sig.figma.com/img/2878/a4c5/9c959de9c3b9d28a480e8fc8a4b1bd81?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=deepSM9~pkpevq~2swFyA4g0zXUcOIZPg5bJaXVkcmNHwIVlwtQXJawLkEvr0pX3TeNueL4NtGlBtDG~zjxi8~C3mdRVPemZZudl8iw762tyT0kEi9Bk~9VwXQL299RLLLCnWeZYJo2pjXO-LuRi5aIUSu6rLnhmt3tjg7~pk5d8ICtHc2dOAKj~y80StIzWEII1KaRnoaoIQ8tDNap8Irp-3yBAItf~HCCc16FR8mdsShP0NlfshhwZxB6tEXVhfTPVj5bqC358wSr1CXqzQjbEfFqOTyETJm9zxc7OV6si2QRhJgtEzlXmgjtRGYUUy4~tv4w7SiEbkpBKNyQ0Wg__"
                    alt="Empower the needy" class="rounded-md" /></router-link>
                <h3 class="text-bodyh1 font-medium">Empower the Needy</h3>
                <p class="text-sm">01 Oct, 2024 - 30 Nov, 2024</p>
                <p class="text-sm">50 hr</p>
                <div class="mt-3">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width: 60%;"></div>
                  </div>
                  <p class="text-xs text-gray-600 mt-1">60% completed</p>
                </div>
              </div>
              <div class="card bg-white  ">
                <img
                  src="https://s3-alpha-sig.figma.com/img/cf5a/e80b/5af50b803bdf150f87177ec61c0cb866?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MPpLXDxR-7Mz0MQFkWnhmSyObJfI4z4VDZvVlueNBg~iGyZFVOD41q4Obqn7xoJuNxtdnzdLoQHn-qaElsaJFs9z-X2lGggHiaMCvvlfwSFQfr4jp4jPMxMMiERwFoWsqkayneYb5Gf2nc~A3tnVdm~dAgpfaTz~~be6qrDjoPDGsbdLlL1rxX6Baf55bS7rqJ~TKLD9~ami6kHY0Mf0hvePEZg7AQkUQGUvomCWkbEpcRQgpFg1-LKxxFXeIm~5Fk-epyZpdcG8L5IpcwSpaEFA~sC6HiOHhY51niQwbTdFZpSSLuRGHlnRg4LOwc0BsQK2v0aaGJD7R5oocLJaZw__"
                  alt="Empower the needy" class="rounded-md" />
                <h3 class="text-bodyh1 font-medium">Circle of Care</h3>
                <p class="text-sm">01 Oct, 2024 - 30 Nov, 2024</p>
                <p class="text-sm">50 hr</p>
                <div class="mt-3">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width: 60%;"></div>
                  </div>
                  <p class="text-xs text-gray-600 mt-1">60% completed</p>
                </div>
              </div>
              <div class="card bg-white  ">
                <img
                  src="https://s3-alpha-sig.figma.com/img/840e/b3d9/2603778c83ebba0e8b1228b22d0dd7c9?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bAt2RfM575loI0HINy4bP87zAgzxw5TYGm0ie4-zNgTk3NuinlA6jCy0~cFhpFRwCLFCdUyxX66c~R1-YP1gYHeE1wWCB5q0-3WXqeAIKuvPuHSqLCbndOH9FYaRIYkAcbOwn6yO~dKGHj3cfsjl3yJokZWxe288flUZlFLzvlrNfDG5AlcZDAyrImMDHvc00Z1BUKUwNF077DEUjqP3TGrhsecQAiSfMdSFNo7pgmdHy5xaxxk32aiGuX8AQL2vKj4ZEf5afaYHZ0pFo2D7DmyNU4eiuQcZGToi1TNIIqIMIRKweKg5TKv8AMlCV60rSj0RgD6ziU1b2lrLFJXUIw__"
                  alt="Empower the needy" class="rounded-md" />
                <h3 class="text-bodyh1 font-medium">Beat the Sugar</h3>
                <p class="text-sm">01 Oct, 2024 - 30 Nov, 2024</p>
                <p class="text-sm">50 hr</p>
                <div class="mt-3">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width: 60%;"></div>
                  </div>
                  <p class="text-xs text-gray-600 mt-1">60% completed</p>
                </div>
              </div>
            </div>
          </section>

          <section class="p-6 border rounded-[12px] mt-4">
            <h2 class="text-xl font-semibold my-4">Available Commitments</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="item in available_commitments" class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="relative">
                  <img
                    :src="item.image"
                    alt="Children" class="w-full h-40 object-cover" />
                  <div class="absolute top-2 left-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-br-lg">
                    {{ item.status }}
                  </div>
                  <div class="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 py-1 rounded-full shadow">
                    <span class="font-semibold">{{ item.points }} Points</span>
                  </div>
                  <div
                    class="absolute left-2 bottom-2 flex items-center space-x-2 text-sm text-gray-700 font-medium mb-2">
                    <span class="bg-white text-black px-2 py-1 rounded text-xs">{{ item.sdgs }}</span>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="text-bodyh1 font-medium text-gray-900">{{ item.title }}</h3>
                  <p class="text-gray-600 text-sm mt-1">
                   {{ item.description }}
                  </p>
                  <div class="flex items-center text-sm text-gray-500 mt-3">
                    <span class="flex items-center"><i class="far fa-calendar-alt mr-1"></i> 01 Oct,
                      2024 - 30 Nov, 2024</span>
                    <span class="ml-auto flex items-center"><i class="far fa-clock mr-1"></i> 50
                      hr</span>
                  </div>
                  <div class="flex items-center mt-3">
                    <div class="flex -space-x-2">
                      <img v-for="el in item.participant_users" :src="`../../${el}`" alt="User 1"
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
import { ref } from "vue";
import Filters from "../../components/Filters.vue";
import Navbar from '../../components/Navbar.vue';
import MyDetails from './MyDetails.vue';

const available_commitments = ref([
  {
    title: "Empower the needy",
    description: "This Women’s Entrepreneurship Day, let’s empower underserved women running small business.",
    image: "https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__",
    points: 40,
    sdg: "SDG 10 : Reduced Inequalities",
    time: "01 Oct, 2024 - 30 Nov, 2024",
    hours: 50,
    status: "On-Ground",
    participant_users: [
     "assets/download (3).jpeg",
      "assets/download (2).jpeg",
      "assets/download (2).jpeg",
    ]
  },
  {
    title: "Empower the needy",
    description: "This Women’s Entrepreneurship Day, let’s empower underserved women running small business.",
    image: "https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__",
    points: 40,
    sdg: "SDG 10 : Reduced Inequalities",
    time: "01 Oct, 2024 - 30 Nov, 2024",
    hours: 50,
    status: "On-Ground",
    participant_users: [
      "assets/download (3).jpeg",
      "assets/download (2).jpeg",
      "assets/download (2).jpeg",
    ]
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