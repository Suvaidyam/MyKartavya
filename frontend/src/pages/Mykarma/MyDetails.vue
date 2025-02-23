<template>
  <aside class=" w-full xl:w-1/4 bg-white rounded-md pt-3 lg:mt-0">
    <div class="px-3">
      <div class="flex items-center mb-4 border-b border-gray-100 p-3">
        <img src="../../assets/download (2).jpeg" alt="Profile Picture"
          class="rounded-full w-[60px] h-[60px] object-cover mr-4" />
        <div>
          <h2 class="text-[14px] font-medium">Aayush Kumar</h2>
          <p class="text-[#666666] text-xs font-normal">aayush.kumar@mail.com</p>
          <button class="text-[10px] font-medium mt-2" style="color: #FF5722;">Edit Profile</button>
        </div>
      </div>

      <div class="border-b">
        <h3 class="text-[19px] font-medium">Total Karma Points</h3>
        <p class="text-[47px] font-semibold text-red-500">1,823</p>
      </div>

      <div class="grid grid-cols-2 gap-4 pt-3">
        <div class="border border-gray-300 rounded-lg p-4 text-center">
          <span class="block text-green-500 text-xl">🫶</span>
          <h4 class="font-medium text-[10px]" style="color: #666666;">Act of Random Kindness</h4>
          <p class="text-lg">98</p>
        </div>

        <div class="border border-gray-300 rounded-lg p-4 text-center">
          <span class="block text-yellow-500 text-xl">✅</span>
          <h4 class="font-medium text-[10px]" style="color: #666666;">Completed Opportunities</h4>
          <p class="text-lg">12</p>
        </div>

        <div class="border border-gray-300 rounded-lg p-4 text-center">
          <span class="block text-blue-500 text-xl">⏳</span>
          <h4 class="font-medium text-[10px]" style="color: #666666;">Time Donated</h4>
          <p class="text-lg">76 hrs</p>
        </div>

        <div class="border border-gray-300 rounded-lg p-4 text-center">
          <span class="block text-purple-500 text-xl">💰</span>
          <h4 class="font-medium text-[10px]" style="color: #666666;">Money Saved</h4>
          <p class="text-lg">₹ 1,765</p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg px-3 w-full mt-4">
      <h2 class="text-[16px] font-medium ">Top Performers</h2>
      <div class="flex justify-center py-6">
        <div class="relative">
          <img src="../../assets/icons8-queen-48.png" alt="Trophy"
            class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3/4 z-10" />
          <div class="bg-yellow-300 rounded-full w-[71px] h-[71px] flex items-center justify-center">
            <img src="../../assets/download (2).jpeg" alt="Anaya Singh" class="rounded-full w-[71px] h-[71px]" />
          </div>
        </div>
      </div>

      <div class="flex justify-around mb-6">
        <div class="flex flex-col items-center">
          <img src="../../assets/download (2).jpeg" alt="Jayant Bhandari" class="rounded-full w-[50px] h-[50px]" />
          <p class="text-xs font-medium pt-2">Jayant Bhandari</p>
          <p class="text-[10px] font-normal pt-2">90 Points 60 hr</p>
        </div>
        <div class="flex flex-col items-center">
          <img src="../../assets/download (3).jpeg" alt="Swati Mathwal" class="rounded-full w-[50px] h-[50px]" />
          <p class="text-xs font-medium pt-2">Swati Mathwal</p>
          <p class="text-[10px] font-normal pt-2">60 Points 30 hr</p>
        </div>
      </div>

      <table class="w-full text-left">
        <thead>
          <tr>
            <th class="text-[10px]">Name</th>
            <th class="text-[10px]">Time</th>
            <th class="text-[10px]">Karma Points</th>
            <th class="text-[10px]">Rank</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index" class="border-t">
            <td class="text-[12px] font-medium">{{ user.name }}</td>
            <td class="text-[12px] font-normal">{{ user.time }} hr</td>
            <td class="text-[12px] font-normal">{{ user.points }} Points</td>
            <td class="text-[12px] font-normal">{{ user.rank }}</td>
          </tr>
        </tbody>
      </table>

      <div class=" bg-white w-full max-w-lg">
        <div class="flex justify-between items-center">
          <h2 class="text-[16px] font-medium pt-3">SDGs Impacted</h2>
          <a href="#" class="text-orange-500 text-[10px] font-medium">VIEW ALL</a>
        </div>
        <div v-for="(sdg, index) in sdgs" :key="index" class="flex items-start space-x-4 mt-4">
          <img :src="sdg.icon" :alt="sdg.title" class="w-10 h-10 rounded-[4px]" />
          <div>
            <h3 class="text-[14px] font-normal">{{ sdg.title }}</h3>
            <p class="text-gray-500 text-sm">Time Donated : {{ sdg.time }}</p>
            <p class="text-gray-500 text-sm">Money Saved : ₹ {{ sdg.money }}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
