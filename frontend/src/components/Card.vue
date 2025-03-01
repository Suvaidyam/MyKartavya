<template>
    <div v-if="type != 'group'" class="card bg-white">
        <router-link :to="`/activity/${item.name}`">
            <div class="relative">
                <img :src="item.activity_image" :alt="item.title" class="w-full rounded-md h-40 object-cover" />
                <div
                    class="absolute top-2 left-2 bg-orange-500 text-white font-medium text-xs flex items-center px-3 h-6 rounded-br-lg">
                    {{ item.activity_type }}
                </div>
                <div
                    class="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 h-6 rounded-full shadow flex items-center gap-1">
                    <span class="font-medium text-xs">{{ item.karma_points }} Points</span>
                </div>

            </div>
            <div class="flex flex-col gap-2 pt-2">
                <h3 class="text-bodyh1 font-medium truncate">{{ item.title }}</h3>
                <div class="flex gap-2 items-center">
                    <FeatherIcon name="calendar" class="size-4" />
                    <p class="text-xs font-normal"> {{ formatDate(item.start_date) }} - {{ formatDate(item.end_date) }}
                    </p>
                </div>
                <div class="flex gap-2 items-center">
                    <FeatherIcon name="clock" class="size-4" />
                    <p class="text-xs font-normal">{{ item.hours }} hr</p>
                </div>
            </div>
            <div class="mt-3">
                <div class="w-full bg-gray-200 rounded-full h-[5px]">
                    <div class="bg-[#4CAF50] h-[5px] rounded-full"
                        :style="{ width: `${item?.com_percent ?? 0}%` }"></div>
                </div>
                <p class="text-xs font-normal pt-1 text-gray-600 mt-1">{{ item?.com_percent ?? 0 }}% completed
                </p>
            </div>
        </router-link>
    </div>
    <!--  -->
    
    <article v-else class="flex flex-col w-full pb-2">
        <router-link :to="`/kindness-volunteering/${item.name}`">

        <div class="flex relative flex-col py-3 pr-3 w-full rounded-xl aspect-[1.557]">
            <img :src="item.activity_image" alt="" class="object-cover rounded-md absolute inset-0 size-full" />
            <div
                class="flex relative justify-between text-xs font-medium tracking-normal leading-none text-justify text-neutral-950">
                <div class="px-3 h-6 bg-secondary text-white flex items-center justify-center">{{ item.activity_type }}
                </div>
                <div class="flex flex-col rounded-lg px-2 justify-center h-6  bg-white border border-solid">
                    <div class="flex gap-1 items-center w-full">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c49a0afe7089e38e103d66c4c361731bed25ed9dfbe5b58de7105c730d3c6d93?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                            alt="" class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                        <span class="self-stretch my-auto">{{ item.karma_points }} Points</span>
                    </div>
                </div>
            </div>
            <div class="flex relative gap-3 items-center self-start mt-36 ml-3 max-md:mt-10 max-md:ml-2.5">
                <img v-for="(badge, index) in item.badgeImages" :key="index" :src="badge" alt=""
                    class="object-contain shrink-0 self-stretch my-auto aspect-[0.92] w-[34px]" />
            </div>
        </div>

        <h3 class="self-start truncate mt-3 text-base font-medium tracking-normal text-neutral-950">
            {{ item.title }}
        </h3>

        <p class="mt-2 text-xs tracking-normal leading-3 text-justify text-[#666666]">
            {{ item.description }}
        </p>

        <div class="flex gap-5 justify-between mt-2">
            <div class="flex flex-col text-justify">
                <div class="flex gap-1 items-center text-xs tracking-normal text-neutral-950">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/206e5d29b5523c409dbfe316e887c82aeb672c336764aad169ece16b133845e4?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                        alt="" class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                    <time class="self-stretch my-auto">{{ formatDate(item.start_date) }} - {{ formatDate(item.end_date)
                    }}
                    </time>
                </div>
                <!--  -->
                <div class="flex items-center -space-x-3 pt-4">
                    <div v-for="(el, index) in JSON?.parse(item.volunteers)" :key="index">
                        <img v-if="el.user_image" :src="el.user_image" :alt="'User ' + (index + 1)"
                            class="w-8 h-8 rounded-full border-2 border-white" />
                        <div v-else
                            class="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#e86c13] text-sm">
                            {{ el.full_name?.charAt(0) }}
                        </div>
                    </div>
                    <p class="pl-4 text-sm text-center">
                        +{{ JSON.parse(item.volunteers).length }}
                    </p>
                </div>
                <!--  -->
            </div>
            <div class="flex flex-col self-start">
                <div class="flex gap-1 items-center self-end text-xs tracking-normal text-justify text-neutral-950">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/193573c664d98aa3d1c71908aad0cbb8163b462f0553be41c395306a299aa57f?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                        alt="" class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                    <span class="self-stretch my-auto">{{ item.hours }} hr</span>
                </div>
                <div
                    class="flex gap-1 items-center mt-6 text-sm font-medium tracking-normal text-right text-orange-600 uppercase hover:text-orange-700">
                    <p>Act now</p>
                    <FeatherIcon name="arrow-up-right" class="size-4" />
                </div>
            </div>
        </div>
    </router-link>
    </article>
                     
</template>

<script setup>
import { inject, ref } from 'vue';

import { FeatherIcon } from 'frappe-ui';
const formatDate = inject('formatDate');
const props = defineProps({
    type: {
        type: String,
        required: false,
        default: 'group',
    },
    item: {
        type: Object,
        required: true,
    },
});

</script>

<style scoped>
.card {
    transition: transform 0.2s;
}

.card:hover {
    transform: scale(1.02);
}
</style>