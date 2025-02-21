<template>
  <div class=" h-screen w-full">
    <!-- NAVBAR -->
    <Navbar/>
    <!-- NAVBAR END -->
     <!-- baner section image -->
     <section>
      <div class="relative w-full  ">
      <img src="https://s3-alpha-sig.figma.com/img/5fe6/fe04/058446e1c3ea035d2efd21a222ccb475?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=P-8K1XloauUtT7UVndu4L199Efq0NENaBmmYHpVZpgONi2Uxpbz6sP03gkJBPdo4LkhBZ1fbOgLHSF5Eq3RNvLCuSsdvhVTynPV2e7NlZ9TZqQFww3WueaAI-fXncdfG4xbhgvymccrF-Z0mLImqTne-4fbkk7I4tpHnChzjvmrENAMzsmMxFnhphfuatDa7~5RIlmLt84tmjiz2IBgoSZ3ZhV4WoGL7DQWE6OvV3uJ7JjoFHdUr9mNkWYKbcOJ~q0ehkwRR8XCYap4lG-BdlaOmQdG6ro1QlcixF~YEzhnDfvP1M4Gk00B~4lHnip9Hbzqkwml0NoehBoFPs-zkRQ__" class="w-full h-[456px] object-cover" />
      </div>
      <div class="absolute left-8 top-48 bg-white shadow-lg rounded-xl p-4 md:p-6 z-10 w-[448px]">
      <h3 class="text-lg font-semibold">Empower the needy</h3>
      <span class="text-red-500 text-sm">Online</span>
      <div class="flex items-center mt-2 text-gray-600 text-sm">
      <CalendarIcon class="w-4 h-4 mr-1" />
      <span>01 Oct, 2024 - 30 Nov, 2024</span>
      </div>
      <div class="flex items-center mt-2 text-gray-600 text-sm">
      <ClockIcon class="w-4 h-4 mr-1" />
      <span>50 hr</span>
      <span class="ml-auto text-red-500 flex items-center">
      <HeartIcon class="w-4 h-4 mr-1" /> 40 Points
      </span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 mt-4">
      <div class="bg-green-500 h-2.5 rounded-full" style="width: 60%"></div>
      </div>
      <p class="text-sm text-gray-600 mt-2">60% completed</p>
      </div>
     </section>
     <!-- banner section image end -->
      <!-- main section start  -->
       <section class="w-full bg-gray-700 flex ">
        <div class="w-[70%]">
          sdfasd
        </div>

        <div>
          asdfasdfasd
        </div>


       </section>

        <!-- main section end  -->

  </div>
</template>

<script setup>
import Navbar from  '../components/Navbar.vue';
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
// export default {
//   name: "Dashboard",
// };
</script>

<style>
/* button {
  transition: background 0.3s ease;
} */
/* @import "@fortawesome/fontawesome-free/css/all.min.css"; */
</style>
