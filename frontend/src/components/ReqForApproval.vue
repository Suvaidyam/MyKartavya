<template>
    <Dialog v-model="showDialog">
        <template #body-title>
            <div class="flex items-center gap-2">
                <FeatherIcon name="alert-circle" class="text-orange-500 size-5" />
                <h3 class="text-lg font-medium">Account Status</h3>
            </div>
        </template>
        <template #body-content>
            <div class="py-4">
                <div class="flex items-center gap-2 mb-3">
                    <span class="bg-[#f4d6cd] px-3 py-1.5 rounded text-sm font-medium text-[#FF5722]">
                        Pending by Admin
                    </span>
                </div>
                <p class="text-gray-600 text-sm">
                    Your account is currently pending approval from the administrator. You'll be notified once your
                    account is approved.
                </p>
            </div>
        </template>
        <template #actions>
            <div class="flex justify-end gap-3">
                <button @click="closeDialog"
                    class="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors">
                    Close
                </button>
                <button @click="notifyAdmin" :disabled="loading"
                    class="px-4 py-2 rounded-md bg-[#FF5722] text-white text-sm font-medium hover:bg-[#FF5722]/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <FeatherIcon v-if="!loading" name="bell" class="size-4" />
                    <div v-else class="size-4 border-2 border-white border-t-transparent rounded-full animate-spin">
                    </div>
                    {{ loading ? 'Notifying...' : 'Notify Admin' }}
                </button>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import { Button, Dialog, FeatherIcon } from 'frappe-ui'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const auth = inject('auth')
const call = inject('call')

const showDialog = ref(props.modelValue)
const loading = ref(false)

watch(() => props.modelValue, (newVal) => {
    showDialog.value = newVal
})

watch(() => showDialog.value, (newVal) => {
    emit('update:modelValue', newVal)
})

const closeDialog = () => {
    showDialog.value = false
}

const notifyAdmin = async () => {
    try {
        loading.value = true
        const response = await call('mykartavya.controllers.api.notify_admin_approval', {
            volunteer: auth.cookie.user_id
        })

        if (response.status === 'success') {
            toast.success('Admin has been notified about your approval request', {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            closeDialog()
        } else {
            throw new Error(response.message || 'Failed to notify admin')
        }
    } catch (error) {
        toast.error(error.message || 'Something went wrong', {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    } finally {
        loading.value = false
    }
}
</script>