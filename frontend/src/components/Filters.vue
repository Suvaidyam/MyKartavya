<template>
    <aside class="w-[270px] min-w-[270px] hidden lg:block p-4 border-r border-gray-200">
        <div class="  bg-white">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-lg font-medium">Filter by</h3>
                <button :disabled="clear_all_disabled" :class="[clear_all_disabled?'text-gray-500':'text-[#E86C13]','text-sm']" @click="clear_all()">Clear
                    All</button>
            </div>
            <div class="flex flex-col">
                <div v-for="item in filter_by" class="flex flex-col border-t">
                    <h4 class="text-[14px] font-medium mb-2 pt-2">{{ item.name }}</h4>
                    <div class="flex flex-col gap-3 pb-2">
                        <div v-for="el in item.options" class="flex px-2 items-center gap-2 text-sm">
                            <input v-model="filter[item.key]" :value="el" :type="item.type" :name="item.key"
                                :class="[item.type == 'checkbox' ? 'rounded-sm' : 'rounded-full', 'focus:ring-[#E86C13] checked:focus:bg-secondary checked:hover:bg-secondary checked:bg-secondary']"
                                :id="`${item.key}-${el.toLowerCase().replace(' ', '-')}`">
                            <label class="text-[12px] font-normal" :for="`${item.key}-${el.toLowerCase().replace(' ', '-')}`">{{ el }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
    <!-- mobile -->
    <div class="w-full block lg:hidden px-4 pt-3">
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
                        class="absolute p-1 left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
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
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref, watch } from 'vue'
import { FeatherIcon } from 'frappe-ui'

const clear_all_disabled = ref(true)
const filter = ref({
    sdgs: [],
    volunteering_hours: '',
    activity_type: [],
    karma_points: ''
})
const filter_by = [
    {
        name: 'SDGs',
        type: 'checkbox',
        key: 'sdgs',
        options: ['All', 'SDG 2 : Zero Hunger', 'SDG 3 : Good Health and Well-Being']
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
        options: ['Online', 'On Ground', 'Both']
    },
    {
        name: 'Karma Points',
        type: 'radio',
        key: 'karma_points',
        options: ['Low to High', 'High to Low', 'ARKs in my Region']
    },
]
const clear_all = () => {
    filter.value = {
        sdgs: [],
        volunteering_hours: '',
        activity_type: [],
        karma_points: ''
    }
}
watch(filter, (val) => {
    clear_all_disabled.value = Object.values(val).every(v => v == '')
}, { deep: true, immediate: true })
</script>
