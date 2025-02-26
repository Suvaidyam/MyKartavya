<template>
  <div class="h-screen w-full">
    <!-- banner section image -->
    <section>
      <div v-if="activities" class="w-full h-[456px] md:h-[456px] back-img flex items-center mt-10 px-4 md:px-20">
        <div
          class="max-w-sm w-[448px] h-[312px] bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-4 justify-center">
          <div class="border-b pb-2">
          
            <h2 class="text-heading3 font-normal font-poppins mt-1">
              {{ activities.title }}
            </h2>
            <span class="text-secondary font-medium text-caption">Online</span>
          </div>

          <div class="flex gap-1" style="color: #666666">
            <!-- <i class="far fa-calendar-alt mr-1 h-5 w-5"></i> -->
            <FeatherIcon name="calendar" class="size-4 text-[#666666]" />

            <span class="flex items-center text-bodyh2 font-normal mr-4" style="color: #0b0b0b">
              {{formatDate(activities.start_date)}} - {{formatDate(activities.end_date)}} 
            </span>
          </div>
          <div class="flex items-center text-gray-600 text-bodyh2 font-normal justify-between border-b pb-2">
            <span class="flex justify-center gap-1" style="color: #0b0b0b">
              <FeatherIcon name="clock" class="size-4 text-[#666666]" />
              {{ activities.hours }} hr 
            </span>
            <span class="flex items-center gap-2 justify-center" style="color: #0b0b0b">
              <FeatherIcon name="database" class="size-4 text-secondary" />
              <span class="text-bodyh2 font-normal"> {{activities.karma_points}}</span>
            </span>
          </div>
          <div class="flex space-x-2 border-b pb-2">
            <img
              src="https://s3-alpha-sig.figma.com/img/898b/9a5c/5eac9b190fb13207adabb3086b70731b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k0HgHMabVhEH5zXQfC7Y-T3VRTGLkbVh3CF-7U3dLsdJKHJn7LY~3g9fVJt6~MzCFuUan1rOU2ScbHhIcSVzRW326B-RGG3SjtQdGg0FR4L6Ib8VHyVQlRnXtA025TCVDifmrnVqQBJCTDxZiWdT2V8hGl8PGBpps1vlIWariZI7Dt2zRrxnHRYNwMUmTbGJS-Dt3egr13OP5smtgglO2PTc6oVst4kc2wykva2uIhlrpdQ~xug9VtkmweOtDhz4k10Db65Oc7UqmnlWhy4xNMSDmjk2zjKfTcjsidzI36OwHf-MHhwjz-weJyChhP5CTRiHn3WASMcQqlp35DsgDA__"
              class="w-10 h-10" alt="Goal 10" />
            <img
              src="https://s3-alpha-sig.figma.com/img/77ec/4184/a463a59fc378c1ee77d824caf08528b3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j90JYppUcg2cLQ1-BOIm50A5DQ0mJ~82F7-ukZPIPc7CbhyAPySKPqfz~xshvTL2sSPZXiKq6zqifAp94u8GazYKe6Gz2VO1QjoD5EjW7kHNTsLuw1vM7B0we8dv5mUbFgSK9fJ8-D231cnJuBegTC7yzmw-6Ju-5PUkWjkv7RV6MbxTsVyIsgxxKlaTRid21s1LzA6Jgg4fZrSLvzfpbIbWwwateY3jDQM6DEZ7qS9D3JxkXoZ0RkGDVxcZBCiKADeY9GOQnsjR~RmeiVHFsllKCL2c-0fkcSYz9Wv6UhsMXUKiQ6bxiA1EFWnnuyewI1V4rzd-6q8ly~PwfM3Y0Q__"
              class="w-10 h-10" alt="Goal 11" />
          </div>

          <div class="">
            <div class="w-full bg-gray-200 rounded-full h-[5px]">
              <div class="bg-green-500 h-[5px] rounded-full" style="width: 60%"></div>
            </div>
            <p class="text-caption font-normal mt-1" style="color: #0b0b0b">
              60% completed
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- banner section image end -->
    <!-- main section start  -->
    <section class="w-full bg-gray-700">
      <div class="p-6 md:p-10 bg-gray-100">
        <!-- Main Content -->
        <div class="grid gap-6 lg:grid-cols-3">
          <!-- Left Section -->
          <div class="lg:col-span-2">
            <p class="mb-4 text-bodyh2 font-normal text-justify" style="color: #666666">
              <span class="text-[47px] text-black">T</span>his Women's
              Entrepreneurship Day, let's empower underserved women running
              small businesses or working in our communities by sharing positive
              reviews of their businesses on our social media platforms. By
              highlighting their names and services, we can increase their
              visibility, boost their confidence, and foster growth.This small
              act of kindness can have a significant impact, bringing hope and
              faith to these women as they navigate their entrepreneurial
              journeys. Together, we can create a supportive network that
              uplifts and inspires!
            </p>
            <h2 class="text-heading4 font-medium mt-6" style="color: #0b0b0b">
              Volunteer Role
            </h2>
            <p class="mt-2 text-bodyh2 font-normal text-justify" style="color: #666666">
              Volunteers are encouraged to identify a small business or an
              underserved woman in their community and capture a photo or video
              showcasing her work. Along with the visual, write a positive
              review that highlights her efforts and talents on your social
              media platforms. This simple gesture can significantly boost her
              business, while also encouraging her personally and fostering
              self-confidence.By sharing these stories, we not only promote
              their work but also inspire others to recognize the value of
              supporting women entrepreneurs. Let's come together to uplift and
              empower these remarkable women, helping them shine in their
              communities!
            </p>
            <div class="mt-4">
              <p class="text-[14px] font-poppins font-normal leading-[23.8px] tracking-[0.0025em] text-[#666666] text-justify"
                style="word-spacing: 16px">
                Share your experience along with pictures on your social media
                handles and tag us on social media using
                <span class="text-secondary hover:cursor-pointer">@MyKaratvaya @NASSCOMfdn</span>
              </p>

              <p class="mt-2 text-bodyh2 font-normal font-poppins" style="color: #666666">
                Use hashtag #MyKartavya #DoGoodFeelGood #LittleActMatters
                #womenempowerment#letsgrowtogether
              </p>
            </div>
            <div class="flex items-center gap-[12px] flex-col justify-self-start mt-[220px]">
              <span class="text-gray-700 font-medium flex items-center space-x-2">
                <Share2 class="w-4 h-4 text-[#666666]" />
                <span class="text-bodyh1 font-medium font-poppins" style="color: #0b0b0b">Share activity with
                  others</span>
              </span>
              <div class="flex items-center gap-3 justify-start w-[230px]">
                <button v-for="icon in icons" :key="icon.name" :aria-label="icon.name"
                  class="p-1.5 bg-white rounded-full hover:bg-gray-300">
                  <component :is="icon.svg" class="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <!-- Right Section - Timeline -->
          <div>
            <Stepper />
          </div>
        </div>

        <!-- Related Opportunities -->
        <div class="mt-10">
          <div class="flex justify-between">
            <h2 class="text-heading4 font-medium font-poppins" style="color: #0b0b0b">
              Related Opportunities
            </h2>

            <div class="flex gap-3">
              <i class="fa-solid fa-less-than w-[7px] h-[12px] text-[#999999]"></i>
              <i class="fa-solid fa-greater-than w-[7px] h-[12px] text-[#0B0B0B]"></i>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            <!-- Loop through the opportunities array -->
            <Card v-for="(item, key) in relatedactivity" :key="key" :item="item" />
          </div>
        </div>
      </div>
    </section>
    <!-- main section end  -->
  </div>
