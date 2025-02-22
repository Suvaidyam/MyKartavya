<template>
    <aside class="w-60 min-w-60 hidden lg:block p-4 border-r border-gray-200">
        <div class="  bg-white">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-lg font-semibold">Filter by</h3>
                <button :disabled="clear_all_disabled" class="text-sm text-gray-500" @click="clear_all()">Clear All</button>
            </div>
            <div class="flex flex-col">
                <div v-for="item in filter_by" class="flex flex-col border-t">
                    <h4 class="text-sm font-semibold mb-2 pt-2">{{ item.name }}</h4>
                    <div class="flex flex-col gap-2 pb-2">
                        <div v-for="el in item.options" class="flex px-2 items-center gap-1 text-sm">
                            <input v-model="filter[item.key]" :value="el" :type="item.type" :name="item.key"
                                :class="[item.type == 'checkbox' ? 'rounded-sm' : 'rounded-full', '']"
                                :id="`${item.key}-${el.toLowerCase().replace(' ', '-')}`">
                            <label :for="`${item.key}-${el.toLowerCase().replace(' ', '-')}`">{{ el }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
    <!-- mobile -->
    <div class="w-full block lg:hidden px-4 pb-3">
        <div class="flex gap-1 flex-wrap">
            <Menu v-for="item in filter_by" as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton
                        class="inline-flex w-full justify-center gap-x-1.5 truncate rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                        {{ item.name }}
                        <FeatherIcon class="size-4 text-gray-700" name="chevron-down" />
                        <!-- <ChevronDownIcon class="-mr-1 size-5 text-gray-400" aria-hidden="true" /> -->
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
                                :class="[item.type == 'checkbox' ? 'rounded-sm' : 'rounded-full', '']"
                                :id="`${item.key}-${el.toLowerCase().replace(' ', '-')}`">
                            <label :for="`${item.key}-${el.toLowerCase().replace(' ', '-')}`">{{ el }}</label>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
            <button v-if="!clear_all_disabled" class="border truncate rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700" @click="clear_all()">Clear All</button>
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
