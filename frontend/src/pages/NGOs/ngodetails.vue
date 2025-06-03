<template>
    <div class="max-w-4xl mx-auto">
        <div v-for="ngo in ngos" class="mt-10 border-t pt-4">
            <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-24">
                <!-- Logo and Title -->
                <div class="flex flex-col items-center text-center space-y-2">
                    <img v-if="ngo.ngo_logo" :src="ngo.ngo_logo" alt="Jan Mitra Logo"
                        class="h-40 w-40 object-contain" />
                    <h1 class="text-2xl font-semibold text-red-900">{{ ngo.ngo_name }}</h1>
                </div>
                <!-- Mission -->
                <p class="mt-6 text-gray-800 text-sm leading-relaxed text-justify">
                    <span v-html="ngo.description"></span>
                </p>
                <!-- Details -->
                <div class="mt-6 space-y-4 text-sm text-gray-800">
                    <div>
                        <span class="font-semibold">NGO Address:</span>
                        {{ ngo.address }}
                    </div>
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
        <div v-for="ngo in ngos" class="mt-10 hidden  h-72 pt-4">
            <div class="flex">
                <p class="text-lg font-semibold pb-2">Ngo Activity</p>
                <p class="text-sm text-gray-600">
                    (In case you can't find any activity, you can
                    <a href="#" class="text-blue-600 hover:underline">create here</a>)
                </p>
            </div class="border-t">
            <div class="flex justify-center items-center">
                <div class=" w-40 h-40 pt-20 ">
                    <img src="../../assets/no-data (1).png" alt="" srcset="">
                </div>
            </div>
            <p class="px-20 py-20">There are no opportunities running at the moment. Please check back later.</p>
        </div>
        <div v-for="ngo in ngos" class="mt-10 hidden h-72 pt-20">
            <p class="text-lg font-semibold border-b pb-2">Ngo opportunity</p>
            <div class="flex justify-center items-center">
                <div class=" w-40 h-40 pt-20 ">
                    <img src="../../assets/no-data (1).png" alt="" srcset="">
                </div>
            </div>
            <p class="px-20 py-20">There are no opportunities running at the moment. Please check back later.</p>
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
