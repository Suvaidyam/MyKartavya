<template>
  <div
    class="max-w-3xl mx-auto bg-white shadow-lg overflow-hidden border border-gray-200"
  >
    <div
      class="bg-gradient-to-r from-blue-50 to-indigo-50 py-3 px-4 border-b border-gray-200"
    >
      <h2 class="text-lg font-semibold text-gray-800">
        Performance Leaderboard
      </h2>
    </div>

    <div class="pt-5 pb-4">
      <div class="overflow-x-auto">
        <table class="min-w-full font-poppins text-caption/[13.2px]">
          <thead>
            <tr class="bg-gray-50 border-b-2 border-gray-200">
              <th
                class="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider"
              >
                Time
              </th>
              <th
                class="text-center py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider"
              >
                Karma Points
              </th>
              <th
                class="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider"
              >
                Rank
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in paginatedUsers"
              :key="index"
              class="border-b border-gray-200 font-medium text-[#212529]"
              :class="{ 'bg-blue-100': user.name === 'You' }"
            >
              <td class="px-4">
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 flex items-center justify-center rounded-full text-white font-medium mr-3"
                    :style="{ backgroundColor: getInitialColor(user.initial) }"
                  >
                    {{ user.initial }}
                  </div>
                  <span class="font-medium text-gray-800">{{ user.name }}</span>
                  <span
                    v-if="user.name === 'You'"
                    class="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                  >
                  </span>
                </div>
              </td>
              <td class="py-3 px-4">{{ user.time }}</td>
              <td class="py-3 px-4 text-center">
                <span class="text-gray-700 font-medium"
                  >{{ user.karmaPoints }} Points</span
                >
              </td>
              <td class="py-3 px-4">
                <div
                  class="flex items-center justify-center w-8 h-8 font-medium"
                >
                  <img
                    :src="Vector"
                    alt=""
                    v-if="user.rank >= 10"
                    class="w-2 h-2 mr-1"
                  />
                  <img
                    :src="down"
                    alt=""
                    v-if="user.rank < 10"
                    class="w-2 h-2 mr-1"
                  />
                  {{ user.rank }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-between items-center mt-4 px-4">
        <div class="text-sm text-gray-600">
          Page {{ currentPage }} of {{ totalPages }}
        </div>
        <div class="flex space-x-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import Vector from '../../../../frontend/src/assets/Vector.jpg'
import down from '../../../../frontend/src/assets/down.png'

const call = inject('call')
const get_all_user = async () => {
  const response = await call('mykartavya.controllers.api.get_top_users', {
    top: 'all',
  })
  console.log('=================', response)
  users.value = response
}

get_all_user()

const users = ref([])

const users1 = ref([
  { initial: 'Y', name: 'You', time: '5 hr', karmaPoints: 12, rank: 10 },
  { initial: 'A', name: 'Abhinav', time: '22 hr', karmaPoints: 55, rank: 3 },
  {
    initial: 'A',
    name: 'Aishwarya Naidu',
    time: '20 hr',
    karmaPoints: 52,
    rank: 4,
  },
  {
    initial: 'P',
    name: 'Parul Tushar',
    time: '16 hr',
    karmaPoints: 44,
    rank: 5,
  },
  {
    initial: 'S',
    name: 'Saurabh Madan',
    time: '11 hr',
    karmaPoints: 41,
    rank: 6,
  },
  { initial: 'G', name: 'Gunjan Lal', time: '10 hr', karmaPoints: 39, rank: 7 },
  {
    initial: 'A',
    name: 'Anaya kushwah',
    time: '9 hr',
    karmaPoints: 36,
    rank: 8,
  },
  {
    initial: 'S',
    name: 'Shefali Chawla',
    time: '8 hr',
    karmaPoints: 23,
    rank: 9,
  },
  {
    initial: 'R',
    name: 'Rahul Sharma',
    time: '7 hr',
    karmaPoints: 22,
    rank: 11,
  },
  {
    initial: 'V',
    name: 'Vikram Singh',
    time: '12 hr',
    karmaPoints: 21,
    rank: 12,
  },
  {
    initial: 'N',
    name: 'Neha Patel',
    time: '18 hr',
    karmaPoints: 20,
    rank: 13,
  },
  {
    initial: 'K',
    name: 'Karan Mehra',
    time: '14 hr',
    karmaPoints: 19,
    rank: 14,
  },
  {
    initial: 'D',
    name: 'Deepika Verma',
    time: '6 hr',
    karmaPoints: 18,
    rank: 15,
  },
  {
    initial: 'M',
    name: 'Mohit Kumar',
    time: '13 hr',
    karmaPoints: 17,
    rank: 16,
  },
  {
    initial: 'L',
    name: 'Lakshmi Rao',
    time: '15 hr',
    karmaPoints: 16,
    rank: 17,
  },
  {
    initial: 'J',
    name: 'Jai Kapoor',
    time: '19 hr',
    karmaPoints: 15,
    rank: 18,
  },
  {
    initial: 'T',
    name: 'Tanya Gupta',
    time: '21 hr',
    karmaPoints: 14,
    rank: 19,
  },
  { initial: 'Z', name: 'Zara Khan', time: '4 hr', karmaPoints: 13, rank: 20 },
])

// Pagination setup
const currentPage = ref(1)
const itemsPerPage = ref(8)

// Computed property for paginated users
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return users.value.slice(start, end)
})

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(users.value.length / itemsPerPage.value)
})

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Generate consistent colors based on initials
const getInitialColor = (initial) => {
  const colors = [
    '#4F46E5',
    '#0891B2',
    '#7C3AED',
    '#059669',
    '#D97706',
    '#DC2626',
    '#2563EB',
    '#DB2777',
    '#65A30D',
    '#0D9488',
  ]

  // Get the charcode to generate a consistent index
  const index = initial.charCodeAt(0) % colors.length
  return colors[index]
}
</script>