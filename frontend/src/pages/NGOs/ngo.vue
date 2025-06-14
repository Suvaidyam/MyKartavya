<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Banner -->
        <div class="relative text-white px-4 md:px-8 lg:px-72 py-24 md:py-32 flex flex-col md:flex-row justify-between items-center mt-[50px] bg-cover bg-center bg-no-repeat"
            style="background-image: url('https://prod-mkcmsapi.s3.ap-south-1.amazonaws.com/cms/images/Media-20200813160839/1366-300.png');">
            <div class="container text-center md:text-left mb-6 md:mb-0">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">NGOs</h1>
                <div class="flex items-center justify-center md:justify-start space-x-2 text-sm">
                </div>
            </div>
        </div>

        <!-- Search & Filters -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="pt-12 md:pt-20 pb-4 space-y-6">
                <div class="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                    <label class="font-semibold text-gray-700">Search by:</label>

                    <!-- NGO Name Search -->
                    <div class="flex items-center border rounded-lg px-3 bg-white shadow-sm hover:shadow-md transition-shadow w-full md:w-auto">
                        <input v-model="filters.name" type="text" placeholder="NGO Name"
                            class="border-none inputs border-white outline-none bg-transparent text-sm flex-1 min-w-[150px] py-2" />
                        <i class="fas fa-search text-gray-500 ml-2"></i>
                    </div>
                   
                    <!-- State Dropdown -->
                    <!-- <div class="relative w-full md:w-auto">
                        <div @click="toggleDropdown('state')"
                            class="border border-gray-300 py-2 px-4 rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-md transition-shadow min-w-[160px] flex justify-between items-center">
                            <span class="text-sm">{{ selectedState || 'Select a state' }}</span>
                            <i class="fas fa-chevron-down text-gray-500 text-xs transition-transform"
                                :class="{ 'transform rotate-180': showDropdowns.state }"></i>
                        </div>
                        <div v-if="showDropdowns.state"
                            class="absolute top-full left-0 right-0 mt-1 border border-gray-300 bg-white rounded-lg shadow-lg z-20 max-h-60 overflow-hidden">
                            <div class="p-2 border-b border-gray-200">
                                <input v-model="searchTerms.state" type="text" placeholder="Search states..."
                                    class="w-full px-3 py-1 border border-gray-300 rounded text-sm outline-none focus:border-blue-500" />
                            </div>
                            <ul class="max-h-48 overflow-auto">
                                <li v-for="state in filteredStates" :key="state.id || state.state_name"
                                    @click="selectState(state)"
                                    class="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer text-sm transition-colors">
                                    {{ state.state_name }}
                                </li>
                                <li v-if="filteredStates.length === 0" class="px-4 py-2 text-gray-500 text-sm">
                                    No states found
                                </li>
                            </ul>
                        </div>
                    </div> -->

                    <!-- City Dropdown -->
                    <!-- <div class="relative w-full md:w-auto">
                        <div @click="toggleDropdown('city')"
                            class="border border-gray-300 py-2 px-4 rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-md transition-shadow min-w-[160px] flex justify-between items-center"
                            :class="{ 'opacity-50 cursor-not-allowed': !selectedState }">
                            <span class="text-sm">{{ selectedCity || 'Select a city' }}</span>
                            <i class="fas fa-chevron-down text-gray-500 text-xs transition-transform"
                                :class="{ 'transform rotate-180': showDropdowns.city }"></i>
                        </div>
                        <div v-if="showDropdowns.city && selectedState"
                            class="absolute top-full left-0 right-0 mt-1 border border-gray-300 bg-white rounded-lg shadow-lg z-20 max-h-60 overflow-hidden">
                            <div class="p-2 border-b border-gray-200">
                                <input v-model="searchTerms.city" type="text" placeholder="Search cities..."
                                    class="w-full px-3 py-1 border border-gray-300 rounded text-sm outline-none focus:border-blue-500" />
                            </div>
                            <ul class="max-h-48 overflow-auto">
                                <li v-for="city in filteredCities" :key="city.name || city.district_name"
                                    @click="selectCity(city)"
                                    class="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer text-sm transition-colors">
                                    {{ city.district_name }}
                                </li>
                                <li v-if="filteredCities.length === 0" class="px-4 py-2 text-gray-500 text-sm">
                                    No cities found
                                </li>
                            </ul>
                        </div>
                    </div> -->

                    <!-- Clear Button -->
                    <button @click="clearFilters"
                        class="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md">
                        <i class="fas fa-times mr-1"></i> Clear
                    </button>
                </div>
            </div>
            <!-- Results Count -->
            <div class="pb-4 text-center md:text-left">
                <p class="text-sm text-gray-600">
                    Showing {{ filteredNGOs.length }} of {{ ngos.length }} NGOs
                </p>
            </div>
            <!-- NGO Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                <div v-for="ngo in filteredNGOs" :key="ngo.ngo_name || ngo.name"
                    class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <!-- Logo -->
                    <div class="p-4 bg-gray-50 flex justify-center">
                        <img v-if="ngo.ngo_logo" :src="ngo.ngo_logo" alt="NGO Logo"
                            class="h-16 w-16 object-contain rounded-full border-2 border-white shadow-sm">
                        <div v-else class="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <i class="fas fa-building text-gray-400 text-xl"></i>
                        </div>
                    </div>
                    <!-- Content -->
                    <div class="p-4">
                        <!-- Title -->
                        <h5 class="mb-3 text-lg font-semibold tracking-tight text-gray-900 line-clamp-2">
                            {{ ngo.ngo_name || ngo.name }}
                        </h5>

                        <!-- Address -->
                        <p class="mb-6 text-[14px] text-gray-600 line-clamp-2">
                            <span class="inline-block mr-1">📍</span>
                            {{ ngo.location || ngo.address || 'Address not available' }}
                        </p>

                        <!-- Button -->
                        <button @click="navigateToNgoProfile(ngo)"
                            class="w-full px-4 py-2 text-white bg-[#fe5726] rounded-lg hover:bg-red-600 transition-colors shadow-sm hover:shadow-md">
                            Read more
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- No Results Message -->
            <div v-if="filteredNGOs.length === 0" class="text-center py-12">
                <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">No NGOs found</h3>
                <p class="text-gray-500">Try adjusting your search filters or clear all filters to see more results.</p>
            </div>
        </div>
    </div>
    <!-- Footer -->
    <Footer />
