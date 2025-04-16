<template>
    <Dialog v-model="showDialog">
        <template #body-title>
            <div class="flex items-center gap-3">
                <div class="p-2 bg-orange-100 rounded-full">
                    <FeatherIcon name="alert-circle" class="text-orange-500 size-6" />
                </div>
                <h3 class="text-xl font-semibold text-gray-800">Account Status</h3>
            </div>
        </template>
        <template #body-content>
            <div class="py-6">
                <div class="flex flex-col items-center text-center mb-6">
                    <div class="mb-4">
                        <span
                            class="bg-gradient-to-r from-orange-100 to-orange-50 px-4 py-2 rounded-full text-sm font-medium text-[#FF5722] border border-orange-200 shadow-sm">
                            Pending Approval
                        </span>
                    </div>
                    <div class="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p class="text-gray-600 text-base max-w-md">
                        Your account is currently pending approval from the administrator. We'll notify you as soon as
                        your account is approved.
                    </p>
                </div>
                <div class="bg-orange-50 rounded-lg p-4 border border-orange-100">
                    <div class="flex items-start gap-3">
                        <div class="p-2 bg-white rounded-full">
                            <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-gray-800 mb-1">What happens next?</h4>
                            <p class="text-sm text-gray-600">Our team will review your application and get back to you
                                shortly. You can still browse opportunities, but some features will be limited until
                                approval.</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #actions>
            <div class="flex justify-end gap-3">
                <button @click="closeDialog"
                    class="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-sm">
                    Close
                </button>
                <button @click="notifyAdmin" :disabled="loading"
                    class="px-5 py-2.5 rounded-lg bg-[#FF5722] text-white text-sm font-medium hover:bg-[#FF5722]/90 transition-all duration-200 hover:shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
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

<style scoped>
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>