const sdgs = ref([
  {
    title: "SDG 2 : Zero Hunger",
    time: "1 hr",
    money: 188,
    icon: "https://s3-alpha-sig.figma.com/img/688e/7a94/d05534c49dbbe9c0c94efb71c7fef84c?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PKSCpduGi4nGd0xrbSSnUggnzY2ho41KjA25PdkPdBLjaMIvy2scTN9ABxLruAszf6SBEeHDp~Yp3FlNe-uhnA7i5HrtalOt4mT9dLsmyTVWMgeVM3g1eJKZEmwViHmomvQT8-E6~4lJaeP3vawIU6UCw52~j1S4jYJvEjU6PEzGxcW~blARM1xDKP5ZYXEJ7ahvkfX5LsZ~C1zm8eIorDgfYuXdavz8o2CmegIeSoi~4PihZQrrrgbVBzXMGcwkP~ASLpYwpbIF1LmsnL-SfCOJvuLU1Nileoxk8PgqRwq5BfRrnc4Oj20hV6TPRlpzS2hksr20NqyVsmDr~gFvAg__",
  },
  {
    title: "SDG 10 : Reduced Inequalities",
    time: "1 hr",
    money: 188,
    icon: "https://s3-alpha-sig.figma.com/img/8ebb/1242/da0ac058e973ebc925e2d13e2fbaf884?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IdmPwMcY5k8KKGOhvyiJFUUUdzecnG-153B6gknvsxN5buBj7MmENA7cbgis0qsIhr5d1cmVXq7pF5LrZGZ-wA8X4ijYW1dRlgLLy-lWOD0WqRLsCVtOn~fLTj2~wtvG8rVictpONmOq0Eb8o5c7LaOVFRn13y80bSwBmXGn5gxFGftdCXBLRkSyNvRjRwezAkzUlThrjKgFgdzZ7YLJ80IErFuHW2qKqMj~TsQCCWUfgo1VUaB-cmToKktLGsUKJdoTaxtv~N51o-DtkHK~ofmTtLhvW6K3DbT9b8O3lXag953qmy2TVwHh1rLIAuXsDivkn5bpvixoFrHfeSn7FQ__",
  },
  {
    title: "SDG 4 : Quality Education",
    time: "1 hr",
    money: 188,
    icon: "https://s3-alpha-sig.figma.com/img/a66d/8876/39878f7d0022333404d9f475a657fc6e?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=l4cKNOSziFMmTJF1dWr3oSk0BfbVYmbbWJTt3flheevA5~CVJX6zZNZ4gQN-hTE2QkRtt6dc04nRS98to0xOMiGfae90cGaRwmCA-08j-uXkUFdbIEcBcnENHZclEMP1xjaeFTqqAXAPT~OBJmpgvHly9MY9MDH~DJg0GvkmxilQ5BjewrkkFk2eojfu0om2e7eBl3YehhCxJ3EHspDrQpngOk31~a~7g0qGILAOD8ekVgO0TPO1g0A1U7enUcFrXu0D0wC5MrCuUaBLgtKffhU1zOTv3MHlOHBD1GWXL49~EeJsRm05JoAPShba5hyffH8eOIdrIrutWGNwTHVLHw__",
  },
]);
const users = ref([
  { name: "You", time: 5, points: 12, rank: 10 },
  { name: "Abhinav", time: 22, points: 55, rank: 3 },
  { name: "Aishwarya Naidu", time: 20, points: 52, rank: 4 },
  { name: "Parul Tushar", time: 16, points: 44, rank: 5 },
  { name: "Saurabh Madan", time: 11, points: 41, rank: 6 },
  { name: "Gunjan Lal", time: 10, points: 39, rank: 7 },
  { name: "Anaya Kushwah", time: 9, points: 36, rank: 8 },
  { name: "Shefali Chawla", time: 8, points: 23, rank: 9 },
]);
</script>