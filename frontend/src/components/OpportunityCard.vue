<template>
    <div v-if="item.com_percent > 0" class="card bg-white overflow-hidden relative"
        :class="{ 'opacity-75': item.is_locked }">
        <div v-if="item.is_locked" class="absolute inset-0 bg-gray-900/70 flex items-center justify-center z-10">
            <div class="flex flex-col items-center gap-3 p-4">
                <div class="bg-white/10 p-3 rounded-full">
                    <FeatherIcon name="lock" class="size-6 text-white" />
                </div>
                <span class="text-white font-medium text-sm text-center">Complete previous activity to unlock</span>
                <span class="text-white/80 text-xs text-center">This activity will be available after completing the
                    prerequisite</span>
            </div>
        </div>
        <router-link :to="item.is_locked ? '#' : dynamicLink" class="block">
            <div class="w-full flex flex-col justify-between aspect-[16/9] rounded-lg relative overflow-hidden">
                <img :src="item.activity_image || 'https://res.cloudinary.com/dyt5jqnax/image/upload/v1742968038/mykartavya-logo_jptv31.png'"
                    alt=""
                    class="h-full w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105">
                <div
                    class="bg-[#FF7C3A] activity-type absolute top-3 text-white font-semibold text-xs flex items-center pl-3 pr-5 h-7 shadow-sm">
                    {{ item.types }}
                </div>
                <div v-if="item.karma_points"
                    class="absolute right-3 top-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 h-7 rounded-full shadow-sm flex items-center gap-1.5">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.5002 3.66602C15.5002 2.28518 12.8885 1.16602 9.66683 1.16602C6.44516 1.16602 3.8335 2.28518 3.8335 3.66602M15.5002 3.66602V6.99935C15.5002 7.84935 14.5118 8.59935 13.0002 9.05102C12.0552 9.33435 10.906 9.49935 9.66683 9.49935C8.42766 9.49935 7.2785 9.33352 6.3335 9.05102C4.82266 8.59935 3.8335 7.84935 3.8335 6.99935V3.66602M15.5002 3.66602C15.5002 4.51602 14.5118 5.26602 13.0002 5.71768C12.0552 6.00102 10.906 6.16602 9.66683 6.16602C8.42766 6.16602 7.2785 6.00018 6.3335 5.71768C4.82266 5.26602 3.8335 4.51602 3.8335 3.66602"
                            stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M0.5 6.9994V10.3327C0.5 11.1827 1.48917 11.9327 3 12.3844C3.945 12.6677 5.09417 12.8327 6.33333 12.8327C7.5725 12.8327 8.72167 12.6669 9.66667 12.3844C11.1775 11.9327 12.1667 11.1827 12.1667 10.3327V9.4994M0.5 6.9994C0.5 6.0019 1.8625 5.14107 3.83333 4.74023M0.5 6.9994C0.5 7.8494 1.48917 8.5994 3 9.05107C3.945 9.3344 5.09417 9.4994 6.33333 9.4994C6.9125 9.4994 7.47167 9.46357 8 9.39607"
                            stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="font-semibold text-xs">{{ item.karma_points?.toLocaleString() }} Points</span>
                </div>
                <div class="absolute bottom-3 flex items-center gap-2 px-3 overflow-auto">
                    <div v-if="item.sdgs" v-for="el in JSON.parse(item.sdgs)" class="flex-shrink-0">
                        <img v-if="el.image" :src="el.image" class="w-8 h-8  shadow-sm" />
                        <span v-else
                            class="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg shadow-sm font-medium">{{
                                el.sdgs_name?.charAt(0) }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2.5 pt-3 px-1">
                <h3 class="self-start truncate mt-3 text-base font-semibold tracking-normal text-gray-900">{{
                    item.activity_name }}</h3>
                <div class="flex gap-2 items-center text-gray-600">
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.33331 7.00033C1.33331 4.48633 1.33331 3.22899 2.11465 2.44833C2.89598 1.66766 4.15265 1.66699 6.66665 1.66699H9.33331C11.8473 1.66699 13.1046 1.66699 13.8853 2.44833C14.666 3.22966 14.6666 4.48633 14.6666 7.00033V8.33366C14.6666 10.8477 14.6666 12.105 13.8853 12.8857C13.104 13.6663 11.8473 13.667 9.33331 13.667H6.66665C4.15265 13.667 2.89531 13.667 2.11465 12.8857C1.33398 12.1043 1.33331 10.8477 1.33331 8.33366V7.00033Z"
                            stroke="currentColor" stroke-width="0.75" />
                        <path d="M4.66666 1.66699V0.666992M11.3333 1.66699V0.666992M1.66666 5.00033H14.3333"
                            stroke="currentColor" stroke-width="0.75" stroke-linecap="round" />
                        <path
                            d="M12 10.3333C12 10.5101 11.9298 10.6797 11.8047 10.8047C11.6797 10.9298 11.5101 11 11.3333 11C11.1565 11 10.987 10.9298 10.8619 10.8047C10.7369 10.6797 10.6667 10.5101 10.6667 10.3333C10.6667 10.1565 10.7369 9.98695 10.8619 9.86193C10.987 9.7369 11.1565 9.66667 11.3333 9.66667C11.5101 9.66667 11.6797 9.7369 11.8047 9.86193C11.9298 9.98695 12 10.1565 12 10.3333ZM12 7.66667C12 7.84348 11.9298 8.01305 11.8047 8.13807C11.6797 8.2631 11.5101 8.33333 11.3333 8.33333C11.1565 8.33333 10.987 8.2631 10.8619 8.13807C10.7369 8.01305 10.6667 7.84348 10.6667 7.66667C10.6667 7.48986 10.7369 7.32029 10.8619 7.19526C10.987 7.07024 11.1565 7 11.3333 7C11.5101 7 11.6797 7.07024 11.8047 7.19526C11.9298 7.32029 12 7.48986 12 7.66667ZM8.66667 10.3333C8.66667 10.5101 8.59643 10.6797 8.4714 10.8047C8.34638 10.9298 8.17681 11 8 11C7.82319 11 7.65362 10.9298 7.5286 10.8047C7.40357 10.6797 7.33333 10.5101 7.33333 10.3333C7.33333 10.1565 7.40357 9.98695 7.5286 9.86193C7.65362 9.7369 7.82319 9.66667 8 9.66667C8.17681 9.66667 8.34638 9.7369 8.4714 9.86193C8.59643 9.98695 8.66667 10.1565 8.66667 10.3333ZM8.66667 7.66667C8.66667 7.84348 8.59643 8.01305 8.4714 8.13807C8.34638 8.2631 8.17681 8.33333 8 8.33333C7.82319 8.33333 7.65362 8.2631 7.5286 8.13807C7.40357 8.01305 7.33333 7.84348 7.33333 7.66667C7.33333 7.48986 7.40357 7.32029 7.5286 7.19526C7.65362 7.07024 7.82319 7 8 7C8.17681 7 8.34638 7.07024 8.4714 7.19526C8.59643 7.32029 8.66667 7.48986 8.66667 7.66667ZM5.33333 10.3333C5.33333 10.5101 5.2631 10.6797 5.13807 10.8047C5.01305 10.9298 4.84348 11 4.66667 11C4.48986 11 4.32029 10.9298 4.19526 10.8047C4.07024 10.6797 4 10.5101 4 10.3333C4 10.1565 4.07024 9.98695 4.19526 9.86193C4.32029 9.7369 4.48986 9.66667 4.66667 9.66667C4.84348 9.66667 5.01305 9.7369 5.13807 9.86193C5.2631 9.98695 5.33333 10.1565 5.33333 10.3333ZM5.33333 7.66667C5.33333 7.84348 5.2631 8.01305 5.13807 8.13807C5.01305 8.2631 4.84348 8.33333 4.66667 8.33333C4.48986 8.33333 4.32029 8.2631 4.19526 8.13807C4.07024 8.01305 4 7.84348 4 7.66667C4 7.48986 4.07024 7.32029 4.19526 7.19526C4.32029 7.07024 4.48986 7 4.66667 7C4.84348 7 5.01305 7.07024 5.13807 7.19526C5.2631 7.32029 5.33333 7.48986 5.33333 7.66667Z"
                            fill="currentColor" />
                    </svg>
                    <p class="text-xs font-medium">{{ formatDate(item.start_date) }} - {{ formatDate(item.end_date) }}
                    </p>
                </div>
                <div class="flex gap-2 items-center justify-between">
                    <div class="flex gap-2 items-center text-gray-600">
                        <Tooltip text="Activity Hours">
                            <FeatherIcon name="clock" class="size-4" />
                            <p class="text-xs font-medium">{{ item.hours }} hr</p>
                        </Tooltip>
                    </div>
                    <div class="flex gap-2">
                        <Tooltip text="Review under proccess">
                            <FeatherIcon v-if="item.completion_wf_state == 'Submitted'" name="clock"
                                class="size-4 text-yellow-500" />
                        </Tooltip>
                        <Tooltip text="Completed">
                            <FeatherIcon v-if="item.completion_wf_state == 'Approved'" name="check-circle"
                                class="size-4 text-green-500" />
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div class="mt-4 px-1">
                <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-[#4CAF50] h-full rounded-full transition-all duration-300"
                        :style="{ width: `${item?.com_percent ?? 0}%` }">
                    </div>
                </div>
                <div class="flex items-center justify-between pt-2">
                    <p class="text-xs font-medium text-gray-700">{{ item?.com_percent ?? 0 }}% completed</p>
                    <p class="text-xs font-medium text-gray-700 flex items-center gap-1">
                        <FeatherIcon name="clock" class="size-3" />
                        {{ item?.donet_hours ? ((item?.donet_hours / 60) / 60).toFixed(2) : '0' }} hr
                    </p>
                </div>
            </div>
        </router-link>
    </div>
    <article v-else class="flex flex-col card w-full py-2 overflow-hidden relative"
        :class="{ 'opacity-75': item.is_locked }">
        <div v-if="item.is_locked" class="absolute inset-0 bg-gray-900/70 flex items-center justify-center z-10">
            <div class="flex flex-col items-center gap-3 p-4">
                <div class="bg-white/10 p-3 rounded-full">
                    <FeatherIcon name="lock" class="size-6 text-white" />
                </div>
                <span class="text-white font-medium text-sm text-center">Complete previous activity to unlock</span>
                <span class="text-white/80 text-xs text-center">This activity will be available after completing the
                    prerequisite</span>
            </div>
        </div>
        <router-link :to="item.is_locked ? '#' : dynamicLink" class="block">
            <div class="w-full flex flex-col justify-between aspect-[16/9] rounded-lg relative overflow-hidden">
                <img :src="item.activity_image || 'https://res.cloudinary.com/dyt5jqnax/image/upload/v1742968038/mykartavya-logo_jptv31.png'"
                    alt=""
                    class="h-full w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105">
                <div
                    class="bg-[#FF7C3A] activity-type absolute top-3 text-white font-semibold text-xs flex items-center pl-3 pr-5 h-7 shadow-sm">
                    {{ item.types }}
                </div>
                <div v-if="item.karma_points"
                    class="absolute right-3 top-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 h-7 rounded-full shadow-sm flex items-center gap-1.5">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.5002 3.66602C15.5002 2.28518 12.8885 1.16602 9.66683 1.16602C6.44516 1.16602 3.8335 2.28518 3.8335 3.66602M15.5002 3.66602V6.99935C15.5002 7.84935 14.5118 8.59935 13.0002 9.05102C12.0552 9.33435 10.906 9.49935 9.66683 9.49935C8.42766 9.49935 7.2785 9.33352 6.3335 9.05102C4.82266 8.59935 3.8335 7.84935 3.8335 6.99935V3.66602M15.5002 3.66602C15.5002 4.51602 14.5118 5.26602 13.0002 5.71768C12.0552 6.00102 10.906 6.16602 9.66683 6.16602C8.42766 6.16602 7.2785 6.00018 6.3335 5.71768C4.82266 5.26602 3.8335 4.51602 3.8335 3.66602"
                            stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M0.5 6.9994V10.3327C0.5 11.1827 1.48917 11.9327 3 12.3844C3.945 12.6677 5.09417 12.8327 6.33333 12.8327C7.5725 12.8327 8.72167 12.6669 9.66667 12.3844C11.1775 11.9327 12.1667 11.1827 12.1667 10.3327V9.4994M0.5 6.9994C0.5 6.0019 1.8625 5.14107 3.83333 4.74023M0.5 6.9994C0.5 7.8494 1.48917 8.5994 3 9.05107C3.945 9.3344 5.09417 9.4994 6.33333 9.4994C6.9125 9.4994 7.47167 9.46357 8 9.39607"
                            stroke="#FF5722" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="font-semibold text-xs">{{ item.karma_points?.toLocaleString() }} Points</span>
                </div>
                <div class="absolute bottom-3 flex items-center gap-2 px-3 overflow-auto">
                    <div v-if="item.sdgs" v-for="el in JSON.parse(item.sdgs)" class="flex-shrink-0">
                        <img v-if="el?.image" :src="el?.image" class="w-8 h-8  shadow-sm" />
                        <span v-else
                            class="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg shadow-sm font-medium">{{
                                el?.sdgs_name?.charAt(0) }}</span>
                    </div>
                </div>
            </div>
            <div class="px-1">
                <h3 class="self-start truncate mt-3 text-base font-semibold tracking-normal text-gray-900">
                    {{ item.activity_name }}
                </h3>
                <p class="mt-2 text-sm tracking-normal leading-5 text-justify text-gray-600 line-clamp-2">
                    {{ item.opportunity_description }}
                </p>
                <div class="flex flex-col gap-3 justify-between mt-3">
                    <div class="flex gap-1.5 items-center text-xs tracking-normal text-gray-600">
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.33331 7.00033C1.33331 4.48633 1.33331 3.22899 2.11465 2.44833C2.89598 1.66766 4.15265 1.66699 6.66665 1.66699H9.33331C11.8473 1.66699 13.1046 1.66699 13.8853 2.44833C14.666 3.22966 14.6666 4.48633 14.6666 7.00033V8.33366C14.6666 10.8477 14.6666 12.105 13.8853 12.8857C13.104 13.6663 11.8473 13.667 9.33331 13.667H6.66665C4.15265 13.667 2.89531 13.667 2.11465 12.8857C1.33398 12.1043 1.33331 10.8477 1.33331 8.33366V7.00033Z"
                                stroke="currentColor" stroke-width="0.75" />
                            <path d="M4.66666 1.66699V0.666992M11.3333 1.66699V0.666992M1.66666 5.00033H14.3333"
                                stroke="currentColor" stroke-width="0.75" stroke-linecap="round" />
                            <path
                                d="M12 10.3333C12 10.5101 11.9298 10.6797 11.8047 10.8047C11.6797 10.9298 11.5101 11 11.3333 11C11.1565 11 10.987 10.9298 10.8619 10.8047C10.7369 10.6797 10.6667 10.5101 10.6667 10.3333C10.6667 10.1565 10.7369 9.98695 10.8619 9.86193C10.987 9.7369 11.1565 9.66667 11.3333 9.66667C11.5101 9.66667 11.6797 9.7369 11.8047 9.86193C11.9298 9.98695 12 10.1565 12 10.3333ZM12 7.66667C12 7.84348 11.9298 8.01305 11.8047 8.13807C11.6797 8.2631 11.5101 8.33333 11.3333 8.33333C11.1565 8.33333 10.987 8.2631 10.8619 8.13807C10.7369 8.01305 10.6667 7.84348 10.6667 7.66667C10.6667 7.48986 10.7369 7.32029 10.8619 7.19526C10.987 7.07024 11.1565 7 11.3333 7C11.5101 7 11.6797 7.07024 11.8047 7.19526C11.9298 7.32029 12 7.48986 12 7.66667ZM8.66667 10.3333C8.66667 10.5101 8.59643 10.6797 8.4714 10.8047C8.34638 10.9298 8.17681 11 8 11C7.82319 11 7.65362 10.9298 7.5286 10.8047C7.40357 10.6797 7.33333 10.5101 7.33333 10.3333C7.33333 10.1565 7.40357 9.98695 7.5286 9.86193C7.65362 9.7369 7.82319 9.66667 8 9.66667C8.17681 9.66667 8.34638 9.7369 8.4714 9.86193C8.59643 9.98695 8.66667 10.1565 8.66667 10.3333ZM8.66667 7.66667C8.66667 7.84348 8.59643 8.01305 8.4714 8.13807C8.34638 8.2631 8.17681 8.33333 8 8.33333C7.82319 8.33333 7.65362 8.2631 7.5286 8.13807C7.40357 8.01305 7.33333 7.84348 7.33333 7.66667C7.33333 7.48986 7.40357 7.32029 7.5286 7.19526C7.65362 7.07024 7.82319 7 8 7C8.17681 7 8.34638 7.07024 8.4714 7.19526C8.59643 7.32029 8.66667 7.48986 8.66667 7.66667ZM5.33333 10.3333C5.33333 10.5101 5.2631 10.6797 5.13807 10.8047C5.01305 10.9298 4.84348 11 4.66667 11C4.48986 11 4.32029 10.9298 4.19526 10.8047C4.07024 10.6797 4 10.5101 4 10.3333C4 10.1565 4.07024 9.98695 4.19526 9.86193C4.32029 9.7369 4.48986 9.66667 4.66667 9.66667C4.84348 9.66667 5.01305 9.7369 5.13807 9.86193C5.2631 9.98695 5.33333 10.1565 5.33333 10.3333ZM5.33333 7.66667C5.33333 7.84348 5.2631 8.01305 5.13807 8.13807C5.01305 8.2631 4.84348 8.33333 4.66667 8.33333C4.48986 8.33333 4.32029 8.2631 4.19526 8.13807C4.07024 8.01305 4 7.84348 4 7.66667C4 7.48986 4.07024 7.32029 4.19526 7.19526C4.32029 7.07024 4.48986 7 4.66667 7C4.84348 7 5.01305 7.07024 5.13807 7.19526C5.2631 7.32029 5.33333 7.48986 5.33333 7.66667Z"
                                fill="currentColor" />
                        </svg>
                        <time class="self-stretch my-auto font-medium">{{ formatDate(item.start_date) }} - {{
                            formatDate(item.end_date)
                        }}</time>
                    </div>
                    <div class="flex gap-2 items-center text-gray-600">
                        <Tooltip text="Hours">
                            <FeatherIcon name="clock" class="size-4" />
                            <p class="text-xs font-medium">{{ item.hours }} hr</p>
                        </Tooltip>
                    </div>
                    <div class="flex items-center justify-between">
                        <div v-if="parseVolunteers(item?.volunteers).length > 0 && parseVolunteers(item?.volunteers)[0]?.full_name"
                            class="flex items-center -space-x-3">
                            <div v-for="(el, index) in parseVolunteers(item?.volunteers).slice(0, 3)" :key="index">
                                <img v-if="el?.user_image" :src="el.user_image" :alt="'User ' + (index + 1)"
                                    class="w-8 h-8 rounded-full border-2 border-white" />
                                <div v-else
                                    class="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#e86c13] text-sm">
                                    {{ el?.full_name?.charAt(0) }}
                                </div>
                            </div>
                            <p v-if="parseVolunteers(item?.volunteers).length > 3" class="pl-4 text-sm text-center">
                                +{{ parseVolunteers(item?.volunteers).length - 3 }}
                            </p>
                        </div>
                        <div v-else class="w-8 h-8"></div>
                        <div
                            class="flex gap-1 items-center text-sm font-medium tracking-normal text-right text-[#FF5722] uppercase hover:text-orange-700">
                            <p>Act now</p>
                            <FeatherIcon name="arrow-up-right" class="size-4" />
                        </div>

                    </div>
                </div>
            </div>
        </router-link>
    </article>
</template>

<script setup>
import { inject, computed } from 'vue';
import { FeatherIcon, Tooltip } from 'frappe-ui';

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
    mode: {
        type: String,
        required: false,
    }
});

