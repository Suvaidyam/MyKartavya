<template>
    <aside
        class="w-[270px] min-w-[270px] fixed overflow-auto h-screen pb-[62px] hidden lg:block border-r border-gray-200">
        <div class="bg-white relative px-4">
            <div class="flex sticky top-0 bg-white z-20 justify-between items-center py-3">
                <h3 class="text-lg font-medium">Filter by</h3>
                <button :disabled="clear_all_disabled"
                    :class="[clear_all_disabled ? 'text-gray-500' : 'text-[#E86C13]', 'text-sm']" @click="clear_all()">
                    Clear All
                </button>
            </div>
            <div class="flex flex-col">
                <FilterLoader v-if="loader" />
                <div v-else v-for="item in filter_by" class="flex flex-col border-t">
                    <h4 class="text-[14px] font-medium mb-2 pt-2">{{ item.name }}</h4>
                    <div class="flex flex-col gap-3 pb-2">
                        <div v-if="item.key === 'sdgs'" class="flex px-2 items-center gap-2 text-sm">
                            <input v-model="allChecked" type="checkbox"
                                class="rounded-sm focus:ring-[#E86C13] focus:ring-0 checked:focus:bg-secondary checked:hover:bg-secondary checked:bg-secondary"
                                id="all-sdgs">
                            <label class="text-[12px] font-normal flex gap-2 items-center" for="all-sdgs">
                                All
                            </label>
                        </div>
                        <div v-for="el in item.options" class="flex px-2 items-center gap-2  text-sm">
                            <input v-model="filter[item.key]" :value="el" :type="item.type" :name="item.key"
                                :class="[item.type == 'checkbox' ? 'rounded-sm' : 'rounded-full', 'focus:ring-[#E86C13] focus:ring-0 checked:focus:bg-secondary checked:hover:bg-secondary checked:bg-secondary']"
                                :id="`${item.key}-${el.toLowerCase().replace(' ', '-')}`">
                            <div class="w-10 h-8 flex items-center px-1  ">
                                <img v-if="el.sdg_image" :src="sdg_image" :alt="el.name"
                                class="w-6 h-6 rounded-full object-cover" />
                                <div v-else class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                {{ el?.charAt(0) }}
                                </div>
                            </div>
                            <label class="text-[12px] font-normal"
                                :for="`${item.key}-${el.toLowerCase().replace(' ', '-')}`">{{ el }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
    <!-- mobile -->
    <div class="w-full block lg:hidden px-4 py-3">
        <div class="flex gap-1 flex-wrap">
            <Menu v-for="item in filter_by" as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton :class="[
                        (Array.isArray(filter[item.key]) ? filter[item.key].length > 0 : filter[item.key])
                            ? 'ring-[#E86C13] text-[#E86C13]'
                            : 'ring-gray-300',
                        'inline-flex w-full justify-center gap-x-1.5 truncate rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-inset hover:bg-gray-50'
                    ]">
                        {{ item.name }}
                        <FeatherIcon class="size-4" name="chevron-down" />
                    </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                        class="absolute p-1 max-h-72 overflow-auto left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
                        <div v-if="item.key === 'sdgs'" class="flex px-2 items-center py-1 gap-2 text-sm">
                            <input v-model="allChecked" type="checkbox"
                                class="rounded-sm focus:ring-[#E86C13] focus:ring-0 checked:focus:bg-secondary checked:hover:bg-secondary checked:bg-secondary"
                                id="all-sdgs">
                            <label class="text-[12px] font-normal" for="all-sdgs">All</label>
                        </div>
                        <div v-for="el in item.options" class="flex px-2 py-1 items-center gap-2 text-sm">
                            <input v-model="filter[item.key]" :value="el" :type="item.type" :name="item.key"
                                :class="[item.type == 'checkbox' ? 'rounded-sm' : 'rounded-full', 'focus:ring-[#E86C13] checked:focus:bg-secondary checked:hover:bg-secondary checked:bg-secondary']"
                                :id="`${item.key}-${el.toLowerCase().replace(' ', '-')}`">
                            <label :for="`${item.key}-${el.toLowerCase().replace(' ', '-')}`">{{ el }}</label>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
            <button v-if="!clear_all_disabled"
                class="border truncate rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700"
                @click="clear_all()">Clear All</button>
        </div>
    </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import { ref, computed, watch, onMounted, inject } from 'vue';
import { FeatherIcon } from 'frappe-ui';
import FilterLoader from './FilterLoader.vue';

const call = inject('call')
const loader = ref(false);
const clear_all_disabled = ref(true);
const props = defineProps({
    filter: Object,
});
const filter = ref(props.filter);

const sdgData = ref([]);
const filter_by = ref([
    {
        name: 'SDGs',
        type: 'checkbox',
        key: 'sdgs',
        options: [],
    },
    {
        name: 'Volunteering Hours',
        type: 'radio',
        key: 'volunteering_hours',
        options: ['Low to High', 'High to Low']
    },
    {
        name: 'Activity Type',
        type: 'checkbox',
        key: 'activity_type',
        options: ['Online', 'On-Ground', 'Both']
    },
    {
        name: 'Karma Points',
        type: 'radio',
        key: 'karma_points',
        options: ['Low to High', 'High to Low', 'ARKs in my Region']
    },
]);

const fetchSDGs = async () => {
    loader.value = true;
    try {
        const response = await call('mykartavya.controllers.api.sdg_data');
        sdgData.value = response;
        const sdgsFilter = filter_by.value.find(f => f.key === 'sdgs');
        if (sdgsFilter) {
            sdgsFilter.options = response.map(sdg => sdg.name);
            setTimeout(() => {
                loader.value = false;
            }, 500);
        }
    } catch (err) {
        loader.value = false;
        console.error('Error fetching SDG data:', err);
    }
};


// Computed property for "All" checkbox state
const allChecked = computed({
    get: () => {
        const sdgFilter = filter_by.value.find(f => f.key === 'sdgs');
        return sdgFilter && filter.value.sdgs.length === sdgFilter.options.length;
    },
    set: (value) => {
        const sdgFilter = filter_by.value.find(f => f.key === 'sdgs');
        filter.value.sdgs = value && sdgFilter ? [...sdgFilter.options] : [];
    }
});

// Clear all filters
const clear_all = () => {
    filter.value = {
        sdgs: [],
        volunteering_hours: '',
        activity_type: [],
        karma_points: ''
    };
};

// Watch filter changes for Clear All button state
watch(filter, (val) => {
    clear_all_disabled.value = Object.values(val).every(v =>
        Array.isArray(v) ? v.length === 0 : v === ''
    );
}, { deep: true, immediate: true });

onMounted(fetchSDGs);
</script>

<style scoped>
::-webkit-scrollbar {
    width: 4px;
    /* Thin width */
    height: 4px;
}

::-webkit-scrollbar-thumb {
    background: #b0b3b0;
    /* Scrollbar color */
    border-radius: 8px;
}

::-webkit-scrollbar-track {
    background: #f0f0f0;
    /* Track color */
}
</style>