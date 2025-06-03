<template>
    <div class="max-w-4xl mx-auto">
        <div v-for="ngo in ngos" class="mt-10 border-t pt-4">
            <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-24">
                <!-- Logo and Title -->
                <div class="flex flex-col items-center text-center space-y-2">
                    <img :src="ngo.ngo_logo" alt="Jan Mitra Logo" class="h-40 w-40 object-contain" />
                    <h1 class="text-2xl font-semibold text-red-900">{{ ngo.ngo_name }}</h1>
                </div>
                <!-- Mission -->
                <p class="mt-6 text-gray-800 text-sm leading-relaxed text-justify">
                    {{ ngo.description }}
                </p>
                <!-- Details -->
                <div class="mt-6 space-y-4 text-sm text-gray-800">
                    <p>
                        <span class="font-semibold">NGO Address:</span>
                        {{ ngo.address }}
                    </p>
                    <p>
                        <span class="font-semibold">NGO Website Link:</span>
                        <a :href="ngo.website" target="_blank"
                            class="ml-1 text-orange-600 cursor-pointer hover:underline bg-orange-100 px-2 py-1 rounded">
                            {{ ngo.website || 'Not Available' }}
                        </a>
                    </p>
                </div>
                <div class="mt-6">
                    <p class="font-semibold text-sm mb-2">SDGs Covered</p>
                    <!-- <img src="/sdg3.png" alt="SDG 3 - Good Health and Well-being" class="h-20 w-auto" /> -->
                </div>
                <!-- Activity Section -->
            </div>
        </div>
        <div class="mt-10 border-t pt-4">
            <p class="text-lg font-semibold">Ngo Activity</p>
            <p class="text-sm text-gray-600">
                (In case you can't find any activity, you can
                <a href="#" class="text-blue-600 hover:underline">create here</a>)
            </p>
            <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-24">
                <!-- Logo and Title -->
                <div class="flex flex-col items-center text-center space-y-4">
                    <!-- <img src="/logo.png" alt="Jan Mitra Logo" class="h-24 w-24 object-contain" /> -->
                    <h1 class="text-2xl font-semibold text-red-900">JAN MITRA</h1>
                    <p class="text-gray-700 text-lg italic">...turning dots into line</p>
                </div>

                <!-- Mission -->
                <p class="mt-6 text-gray-800 text-sm leading-relaxed text-justify">
                    Our mission is to provide basic rights to all, to eliminate situations,
                    which give rise to exploitation of vulnerable and marginalized groups and
                    to start a movement for a people friendly society (Jan Mitra Samaj)
                    through an inter-institutional approach.
                </p>

                <!-- Details -->
                <div class="mt-6 space-y-4 text-sm text-gray-800">
                    <p>
                        <span class="font-semibold">NGO Address:</span>
                        SA 4/2 A Daulatpur, Varanasi, Uttar Pradesh, India
                    </p>
                    <p>
                        <span class="font-semibold">NGO Website Link:</span>
                        <!-- <a href="https://pvchr.asia" target="_blank"
                    class="ml-1 text-orange-600 hover:underline bg-orange-100 px-2 py-1 rounded">
                    pvchr.asia
                </a> -->
                    </p>
                </div>

                <!-- SDG Covered -->
                <div class="mt-6">
                    <p class="font-semibold text-sm mb-2">SDGs Covered</p>
                    <!-- <img src="/sdg3.png" alt="SDG 3 - Good Health and Well-being" class="h-20 w-auto" /> -->
                </div>

                <!-- Activity Section -->
            </div>
        </div>
        <div v-for="ngo in ngos" class="mt-10 border-t pt-4">
            <p class="text-lg font-semibold">ngo opportunity</p>
            <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-24">
                <!-- Logo and Title -->
                <div class="flex flex-col items-center text-center space-y-4">
                    <img :src="ngo.ngo_logo" alt="Jan Mitra Logo" class="h-24 w-24 object-contain" />
                    <h1 class="text-2xl font-semibold text-red-900">{{ ngo.ngo_name }}</h1>
                </div>

                <!-- Mission -->
                <p class="mt-6 text-gray-800 text-sm leading-relaxed text-justify">
                    {{ ngo.description }}
                </p>

                <!-- Details -->
                <div class="mt-6 space-y-4 text-sm text-gray-800">
                    <p>
                        <span class="font-semibold">NGO Address:</span>
                        {{ ngo.address }}
                    </p>
                    <p>
                        <span class="font-semibold">NGO Website Link:</span>
                        <a :href="ngo.website" target="_blank"
                            class="ml-1 text-orange-600 cursor-pointer hover:underline bg-orange-100 px-2 py-1 rounded">
                            {{ ngo.website || 'Not Available' }}
                        </a>
                    </p>
                </div>
                <div class="mt-6">
                    <p class="font-semibold text-sm mb-2">SDGs Covered</p>
                    <!-- <img src="/sdg3.png" alt="SDG 3 - Good Health and Well-being" class="h-20 w-auto" /> -->
                </div>
                <!-- Activity Section -->
            </div>
        </div>
    </div>
    <div class="mt-40">
        <Footer />
    </div>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router'
import Footer from '@/components/Footer.vue';
const route = useRoute()
const call = inject('call');
const ngos = ref([]);

async function get_ngos() {
    try {
        const response = await call('mykartavya.controllers.state.ngo', {
            name: route?.params?.name
        });
        if (response) {
            console.log('Response  :', response);

            ngos.value = response;
            console.log('NGOs ', ngos.value);

        }
    } catch (err) {
        console.error('Error fetching NGOs:', err);
    }
}
onMounted(() => {
    get_ngos();
});
</script>
