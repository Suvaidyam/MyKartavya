<template>
    <div class="min-h-screen bg-white">
        <!-- Banner -->
        <div class="relative text-white px-4 md:px-72 py-20 flex justify-between items-center mt-14"
            style="background-image:url('https://prod-mkcmsapi.s3.ap-south-1.amazonaws.com/cms/images/Media-20200813160839/1366-300.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <div class="container">
                <h1 class="text-4xl font-bold">NGOs</h1>
                <div class="mt-2 flex items-center space-x-2 text-sm">
                    <span class="flex items-center"><i class="fas fa-home mr-1"></i> Home</span>
                    <span>/</span>
                    <span>NGOs</span>
                </div>
            </div>
            <img src="https://via.placeholder.com/300x200" alt="Banner Image"
                class="rounded-lg hidden md:block h-40 object-cover" />
        </div>

        <!-- Search & Filters -->
        <div class="max-w-6xl mx-auto">
            <div class="pt-20 pb-4 space-y-4">
                <div class="flex flex-wrap gap-4 items-center">
                    <label class="font-semibold text-gray-700">Search by:</label>

                    <!-- NGO Name Search -->
                    <div class="flex items-center border rounded-lg px-3  bg-white shadow-sm">
                        <input v-model="filters.name" type="text" placeholder="NGO Name"
                            class="border-none inputs border-white outline-none bg-transparent text-sm flex-1 min-w-[150px]" />
                        <i class="fas fa-search text-gray-500 ml-2"></i>
                    </div>

                    <!-- Country Dropdown -->
                    <div class="relative">
                        <div @click="toggleDropdown('country')"
                            class="border border-gray-300 py-2 px-4 rounded-lg cursor-pointer bg-white shadow-sm min-w-[180px] flex justify-between items-center">
                            <span class="text-sm">{{ selectedCountry || 'Select a country' }}</span>
                            <i class="fas fa-chevron-down text-gray-500 text-xs"
                                :class="{ 'transform rotate-180': showDropdowns.country }"></i>
                        </div>
                        <div v-if="showDropdowns.country"
                            class="absolute top-full left-0 right-0 mt-1 border border-gray-300 bg-white rounded-lg shadow-lg z-20 max-h-60 overflow-hidden">
                            <!-- Search input for countries -->
                            <div class="p-2 border-b border-gray-200">
                                <input v-model="searchTerms.country" type="text" placeholder="Search countries..."
                                    class="w-full px-3 py-1 border border-gray-300 rounded text-sm outline-none focus:border-blue-500" />
                            </div>
                            <ul class="max-h-48 overflow-auto">
                                <li v-for="country in filteredCountries" :key="country.id || country.name"
                                    @click="selectCountry(country)"
                                    class="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer text-sm transition-colors">
                                    {{ country.name }}
                                </li>
                                <li v-if="filteredCountries.length === 0" class="px-4 py-2 text-gray-500 text-sm">
                                    No countries found
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- State Dropdown -->
                    <div class="relative">
                        <div @click="toggleDropdown('state')"
                            class="border border-gray-300 py-2 px-4 rounded-lg cursor-pointer bg-white shadow-sm min-w-[160px] flex justify-between items-center"
                            :class="{ 'opacity-50 cursor-not-allowed': !selectedCountry }">
                            <span class="text-sm">{{ selectedState || 'Select a state' }}</span>
                            <i class="fas fa-chevron-down text-gray-500 text-xs"
                                :class="{ 'transform rotate-180': showDropdowns.state }"></i>
                        </div>
                        <div v-if="showDropdowns.state && selectedCountry"
                            class="absolute top-full left-0 right-0 mt-1 border border-gray-300 bg-white rounded-lg shadow-lg z-20 max-h-60 overflow-hidden">
                            <!-- Search input for states -->
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
                    </div>

                    <!-- City Dropdown -->
                    <div class="relative">
                        <div @click="toggleDropdown('city')"
                            class="border border-gray-300 py-2 px-4 rounded-lg cursor-pointer bg-white shadow-sm min-w-[160px] flex justify-between items-center"
                            :class="{ 'opacity-50 cursor-not-allowed': !selectedState }">
                            <span class="text-sm">{{ selectedCity || 'Select a city' }}</span>
                            <i class="fas fa-chevron-down text-gray-500 text-xs"
                                :class="{ 'transform rotate-180': showDropdowns.city }"></i>
                        </div>
                        <div v-if="showDropdowns.city && selectedState"
                            class="absolute top-full left-0 right-0 mt-1 border border-gray-300 bg-white rounded-lg shadow-lg z-20 max-h-60 overflow-hidden">
                            <!-- Search input for cities -->
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
                    </div>
                    <!-- Clear Button -->
                    <button @click="clearFilters"
                        class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors shadow-sm">
                        <i class="fas fa-times mr-1"></i> Clear
                    </button>

                </div>

                <!-- Active Filters Display -->
                <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4">
                    <span class="text-sm text-gray-600">Active filters:</span>
                    <span v-if="filters.name"
                        class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center">
                        Name: {{ filters.name }}
                        <i @click="filters.name = ''" class="fas fa-times ml-1 cursor-pointer hover:text-blue-600"></i>
                    </span>
                    <span v-if="selectedCountry"
                        class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
                        Country: {{ selectedCountry }}
                        <i @click="clearCountry()" class="fas fa-times ml-1 cursor-pointer hover:text-green-600"></i>
                    </span>
                    <span v-if="selectedState"
                        class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center">
                        State: {{ selectedState }}
                        <i @click="clearState()" class="fas fa-times ml-1 cursor-pointer hover:text-yellow-600"></i>
                    </span>
                    <span v-if="selectedCity"
                        class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center">
                        City: {{ selectedCity }}
                        <i @click="clearCity()" class="fas fa-times ml-1 cursor-pointer hover:text-purple-600"></i>
                    </span>
                </div>
            </div>
            <!-- Results Count -->
            <div class=" pb-4">
                <p class="text-sm text-gray-600">
                    Showing {{ filteredNGOs.length }} of {{ ngos.length }} NGOs
                </p>
            </div>
            <!-- NGO Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                <div v-for="ngo in filteredNGOs" :key="ngo.name"
                    class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow">
                    <!-- Logo -->
                    <img :src="ngo.ngo_logo" alt="DIVYANG INDIA Logo" class="h-16 mx-auto mb-3">

                    <!-- Title -->
                    <h5 class="mb-3 text-lg font-semibold tracking-tight text-gray-900">
                        {{ ngo.ngo_name }}
                    </h5>

                    <!-- Address -->
                    <p class="mb-6 text-[14px] text-[#351e20]">
                        <span class="inline-block mr-1">📍</span>
                        SAKSHAM-IDEA office, Plot no4, Sector-19,<br>
                        Opp Vardhaman Mall, Sector 10, Dwarka, New Delhi
                    </p>

                    <!-- Button -->
                    <button @click="navigateToNgoProfile(ngo)"
                        class="px-4 py-2 text-white  bg-[#fe5726] rounded-sm hover:bg-red-600">
                        Read more
                    </button>
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

