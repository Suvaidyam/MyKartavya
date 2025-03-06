<template>
  <div
    class="max-w-3xl mx-auto bg-white  overflow-hidden  pt-[62px]"
  >
    <div class=" pb-4 mt-6">
      <div class="overflow-x-auto">
        <table class="min-w-full font-poppins text-caption/[13.2px] border border-gray-200">
          <thead>
            <tr class="bg-gray-50 border-b-2 border-gray-200">
              <th class="text-left py-2 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider"> Name </th>
              <th class="text-left py-2 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider"> Time </th>
              <th class="text-center py-2 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider"> Karma Points </th>
              <th class="text-left py-2 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider"> Rank </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in users"
              :key="index"
              class="border-b border-gray-200 font-medium text-[#212529]"
            >
              <td class="px-4">
                <div class="flex items-center">
                  <div
                    class="w-7 h-7 flex items-center justify-center rounded-full text-white font-medium mr-3"
                    :style="{ backgroundColor: getInitialColor(getUserInitials(user.full_name)) }"
                  >
                    {{ getUserInitials(user.full_name) }}
                  </div>
                  <span class="font-medium text-gray-800">{{ user.full_name }}</span>
                </div>
              </td>
              <td class="py-1 px-4">{{ user.duration/60/60  }} hrs</td>
              <td class="py-1 px-4 text-center">
                <span class="text-gray-700 font-medium">{{ user.karma_points }} Points</span>
              </td>
              <td class="py-1 px-4">
                <div class="flex items-center justify-center w-8 h-8 font-medium">
                  <img :src="user.rank >= 10 ? Vector : down" alt="" class="w-2 h-2 mr-1" />
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
           <span v-if="currentPage === 1"> (Total Users: {{ totalUsers }})</span>
        </div>
        
        
        <div class="flex space-x-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import Vector from '../../../../frontend/src/assets/Vector.jpg'
import down from '../../../../frontend/src/assets/down.png'

const call = inject('call')
const users = ref([])
const totalUsers = ref(0); // Store total users count
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 10

// Fetch users with pagination
const fetchUsers = async () => {
  try {
    const response = await call('mykartavya.controllers.api.get_top_users', {
      page: currentPage.value,
      page_size: pageSize
    })

    if (response) {
      users.value = response.users
      totalPages.value = response.total_pages
      totalUsers.value = response.total_users;
      
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchUsers()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchUsers()
  }
}

// **Generate user initials**
const getUserInitials = (fullName) => {
  if (!fullName) return ''
  return fullName
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}

// **Generate unique colors based on initials**
const getInitialColor = (initial) => {
  const colors = ['#4F46E5', '#0891B2', '#7C3AED', '#059669', '#D97706', '#DC2626', '#2563EB', '#DB2777', '#65A30D', '#0D9488']
  const index = initial?.charCodeAt(0) % colors.length
  return colors[index]
}

onMounted(fetchUsers)
</script>
