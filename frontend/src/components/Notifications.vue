<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <Tooltip text="Notifications" :hover-delay="1" :placement="'top'">
                <MenuButton class="text-gray-600 flex items-center justify-center hover:text-black">
                    <FeatherIcon name="bell" class="size-5 text-gray-700"/>
                </MenuButton>
            </Tooltip>
        </div>
        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute -right-4 sm:right-0 z-10 mt-1 w-80 h-96 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
                <div class="sticky rounded-t-md text text-gray-700 px-3 py-1.5 border-b w-full bg-white">
                    Notifications
                </div>
                <div class="w-full text-sm h-[90%] text-gray-800 overflow-y-auto pb-3">
                    <!-- <p class="border-b py-1.5 hover:bg-gray-50 cursor-pointer px-3">Test Notifications</p> -->
                    <div class="flex items-center justify-center flex-col gap-2 h-full">
                        <p class="text-base px-3">No New notifications</p>
                        <p class="text-sm px-3 text-center">Looks like you haven’t received any notifications.</p>
                    </div>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Tooltip,FeatherIcon } from 'frappe-ui';
</script>