</template>

<script setup>
import { inject, ref,onMounted } from 'vue'
import { FeatherIcon } from 'frappe-ui'
import Stepper from '../../components/Stepper.vue'
import Card from '../../components/Card.vue'
// import CardLoader from "../../components/CardLoader.vue";
import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Share2,
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'
 

const icons = [
  { name: 'Facebook', svg: Facebook },
  { name: 'X', svg: Twitter },
  { name: 'LinkedIn', svg: Linkedin },
  { name: 'WhatsApp', svg: MessageCircle },
]
const call=inject('call');
const activities=ref([]);
const route = useRoute();
const formatDate = inject('formatDate');


const activity = async () => {
  try {
        const response = await call('mykartavya.controllers.api.activity_details',{'name':route.params.name});
            activities.value = response
          
    } catch (err) {
        console.error('Error fetching activity data:', err);
    }
};
// Sample data for the opportunities
const relatedactivity = [
  {
    "name": "ACT-Bright Bites-0001",
    "status": "Draft",
    "need_certificate": "Yes",
    "title": "Bright Bites",
    "activity_description": "<div class=\"ql-editor read-mode\"><p><span style=\"background-color: rgb(248, 248, 248); font-size: 12px; color: rgb(102, 102, 102);\">This Women's Entrepreneurship Day, let's empower underserved women running small business...</span></p></div>",
    "activity_image": "/files/1.png",
    "activity_published_date_starts": 1,
    "publish_date": "2025-02-25 17:44:38",
    "start_date": "2025-02-25 17:44:38",
    "end_date": "2025-02-27 17:43:21",
    "company": "Suvaidyam",
    "contribution_type": "User Input",
    "karma_points": 40,
    "hours": 2,
    "max_hours": 2,
    "sdgs": "Clean Water and Sanitation",
    "volunteers": "[{\"name\": \"USER-25-0005\", \"full_name\": \"Rahul Sah\", \"email\": \"rahul.sah@gmail.com\", \"user_image\": null},{\"name\": \"USER-25-0004\", \"full_name\": \"Rahul Sah\", \"email\": \"rkrahul00011@gmail.com\", \"user_image\": null}]"
  }
];

onMounted(activity)
</script>

<style>
/* @import "@fortawesome/fontawesome-free/css/all.min.css"; */
</style>
<style scoped>
.back-img {
  background: url('https://s3-alpha-sig.figma.com/img/5fe6/fe04/058446e1c3ea035d2efd21a222ccb475?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=P-8K1XloauUtT7UVndu4L199Efq0NENaBmmYHpVZpgONi2Uxpbz6sP03gkJBPdo4LkhBZ1fbOgLHSF5Eq3RNvLCuSsdvhVTynPV2e7NlZ9TZqQFww3WueaAI-fXncdfG4xbhgvymccrF-Z0mLImqTne-4fbkk7I4tpHnChzjvmrENAMzsmMxFnhphfuatDa7~5RIlmLt84tmjiz2IBgoSZ3ZhV4WoGL7DQWE6OvV3uJ7JjoFHdUr9mNkWYKbcOJ~q0ehkwRR8XCYap4lG-BdlaOmQdG6ro1QlcixF~YEzhnDfvP1M4Gk00B~4lHnip9Hbzqkwml0NoehBoFPs-zkRQ__');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* Ensures icons have smooth hover transition */
button {
  transition: background 0.2s ease-in-out;
}
</style>