<template>
  <aside class="w-full xl:w-[320px] xl:min-w-[320px] bg-white rounded-lg shadow-sm pt-3 lg:mt-0">
    <div class="px-4">
      <div class="flex items-center mb-6 border-b border-gray-100 py-3">
        <img v-if="auth.cookie.user_image" :src="auth.cookie.user_image" alt="Profile Picture"
          class="rounded-full w-[60px] h-[60px] object-cover mr-4 shadow-sm" />
        <div
          class="w-[60px] min-w-[60px] mr-4 text-2xl h-[60px] flex items-center justify-center rounded-full bg-gray-100 shadow-sm"
          v-else>
          {{ auth.cookie.full_name.charAt(0) }}
        </div>
        <div>
          <h2 class="text-[15px] font-medium text-gray-800">{{ auth.cookie.full_name }}</h2>
          <p class="text-gray-500 text-xs font-normal">
            {{ auth.cookie.user_id }}
          </p>
          <router-link to="/updateprofile"
            class="text-[11px] font-medium mt-2 inline-block hover:text-orange-600 transition-colors"
            style="color: #ff5722">EDIT
            PROFILE</router-link>
        </div>
      </div>

      <div class="border-b pb-4">
        <h3 class="text-[19px] font-medium text-gray-800">Total Karma Points</h3>
        <p class="text-[47px] font-semibold text-red-500">
          {{ (activities?.karma_points || 0) + (opportunitie?.karma_points || 0)
            ? ((activities?.karma_points || 0) + (opportunitie?.karma_points || 0)).toLocaleString()
          : '0' }}

        </p>
      </div>
      <div class="grid grid-cols-2 gap-4 pt-4">
        <div class="border border-gray-200 rounded-lg px-4 py-3 text-center hover:shadow-md transition-shadow">
          <span class="block text-blue-500 text-xl pb-2">
            <img src="../../assets/Act.png" alt="" class="mx-auto" />
          </span>
          <h4 class="font-medium text-[11px] pb-1 text-gray-600">
            Act of Random Kindness
          </h4>
          <p class="text-lg font-semibold text-gray-800">{{ activities?.activity_completed || '0' }}</p>
        </div>
        <div class="border border-gray-200 rounded-lg px-4 py-3 text-center hover:shadow-md transition-shadow">
          <span class="block text-blue-500 text-xl pb-2">
            <img src="../../assets/opportunity.png" alt="" class="mx-auto" />
          </span>
          <h4 class="font-medium text-[11px] pb-1 text-gray-600">
            Completed Opportunities
          </h4>
          <p class="text-lg font-semibold text-gray-800">
            {{ opportunitie?.opportunity_completed || '0' }}
          </p>
        </div>
        <div class="border border-gray-200 rounded-lg px-4 py-3 text-center hover:shadow-md transition-shadow">
          <span class="block text-blue-500 text-xl pb-2">
            <img src="../../assets/donate.png" alt="" class="mx-auto" />
          </span>
          <h4 class="font-medium text-[11px] pb-1 text-gray-600">
            Time Donated
          </h4>
          <p class="text-lg font-semibold text-gray-800">
            {{ activities?.total_hours + opportunitie?.total_hours ?
              sec_to_hours(activities?.total_hours + opportunitie?.total_hours) + ' hrs ' : '0' }} </p>
        </div>

        <div class="border border-gray-200 rounded-lg px-4 py-3 text-center hover:shadow-md transition-shadow">
          <span class="block text-blue-500 text-xl pb-2">
            <img src="../../assets/money.png" alt="" class="mx-auto" />
          </span>
          <h4 class="font-medium text-[11px] pb-1 text-gray-600">
            Money Saved
          </h4>
          <p class="text-lg font-semibold text-gray-800">
            ₹ {{ ((activities?.work_value_rupees || " ") + (opportunitie?.work_value_rupees || " ")).toLocaleString() ||
            '0' }}
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-lg px-4 xl:px-0 w-full mt-6">
      <div class="rounded-t-xl px-6 py-4 achieve-bg relative overflow-hidden bg-gradient-to-b to-white">
        <!-- Background Image at the Top -->
        <h2 class="text-md font-semibold text-gray-800 pb-10 relative z-10">
          Top Performers
        </h2>

        <!-- Crown Icon -->
        <div class="absolute top-12 left-1/2 transform -translate-x-1/2">
          <svg width="30" height="23" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.04167 15.333L0.625 2.04134L7.27083 8.08301L11.5 0.833008L15.7292 8.08301L22.375 2.04134L19.9583 15.333H3.04167ZM19.9583 18.958C19.9583 19.683 19.475 20.1663 18.75 20.1663H4.25C3.525 20.1663 3.04167 19.683 3.04167 18.958V17.7497H19.9583V18.958Z"
              fill="#EBBB00" />
          </svg>
        </div>
        <!-- Top Performer -->
        <div class="flex flex-col items-center">
          <div class="relative">
            <div
              class="bg-orange-400 rounded-full w-20 h-20 flex items-center justify-center border-4 border-[#f17940] shadow-lg">
              <img v-if="activitiestopuser[0]?.user_image" :src="activitiestopuser[0]?.user_image" alt="Anaya Singh"
                class="rounded-full w-full h-full object-cover" />
              <div v-else class="rounded-full w-full h-full bg-gray-100 flex items-center justify-center">
                {{ activitiestopuser[0]?.first_name?.charAt(0) || " T" }}
              </div>
            </div>
            <span
              class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
              1
            </span>
          </div>
          <p class="text-sm font-medium pt-3 text-gray-800">
            {{ activitiestopuser[0]?.first_name || 'Top 1' }}
          </p>
          <div class="text-[10px] font-normal pt-1 flex gap-1 flex-col items-center">
            <div class="flex items-center gap-1">
              <FeatherIcon name="database" class="size-3 text-gray-500" />
              {{ activitiestopuser[0]?.total_karma_points?.toLocaleString() || '0' }} Points
            </div>
            <div class="flex items-center gap-1">
              <FeatherIcon name="clock" class="size-3 text-gray-500" />
              {{ activitiestopuser[0]?.total_hours ? sec_to_hours(activitiestopuser[0]?.total_hours) : '0' }} hr
            </div>
          </div>
        </div>

        <!-- Second and Third Place -->
        <div class="flex justify-between -mt-10">
          <!-- 2nd Place -->
          <div class="flex flex-col items-center">
            <div class="relative">
              <div
                class="bg-purple-400 rounded-full w-16 h-16 flex items-center justify-center border-4 border-[#995dc5] shadow-lg">
                <img v-if="activitiestopuser[1]?.user_image" :src="activitiestopuser[1]?.user_image" alt="Anaya Singh"
                  class="rounded-full w-full h-full object-cover" />
                <div v-else class="rounded-full w-full h-full bg-gray-100 flex items-center justify-center">
                  {{ activitiestopuser[1]?.first_name?.charAt(0) || " T" }}
                </div>
              </div>
              <span
                class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
                2
              </span>
            </div>
            <p class="text-xs font-medium pt-3 text-gray-800">
              {{ activitiestopuser[1]?.first_name || 'Top 2' }}
            </p>
            <div class="text-[10px] font-normal pt-1 flex flex-col items-center gap-1">
              <div class="flex items-center gap-1">
                <FeatherIcon name="database" class="size-3 text-gray-500" />
                {{ activitiestopuser[1]?.total_karma_points?.toLocaleString() || '0' }} Points
              </div>
              <div class="flex items-center gap-1">
                <FeatherIcon name="clock" class="size-3 text-gray-500" />
                {{ activitiestopuser[1]?.total_hours ? sec_to_hours(activitiestopuser[1]?.total_hours) : '0' }} hr
              </div>
            </div>
          </div>

          <!-- 3rd Place -->
          <div class="flex flex-col items-center">
            <div class="relative">
              <div
                class="bg-blue-400 rounded-full w-16 h-16 flex items-center justify-center border-4 border-[#4c89f8] shadow-lg">
                <img v-if="activitiestopuser[2]?.user_image" :src="activitiestopuser[2]?.user_image" alt="Anaya Singh"
                  class="rounded-full w-full h-full object-cover" />
                <div v-else class="rounded-full w-full h-full bg-gray-100 flex items-center justify-center">
                  {{ activitiestopuser[2]?.first_name?.charAt(0) || "T" }}
                </div>
              </div>
              <span
                class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
                3
              </span>
            </div>
            <p class="text-xs font-medium pt-3 text-gray-800">
              {{ activitiestopuser[2]?.first_name || 'Top 3' }}
            </p>
            <div class="text-[10px] font-normal pt-1 flex flex-col items-center gap-1">
              <div class="flex items-center gap-1">
                <FeatherIcon name="database" class="size-3 text-gray-500" />
                {{ activitiestopuser[2]?.total_karma_points?.toLocaleString() || '0' }} Points
              </div>
              <div class="flex items-center gap-1">
                <FeatherIcon name="clock" class="size-3 text-gray-500" />
                {{ activitiestopuser[2]?.total_hours ? sec_to_hours(activitiestopuser[2]?.total_hours) : '0' }} hr
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr class="px-2">
              <th class="text-[11px] pl-3 py-2 font-medium text-gray-600 text-left">
                Name
              </th>
              <th class="text-[11px] py-2 font-medium text-gray-600 text-center">
                Time
              </th>
              <th class="text-[11px] py-2 font-medium text-gray-600 text-center">
                Karma Points
              </th>
              <th class="text-[11px] py-2 font-medium text-gray-600 text-center">
                Rank
              </th>
            </tr>
          </thead>
          <tbody v-if="users.length > 0">
            <tr v-for="user in users" :key="user.id"
              class="border-t border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="text-[12px] font-medium py-2">
                <div class="flex items-center pl-3">
                  <div class="w-8 h-8 flex items-center">
                    <img v-if="user.user_image" :src="user.user_image" :alt="user.name"
                      class="w-6 h-6 rounded-full object-cover shadow-sm" />
                    <div v-else class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                      {{ user.full_name?.charAt(0) }}
                    </div>
                  </div>
                  <span class="text-gray-700 font-medium text-[11px] ml-2">{{
                    user?.full_name
                    }}</span>
                </div>
              </td>
              <td class="text-[11px] font-normal text-center py-2 text-gray-600">
                {{
                  user?.duration / 60 / 60 < 1 ? (user?.duration / 60 / 60).toFixed(2) + ' hr' : Math.floor(user?.duration
                    / 60 / 60) + ' hr ' + Math.floor((user?.duration % (60 * 60)) / 60) + ' min' }} </td>
              <td class="text-[11px] font-normal text-center py-2 text-gray-600">
                {{ user?.karma_points?.toLocaleString() }}
              </td>
              <td class="text-[11px] font-normal text-center py-2 text-gray-600">
                {{ user?.rank }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4" class="text-center text-gray-500 py-4">
                No users found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- SDGs Impacted -->
    <div class="bg-white w-full px-4 pb-4 border-t border-gray-100">
      <div class="flex justify-between items-center">
        <h2 class="text-[16px] font-medium pt-6 text-gray-800">SDGs Impacted</h2>
        <router-link to="/all-volunteer"
          class="text-orange-500 text-[11px] font-medium hover:text-orange-600 transition-colors">VIEW ALL</router-link>
      </div>
      <div v-if="sdgs.length > 0" v-for="(sdg, index) in sdgs" :key="index"
        class="flex items-center space-x-4 pt-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
        <img v-if="sdg.image" :src="sdg.image" :alt="sdg.sdgs_name" class="w-10 h-10 rounded-[4px] shadow-sm" />
        <div v-else class="w-10 h-10 rounded-[4px] border flex justify-center items-center shadow-sm">
          {{ sdg.sdgs_name?.charAt(0) }}
        </div>
        <div>
          <h3 class="text-[14px] font-medium text-gray-800">{{ sdg.sdgs_name || '0' }}</h3>
          <p class="text-gray-500 text-[12px]">
            Time Donated :
            <span class="text-gray-800 font-medium">{{ sdg.hour ? sec_to_hours(sdg.hour) : '0' }} hr</span>
          </p>
          <p class="text-gray-500 text-[12px]">
            Money Saved :
            <span class="text-gray-800 font-medium"> ₹ {{ sdg.work_values || '0' }}</span>
          </p>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-4">
        No SDGs found
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { FeatherIcon } from 'frappe-ui'
const auth = inject('auth')
const call = inject('call')
const users = ref([])

const users_top_3 = ref()
const activities = ref({})
const activitiestopuser = ref([])
const sdgs = ref([])
const opportunitie = ref([])



const activitiy = async () => {
  try {
    const response = await call('mykartavya.controllers.api.user_count')
    if (response) {
      activities.value = response
    }
  } catch (err) {
    console.error('Error fetching activity data:', err)
  }
}


const opportunities = async () => {
  try {
    const response = await call('mykartavya.controllers.api.user_count_opp')
    if (response) {
      opportunitie.value = response
    }
  } catch (err) {
    console.error('Error fetching activity data:', err)
  }
}

const topvolunteer = async () => {
  try {
    const response = await call(
      'mykartavya.controllers.api.top_three_volunteer'
    )
    users_top_3.value = response
    if (response) {
      activitiestopuser.value = response
      // console.log(activitiestopuser.value, 'Top Volunteers')
    }
  } catch (err) {
    console.error('Error fetching activity data:', err)
  }
}

const sdgimpacted = async () => {
  try {
    const response = await call('mykartavya.controllers.api.sdg_impacted')
    if (response) {
      sdgs.value = response
    }
  } catch (err) {
    console.error('Error fetching activity data:', err)
  }
}

// const call = inject('call')
const get_all_user = async () => {
  const response = await call('mykartavya.controllers.api.get_top_users', {
  })
  if (response) {
    users.value = response.users
  }
}

onMounted(() => {
  topvolunteer()
  get_all_user()
  opportunities()
  activitiy()
  sdgimpacted()
})
const sec_to_hours = (sec) => {
  return (sec / 60 / 60).toFixed(2)
}
</script>

<style scoped>
.achieve-bg {
  background-image: url('../../assets/achievement-bg.png');
  background-size: cover;
  background-position: center;
}

/* Add smooth transitions */
.transition-colors {
  transition: color 0.2s ease-in-out;
}

.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

/* Improve table styling */
table {
  border-collapse: separate;
  border-spacing: 0;
}

th {
  position: sticky;
  top: 0;
  background-color: #f9fafb;
  z-index: 10;
}

tr:last-child td {
  border-bottom: none;
}
</style>