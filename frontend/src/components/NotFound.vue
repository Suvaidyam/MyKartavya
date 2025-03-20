<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <img src="../assets/empty.png" alt="">
        <p class="text-2xl text-gray-600">{{props.message}}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    message: {
        type: String,
        default: 'Data Not Found!'
    }
})
</script>