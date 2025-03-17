<template>
    <div v-if="type != 'group'" class="card bg-white overflow-hidden">
        <router-link :to="`/activity/${item.activity}`">
            <div class="w-full flex flex-col justify-between h-40 rounded-md relative">
                <img :src="item.activity_image" alt="" class="h-full rounded-md">
                <div
                    class="bg-orange-500 absolute top-1 text-white font-medium text-xs flex items-center px-3 h-6 rounded-br-lg">
                    {{ item.activity_type }}
                </div>
                <div
                    class="absolute right-2 top-1 bg-white text-gray-800 text-xs px-2 h-6 rounded-full shadow flex items-center gap-1">
                    <span class="font-medium text-xs">{{ item.karma_points }} Points</span>
                </div>
                <div class="absolute bottom-1  flex items-center gap-1 px-2 overflow-auto">
                    <div v-if="item.sdgs" v-for="el in JSON.parse(item.sdgs)">
                        <img v-if="el.image" :src="el.image" class="w-8 h-8" />
                        <span v-else class="w-8 h-8 flex items-center justify-center bg-gray-50">{{
                            el.sdgs_name?.charAt(0) }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2 pt-2">
                <h3 class="text-bodyh1 font-medium truncate">{{ item.title }}</h3>
                <div class="flex gap-2 items-center">
                    <FeatherIcon name="calendar" class="size-4" />
                    <p class="text-xs font-normal"> {{ formatDate(item.start_date) }} - {{ formatDate(item.end_date) }}
                    </p>
                </div>
                <div class="flex gap-2 items-center justify-between">
                    <div class="flex gap-2 items-center">
                        <Tooltip text="Hours" :hover-delay="1" :placement="'top'">
                            <FeatherIcon name="clock" class="size-4" />
                            <p class="text-xs font-normal">{{ item.hours }} hr</p>
                        </Tooltip>
                    </div>
                    <div class="flex gap-2 items-center">
                        <Tooltip text="Hours" :hover-delay="1" :placement="'top'">
                            <FeatherIcon name="clock" class="size-4" />
                            <p class="text-xs font-normal">{{ item.hours }} hr</p>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div class="w-full bg-gray-200 rounded-full h-[5px]">
                    <div class="bg-[#4CAF50] h-[5px] rounded-full" :style="{ width: `${item?.com_percent ?? 0}%` }">
                    </div>
                </div>
                <p class="text-xs font-normal pt-1 text-gray-600 mt-1">{{ item?.com_percent ?? 0 }}% completed
                </p>
            </div>
        </router-link>
    </div>
    <!--  -->

    <article v-else class="flex flex-col card w-full py-2 overflow-hidden">
        <router-link :to="auth.isLoggedIn ? '/activity/' + item.activity : '/kindness-volunteering/' + item.activity">
            <div class="w-full flex flex-col justify-between h-40 rounded-md relative">
                <img :src="item.activity_image" alt="" class="h-full rounded-md">
                <div
                    class="bg-orange-500 absolute top-1 text-white font-medium text-xs flex items-center px-3 h-6 rounded-br-lg">
                    {{ item.activity_type }}
                </div>
                <div
                    class="absolute right-2 top-1 bg-white text-gray-800 text-xs px-2 h-6 rounded-full shadow flex items-center gap-1">
                    <span class="font-medium text-xs">{{ item.karma_points }} Points</span>
                </div>
                <div class="absolute bottom-1 flex items-center gap-1 px-2 overflow-auto">
                    <div v-if="item.sdgs"
                        v-for="(el, index) in (typeof item.sdgs === 'string' ? JSON.parse(item.sdgs) : item.sdgs)"
                        :key="index">
                        <img v-if="el?.image" :src="el?.image" class="w-8 h-8" />
                        <span v-else class="w-8 h-8 flex items-center justify-center bg-gray-50">
                            {{ el?.sdgs_name?.charAt(0) }}
                        </span>
                    </div>
                </div>

            </div>
            <h3 class="self-start truncate mt-3 text-base font-medium tracking-normal text-neutral-950">
                {{ item.title }}
            </h3>
            <p class="mt-2 text-xs tracking-normal leading-3 text-justify text-[#666666]">
                {{ item.description }}
            </p>
            <div class="flex flex-col gap-3 justify-between mt-2">
                <div class="flex gap-1 items-center text-xs tracking-normal text-neutral-950">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/206e5d29b5523c409dbfe316e887c82aeb672c336764aad169ece16b133845e4?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                        alt="" class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                    <time class="self-stretch my-auto">{{ formatDate(item.start_date) }} - {{
                        formatDate(item.end_date)
                        }}
                    </time>
                </div>
                <div class="flex gap-2 items-center">
                    <Tooltip text="Hours" :hover-delay="1" :placement="'top'">
                        <FeatherIcon name="clock" class="size-4" />
                        <p class="text-xs font-normal">{{ item.hours }} hr</p>
                    </Tooltip>
                </div>
                <div class="flex items-center justify-between">
                    <div v-if="JSON.parse(item.volunteers).length > 0 && JSON.parse(item.volunteers)[0].full_name != null"
                        class="flex items-center -space-x-3 ">
                        <div v-for="(el, index) in JSON?.parse(item.volunteers).slice(0, 3)" :key="index">
                            <img v-if="el.user_image" :src="el.user_image" :alt="'User ' + (index + 1)"
                                class="w-8 h-8 rounded-full border-2 border-white" />
                            <div v-else
                                class="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#e86c13] text-sm">
                                {{ el.full_name?.charAt(0) }}
                            </div>
                        </div>
                        <p v-if="JSON.parse(item.volunteers).length > 3" class="pl-4 text-sm text-center">
                            +{{ JSON.parse(item.volunteers).length - 3 }}
                        </p>
                    </div>
                    <div v-else class="w-8 h-8"></div>
                    <div
                        class="flex gap-1 items-center text-sm font-medium tracking-normal text-right text-orange-600 uppercase hover:text-orange-700">
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

import { FeatherIcon,Tooltip } from 'frappe-ui';
const auth = inject('auth');
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

.card-img {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
</style>