const parseVolunteers = (volunteers) => {
    try {
        const parsed = JSON.parse(volunteers);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
};

const dynamicLink = computed(() => {
    if (props.item && props.mode === 'opportunity') {
        if (props.item.activity) {
            return `/opportunity/${props.item.name}/activity/${props.item.activity}`;
        } else {
            return `/opportunity/${props.item.name}`;
        }
    }
    if (auth?.isLoggedIn) {
        if (props.item && props.mode === 'activity') {
            return `/activity/${props.item.activity}`;
        } else {
            console.log('Unknown type', props);
        }
    } else {
        if (props.mode === 'activity') {
            return `/kindness-volunteering/${props.item.activity}`;
        }
    }
});
</script>

<style scoped>
.card {
    transition: all 0.3s ease;
    border-radius: 12px;
    padding: 0.75rem;
    border: 1px solid transparent;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    width: 100%;
    height: fit-content;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: #e5e7eb;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Responsive styles */
@media screen and (max-width: 640px) {
    .card {
        padding: 0.5rem;
    }
}

@media screen and (min-width: 641px) and (max-width: 768px) {
    .card {
        padding: 0.625rem;
    }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
    .card {
        padding: 0.75rem;
    }
}

@media screen and (min-width: 1025px) and (max-width: 1280px) {
    .card {
        padding: 0.875rem;
    }
}

@media screen and (min-width: 1281px) and (max-width: 1920px) {
    .card {
        padding: 1rem;
    }
}

/* Ensure proper spacing and prevent overlapping */
.grid {
    display: grid;
    gap: 1rem;
    width: 100%;
}

.grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 640px) {
    .sm\:grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width: 1024px) {
    .lg\:grid-cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
</style>