<template>
  <div>
    <div class="bg-white rounded-lg">
      <div class="bg-white p-6 rounded-lg w-full relative">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-heading4 font-medium">Timeline</h2>
          <button @click="store.refresh_step = true"
            class="text-pink-500 flex items-center text-base font-normal w-[107px] justify-center h-8 rounded-sm border">
            Refresh
            <RefreshCwIcon class="w-4 h-4 ml-1" />
          </button>
        </div>
        <div class="relative border-gray-300 pl-3">
          <div v-for="(step, index) in steps" :key="index" class="mb-6 relative">
            <div class="absolute left-0 top-0 h-full w-[1px]" :class="[
              step.completed ? 'bg-[#22C55E]' : 'bg-[#E5E7EB]',
              index > currentStep ? 'blur-sm opacity-50' : ''
            ]">
            </div>

            <div class="absolute -left-4 w-7 h-7 min-w-7 max-h-7 rounded-full flex items-center justify-center" :class="[
              step.completed ? 'border-green-500 bg-white border-2 text-green-600' : 'bg-[#FF5722] text-white',
              index > currentStep ? 'blur-sm opacity-50' : ''
            ]">
              <CheckIcon v-if="step.completed" class="w-4 h-4" />
              <div v-else>
                <!-- Activity Approval Icon -->
                <div v-if="step.title == 'Activity Approval'" class="w-4 h-4 flex items-center justify-center">
                  <img src="../assets/Frame (3).png" alt="" class="w-4 h-4" />
                </div>

                <!-- Get Started Icon -->
                <div v-if="step.title == 'Get Started'" class="w-4 h-4 flex items-center justify-center">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.4688 10.292C12.4688 10.1345 12.4062 9.9835 12.2948 9.87215C12.1835 9.7608 12.0325 9.69824 11.875 9.69824H7.125C6.96753 9.69824 6.81651 9.7608 6.70516 9.87215C6.59381 9.9835 6.53125 10.1345 6.53125 10.292C6.53125 10.4495 6.59381 10.6005 6.70516 10.7118C6.81651 10.8232 6.96753 10.8857 7.125 10.8857H11.875C12.0325 10.8857 12.1835 10.8232 12.2948 10.7118C12.4062 10.6005 12.4688 10.4495 12.4688 10.292ZM12.4688 13.4587C12.4688 13.3012 12.4062 13.1502 12.2948 13.0388C12.1835 12.9275 12.0325 12.8649 11.875 12.8649H7.125C6.96753 12.8649 6.81651 12.9275 6.70516 13.0388C6.59381 13.1502 6.53125 13.3012 6.53125 13.4587C6.53125 13.6161 6.59381 13.7672 6.70516 13.8785C6.81651 13.9899 6.96753 14.0524 7.125 14.0524H11.875C12.0325 14.0524 12.1835 13.9899 12.2948 13.8785C12.4062 13.7672 12.4688 13.6161 12.4688 13.4587Z"
                      fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5.54183 1.78125C4.96443 1.78125 4.41068 2.01062 4.0024 2.4189C3.59412 2.82719 3.36475 3.38093 3.36475 3.95833V15.0417C3.36475 15.6191 3.59412 16.1728 4.0024 16.5811C4.41068 16.9894 4.96443 17.2188 5.54183 17.2188H13.4585C14.0359 17.2188 14.5896 16.9894 14.9979 16.5811C15.4062 16.1728 15.6356 15.6191 15.6356 15.0417V6.308C15.6356 6.00637 15.5374 5.71346 15.3553 5.47279L12.9819 2.33146C12.8528 2.16055 12.6858 2.02192 12.494 1.92645C12.3022 1.83098 12.091 1.78128 11.8767 1.78125H5.54183ZM4.55225 3.95833C4.55225 3.41208 4.99558 2.96875 5.54183 2.96875H11.2814V6.44971C11.2814 6.77746 11.5474 7.04346 11.8752 7.04346H14.4481V15.0417C14.4481 15.5879 14.0047 16.0312 13.4585 16.0312H5.54183C4.99558 16.0312 4.55225 15.5879 4.55225 15.0417V3.95833Z"
                      fill="white" />
                  </svg>
                </div>

                <!-- Activity Report Icon -->
                <div v-if="step.title == 'Activity Report'" class="w-4 h-4 flex items-center justify-center">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.3927 6.36444L14.7592 5.9971C15.0511 5.70515 15.4469 5.54109 15.8598 5.54102C16.2726 5.54094 16.6685 5.70486 16.9605 5.99671C17.2524 6.28856 17.4165 6.68443 17.4165 7.09724C17.4166 7.51005 17.2527 7.90598 16.9608 8.19794L16.5943 8.56527M14.3927 6.36444C14.3927 6.36444 14.4386 7.14344 15.1266 7.83139C15.8145 8.51935 16.5943 8.56527 16.5943 8.56527M14.3927 6.36444L11.0202 9.73694C10.7906 9.96494 10.6766 10.0797 10.5784 10.2056C10.4623 10.3544 10.3636 10.5144 10.2823 10.6854C10.2135 10.8294 10.1628 10.9822 10.0607 11.2886L9.73372 12.2703L9.62764 12.5877M16.5943 8.56527L13.2218 11.9378C12.9922 12.1674 12.8782 12.2814 12.7523 12.3795C12.6035 12.4956 12.4436 12.5943 12.2726 12.6756C12.1285 12.7445 11.9757 12.7951 11.6693 12.8973L10.6877 13.2242L10.3702 13.3303M9.62764 12.5877L9.52235 12.906C9.49782 12.9798 9.49433 13.0591 9.51226 13.1348C9.53019 13.2106 9.56883 13.2798 9.62387 13.3349C9.67891 13.3899 9.74817 13.4286 9.82391 13.4465C9.89966 13.4644 9.97889 13.4609 10.0528 13.4364L10.3702 13.3303M9.62764 12.5877L10.3702 13.3303"
                      stroke="white" />
                    <path
                      d="M6.33333 10.2913H8.3125M6.33333 7.12467H11.4792M6.33333 13.458H7.52083M15.6972 2.51084C14.7701 1.58301 13.277 1.58301 10.2917 1.58301H8.70833C5.72296 1.58301 4.22987 1.58301 3.30283 2.51084C2.37579 3.43867 2.375 4.93097 2.375 7.91634V11.083C2.375 14.0684 2.375 15.5615 3.30283 16.4885C4.23067 17.4155 5.72296 17.4163 8.70833 17.4163H10.2917C13.277 17.4163 14.7701 17.4163 15.6972 16.4885C16.4445 15.742 16.5894 14.6297 16.6179 12.6663"
                      stroke="white" stroke-linecap="round" />
                  </svg>
                </div>

                <!-- Feedback Icon -->
                <div v-if="step.title == 'Feedback & Karma Points'" class="w-4 h-4 flex items-center justify-center">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.21125 6.98373C6.54929 6.17069 7.70037 6.17069 8.03842 6.98373L8.9995 9.29461L11.494 9.49411C12.3712 9.56536 12.7275 10.6594 12.0585 11.2318L10.1585 12.8603L10.7388 15.2947C10.943 16.1504 10.012 16.8273 9.26075 16.3689L7.12483 15.0643L4.98892 16.3689C4.23762 16.8281 3.30662 16.1504 3.51087 15.2947L4.09117 12.8603L2.19117 11.2318C1.52221 10.6594 1.87846 9.56457 2.75562 9.49411L5.24937 9.29461L6.21125 6.98373ZM7.12483 7.87911L6.29992 9.86223C6.23004 10.0303 6.11518 10.1758 5.96797 10.2828C5.82076 10.3897 5.64689 10.4541 5.4655 10.4687L3.32483 10.6397L4.95567 12.0369C5.2375 12.2784 5.361 12.6576 5.27471 13.0186L4.77596 15.107L6.60866 13.9876C6.76407 13.8926 6.94268 13.8423 7.12483 13.8423C7.30698 13.8423 7.48559 13.8926 7.641 13.9876L9.47371 15.107L8.97496 13.0186C8.93265 12.8415 8.94005 12.6561 8.99635 12.4829C9.05264 12.3097 9.15564 12.1554 9.294 12.0369L10.9248 10.6397L8.78417 10.4687C8.60277 10.4541 8.42891 10.3897 8.2817 10.2828C8.13449 10.1758 8.01963 10.0303 7.94975 9.86223L7.12483 7.87911ZM10.3525 2.30973C10.6224 1.65978 11.5439 1.65978 11.8139 2.30973L12.1939 3.22173L13.1779 3.3009C13.8793 3.35632 14.1643 4.23269 13.6292 4.69107L12.8795 5.33311L13.109 6.29419C13.2721 6.97898 12.5272 7.52048 11.9263 7.15315L11.0832 6.63857L10.24 7.15315C9.63917 7.52048 8.89421 6.97898 9.05729 6.29419L9.28687 5.33311L8.53717 4.69107C8.002 4.23269 8.28621 3.35711 8.98842 3.30011L9.97325 3.22094L10.3525 2.30973ZM11.4624 3.52573L11.0832 2.61373L10.7032 3.52573C10.6474 3.66005 10.5556 3.7764 10.438 3.86201C10.3204 3.94762 10.1816 3.99918 10.0366 4.01103L9.05175 4.09019L9.80146 4.73144C9.91223 4.82613 9.99472 4.94955 10.0398 5.08812C10.085 5.22669 10.091 5.37502 10.0572 5.51678L9.82758 6.47786L10.6707 5.96328C10.7949 5.88746 10.9376 5.84734 11.0832 5.84734C11.2287 5.84734 11.3714 5.88746 11.4956 5.96328L12.3387 6.47786L12.1092 5.51678C12.0755 5.37514 12.0816 5.22697 12.1267 5.08856C12.1718 4.95014 12.2542 4.82685 12.3649 4.73223L13.1146 4.0894L12.1305 4.01023C11.9854 3.99874 11.8462 3.94742 11.7283 3.86195C11.6104 3.77647 11.5184 3.66013 11.4624 3.52573ZM14.6829 7.89257C14.7147 7.82435 14.7654 7.76663 14.8289 7.7262C14.8925 7.68576 14.9662 7.66428 15.0415 7.66428C15.1168 7.66428 15.1905 7.68576 15.2541 7.7262C15.3176 7.76663 15.3683 7.82435 15.4001 7.89257L15.7366 8.61298C15.7757 8.69726 15.8433 8.76508 15.9274 8.80457L16.6478 9.14103C16.716 9.1729 16.7737 9.22357 16.8142 9.28709C16.8546 9.35061 16.8761 9.42435 16.8761 9.49965C16.8761 9.57495 16.8546 9.64869 16.8142 9.71221C16.7737 9.77573 16.716 9.8264 16.6478 9.85828L15.9274 10.1947C15.8434 10.234 15.7759 10.3015 15.7366 10.3855L15.4001 11.1059C15.3683 11.1742 15.3176 11.2319 15.2541 11.2723C15.1905 11.3128 15.1168 11.3342 15.0415 11.3342C14.9662 11.3342 14.8925 11.3128 14.8289 11.2723C14.7654 11.2319 14.7147 11.1742 14.6829 11.1059L14.3464 10.3855C14.3071 10.3015 14.2396 10.234 14.1556 10.1947L13.4352 9.85828C13.367 9.8264 13.3093 9.77573 13.2688 9.71221C13.2284 9.64869 13.2069 9.57495 13.2069 9.49965C13.2069 9.42435 13.2284 9.35061 13.2688 9.28709C13.3093 9.22357 13.367 9.1729 13.4352 9.14103L14.1556 8.80457C14.2396 8.76528 14.3071 8.69775 14.3464 8.61378L14.6829 7.89257Z"
                      fill="white" />
                  </svg>
                </div>
              </div>
            </div>

            <div :class="index > currentStep ? 'blur-sm opacity-50 pointer-events-auto relative' : 'relative'"
              @click="index > currentStep && (showLockedStepPopup = true)">
              <p class="text-[10px] font-normal px-6" :class="step.completed ? 'text-[#FF5722]' : 'text-[#999999]'">
                STEP {{ index + 1 }}
              </p>
              <h3 class="text-[19px] font-medium px-6 py-2">{{ step.title }}</h3>
              <p class="text-gray-600 text-xs font-normal ml-6 mt-0">
                {{ step.description }}
              </p>
              <button
                v-if="!step.completed && !(['Get Started', 'Activity Report'].includes(step.title) && (activity.workflow_state == 'Applied' || activity.completion_wf_state == 'Submitted'))"
                @click="nextStep(index)"
                class="mt-3 h-[28px] px-3 uppercase rounded-sm text-caption font-medium text-white ml-6 bg-[#FF5722]">
                {{ step.button }}
              </button>
              <button disabled
                v-if="!step.completed && ['Get Started'].includes(step.title) && ['Applied'].includes(activity.workflow_state)"
                @click="nextStep(index)"
                class="mt-3 h-[28px] uppercase cursor-not-allowed px-3 rounded-sm text-caption font-medium text-white ml-6 bg-[#FF5722]">
                {{ step.title == 'Get Started' ? 'Pending by Admin' : 'Review under Admin' }}
              </button>
              <button disabled
                v-if="!step.completed && ['Activity Report'].includes(step.title) && (['Approved'].includes(activity.workflow_state) && activity.completion_wf_state == 'Submitted')"
                @click="nextStep(index)"
                class="mt-2 h-[28px] uppercase cursor-not-allowed px-3 rounded-sm text-caption font-medium text-white ml-2 bg-[#FF5722]">
                {{ step.title == 'Get Started' ? 'Pending by Admin' : 'Review under Admin' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Single Popup Component -->
        <div v-if="showLockedStepPopup" class="fixed inset-0 flex items-center justify-center z-[100]">
          <div class="fixed inset-0 bg-black/50" @click="showLockedStepPopup = false"></div>
          <div class="bg-white rounded-lg p-4 relative z-[101] flex items-center gap-3 shadow-lg max-w-md mx-4">
            <img src="" alt="chat star" class="w-6 h-6" />
            <p class="text-base text-[#111111] font-normal">Finish the current step to move forward!</p>
          </div>
        </div>

        <!-- Modals -->
        <div v-if="show_Feedback" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div class="flex justify-between items-center border-b p-4">
              <h2 class="text-lg font-semibold">Share Feedback</h2>
              <button @click="show_Feedback = false" class="text-gray-500 hover:text-gray-700 text-xl">
                &times;
              </button>
            </div>
            <div class="p-4">
              <label class="block font-normal text-lg mb-2 text-[#0B0B0B]">How would you rate your experience with the
                activity?</label>
              <div class="flex justify-center gap-6 my-3">
                <button v-for="(emoji, index) in emojis" :key="index" @click="feedback.rating = emoji.label"
                  class="text-3xl focus:outline-none transition duration-200"
                  :class="feedback.rating === emoji.label ? 'text-orange-500' : 'text-gray-400 opacity-30'">
                  {{ emoji.icon }}
                </button>
              </div>
              <label class="block font-normal text-lg mb-2 text-[#0B0B0B]">Comments (Optional)</label>
              <textarea v-model="feedback.comments" class="w-full border rounded p-2 h-20 resize-none"></textarea>
            </div>
            <div class="p-4">
              <button @click="submit_your_feedback"
                class="w-full bg-[#FF5722] text-white py-2 rounded font-semibold hover:bg-orange-600">
                SUBMIT FEEDBACK
              </button>
            </div>
          </div>
        </div>

        <div v-if="activityReportPopup"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg p-6 w-[500px]">
            <div class="flex justify-between items-center border-b pb-2 mb-4">
              <h2 class="text-lg font-semibold">Activity Completion</h2>
              <button @click="activityReportPopup = false" class="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div class="mb-6">
              <label class="block font-normal text-lg text-[#0B0B0B] pb-3">How much time you donated while working on
                the activity?</label>
              <div class="relative">
                <div class="flex gap-2">
                  <div class="flex gap-2 items-center relative">
                    <label class="text-base font-normal">Hours</label>
                    <input type="number" v-model="activity_log.hours" class="w-24 border rounded-sm px-2 h-8"
                      @input="activity_log.hours = Math.max(0, activity_log.hours)" />
                    <FeatherIcon class="absolute right-2 top-2 size-4" name="clock" />
                  </div>
                  <div class="flex gap-2 items-center relative">
                    <label class="text-base font-normal">Minutes</label>
                    <input type="number" v-model="activity_log.minutes"
                      @input="activity_log.minutes = Math.max(0, activity_log.minutes)"
                      class="w-24 border rounded-sm px-2 h-8" />
                    <FeatherIcon class="absolute right-2 top-2 size-4" name="clock" />
                  </div>
                </div>
                <p class="text-red-500 absolute text-xs -bottom-5" v-if="activity_err.time">Donation time cannot be 0.
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
              <div class="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center relative">
                <input type="file" multiple @change="uploadFiles"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div class="flex flex-col items-center text-gray-500">
                  <svg width="70" height="60" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Upload icon SVG path -->
                  </svg>
                  <p class="mt-2 text-lg font-normal">
                    Drag & drop files or
                    <span class="text-[#FF5722] cursor-pointer">Browse</span>
                  </p>
                  <p class="text-xs font-normal pt-2 text-[#999999]">Supported formats: JPEG, PNG</p>
                </div>
              </div>
              <p class="text-red-500 absolute text-xs -bottom-2" v-if="activity_err.image">
                Image upload is required. Please upload an image to continue.
              </p>
              <div class="flex gap-2 mt-3">
                <img v-for="(image, index) in uploadedImages" :key="index" :src="image.preview" alt="img"
                  class="w-16 h-16 rounded object-cover" />
              </div>
            </div>
            <div class="flex justify-end">
              <button @click="submitReport"
                class="bg-[#FF5722] flex items-center justify-center text-white h-[38px] text-base w-48 rounded-sm text-center font-medium hover:bg-orange-600">
                <p>MARK AS COMPLETE</p>
                <div class="h-5 w-5" v-if="loading">
                  <div
                    class="animate-spin h-full w-full rounded-full border-[2px] flex justify-center items-center border-dotted border-[#fff]">
                    <div class="w-3 h-3 rounded-full border-dashed border-[1px] border-[#fff]"></div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <ReqForApproval />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
import { FeatherIcon } from 'frappe-ui'
import {
  RefreshCw as RefreshCwIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
} from 'lucide-vue-next'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import ReqForApproval from './ReqForApproval.vue'

const currentStep = ref(0)
const show_Feedback = ref(false)
const showCertificate = ref(false)
const activityReportPopup = ref(false)
const feedbackPointsPopup = ref(false)
const showLockedStepPopup = ref(false)
const call = inject('call')
const auth = inject('auth')
const store = inject('store')
const socket = inject('socket')
const route = useRoute()
const feedback = ref({
  rating: null,
  comments: '',
})
let props = defineProps({
  activity: {
    type: Object,
    required: false,
    default: () => ({}),
  },
})
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
const uploadedImages = ref([])
const loading = ref(false)
const refresh = ref(false)
const steps = ref([
  {
    title: 'Activity Approval',
    description: 'Is your application to volunteer for the activity approved?',
    button: 'Request for Approval',
    completed: false,
  },
  {
    title: 'Get Started',
    description:
      'Click the button below once you are ready to start the activity',
    button: 'Start Activity',
    completed: false,
  },
  {
    title: 'Activity Report',
    description:
      'Click the button below once you have finished the activity & submit a small report',
    button: 'Submit Report',
    completed: false,
  },
  {
    title: 'Feedback & Karma Points',
    description:
      'Click the button to register the feedback & collect your karma points',
    button: 'Submit Feedback',
    completed: false,
  },
])
const nextStep = async (index) => {
  if (index > currentStep.value) {
    showLockedStepPopup.value = true
    return
  }

  if (index === 0) {
    let res = await call('mykartavya.controllers.api.act_now', {
      activity: route.params.name,
      volunteer: auth.cookie.user_id
    })
    if (res.status == 200) {
      props.activity.workflow_state = 'Applied'
      steps.value[index].completed = true
      currentStep.value++
    } else if (res.status == 201) {
      store.req_for_approavl = true
    } else {
      return
    }
  }
  if (index === 3) {
    show_Feedback.value = true
  }
  if (index === 2) {
    activityReportPopup.value = true
  }
}
const req_field = () => {
  let hasError = false;
  activity_err.value = { time: false, progress: false, image: false };

  if (activity_log.value.hours === 0 && activity_log.value.minutes === 0) {
    activity_err.value.time = true;
    hasError = true;
  }
  if (activity_log.value.progress == props.activity.com_percent) {
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

  activityReportPopup.value = false;
  loading.value = true;

  if (props.activity.completion_wf_state == "Submitted") {
    steps.value[2].completed = true;
    currentStep.value++;
  }

  try {
    let res = await call("mykartavya.controllers.api.submit_activity_report", {
      name: props.activity.name,
      data: {
        duration: activity_log.value.hours * 3600 + activity_log.value.minutes * 60,
        percent: activity_log.value.progress - props.activity.com_percent,
        images: uploadedImages.value,
      },
    });

    if (res) {
      activity_log.value.progress = res.com_percent;
      toast.success("Activity report submitted successfully");
      loading.value = false;
      activity_log.value = {
        hours: 0,
        minutes: 0,
        progress: 0,
      };
      store.refresh_step = true;
    }
  } catch (error) {
    loading.value = false;
    toast.error("Something went wrong");
  }
};


const submit_your_feedback = async () => {
  let res = await call('mykartavya.controllers.api.submit_feedback', {
    name: props.activity.name,
    volunteer: auth.cookie.user_id,
    rating: feedback.value.rating,
    comments: feedback.value.comments,
  })
  if (res.rating) {
    show_Feedback.value = false
    showCertificate.value = true
    steps.value[3].completed = true
  }

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
const emojis = ref([
  { icon: '😞', label: 0.2 },
  { icon: '😐', label: 0.4 },
  { icon: '😊', label: 0.6 },
  { icon: '🙂', label: 0.8 },
  { icon: '🙂', label: 1 },
])

watch(() => props.activity, (newVal, oldVal) => {
  if (newVal.com_percent) {
    activity_log.value.progress = newVal.com_percent
  }
  if (newVal.is_assigned) {
    if (newVal.workflow_state == 'Applied') {
      steps.value[0].completed = true
      currentStep.value = 1
    } else if (newVal.workflow_state == 'Approved' && newVal.completion_wf_state == 'Pending') {
      steps.value[0].completed = true
      steps.value[1].completed = true
      currentStep.value = 2
    } else if (newVal.workflow_state == 'Approved' && ['Submitted', 'Approved'].includes(newVal.completion_wf_state) && !(newVal.rating != null && newVal.rating != 0)) {
      steps.value[0].completed = true
      if (newVal.completion_wf_state == 'Submitted') {
        steps.value[1].completed = true
        currentStep.value = 2
      } else {
        steps.value[1].completed = true
        steps.value[2].completed = true
        currentStep.value = 3
      }
    } else if ((newVal.rating != null && newVal.rating != 0) && newVal.completion_wf_state == 'Approved') {
      steps.value[0].completed = true
      steps.value[1].completed = true
      steps.value[2].completed = true
      steps.value[3].completed = true
      currentStep.value = 4
    }
  }
}, { immediate: true, deep: true })
watch(() => activity_log.value.progress, (newVal, oldVal) => {
  if (props.activity.com_percent <= newVal) {
    return
  } else {
    activity_log.value.progress = props.activity.com_percent
  }
})
</script>
<style scoped>
.border-l {
  border-color: #E5E7EB;
}

.step-button {
  background-color: #FF5722;
  height: 28px;
  font-size: 12px;
  text-transform: uppercase;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>