<template>
    <div class="relative select-wrapper">
        <div class="flex items-center h-[42px] border border-gray-300 rounded px-3 w-full cursor-pointer"
            @click.stop="toggleDropdown">
            <div class="flex items-center gap-2 flex-1">
                <span class="text-gray-700">{{ selectedLabel || placeholder }}</span>
            </div>
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>

        <!-- Dropdown -->
        <div v-if="isOpen"
            class="absolute left-0 z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1">
            <div class="p-2 border-b">
                <input type="text" v-model="searchQuery" :placeholder="`Search ${label.toLowerCase()}...`"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                    @click.stop />
            </div>
            <div class="overflow-y-auto max-h-[200px] select-dropdown">
                <div v-for="option in filteredOptions" :key="option.name" @click.stop="selectOption(option)"
                    class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    :class="{ 'bg-orange-50': option.name === modelValue }">
                    <span class="text-gray-600">{{ option.label || option.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Select option'
    },
    required: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchQuery = ref('');

const filteredOptions = computed(() => {
    const search = searchQuery.value.toLowerCase();
    return props.options.filter(option =>
        option.name.toLowerCase().includes(search) ||
        (option.label && option.label.toLowerCase().includes(search))
    );
});

const selectedLabel = computed(() => {
    if (!props.modelValue) return '';
    const option = props.options.find(opt => opt.name === props.modelValue);
    return option ? (option.label || option.name) : props.modelValue;
});

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
    emit('update:modelValue', option.name);
    searchQuery.value = '';
    isOpen.value = false;
};

const handleClickOutside = (event) => {
    const wrapper = event.target.closest('.select-wrapper');
    if (!wrapper) {
        isOpen.value = false;
        searchQuery.value = '';
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.select-dropdown {
    scrollbar-width: thin;
    scrollbar-color: #f97316 #f3f4f6;
}

.select-dropdown::-webkit-scrollbar {
    width: 4px;
}

.select-dropdown::-webkit-scrollbar-track {
    background: #f3f4f6;
}

.select-dropdown::-webkit-scrollbar-thumb {
    background-color: #f97316;
    border-radius: 2px;
}

.select-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
}
</style>