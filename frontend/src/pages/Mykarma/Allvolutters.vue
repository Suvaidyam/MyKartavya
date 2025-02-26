<template>
  <div
    class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl">
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 py-3 px-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800">
        Performance Leaderboard
      </h2>
    </div>

    <div class="p-4 pt-8">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="bg-gray-50 border-b-2 border-gray-200">
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200"
                  @click="sortBy('time')">
                  Time
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                  </svg>
                </div>
              </th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200"
                  @click="sortBy('karmaPoints')">
                  Karma Points
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                  </svg>
                </div>
              </th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200"
                  @click="sortBy('rank')">
                  Rank
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in sortedUsers" :key="index"
              class="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150"
              :class="{ 'bg-blue-50': user.name === 'You' }">
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 flex items-center justify-center rounded-full text-white font-medium mr-3 transition-transform duration-200 hover:scale-110 shadow-sm"
                    :style="{ backgroundColor: getInitialColor(user.initial) }">
                    {{ user.initial }}
                  </div>
                  <span class="font-medium text-gray-800">{{ user.name }}</span>
                  <span v-if="user.name === 'You'"
                    class="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">You</span>
                </div>
              </td>
              <td class="py-3 px-4 text-gray-600">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ user.time }}
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <div class="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mr-2">
                    <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-500" :style="{
                      width: `${(user.karmaPoints / maxKarmaPoints) * 100}%`,
                    }"></div>
                  </div>
                  <span class="text-gray-700 font-medium">{{
                    user.karmaPoints
                    }}</span>
                </div>
              </td>
              <td class="py-3 px-4">
                <div
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-medium transition-all duration-200 hover:scale-110"
                  :class="{
                    'bg-green-100 text-green-800': user.rank <= 3,
                    'bg-blue-100 text-blue-800':
                      user.rank > 3 && user.rank <= 10,
                    'bg-gray-100 text-gray-800': user.rank > 10,
                  }">
                  {{ user.rank }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6 flex justify-between items-center border-t pt-4">
        <div class="font-medium flex items-center">
          <span class="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
          OOO: Impacted
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const sortOption = ref({ field: 'rank', asc: true })

const users = ref([
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

// Get maximum karma points for progress bar calculation
const maxKarmaPoints = computed(() => {
  return Math.max(...users.value.map((user) => user.karmaPoints))
})

// Generate consistent colors based on initials
const getInitialColor = (initial) => {
  const colors = [
    '#4F46E5',
    '#0891B2',
    '#7C3AED',
    '#059669',
    '#D97706',
    '#DC2626',
    '#4F46E5',
    '#2563EB',
    '#7C3AED',
    '#DB2777',
    '#65A30D',
    '#0891B2',
    '#0D9488',
    '#0369A1',
    '#4338CA',
    '#A21CAF',
    '#C026D3',
    '#E11D48',
    '#EA580C',
    '#FBBF24',
    '#84CC16',
    '#10B981',
    '#06B6D4',
    '#6366F1',
    '#8B5CF6',
    '#D946EF',
  ]

  // Get the charcode to generate a consistent index
  const index = initial.charCodeAt(0) % colors.length
  return colors[index]
}

// Sort users based on selected field
const sortBy = (field) => {
  if (sortOption.value.field === field) {
    sortOption.value.asc = !sortOption.value.asc
  } else {
    sortOption.value.field = field
    sortOption.value.asc = true
  }
}

// Computed property for sorted users
const sortedUsers = computed(() => {
  const { field, asc } = sortOption.value

  return [...users.value].sort((a, b) => {
    // Special handling for time field which has 'hr' suffix
    if (field === 'time') {
      const timeA = parseInt(a.time.split(' ')[0])
      const timeB = parseInt(b.time.split(' ')[0])
      return asc ? timeA - timeB : timeB - timeA
    }

    return asc ? a[field] - b[field] : b[field] - a[field]
  })
})
</script>