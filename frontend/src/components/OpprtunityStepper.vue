<template>
    <div>
        <div class="bg-white rounded-lg">
            <div class="bg-white p-6 rounded-lg w-full relative">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-heading4 font-medium">Timeline</h2>
                    <button @click="store.refresh_step = true"
                        class="text-pink-500 flex items-center text-base font-normal w-[107px] justify-center h-8 rounded-sm border refresh-button">
                        Refresh
                        <RefreshCwIcon class="w-4 h-4 ml-1" />
                    </button>
                </div>
                <div v-for="(step, index) in steps" :key="index" class="mb-6 relative">
                    <!-- Step indicator styling -->
                    <div class="absolute left-0 top-0 h-full w-[1px]" :class="[
                        step.completed ? 'bg-[#22C55E]' : 'bg-[#E5E7EB]',
                        index > currentStep ? 'blur-sm opacity-50' : ''
                    ]">
                    </div>

                    <!-- Step circle indicator -->
                    <div class="absolute -left-4 w-7 h-7 min-w-7 max-h-7 rounded-full flex items-center justify-center"
                        :class="[
                            step.completed ? 'border-green-500 bg-white border-2 text-green-600' : 'bg-[#FF5722] text-white',
                            index > currentStep ? 'blur-sm opacity-50' : ''
                        ]">
                        <CheckIcon v-if="step.completed" class="w-4 h-4" />
                        <div v-else>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.4688 10.292C12.4688 10.1345 12.4062 9.9835 12.2948 9.87215C12.1835 9.7608 12.0325 9.69824 11.875 9.69824H7.125C6.96753 9.69824 6.81651 9.7608 6.70516 9.87215C6.59381 9.9835 6.53125 10.1345 6.53125 10.292C6.53125 10.4495 6.59381 10.6005 6.70516 10.7118C6.81651 10.8232 6.96753 10.8857 7.125 10.8857H11.875C12.0325 10.8857 12.1835 10.8232 12.2948 10.7118C12.4062 10.6005 12.4688 10.4495 12.4688 10.292ZM12.4688 13.4587C12.4688 13.3012 12.4062 13.1502 12.2948 13.0388C12.1835 12.9275 12.0325 12.8649 11.875 12.8649H7.125C6.96753 12.8649 6.81651 12.9275 6.70516 13.0388C6.59381 13.1502 6.53125 13.3012 6.53125 13.4587C6.53125 13.6161 6.59381 13.7672 6.70516 13.8785C6.81651 13.9899 6.96753 14.0524 7.125 14.0524H11.875C12.0325 14.0524 12.1835 13.9899 12.2948 13.8785C12.4062 13.7672 12.4688 13.6161 12.4688 13.4587Z"
                                    fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M5.54183 1.78125C4.96443 1.78125 4.41068 2.01062 4.0024 2.4189C3.59412 2.82719 3.36475 3.38093 3.36475 3.95833V15.0417C3.36475 15.6191 3.59412 16.1728 4.0024 16.5811C4.41068 16.9894 4.96443 17.2188 5.54183 17.2188H13.4585C14.0359 17.2188 14.5896 16.9894 14.9979 16.5811C15.4062 16.1728 15.6356 15.6191 15.6356 15.0417V6.308C15.6356 6.00637 15.5374 5.71346 15.3553 5.47279L12.9819 2.33146C12.8528 2.16055 12.6858 2.02192 12.494 1.92645C12.3022 1.83098 12.091 1.78128 11.8767 1.78125H5.54183ZM4.55225 3.95833C4.55225 3.41208 4.99558 2.96875 5.54183 2.96875H11.2814V6.44971C11.2814 6.77746 11.5474 7.04346 11.8752 7.04346H14.4481V15.0417C14.4481 15.5879 14.0047 16.0312 13.4585 16.0312H5.54183C4.99558 16.0312 4.55225 15.5879 4.55225 15.0417V3.95833Z"
                                    fill="white" />
                            </svg>
                        </div>
                    </div>

                    <!-- Step content and buttons -->
                    <div :class="index > currentStep ? 'blur-sm opacity-50 pointer-events-auto relative' : 'relative'"
                        @click="index > currentStep && (showLockedStepPopup = true)">
                        <p class="text-[10px] font-normal px-6"
                            :class="step.completed ? 'text-[#FF5722]' : 'text-[#999999]'">
                            STEP {{ index + 1 }}
                        </p>
                        <h3 class="text-[19px] font-medium px-6 py-2">{{ step.title }}</h3>
                        <p class="text-gray-600 text-xs font-normal ml-6 mt-0">
                            {{ step.description }}
                        </p>

                        <!-- Activity Approval button -->
                        <button v-if="index === 0 && !step.completed" @click="nextStep(index)"
                            class="mt-3 h-[28px] px-3 uppercase rounded-sm text-caption font-medium text-white ml-6 bg-[#FF5722] button-animation">
                            {{ step.button }}
                        </button>

                        <!-- Get Started - Pending by Admin status -->
                        <button v-if="index === 1 && !step.completed && props.activity.workflow_state === 'Applied'"
                            disabled
                            class="mt-3 h-[28px] uppercase cursor-not-allowed px-3 rounded-sm text-caption font-medium text-white ml-6 bg-[#FF5722] button-animation">
                            Pending by Admin
                        </button>

                        <!-- Get Started - Active button -->
                        <button v-if="index === 1 && !step.completed && props.activity.workflow_state === 'Approved'"
                            @click="nextStep(index)"
                            class="mt-3 h-[28px] px-3 uppercase rounded-sm text-caption font-medium text-white ml-6 bg-[#FF5722] button-animation">
                            {{ step.button }}
                        </button>

                        <button
                            v-if="index === 2 && !step.completed && props.activity.workflow_state === 'Approved' && props.activity.completion_wf_state === 'Pending'"
                            @click="nextStep(index)"
                            class="mt-3 h-[28px] px-3 uppercase rounded-sm text-caption font-medium text-white ml-6 bg-[#FF5722] button-animation">
                            {{ step.button }}
                        </button>

                        <button
                            v-if="index === 2 && !step.completed && props.activity.workflow_state === 'Approved' && props.activity.completion_wf_state === 'Submitted'"
                            @click="nextStep(index)"
                            class="mt-3 h-[28px] uppercase  px-3 rounded-sm text-caption font-medium text-white ml-6 bg-[#FF5722] button-animation">
                            Review under Admin
                        </button>
                        <button
                            v-if="index === 3 && props.activity.workflow_state === 'Approved' && props.activity.completion_wf_state === 'Submitted'"
                            @click="nextStep(index)"
                            class="mt-3 h-[28px] px-3 uppercase rounded-sm text-caption font-medium text-white ml-6 bg-[#FF5722] button-animation">
                            {{ step.button }}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Single Popup Component -->
    <div v-if="showLockedStepPopup" class="fixed inset-0 flex items-center justify-center z-[100]">
        <div class="fixed inset-0 bg-black/50" @click="showLockedStepPopup = false"></div>
        <div class="bg-white rounded-lg p-4 relative z-[101] flex items-center gap-3 shadow-lg max-w-md mx-4">
            <AlertCircleIcon class="w-6 h-6 text-[#FF5722]" />
            <p class="text-base text-[#111111] font-normal">Finish the current step to move forward!</p>
        </div>
    </div>

    <!-- Modals -->
    <div v-if="show_Feedback" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div class="flex justify-between items-center border-b p-4">
                <h2 class="text-lg font-semibold">Share Feedback</h2>
                <button @click="show_Feedback = false"
                    class="text-gray-500 hover:text-gray-700 text-xl button-animation">
                    &times;
                </button>
            </div>
            <div class="p-4">
                <label class="block font-normal text-lg mb-2 text-[#0B0B0B]">How would you rate your
                    experience with the
                    activity?</label>
                <div class="flex justify-center gap-6 my-3">
                    <button v-for="(emoji, index) in emojis" :key="index" @click="feedback.rating = emoji.label"
                        class="text-3xl focus:outline-none transition duration-200"
                        :class="feedback.rating == emoji.label ? 'text-orange-500' : 'text-gray-400 opacity-30'">
                        {{ emoji.icon }}
                    </button>
                </div>
                <label class="block font-normal text-lg mb-2 text-[#0B0B0B]">Comments (Optional)</label>
                <textarea v-model="feedback.comments" class="w-full border rounded p-2 h-20 resize-none"></textarea>
            </div>
            <div class="p-4">
                <button @click="submit_your_feedback"
                    class="w-full bg-[#FF5722] text-white py-2 rounded font-semibold hover:bg-orange-600 button-animation">
                    SUBMIT FEEDBACK
                </button>
            </div>
        </div>
    </div>
    <!-- New Karma Points Popup -->
    <div v-if="showKarmaPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center">
            <div class="mb-6">
                <div class="w-48 h-36 mx-auto text-[#FF5722]">
                    <img src="../assets/certificate.png" alt="karma points">
                </div>
                <h2 class="text-2xl font-semibold mb-2">Congratulations!</h2>
                <p class="text-gray-600">You've earned {{ props.activity.karma_points }} karma points</p>
            </div>
            <div class="flex justify-center">
                <button v-if="props.activity.need_certificate == 'Yes'" @click="viewCertificate"
                    class="bg-[#FF5722] text-white py-2 px-6 rounded font-semibold hover:bg-orange-600 flex items-center gap-2 button-animation"
                    :disabled="isLoadingCertificate">
                    <span v-if="isLoadingCertificate"
                        class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {{ isLoadingCertificate ? 'GENERATING...' : 'VIEW CERTIFICATE' }}
                </button>
            </div>
        </div>
    </div>
    <ReqForApproval v-model="showReqForApproval" />
