<template>
  <div>
    <div class="bg-white rounded-lg">
      <div class="bg-white p-6 rounded-lg w-full relative">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-heading4 font-medium">Timeline</h2>
          <button @click="store.refresh_step = true"
            class="text-pink-500 flex items-center text-bodyh2 font-normal px-4 py-1 rounded-sm border">
            Refresh
            <RefreshCwIcon class="w-4 h-4 ml-1" />
          </button>
        </div>
        <div class="relative border-gray-300 pl-6">
          <div v-for="(step, index) in steps" :key="index" class="mb-6 relative border-l">
            <div class="absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center" :class="step.completed
              ? 'bg-green-500 text-white'
              : 'bg-orange-500 text-white '
              ">
              <CheckIcon v-if="step.completed" class="w-4 h-4" />
              <img src="..//assets/Frame (3).png" v-else alt="" class="w-4 h-4" />
            </div>
            <div :class="index > currentStep
              ? 'blur-sm opacity-50 pointer-events-none '
              : ''
              ">
              <p class="text-sm font-semibold text-gray-900 m-4">
                STEP {{ index + 1 }}
              </p>
              <h3 class="text-lg font-semibold m-4">{{ step.title }}</h3>
              <p class="text-gray-600 text-sm ml-4 mt-0">
                {{ step.description }}
              </p>
              <button
                v-if="!step.completed && !(['Get Started', 'Activity Report'].includes(step.title) && (activity.workflow_state == 'Applied' || activity.completion_wf_state == 'Submitted'))"
                @click="nextStep(index)"
                class="mt-2 h-[28px] w-[147px] rounded-sm text-caption font-medium text-white ml-2" :class="index === steps.length - 1 ? 'bg-orange-500' : 'bg-orange-500'
                  ">
                {{ step.button }}
              </button>
              <button disabled
                v-if="!step.completed && ['Get Started'].includes(step.title) && ['Applied'].includes(activity.workflow_state)"
                @click="nextStep(index)"
                class="mt-2 h-[28px] cursor-not-allowed w-[147px] rounded-sm text-caption font-medium text-white ml-2"
                :class="index === steps.length - 1 ? 'bg-orange-500' : 'bg-orange-500'
                  ">{{ step.title == 'Get Started' ? 'Pending by Admin' : 'Review under Admin' }}
              </button>
              <button disabled
                v-if="!step.completed && ['Activity Report'].includes(step.title) && (['Approved'].includes(activity.workflow_state) && activity.completion_wf_state == 'Submitted')"
                @click="nextStep(index)"
                class="mt-2 h-[28px] cursor-not-allowed w-[147px] rounded-sm text-caption font-medium text-white ml-2"
                :class="index === steps.length - 1 ? 'bg-orange-500' : 'bg-orange-500'
                  ">{{ step.title == 'Get Started' ? 'Pending by Admin' : 'Review under Admin' }}
              </button>
            </div>
          </div>
        </div>
        <!-- Activity modal for step start -->
        <!-- <div v-if="showCertificate" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            class="w-[384px] h-[296px] bg-white rounded-[12px] flex flex-col justify-end items-center py-[20px] gap-[21px] font-poppins">
            <div>
              <div class="flex justify-center relative pb-6">
                <img src="../assets/karmapointinside.png" alt="" />

                <div class="flex justify-center absolute bottom-1.5">
                  <img src="../assets/karmapoint.png" alt="" />
                </div>
              </div>
              <h2 class="font-[500] text-[#0B0B0B] text-[23px]">
                You’ve earn 50 karma points
              </h2>
            </div>
            <button @click="showCertificate = false"
              class="py-[10.5px] px-[22px] rounded-[4px] text-[14px] border border-[#FF5722] text-[#666666]">
              View Certificate
            </button>
          </div>
        </div> -->

        <div v-if="show_Feedback" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
            <!-- Modal Header -->
            <div class="flex justify-between items-center border-b p-4">
              <h2 class="text-lg font-semibold">Share Feedback</h2>
              <button @click="; (show_Feedback = false)((steps[3].completed = false))"
                class="text-gray-500 hover:text-gray-700 text-xl">
                &times;
              </button>
            </div>
            <!-- Modal Content -->
            <div class="p-4">
              <label class="block font-medium mb-2 text-gray-700">How would you rate your experience with the
                activity?</label>
              <div class="flex justify-center gap-6 my-3">
                <button v-for="(emoji, index) in emojis" :key="index" @click="feedback.rating = emoji.label"
                  class="text-3xl focus:outline-none transition duration-200" :class="feedback.rating === emoji.label
                    ? 'text-orange-500'
                    : 'text-gray-400 opacity-30'
                    ">
                  {{ emoji.icon }}
                </button>
              </div>
              <label class="block font-medium mb-2 text-gray-700">Comments (Optional)</label>
              <textarea v-model="feedback.comments" class="w-full border rounded p-2 h-20 resize-none"></textarea>
            </div>
            <!-- Submit Button -->
            <div class="p-4">
              <button @click="submit_your_feedback"
                class="w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600">
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
            <div class="mb-4">
              <label class="block font-medium mb-1">How much time you donated while working on the activity?</label>
              <div class="flex gap-2">
                <div class="flex gap-2 items-center">
                  <label for="" class="text-base font-normal">Hours</label>
                  <input type="number" v-model="activity_log.hours" class="w-24 border rounded px-2 h-8"
                    @input="activity_log.hours = Math.max(0, activity_log.hours)" />

                </div>
                <div class="flex gap-2 items-center">
                  <label for="" class="text-base font-normal">Minutes</label>
                  <input type="number" v-model="activity_log.minutes" @input="
                    activity_log.minutes = Math.max(0, activity_log.minutes)"
                     class="w-24 border rounded px-2 h-8" />
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-lg font-normal mb-1">How much percent work has completed?</label>
              <div class="flex items-center gap-2">
                <input type="range" min="0" max="100" v-model="activity_log.progress"
                  class="w-full h-[6px] accent-green-500" />
                <span
                  class="h-8 w-16 flex items-center justify-center border rounded-sm text-base font-normal text-center">{{
                    activity_log.progress }}%</span>
              </div>
            </div>
            <div class="mb-4">
              <label class="block font-medium mb-2">Upload Media</label>
              <div class="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center relative">
                <input type="file" multiple @change="uploadFiles"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div class="flex flex-col items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V3m0 0l-3.5 3.5M12 3l3.5 3.5" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6 14.25v4.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-4.5" />
                  </svg>
                  <p class="mt-2">
                    Drag & drop files or
                    <span class="text-orange-500 cursor-pointer">Browse</span>
                  </p>
                  <p class="text-sm">Supported formats: JPEG, PNG</p>
                </div>
              </div>
              <div class="flex gap-2 mt-3">
                <img v-for="(image, index) in uploadedImages" :key="index" :src="image.preview" alt="img"
                  class="w-16 h-16 rounded object-cover" />
              </div>
            </div>
            <div class="flex justify-end">
              <button @click="submitReport"
                class="bg-orange-500 flex items-center justify-center text-white h-[38px] text-base w-48 rounded-sm text-center font-medium hover:bg-orange-600">
                <p> MARK AS COMPLETE</p>
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
        <!-- Popup Modal for Activity Report -->
        <div v-if="feedbackPointsPopup"
          class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-lg font-semibold mb-4">
              Submit Your Activity Report
            </h3>
            feedbackPointsPopup
            <p class="text-gray-600">
              Please upload a summary of your activity.
            </p>
            <textarea class="border rounded w-full p-2 mt-2" rows="4"
              placeholder="Write your report here..."></textarea>
            <div class="flex justify-end mt-4">
              <!-- <button @click="activityReportPopup = false" class="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button> -->
              <button @click="submitFeedback" class="px-4 py-2 bg-orange-500 text-white rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
        <!-- Activity modal for step end -->

        <!-- Popup Modal for Step Restriction -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  RefreshCw as RefreshCwIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
} from 'lucide-vue-next'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const currentStep = ref(0)
const show_Feedback = ref(false)
const showCertificate = ref(false)
const activityReportPopup = ref(false)
const feedbackPointsPopup = ref(false)
const call = inject('call')
const auth = inject('auth')
const store = inject('store')
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
  // images: [],
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
  if (index === 0) {
    let res = await call('mykartavya.controllers.api.act_now', {
      activity: route.params.name,
      volunteer: auth.cookie.user_id
    })
    if (res) {
      props.activity.workflow_state = 'Applied'
      steps.value[index].completed = true
      currentStep.value++
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
const submitReport = async () => {
  activityReportPopup.value = false
  loading.value = true
  if (props.activity.completion_wf_state == 'Submitted') {
    steps.value[2].completed = true
    currentStep.value++
  }
  try {
    let res = await call('mykartavya.controllers.api.submit_activity_report', {
      name: props.activity.name,
      data: {
        duration: ((activity_log.value.hours * 60) * 60 + activity_log.value.minutes * 60),
        percent: (activity_log.value.progress - props.activity.com_percent),
        images:uploadedImages.value
      }
    })
    if (res) {
      activity_log.value.progress = res.com_percent
      toast.success('Activity report submitted successfully')
      loading.value = false,
      activity_log.value = {
        hours: 0,
        minutes: 0,
        progress: 0

    }
    store.refresh_step = true
  }
  } catch (error) {
    loading.value = false
    toast.error('Something went wrong')
  }
}
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
        console.log(file, 'file');
        
        uploadedImages.value.push({ file:file, preview: reader.result })
        console.log(uploadedImages.value, 'uploadedImages');
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
  // 
  if (newVal.is_assigned) {
    if (newVal.workflow_state == 'Applied') {
      steps.value[0].completed = true
      currentStep.value++
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
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide number input arrows in Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>