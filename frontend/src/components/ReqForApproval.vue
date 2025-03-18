<template>
    <Dialog v-model="store.req_for_approavl">
        <template #body-title>
            <h3>Your account status</h3>
        </template>
        <template #body-content>
            <span class="bg-[#f4d6cd] px-2 text-red-500 py-1 rounded-sm text-xs">Pending by Admin</span>
        </template>
        <template #actions>
            <button @click="notified" class="px-3 py-2 gap-2 rounded-md bg-secondary text-sm text-white flex items-center justify-center">
                <FeatherIcon name="bell" class=" size-4" />
                Notified to Approval
            </button>
        </template>
    </Dialog>
</template>
<script setup>
import { ref, watch, inject } from 'vue'
import { Button, Dialog,FeatherIcon } from 'frappe-ui'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const store = inject('store')

const notified = () => {
    store.req_for_approavl = false
    toast.info('Notified to Approval')
}
watch(() => store.req_for_approavl, (newVal) => {
    store.req_for_approavl = newVal
}, { immediate: true })

</script>