<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton :class="
                'inline-flex w-full justify-center gap-x-1.5 truncate rounded-md bg-white p-2.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-inset hover:bg-gray-50'
            ">
                <FeatherIcon class="size-3" name="align-right" />
            </MenuButton>
        </div>
        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute p-1 max-h-72 overflow-auto right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
                <p class="text-base px-2 py-1 font-normal">Karma Points</p>
                <div class="flex px-2 py-1 items-center gap-2 text-sm">
                    <input name="karma_points" v-model="store.filters.karma_points" type="radio"
                        value="Low to High"
                        class="focus:ring-[#E86C13] checked:focus:bg-secondary checked:hover:bg-secondary checked:bg-secondary"
                        id="karma-low-to-high">
                    <label for="karma-low-to-high">Low to High</label>
                </div>
                <div class="flex px-2 py-1 items-center gap-2 text-sm">
                    <input name="karma_points" v-model="store.filters.karma_points" type="radio"
                        value="High to Low"
                        class="focus:ring-[#E86C13] checked:focus:bg-secondary checked:hover:bg-secondary checked:bg-secondary"
                        id="karma-high-to-low">
                    <label for="karma-high-to-low">High to Low</label>
                </div>
                <p class="text-base px-2 py-1 font-normal">Volunteering Hours</p>
                <div class="flex px-2 py-1 items-center gap-2 text-sm">
                    <input v-model="store.filters.volunteering_hours" type="radio" name="volunteering_hours"
                        value="Low to High"
                        class="focus:ring-[#E86C13] checked:focus:bg-secondary checked:hover:bg-secondary checked:bg-secondary"
                        id="volunteering-low-to-high">
                    <label for="volunteering-low-to-high">Low to High</label>
                </div>
                <div class="flex px-2 py-1 items-center gap-2 text-sm">
                    <input v-model="store.filters.volunteering_hours" type="radio" name="volunteering_hours"
                        value="High to Low"
                        class="focus:ring-[#E86C13] checked:focus:bg-secondary checked:hover:bg-secondary checked:bg-secondary"
                        id="volunteering-high-to-low">
                    <label for="volunteering-high-to-low">High to Low</label>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { ref ,inject} from 'vue';
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import { FeatherIcon } from 'frappe-ui';
 
const store = inject('store');
</script>