</template>

<script setup>
import { ref, computed, inject, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const router = useRouter()
const call = inject('call')

// Debug mode
const debugMode = ref(false)

// Filter states
const filters = ref({
    name: '',
    state: '',
    city: ''
})

// Selected values for display
const selectedState = ref('')
const selectedCity = ref('')

// Dropdown states
const showDropdowns = ref({
    state: false,
    city: false
})

// Search terms for filtering options
const searchTerms = ref({
    state: '',
    city: ''
})

// Data arrays
const states = ref([])
const cities = ref([])
const ngos = ref([])

const filteredStates = computed(() => {
    if (!searchTerms.value.state) return states.value
    return states.value.filter(state =>
        state.state_name.toLowerCase().includes(searchTerms.value.state.toLowerCase())
    )
})

const filteredCities = computed(() => {
    if (!searchTerms.value.city) return cities.value
    return cities.value.filter(city =>
        city.district_name.toLowerCase().includes(searchTerms.value.city.toLowerCase())
    )
})

// Computed filtered NGOs - Fixed filtering logic
const filteredNGOs = computed(() => {
    return ngos.value.filter((ngo) => {
        // Name filter
        const matchName = !filters.value.name ||
            (ngo.ngo_name && ngo.ngo_name.toLowerCase().includes(filters.value.name.toLowerCase())) ||
            (ngo.name && ngo.name.toLowerCase().includes(filters.value.name.toLowerCase()))

        // State filter - check multiple possible fields
        const matchState = !filters.value.state ||
            (ngo.state && ngo.state.toLowerCase().includes(filters.value.state.toLowerCase())) ||
            (ngo.location && ngo.location.toLowerCase().includes(filters.value.state.toLowerCase())) ||
            (ngo.address && ngo.address.toLowerCase().includes(filters.value.state.toLowerCase()))

        // City filter - check multiple possible fields
        const matchCity = !filters.value.city ||
            (ngo.city && ngo.city.toLowerCase().includes(filters.value.city.toLowerCase())) ||
            (ngo.district && ngo.district.toLowerCase().includes(filters.value.city.toLowerCase())) ||
            (ngo.location && ngo.location.toLowerCase().includes(filters.value.city.toLowerCase())) ||
            (ngo.address && ngo.address.toLowerCase().includes(filters.value.city.toLowerCase()))

        return matchName && matchState && matchCity
    })
})

// Check if there are active filters
const hasActiveFilters = computed(() => {
    return filters.value.name || selectedState.value || selectedCity.value
})

// Dropdown toggle function
function toggleDropdown(type) {
    // Close other dropdowns
    Object.keys(showDropdowns.value).forEach(key => {
        if (key !== type) {
            showDropdowns.value[key] = false
        }
    })

    // Toggle the clicked dropdown
    showDropdowns.value[type] = !showDropdowns.value[type]
    
    // Load states when state dropdown is opened
    if (type === 'state' && showDropdowns.value.state && states.value.length === 0) {
        fetchStates()
    }
}

function selectState(state) {
    selectedState.value = state.state_name
    filters.value.state = state.state_name
    showDropdowns.value.state = false
    searchTerms.value.state = ''

    // Reset dependent dropdown
    clearCity()
    fetchCities()
}

function selectCity(city) {
    selectedCity.value = city.district_name
    filters.value.city = city.district_name
    showDropdowns.value.city = false
    searchTerms.value.city = ''
}

// Clear functions
function clearState() {
    selectedState.value = ''
    filters.value.state = ''
    clearCity()
}

function clearCity() {
    selectedCity.value = ''
    filters.value.city = ''
    cities.value = []
}

function clearFilters() {
    filters.value = {
        name: '',
        state: '',
        city: ''
    }
    selectedState.value = ''
    selectedCity.value = ''
    cities.value = []

    // Clear search terms
    searchTerms.value = {
        state: '',
        city: ''
    }

    // Close all dropdowns
    showDropdowns.value = {
        state: false,
        city: false
    }
}

// API calls - Fixed to load states properly
const fetchStates = async () => {
    try {
        console.log('Fetching states...')
        const res = await call("mykartavya.controllers.api.states_data")
        states.value = res || []
        console.log('States fetched:', states.value.length)
    } catch (error) {
        console.error('Error fetching states:', error)
        states.value = []
    }
}

const fetchCities = async () => {
    if (!filters.value.state) return
    try {
        console.log('Fetching cities for state:', filters.value.state)
        const res = await call("mykartavya.controllers.api.cities_data", {
            state: filters.value.state
        })
        cities.value = res || []
        console.log('Cities fetched:', cities.value.length)
    } catch (error) {
        console.error('Error fetching cities:', error)
        cities.value = []
    }
}

async function get_ngos() {
    try {
        console.log('Fetching NGOs for state:', route?.params?.name)
        const response = await call('mykartavya.controllers.state.get_ngos_by_state', {
            state_name: route?.params?.name
        })

        if (response) {
            console.log('NGOs fetched successfully:', response.length)
            ngos.value = response
            
            // If we have a route param, set it as the selected state
            if (route?.params?.name) {
                selectedState.value = route.params.name
                filters.value.state = route.params.name
            }
        }
    } catch (err) {
        console.error('Error fetching NGOs:', err)
        ngos.value = []
    }
}

const navigateToNgoProfile = (ngo) => {
    router.push({
        name: 'Ngodetails',
        params: { name: ngo.ngo_name || ngo.name }
    })
}

// Close dropdowns when clicking outside
function handleClickOutside(event) {
    const dropdowns = document.querySelectorAll('.relative')
    let clickedInside = false

    dropdowns.forEach(dropdown => {
        if (dropdown.contains(event.target)) {
            clickedInside = true
        }
    })

    if (!clickedInside) {
        showDropdowns.value = {
            state: false,
            city: false
        }
    }
}

// Watch for route changes
watch(() => route.params.name, (newStateName) => {
    if (newStateName) {
        selectedState.value = newStateName
        filters.value.state = newStateName
        get_ngos()
    }
})

// Lifecycle hooks
onMounted(() => {
    get_ngos()
    fetchStates()
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
/* Custom scrollbar for dropdown lists */
.max-h-48::-webkit-scrollbar {
    width: 6px;
}

.max-h-48::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.max-h-48::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.max-h-48::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
}

/* Focus styles for better accessibility */
input:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.inputs:focus {
    box-shadow: none;
    outline: none;
}

/* Smooth transitions */
* {
    transition: all 0.2s ease-in-out;
}

/* Line clamp for text overflow */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Responsive container padding */
@media (max-width: 640px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}

/* Card hover effects */
.hover\:shadow-md:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Button hover effects */
.hover\:bg-red-600:hover {
    background-color: #dc2626;
}
</style>