// Filter states
const filters = ref({
    name: '',
    country: '',
    state: '',
    city: ''
})

// Selected values for display
const selectedCountry = ref('')
const selectedState = ref('')
const selectedCity = ref('')

// Dropdown states
const showDropdowns = ref({
    country: false,
    state: false,
    city: false
})

// Search terms for filtering options
const searchTerms = ref({
    country: '',
    state: '',
    city: ''
})

// Data arrays
const countries = ref([])
const states = ref([])
const cities = ref([])
const ngos = ref([])

// Computed filtered arrays for dropdowns
const filteredCountries = computed(() => {
    if (!searchTerms.value.country) return countries.value
    return countries.value.filter(country =>
        country.name.toLowerCase().includes(searchTerms.value.country.toLowerCase())
    )
})

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

// Computed filtered NGOs
const filteredNGOs = computed(() => {
    return ngos.value.filter((ngo) => {
        const matchName = !filters.value.name ||
            ngo.name.toLowerCase().includes(filters.value.name.toLowerCase())

        const matchCountry = !filters.value.country ||
            (ngo.country && ngo.country.toLowerCase().includes(filters.value.country.toLowerCase()))

        const matchState = !filters.value.state ||
            (ngo.address && ngo.address.toLowerCase().includes(filters.value.state.toLowerCase()))

        const matchCity = !filters.value.city ||
            (ngo.address && ngo.address.toLowerCase().includes(filters.value.city.toLowerCase()))

        return matchName && matchCountry && matchState && matchCity
    })
})

// Check if there are active filters
const hasActiveFilters = computed(() => {
    return filters.value.name || selectedCountry.value || selectedState.value || selectedCity.value
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
}

// Selection functions
function selectCountry(country) {
    selectedCountry.value = country.name
    filters.value.country = country.name
    showDropdowns.value.country = false
    searchTerms.value.country = ''

    // Reset dependent dropdowns
    clearState()
    fetchStates()
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
function clearCountry() {
    selectedCountry.value = ''
    filters.value.country = ''
    clearState()
}

function clearState() {
    selectedState.value = ''
    filters.value.state = ''
    states.value = []
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
        country: '',
        state: '',
        city: ''
    }
    selectedCountry.value = ''
    selectedState.value = ''
    selectedCity.value = ''
    states.value = []
    cities.value = []

    // Clear search terms
    searchTerms.value = {
        country: '',
        state: '',
        city: ''
    }

    // Close all dropdowns
    showDropdowns.value = {
        country: false,
        state: false,
        city: false
    }
}

// API calls
const fetchCountries = async () => {
    try {
        const res = await call("mykartavya.controllers.api.country_data")
        countries.value = res || []
    } catch (error) {
        console.error('Error fetching countries:', error)
        countries.value = []
    }
}

const fetchStates = async () => {
    if (!filters.value.country) return
    try {
        const res = await call("mykartavya.controllers.api.state_data", {
            country: filters.value.country
        })
        states.value = res || []
    } catch (error) {
        console.error('Error fetching states:', error)
        states.value = []
    }
}

const fetchCities = async () => {
    if (!filters.value.state) return
    try {
        const res = await call("mykartavya.controllers.api.cities_data", {
            state: filters.value.state
        })
        cities.value = res || []
    } catch (error) {
        console.error('Error fetching cities:', error)
        cities.value = []
    }
}

async function get_ngos() {
    try {
        const response = await call('mykartavya.controllers.state.get_ngos_by_state', {
            state_name: route?.params?.name
        })

        if (response) {
            console.log('Response from get_ngos_by_state:', response)
            ngos.value = response
            console.log('NGOs fetched successfully:', ngos.value)
        }
    } catch (err) {
        console.error('Error fetching NGOs:', err)
        ngos.value = []
    }
}

const navigateToNgoProfile = (ngo) => {
    router.push({
        name: 'Ngodetails',
        params: { name: ngo.name }
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
            country: false,
            state: false,
            city: false
        }
    }
}

// Lifecycle hooks
onMounted(() => {
    get_ngos()
    fetchCountries()
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
</style>