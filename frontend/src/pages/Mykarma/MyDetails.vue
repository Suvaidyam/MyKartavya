<template>
  <aside class="w-full xl:w-1/4 bg-white rounded-md pt-3 lg:mt-0">
    <div class="px-3">
      <div class="flex items-center mb-4 border-b border-gray-100 py-2">
        <img
          v-if="auth.user_image"
          :src="user_image"
          alt="Profile Picture"
          class="rounded-full w-[60px] h-[60px] object-cover mr-4"
        />
        <div
          class="w-[60px] min-w-[60px] mr-4 text-2xl h-[60px] flex items-center justify-center rounded-full bg-gray-100"
          v-else
        >
          {{ auth.cookie.full_name.charAt(0) }}
        </div>
        <div>
          <h2 class="text-[14px] font-medium">{{ auth.cookie.full_name }}</h2>
          <p class="text-[#666666] text-xs font-normal">
            {{ auth.cookie.user_id }}
          </p>
          <router-link
            to="/updateprofile"
            class="text-[11px] font-medium mt-2"
            style="color: #ff5722"
            >EDIT PROFILE</router-link
          >
        </div>
      </div>

      <div class="border-b">
        <h3 class="text-[19px] font-medium">Total Karma Points</h3>
        <p class="text-[47px] font-semibold text-red-500">1,823</p>
      </div>

      <div class="grid grid-cols-2 gap-4 pt-3">
        <div class="border border-gray-300 rounded-lg p-4 text-center">
          <span class="block text-green-500 text-xl">🫶</span>
          <h4 class="font-medium text-[10px]" style="color: #666666">
            Act of Random Kindness
          </h4>
          <p class="text-lg">98</p>
        </div>

        <div class="border border-gray-300 rounded-lg p-4 text-center">
          <span class="block text-yellow-500 text-xl">✅</span>
          <h4 class="font-medium text-[10px]" style="color: #666666">
            Completed Opportunities
          </h4>
          <p class="text-lg">12</p>
        </div>

        <div class="border border-gray-300 rounded-lg p-4 text-center">
          <span class="block text-blue-500 text-xl">⏳</span>
          <h4 class="font-medium text-[10px]" style="color: #666666">
            Time Donated
          </h4>
          <p class="text-lg">76 hrs</p>
        </div>

        <div class="border border-gray-300 rounded-lg p-4 text-center">
          <span class="block text-purple-500 text-xl">💰</span>
          <h4 class="font-medium text-[10px]" style="color: #666666">
            Money Saved
          </h4>
          <p class="text-lg">₹ 1,765</p>
        </div>
      </div>
    </div>
    <div class="rounded-lg px-3 xl:px-0 w-full mt-4">
      <div
        class="rounded-t-xl px-6 py-4 relative overflow-hidden bg-gradient-to-b from-yellow-200 to-white"
      >
        <!-- Background Image at the Top -->
        <div
          class="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center"
          style="
            background-image: url('https://s3-alpha-sig.figma.com/img/314c/a6b6/6925cd67aa6829da55ab83120e89377c?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MhdrmLTxP5LK4rgkhzgJrHhoB~dBaDieMGshleVZQuk6XQS9~32eIJdgogQD5QKflTfZ9BS0M02FYnwrvvcyRbBnaC9x4vq4iPEOeqtO6Xczb3zP1i0Rs0KmERk-qxGP8BX1JjVrOnXi1R5TzDv5p3-hqQaWeK~0oHJVYljIoXZtirUl5pt8w8Vh2G7OVUe3eu2XDuzN86DG6r2XRZzpflid2W1KWnnPFKCaavteAVUmMa7tW~j0Wq3tL0lqSfhl6~iEdkiocozghhGiE44DZfHTdIHS1qOjhTpeZv15dk23nfnSaoltbGxvbB-IvnYpa9nkCEH~svtuisP0SuBjFQ__');
          "
        ></div>
        <h2 class="text-md font-semibold text-gray-800 pb-10 relative z-10">
          Top Performers
        </h2>

        <!-- Crown Icon -->
        <div class="absolute top-12 left-1/2 transform -translate-x-1/2">
          <img
            src="../../assets/icons8-queen-48.png"
            alt="Crown"
            class="w-8 h-8"
          />
        </div>

        <!-- Top Performer -->
        <div class="flex flex-col items-center">
          <div class="relative">
            <div
              class="bg-orange-400 rounded-full w-20 h-20 flex items-center justify-center border-4 border-[#f17940]"
            >
              <img
                src="https://s3-alpha-sig.figma.com/img/12cd/3413/2ef9687c557520a96af542610c485c5d?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KclQc3FF9OzuW1fuMp8vjuu4QlDbwQ21IVr5l096zMiYcuDpYXSUhaU0IfBJPtz6Egs~JoIjg8yWazRrePBYTUkUDO~uiMqqj~b~gbjjsRKhQbRk4VhDZ9aoNarS8KT5Q~38afg9ZQZbxzYWvdML~Kad-0WKZ5QBRX1WEZkgV-7dRAwkyr9FW4ihSZchKsVAFvrH39jpPpS9lXhz5CT5rK2K29Ruq3wbOMhr-dsEFjzlXNgdN-9I8kRGaiyOQ4piNuXpt9dcjYCMQoUB~lTqnMtHAH8A~XulLWlh7KJmKCBUkQLoxO0P5RJEZxkQlUkWZU6t1eOHIWWNasK~TwannA__"
                alt="Anaya Singh"
                class="rounded-full w-full h-full object-cover"
              />
            </div>
            <span
              class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full"
            >
              1
            </span>
          </div>
          <p class="text-xs font-medium pt-2">Anaya Singh</p>
          <p class="text-[10px] font-normal pt-2">189 Points 174 hr</p>
        </div>

        <!-- Second and Third Place -->
        <div class="flex justify-between -mt-10">
          <!-- 2nd Place -->
          <div class="flex flex-col items-center">
            <div class="relative">
              <div
                class="bg-purple-400 rounded-full w-16 h-16 flex items-center justify-center border-4 border-[#995dc5]"
              >
                <img
                  src="../../assets/download (2).jpeg"
                  alt="Jayant Bhandari"
                  class="rounded-full w-full h-full object-cover"
                />
              </div>
              <span
                class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full"
              >
                2
              </span>
            </div>
            <p class="text-xs font-medium pt-2">Jayant Bhandari</p>
            <p class="text-[10px] font-normal pt-2">60 Points 30 hr</p>
          </div>

          <!-- 3rd Place -->
          <div class="flex flex-col items-center">
            <div class="relative">
              <div
                class="bg-blue-400 rounded-full w-16 h-16 flex items-center justify-center border-4 border-[#4c89f8]"
              >
                <img
                  src="../../assets/download (3).jpeg"
                  alt="Swati Mathwal"
                  class="rounded-full w-full h-full object-cover"
                />
              </div>
              <span
                class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
              >
                3
              </span>
            </div>
            <p class="text-xs font-medium pt-2">Swati Mathwal</p>
            <p class="text-[10px] font-normal pt-2">60 Points 30 hr</p>
          </div>
        </div>
      </div>
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr class="px-2">
            <th class="text-[10px] pl-1 font-normal text-gray-700 text-left">
              Name
            </th>
            <th class="text-[10px] font-normal text-gray-700 text-center">
              Time
            </th>
            <th class="text-[10px] font-normal text-gray-700 text-center">
              Karma Points
            </th>
            <th class="text-[10px] font-normal text-gray-700 text-center">
              Rank
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in users"
            :key="index"
            class="border-t border-[#b0b3b0] bg-white"
          >
            <td class="text-[12px] font-medium flex items-center">
              <div class="w-10 h-8 flex items-center pl-1">
                <img
                  v-if="user.avatar"
                  :src="user.avatar"
                  :alt="user.name"
                  class="w-6 h-6 rounded-full object-cover"
                />
                <div
                  v-else
                  class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  {{ user.name.charAt(0) }}
                </div>
              </div>
              <span class="text-gray-800 font-medium text-[10px]">{{
                user.name
              }}</span>
            </td>
            <td class="text-[10px] font-normal text-center">
              {{ user.time }} hr
            </td>
            <td class="text-[10px] font-normal text-center">
              {{ user.points }} Points
            </td>
            <td
              class="text-[10px] font-normal text-center flex justify-center items-center gap-1"
            >
              <i class="fa fa-caret-up text-green-600" aria-hidden="true"></i>
              {{ user.rank }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-white w-full px-4 border-t border-[#b0b3b0]">
      <div class="flex justify-between items-center">
        <h2 class="text-[16px] font-medium pt-6">SDGs Impacted</h2>
        <router-link
          to="/all-volunteer"
          class="text-orange-500 text-[10px] font-medium"
          >VIEW ALL</router-link
        >
      </div>
      <div
        v-for="(sdg, index) in sdgs"
        :key="index"
        class="flex items-center space-x-4 pt-4"
      >
        <img :src="sdg.icon" :alt="sdg.title" class="w-10 h-10 rounded-[4px]" />
        <div>
          <h3 class="text-[14px] font-normal">{{ sdg.title }}</h3>
          <p class="text-gray-500 fornt-normal text-[12px]">
            Time Donated : <span class="text-gray-800">{{ sdg.time }}</span>
          </p>
          <p class="text-gray-500 fornt-normal text-[12px]">
            Money Saved : <span class="text-gray-800"> ₹ {{ sdg.money }}</span>
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, inject } from 'vue'

const auth = inject('auth')
const sdgs = ref([
  {
    title: 'SDG 2 : Zero Hunger',
    time: '1 hr',
    money: 188,
    icon: 'https://s3-alpha-sig.figma.com/img/688e/7a94/d05534c49dbbe9c0c94efb71c7fef84c?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PKSCpduGi4nGd0xrbSSnUggnzY2ho41KjA25PdkPdBLjaMIvy2scTN9ABxLruAszf6SBEeHDp~Yp3FlNe-uhnA7i5HrtalOt4mT9dLsmyTVWMgeVM3g1eJKZEmwViHmomvQT8-E6~4lJaeP3vawIU6UCw52~j1S4jYJvEjU6PEzGxcW~blARM1xDKP5ZYXEJ7ahvkfX5LsZ~C1zm8eIorDgfYuXdavz8o2CmegIeSoi~4PihZQrrrgbVBzXMGcwkP~ASLpYwpbIF1LmsnL-SfCOJvuLU1Nileoxk8PgqRwq5BfRrnc4Oj20hV6TPRlpzS2hksr20NqyVsmDr~gFvAg__',
  },
  {
    title: 'SDG 10 : Reduced Inequalities',
    time: '1 hr',
    money: 188,
    icon: 'https://s3-alpha-sig.figma.com/img/8ebb/1242/da0ac058e973ebc925e2d13e2fbaf884?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IdmPwMcY5k8KKGOhvyiJFUUUdzecnG-153B6gknvsxN5buBj7MmENA7cbgis0qsIhr5d1cmVXq7pF5LrZGZ-wA8X4ijYW1dRlgLLy-lWOD0WqRLsCVtOn~fLTj2~wtvG8rVictpONmOq0Eb8o5c7LaOVFRn13y80bSwBmXGn5gxFGftdCXBLRkSyNvRjRwezAkzUlThrjKgFgdzZ7YLJ80IErFuHW2qKqMj~TsQCCWUfgo1VUaB-cmToKktLGsUKJdoTaxtv~N51o-DtkHK~ofmTtLhvW6K3DbT9b8O3lXag953qmy2TVwHh1rLIAuXsDivkn5bpvixoFrHfeSn7FQ__',
  },
  {
    title: 'SDG 4 : Quality Education',
    time: '1 hr',
    money: 188,
    icon: 'https://s3-alpha-sig.figma.com/img/a66d/8876/39878f7d0022333404d9f475a657fc6e?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=l4cKNOSziFMmTJF1dWr3oSk0BfbVYmbbWJTt3flheevA5~CVJX6zZNZ4gQN-hTE2QkRtt6dc04nRS98to0xOMiGfae90cGaRwmCA-08j-uXkUFdbIEcBcnENHZclEMP1xjaeFTqqAXAPT~OBJmpgvHly9MY9MDH~DJg0GvkmxilQ5BjewrkkFk2eojfu0om2e7eBl3YehhCxJ3EHspDrQpngOk31~a~7g0qGILAOD8ekVgO0TPO1g0A1U7enUcFrXu0D0wC5MrCuUaBLgtKffhU1zOTv3MHlOHBD1GWXL49~EeJsRm05JoAPShba5hyffH8eOIdrIrutWGNwTHVLHw__',
  },
])
const users = ref([
  { name: 'You', time: 5, points: 12, rank: 10 },
  { name: 'Abhinav', time: 22, points: 55, rank: 3 },
  { name: 'Aishwarya Naidu', time: 20, points: 52, rank: 4 },
  { name: 'Parul Tushar', time: 16, points: 44, rank: 5 },
  { name: 'Saurabh Madan', time: 11, points: 41, rank: 6 },
  { name: 'Gunjan Lal', time: 10, points: 39, rank: 7 },
  { name: 'Anaya Kushwah', time: 9, points: 36, rank: 8 },
  { name: 'Shefali Chawla', time: 8, points: 23, rank: 9 },
])

// const fetchDoctorsData = async () => {
//     try {
//         const response = await axios.get(
//             "api/method/appointments_management.controllers.api.doctors_data"
//         );
//         doctors.value = response.data.message || [];
//         allDoctors.value = doctors.value;
//     } catch (error) {
//         console.error("Error fetching doctors data:", error);
//     }
// };
</script>