</template>

<script setup>
import { ref, inject, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    RefreshCw as RefreshCwIcon,
    Check as CheckIcon,
    AlertCircle as AlertCircleIcon,
} from 'lucide-vue-next';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ReqForApproval from './ReqForApproval.vue';

const currentStep = ref(0);
const show_Feedback = ref(false);
const showKarmaPopup = ref(false);
const showLockedStepPopup = ref(false);
const showReqForApproval = ref(false);
const call = inject('call');
const auth = inject('auth');
const store = inject('store');
const socket = inject('socket');
const route = useRoute();
const router = useRouter();
const feedback = ref({
    rating: null,
    comments: '',
});
const props = defineProps({
    activity: {
        type: Object,
        required: false,
        default: () => ({}),
    },
});

const steps = ref([
    {
        title: 'Opportunity Approval',
        description: 'Is your application to volunteer for the activity approved?',
        button: 'Request for Approval',
        completed: false,
    },
    {
        title: 'Get Started',
        description:
            'Click the button below once you are ready to start the activity',
        button: 'Start Opportunity',
        completed: false,
    },
    {
        title: 'Opportunity Report',
        description:
            'Click the button below once you have finished the activity & submit a small report',
        button: 'Submit Report',
        completed: false,
    },
    {
        title: 'Submit Feedback',
        description:
            'Click the button to register the feedback & collect your karma points',
        button: 'Submit Feedback',
        completed: false,
    },
]);

