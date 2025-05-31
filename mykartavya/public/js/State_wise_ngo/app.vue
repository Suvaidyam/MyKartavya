<template>
    <div class="flex py-8">
        <p class="main">Volunteer with NGOs from across India</p>
    </div>
    <div id="app">
        <div class="container">
            <div class="sidebar">
                <div class="header">
                    <div class="total-ngos">
                        <span>Total NGOs</span>
                        <span class="total-count">{{ totalNGOs }}</span>
                    </div>
                </div>

                <div class="search-box">
                    <input type="text" class="search-input" placeholder="Search states..." v-model="searchQuery">
                </div>

                <div class="state-list">
                     <div class="flex justify-between items-center px-4 pt-2 border-b">
                        <p>State(s)</p>
                        <p>NGOs</p>
                     </div>

                    <div class="state-item" :class="{ active: selectedState === state.name }"
                        v-for="state in filteredStates" :key="state.name" @click="selectState(state)">
                        <div class="">
                           
                            <span class="state-name">{{ state.name }}</span>
                        </div>
                        <span class="ngo-count">{{ state.ngos }}</span>
                    </div>
                </div>
            </div>

            <!-- Map Area -->
            <div class="map-container">
                <div class="map-wrapper">
                    <div class="india-map" @click="showMapInfo">
                        <div class="map-dots">
                            <div class="dot" style="top: 20%; left: 40%;"></div>
                            <div class="dot" style="top: 30%; left: 50%;"></div>
                            <div class="dot" style="top: 45%; left: 35%;"></div>
                            <div class="dot" style="top: 60%; left: 45%;"></div>
                            <div class="dot" style="top: 35%; left: 60%;"></div>
                            <div class="dot" style="top: 50%; left: 55%;"></div>
                            <div class="dot" style="top: 25%; left: 30%;"></div>
                        </div>
                    </div>
                </div>
                <!-- <div class="state-details" :class="{ show: showDetails }">
                    <h3>{{ selectedStateDetails.name || 'India' }}</h3>
                    <p><strong>NGOs:</strong> {{ selectedStateDetails.ngos || totalNGOs }}</p>
                    <p><strong>Focus Areas:</strong> {{ selectedStateDetails.focus || 'Education, Healthcare, Environment' }}</p>
                </div>

                <div class="development-note">
                    For development purposes only
                </div>

                <div class="google-attribution">
                    Map data ©2024 Google, INEGI | Terms
                </div> -->
            </div>
        </div>
    </div>


</template>
<script setup>
import { ref, computed, onMounted } from 'vue';

const searchQuery = ref('');
const selectedState = ref('');
const showDetails = ref(false);
const selectedStateDetails = ref({});

const states = [
    { name: 'Uttar Pradesh', ngos: 66, focus: 'Education, Rural Development' },
    { name: 'Gujarat', ngos: 38, focus: 'Environment, Women Empowerment' },
    { name: 'Andhra Pradesh', ngos: 32, focus: 'Healthcare, Education' },
    { name: 'Haryana', ngos: 28, focus: 'Agriculture, Youth Development' },
    { name: 'Uttarakhand', ngos: 18, focus: 'Environment, Disaster Relief' },
    { name: 'Himachal Pradesh', ngos: 10, focus: 'Tourism, Environment' },
    { name: 'Jammu and Kashmir', ngos: 4, focus: 'Peace Building, Education' },
    { name: 'Maharashtra', ngos: 45, focus: 'Urban Development, Healthcare' },
    { name: 'Karnataka', ngos: 35, focus: 'Technology, Education' },
    { name: 'Tamil Nadu', ngos: 42, focus: 'Healthcare, Women Rights' },
    { name: 'West Bengal', ngos: 38, focus: 'Arts, Education' },
    { name: 'Rajasthan', ngos: 29, focus: 'Water Conservation, Education' },
    { name: 'Madhya Pradesh', ngos: 25, focus: 'Tribal Welfare, Environment' },
    { name: 'Bihar', ngos: 22, focus: 'Education, Rural Development' },
    { name: 'Odisha', ngos: 20, focus: 'Disaster Management, Tribal Welfare' }
];

const totalNGOs = computed(() =>
    states.reduce((sum, state) => sum + state.ngos, 0)
);

const filteredStates = computed(() => {
    if (!searchQuery.value) return states;
    return states.filter(state =>
        state.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

function selectState(state) {
    selectedState.value = state.name;
    selectedStateDetails.value = state;
    showDetails.value = true;
}

function showMapInfo() {
    selectedState.value = '';
    selectedStateDetails.value = {};
    showDetails.value = true;
    setTimeout(() => {
        showDetails.value = false;
    }, 3000);
}

onMounted(() => {
    // Auto-select first state for demo
    setTimeout(() => {
        selectState(states[0]);
    }, 1000);
});
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
}

.container {
    display: flex;
    height: 100vh;
}

.sidebar {
    width: 410px;
    background: white;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    z-index: 10;
}

.header {
    padding: 20px;
    background: linear-gradient(135deg, #ff6b35, #ff8c42);
    color: white;
}

.header h1 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
}

.total-ngos {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.total-count {
    font-size: 24px;
    font-weight: bold;
    color: #2563eb;
}

.state-list {
    padding: 0;
}

.state-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: all 0.2s ease;
}

.state-item:hover {
    background-color: #f8f9fa;
    border-left: 4px solid #ff6b35;
}

.state-item.active {
    background-color: #fff3f0;
    border-left: 4px solid #ff6b35;
}

.state-name {
    font-weight: 500;
    color: #333;
}

.ngo-count {
    background: #ff6b35;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    min-width: 24px;
    text-align: center;
}

.map-container {
    flex: 1;
    position: relative;
    background: #e8f4f8;
}

.map-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.india-map {
    width: 400px;
    height: 500px;
    background: #ff6b35;
    position: relative;
    clip-path: polygon(30% 10%, 35% 8%, 45% 12%, 55% 15%, 65% 18%,
            75% 25%, 80% 35%, 85% 50%, 82% 65%, 75% 75%,
            65% 85%, 50% 88%, 35% 85%, 25% 75%, 20% 65%,
            15% 50%, 18% 35%, 25% 25%);
    cursor: pointer;
    transition: all 0.3s ease;
}

.india-map:hover {
    transform: scale(1.02);
    filter: brightness(1.1);
}

.map-dots {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.dot {
    position: absolute;
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 0.8;
        transform: scale(1);
    }

    50% {
        opacity: 1;
        transform: scale(1.2);
    }

    100% {
        opacity: 0.8;
        transform: scale(1);
    }
}

.google-attribution {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 8px 16px;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    font-size: 12px;
    color: #666;
}

.development-note {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.9);
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-size: 11px;
    color: #666;
    max-width: 200px;
    text-align: center;
}

.state-details {
    position: absolute;
    top: 20px;
    left: 20px;
    background: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    transform: translateY(-10px);
    opacity: 0;
    transition: all 0.3s ease;
}

.state-details.show {
    opacity: 1;
    transform: translateY(0);
}

.search-box {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
}

.search-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
}

.search-input:focus {
    outline: none;
    border-color: #ff6b35;
}
.main {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    padding-left:95px;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
        height: 300px;
    }

    .india-map {
        width: 300px;
        height: 400px;
    }
}
</style>