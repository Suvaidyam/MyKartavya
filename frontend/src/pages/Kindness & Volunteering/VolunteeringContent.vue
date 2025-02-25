<template>
    <section class="mt-2 w-full">
        <header class="flex flex-wrap gap-5 justify-between w-full max-md:mr-0.5 max-md:max-w-full">
            <div class="flex flex-col leading-none">
                <h1 class="self-start mt-1 text-2xl text-center text-neutral-950">
                    Kindness & Volunteering
                </h1>
            </div>
            <button
                class="flex gap-1.5 justify-center items-center px-2 my-auto w-8 h-8 bg-white rounded border border-solid border-[color:var(--Stroke,#D9D9D9)]">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c4064297019ef96779e7eb626ead56be65f493645c97b478472dc4c6b81cf07?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                    alt="Filter" class="object-contain self-stretch my-auto w-4 aspect-square" />
            </button>
        </header>

        <nav
            class="flex flex-col justify-center items-start py-px mt-4 text-base tracking-normal leading-none bg-white border-b-2 border-solid border-b-[color:var(--Stroke,#D9D9D9)] max-md:pr-5 max-md:mr-0.5 max-md:max-w-full">
            <div class="flex flex-wrap gap-4 items-center max-w-full min-h-9 w-[519px]">
                <a href="#"
                    @click.prevent="activeTab = 'kindness'"
                    class="flex gap-1 items-center self-stretch p-2 my-auto bg-white border-b-2 border-solid min-w-60 text-stone-500"
                    :class="{ 'border-b-[color:var(--S2,#FF7C3A)] text-neutral-950': activeTab === 'kindness', 'border-b-[color:var(--Primary,#FFF)]': activeTab !== 'kindness' }">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e19184eebc4a59cfdb05175c1ea1d1c4b671b0eb0457754baf6d25cefb636347?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                        alt="" class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
                    <span>Acts of Random Kindness</span>
                </a>
                <a href="#"
                    @click.prevent="activeTab = 'volunteering'"
                    class="flex gap-1 items-center self-stretch p-2 my-auto bg-white border-b-2 border-solid min-w-60 text-stone-500"
                    :class="{ 'border-b-[color:var(--S2,#FF7C3A)] text-neutral-950': activeTab === 'volunteering', 'border-b-[color:var(--Primary,#FFF)]': activeTab !== 'volunteering' }">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5df16569a7fc25da6cc37b22e0be591bf7cdc731ac26089af74b0ead24bbac7b?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                        alt="" class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
                    <span>Volunteering Opportunities</span>
                </a>
            </div>
        </nav>

        <div class="mt-5 max-md:max-w-full">
            <div class="grid grid-cols-3 gap-5 max-md:grid-cols-1">
                <Card v-for="(item, key) in displayedCards" :key="key" :item="item"/>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed ,onMounted,inject } from 'vue'
import Card from "../../components/Card.vue";

const call = inject('call')


const activeTab = ref('kindness') // Default active tab
const kindnes = async () => {
    try {
        const response = await call('mykartavya.controllers.api.get_activity_data', {
        });
        console.log(response);
    } catch (err) {
        console.error('Error fetching Kindness data:', err);
    }
};

const volunteerCards = [
    {
        title: "Empower the needy",
        description: "This Women's Entrepreneurship Day, let's empower underserved women running small business...",
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e7658be113e45c6ebd642254271143711c13b0ad07a139abdbfab63bf2ddbf5?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193",
        points: 40,
        date: "01 Oct, 2024 - 30 Nov, 2024",
        hours: 50,
        badgeImages: [
            "https://cdn.builder.io/api/v1/image/assets/TEMP/4ed16c519bd231fdc9d60d18b5d2869c31f31c288c2bf89a4eb380c4d5cc6f38?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193",
            "https://cdn.builder.io/api/v1/image/assets/TEMP/b5f182cab2bfd27bd6d0f069df140507432c9e26b80cceb6617736e4d9abe104?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193",
        ],
        participantImages: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f0a4b03a995968b7fb45aed9d55c85a98731404933e0f8df35d0577a4f9fa43?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193",
        type: 'volunteering'
    },
    {
        title: "Beat the sugar",
        description: "This Women's Entrepreneurship Day, let's empower underserved women running small business...",
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/052447d3d0fe1f3d08a65bb3ad1fb91046f6ead1491391ba0ef111ec7467d291?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193",
        points: 40,
        date: "01 Oct, 2024 - 30 Nov, 2024",
        hours: 50,
        badgeImages: ["https://cdn.builder.io/api/v1/image/assets/TEMP/3d16b0307333e566cc2ef90c0bc6b00ce94492a0d9be4e0c69930ae3ac2883b8?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"],
        participantImages: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f0a4b03a995968b7fb45aed9d55c85a98731404933e0f8df35d0577a4f9fa43?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193",
        type: 'volunteering'
    },
    {
        title: "Bright Bites",
        description: "This Women's Entrepreneurship Day, let's empower underserved women running small business...",
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a71a02d4cd85b8c849242002a44c53a82815b7b4141547a94ec1d9f6295626fb?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193",
        points: 40,
        date: "01 Oct, 2024 - 30 Nov, 2024",
        hours: 50,
        badgeImages: ["https://cdn.builder.io/api/v1/image/assets/TEMP/3d16b0307333e566cc2ef90c0bc6b00ce94492a0d9be4e0c69930ae3ac2883b8?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"],
        participantImages: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f0a4b03a995968b7fb45aed9d55c85a98731404933e0f8df35d0577a4f9fa43?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193",
        type: 'kindness'
    },
];

onMounted(() => {
    kindnes()
})
const displayedCards = computed(() => {
    return volunteerCards.filter(card => card.type === activeTab.value)
})
</script>