const nextStep = async (index) => {
    if (index > currentStep.value) {
        showLockedStepPopup.value = true;
        return;
    }

    try {
        if (index == 0) {
            const activityId = route?.params?.activity || route?.params?.name;
            if (!activityId) {
                toast.error("Activity ID not found", {
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }
            const res = await call('mykartavya.controllers.api.act_now_opp', {
                activity: activityId,
                volunteer: auth.cookie.user_id,
            });

            if (res?.status == 200) {
                props.activity.workflow_state = 'Applied';
                steps.value[index].completed = true;
                currentStep.value++;
                toast.success("Activity approval request submitted successfully", {
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else if (res?.status == 201) {
                showReqForApproval.value = true;
                return;
            } else {
                toast.error(res?.msg || "Something went wrong", {
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }
        }
        if (index == 1) {
            console.log(props.activity.completion_wf_state);

            if (props.activity.workflow_state == 'Approved' && props.activity.completion_wf_state == 'Pending') {
                // show_Feedback.value = true;
                steps.value[1].completed = true;
                currentStep.value = Math.max(currentStep.value, 2);
            } else {
                toast.error("You must complete the activity first!", {
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }
        }
        if (index == 2) {
            if (props.activity.workflow_state == 'Approved' && props.activity.completion_wf_state == 'Submitted') {
                steps.value[index].completed = true;
                currentStep.value = Math.max(currentStep.value, 4);
            } else {
                toast.error("You must complete the activity!", {
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }
        }
        if (index == 3) {
            show_Feedback.value = true;
            steps.value[index].completed = true;
            currentStep.value = Math.max(currentStep.value, 4);
        }

    } catch (error) {
        console.error(error);
        toast.error("Something went wrong", {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
};
const submit_your_feedback = async () => {
    if (!feedback.value.rating) {
        toast.error("Please select a rating", {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
        return
    }

    let res = await call('mykartavya.controllers.api.submit_feedbacks', {
        name: props.activity.name,
        volunteer: auth.cookie.user_id,
        rating: feedback.value.rating,
        comments: feedback.value.comments,
    })

    if (res.rating) {
        show_Feedback.value = false
        showKarmaPopup.value = true
        steps.value[3].completed = true

        // Auto close popup if no certificate needed
        if (props.activity.need_certificate !== 'Yes') {
            setTimeout(() => {
                showKarmaPopup.value = false
            }, 3000)
        }
    }
}

const isLoadingCertificate = ref(false);

const viewCertificate = async () => {
    isLoadingCertificate.value = true;
    if (!props) {
        throw new Error('Activity ID not found');
    }
    let res = await call('mykartavya.controllers.api.view_certificate_opp', {
        opportunity: props.activity.activity
    })
    console.log(res, " certificate");

    if (res) {
        isLoadingCertificate.value = false;
        toast.success('Certificate visible in your profile after few minutes', {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
        showKarmaPopup.value = false
        setTimeout(() => {
            router.push('/profile')
        }, 3000)
    }
}

const emojis = ref([
    { icon: '😞', label: 0.2 },
    { icon: '😐', label: 0.4 },
    { icon: '😊', label: 0.6 },
    { icon: '🙂', label: 0.8 },
    { icon: '😀', label: 1 },
]);

watch(() => props.activity, (newVal, oldVal) => {
    if (!newVal) return;

    // Reset steps first
    steps.value.forEach(step => step.completed = false);
    currentStep.value = 0;

    if (newVal.workflow_state === 'Applied') {
        steps.value[0].completed = true;
        currentStep.value = 1;
    } else if (newVal.workflow_state === 'Approved') {
        steps.value[0].completed = true;
        steps.value[1].completed = true;

        if (newVal.completion_wf_state === 'Pending') {
            currentStep.value = 2;
        } else if (newVal.completion_wf_state === 'Submitted') {
            steps.value[2].completed = true;
            currentStep.value = 3;
        } else if (newVal.completion_wf_state === 'Approved') {
            steps.value[2].completed = true;
            if (newVal.rating && newVal.rating > 0) {
                steps.value[3].completed = true;
                currentStep.value = 4;
            } else {
                currentStep.value = 3;
            }
        }
    }
}, { immediate: true, deep: true });

watch(() => showKarmaPopup.value, (newValue) => {
    if (newValue && props.activity.need_certificate == 'No') {
        setTimeout(() => {
            showKarmaPopup.value = false;
        }, 3000);
    }
});
</script>

<style scoped>
.button-animation {
    transition: all 0.2s ease-in-out;
}

.button-animation:hover {
    transform: translateY(-2px);
}

.button-animation:active {
    transform: translateY(0);
}
</style>