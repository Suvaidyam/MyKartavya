<template>
    <div>
        <div class="bg-white rounded-lg">
            <div class="bg-white p-6 rounded-lg w-full relative">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-heading4 font-medium">Submit Report</h2>
                </div>

                <!-- Activity Report Popup -->
                <div class="bg-white rounded-lg shadow-lg p-6 w-full">
                    <div class="mb-6">
                        <label class="block font-normal text-lg text-[#0B0B0B] pb-3">How much time you donated while
                            working on
                            the activity?</label>
                        <div class="relative">
                            <div class="flex flex-col sm:flex-row gap-2">
                                <div class="flex gap-2 items-center relative w-full sm:w-auto">
                                    <label class="text-base font-normal">Hours</label>
                                    <input type="number" v-model="activity_log.hours"
                                        class="w-full sm:w-24 border rounded-sm px-2 h-8 sm:h-8"
                                        @input="activity_log.hours = Math.max(0, activity_log.hours)" />
                                    <FeatherIcon class="absolute right-2 top-2 size-4" name="clock" />
                                </div>
                                <div class="flex gap-2 items-center relative w-full sm:w-auto">
                                    <label class="text-base font-normal">Minutes</label>
                                    <input type="number" v-model="activity_log.minutes"
                                        @input="activity_log.minutes = Math.max(0, activity_log.minutes)"
                                        class="w-full sm:w-24 border rounded-sm px-2 h-8 sm:h-8" />
                                    <FeatherIcon class="absolute right-2 top-2 size-4" name="clock" />
                                </div>
                            </div>
                            <p class="text-red-500 absolute text-xs -bottom-5" v-if="activity_err.time">Donation
                                time cannot be 0.
                            </p>
                        </div>
                    </div>
                    <div class="mb-4 relative">
                        <label class="block text-lg font-normal mb-1">How much percent work has completed?</label>
                        <div class="flex items-center gap-2">
                            <input type="range" min="0" max="100" v-model="activity_log.progress"
                                class="w-full h-[6px] accent-green-500" />
                            <span
                                class="h-8 w-16 flex items-center justify-center border rounded-sm text-base font-normal text-center">
                                {{ activity_log.progress }}%
                            </span>
                        </div>
                        <p class="text-red-500 absolute text-xs -bottom-2" v-if="activity_err.progress">
                            Please update the current progress before proceeding.
                        </p>
                    </div>
                    <div class="mb-4 relative">
                        <label class="block font-medium mb-2">Upload Media</label>
                        <div
                            class="border-dashed border-2 border-gray-300 p-4 sm:p-6 rounded-lg text-center relative min-h-[120px] sm:min-h-[150px]">
                            <input type="file" multiple @change="uploadFiles"
                                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <div class="flex flex-col items-center text-gray-500">
                                <svg width="70" height="60" viewBox="0 0 70 60" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-16 sm:h-16">
                                    <!-- Upload icon SVG path -->
                                </svg>
                                <p class="mt-2 text-base sm:text-lg font-normal">
                                    Drag & drop files or
                                    <span class="text-[#FF5722] cursor-pointer">Browse</span>
                                </p>
                                <p class="text-xs font-normal pt-2 text-[#999999]">Supported formats: JPEG, PNG</p>
                            </div>
                        </div>
                        <p class="text-red-500 absolute text-xs -bottom-2" v-if="activity_err.image">
                            Image upload is required. Please upload an image to continue.
                        </p>
                        <div class="flex flex-wrap gap-2 mt-3">
                            <img v-for="(image, index) in uploadedImages" :key="index" :src="image.preview" alt="img"
                                class="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover" />
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button @click="submitReport"
                            class="bg-[#FF5722] flex items-center justify-center text-white h-[38px] text-sm sm:text-base w-full sm:w-48 rounded-sm text-center font-medium hover:bg-orange-600 transition-all duration-200 active:scale-95 disabled:transform-none disabled:cursor-not-allowed">
                            <p>MARK AS COMPLETE</p>
                            <div class="h-5 w-5" v-if="loading">
                                <div
                                    class="animate-spin h-full w-full rounded-full border-[2px] flex justify-center items-center border-dotted border-[#fff]">
                                    <div class="w-3 h-3 rounded-full border-dashed border-[1px] border-[#fff]">
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Completion Popup -->
                <div v-if="showCompletionPopup"
                    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div class="bg-white rounded-lg shadow-lg w-full max-w-[90%] sm:max-w-md p-4 sm:p-6 text-center">
                        <div class="mb-4 sm:mb-6">
                            <div class="w-32 sm:w-48 h-24 sm:h-36 mx-auto text-[#FF5722]">
                                <img src="../assets/certificate.png" alt="completion"
                                    class="w-full h-full object-contain">
                            </div>
                            <h2 class="text-xl sm:text-2xl font-semibold mb-2">Thank You!</h2>
                            <p class="text-sm sm:text-base text-gray-600">Your activity has been marked as complete</p>
                        </div>
                        <div class="flex justify-center">
                            <button @click="closeCompletionPopup"
                                class="bg-[#FF5722] text-white py-2 px-4 sm:px-6 rounded font-semibold hover:bg-orange-600 flex items-center gap-2 transition-all duration-200 active:scale-95">
                                CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { FeatherIcon } from 'frappe-ui'
