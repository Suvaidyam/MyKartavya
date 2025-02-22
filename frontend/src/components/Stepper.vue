<template>
    <div>
           <div class="bg-white  rounded-lg   ">
    
   <div class="bg-white p-6 rounded-lg w-full relative">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-heading4 font-medium">Timeline</h2>
                            <button @click="resetSteps" class="text-pink-500 flex items-center text-bodyh2 font-normal px-4 py-1 rounded-sm border">
                                Refresh
                                <RefreshCwIcon class="w-4 h-4 ml-1" />
                            </button>
                        </div>

                        <div class="relative border-l-2 border-gray-300 pl-6">
                            <div v-for="(step, index) in steps" :key="index" class="mb-6 relative">
                                <div class="absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center"
                                    :class="step.completed ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'">
                                    <CheckIcon v-if="step.completed" class="w-4 h-4" />
                                    <AlertCircleIcon v-else class="w-4 h-4" />
                                </div>
                                <div :class="index > currentStep ? 'blur-sm opacity-50 pointer-events-none ' : ''">
                                    <p class="text-sm font-semibold text-gray-900 m-4">STEP {{ index + 1 }}</p>
                                    <h3 class="text-lg font-semibold m-4">{{ step.title }}</h3>
                                    <p class="text-gray-600 text-sm m-4">{{ step.description }}</p>

                                    <button v-if="step.button" @click="nextStep(index)"
                                        class="mt-2 h-[28px] w-[147px] rounded-sm text-button font-medium text-white"
                                        :class="index === steps.length - 1 ? 'bg-orange-500' : 'bg-orange-500'">
                                        {{ step.button }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Popup Modal -->
                        <div v-if="showPopup"
                            class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div class="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                                <AlertCircleIcon class="w-10 h-10 text-orange-500 mb-2" />
                                <p class="text-gray-700 font-semibold">Finish the current step to move forward!</p>
                                <button @click="showPopup = false"
                                    class="mt-3 px-4 py-2 bg-orange-500 text-white rounded">OK</button>
                            </div>
                        </div>
                    </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { RefreshCw as RefreshCwIcon, Check as CheckIcon, AlertCircle as AlertCircleIcon } from 'lucide-vue-next';
const currentStep = ref(0);
const showPopup = ref(false);

const steps = ref([
  {
    title: 'Activity Approval',
    description: 'Is your application to volunteer for the activity approved?',
    button: 'Request for Approval',
    completed: false,
  },
  {
    title: 'Get Started',
    description: 'Click the button below once you are ready to start the activity',
    button: 'Start Activity',
    completed: false,
  },
  {
    title: 'Activity Report',
    description: 'Click the button below once you have finished the activity & submit a small report',
    button: 'Submit Report',
    completed: false,
  },
  {
    title: 'Feedback & Karma Points',
    description: 'Click the button to register the feedback & collect your karma points',
    button: 'Submit Feedback',
    completed: false,
  },
]);

const nextStep = (index) => {
  if (index === currentStep.value) {
    steps.value[index].completed = true;
    currentStep.value++;
  } else {
    showPopup.value = true;
  }
};

const resetSteps = () => {
  steps.value.forEach((step) => (step.completed = false));
  currentStep.value = 0;
};

</script>