import 'vue3-toastify/dist/index.css'

const showCompletionPopup = ref(false)
const call = inject('call')
const auth = inject('auth')
const route = useRoute()
const store = inject('store');
const router = useRouter()

const props = defineProps({
    activity: {
        type: Object,
        required: false,
        default: () => ({}),
    },
    opportunity_activity: {
        type: Object,
        required: false,
        default: () => ({}),
    }
})

const uploadedImages = ref([])
const loading = ref(false)

const activity_log = ref({
    hours: 0,
    minutes: 0,
    progress: 0,
})

const activity_err = ref({
    time: false,
    progress: false,
    image: false,
})

const req_field = () => {
    let hasError = false;
    activity_err.value = { time: false, progress: false, image: false };

    if (activity_log.value.hours === 0 && activity_log.value.minutes === 0) {
        activity_err.value.time = true;
        hasError = true;
    }
    if (activity_log.value.progress === 0 || activity_log.value.progress === props.activity.com_percent) {
        activity_err.value.progress = true;
        hasError = true;
    }
    if (uploadedImages.value.length === 0 && props.activity.require_feedback_images) {
        activity_err.value.image = true;
        hasError = true;
    }
    return hasError;
};

const submitReport = async () => {
    if (req_field()) {
        return;
    }

    loading.value = true;

    try {
        let res = await call("mykartavya.controllers.api.submit_opportunity_activity_report", {
            name: props.opportunity_activity,
            data: {
                duration: activity_log.value.hours * 3600 + activity_log.value.minutes * 60,
                percent: activity_log.value.progress - (props.activity.com_percent || 0),
                images: uploadedImages.value,
            },
        });

        if (res) {
            activity_log.value.progress = res.com_percent;
            toast.success("Activity report submitted successfully", {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            loading.value = false;
            activity_log.value = {
                hours: 0,
                minutes: 0,
                progress: 0,
            };
            store.refresh_step = true;
            // showCompletionPopup.value = false;
        }
    } catch (error) {
        loading.value = false;
        toast.error("Something went wrong", {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
};

const closeCompletionPopup = () => {
    showCompletionPopup.value = false;
    router.push('/profile');
}

const uploadFiles = (event) => {
    const files = event.target.files
    if (files.length) {
        for (let file of files) {
            const reader = new FileReader()
            reader.onload = (e) => {
                uploadedImages.value.push({ file: file, preview: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }
}
</script>

<style scoped>
.button-animation {
    transition: all 0.2s ease;
}

.button-animation:active {
    transform: scale(0.95);
}

.button-animation:active .w-4 {
    transform: rotate(180deg);
}

.button-animation:disabled {
    transform: none;
    cursor: not-allowed;
}
</style>