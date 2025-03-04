<template>
  <div class="min-h-screen w-full pt-[62px]">
    <!-- Banner section -->
    <section>
      <div class="relative w-full h-[300px] md:h-[456px] sm:h-[456px] back-img flex items-center ">
       <img :src="activitiesavilable.activity_image" class="w-full h-full" alt="">
        <div
          class="w-full absolute top-14 left-10 max-w-sm bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-4 justify-center">
          <div class="border-b pb-2">
            <h2 class="text-2xl md:text-heading3 font-normal font-poppins mt-1">
              {{ activitiesavilable.title }}
            </h2>
            <span class="text-secondary font-medium text-caption">{{ activitiesavilable.activity_type }}</span>
          </div>

          <div class="flex items-center" style="color: #666666">
            <FeatherIcon name="calendar" class="size-4" />
            <span class="text-sm md:text-bodyh2 font-normal ml-2" style="color: #0b0b0b">
              {{ formatDate(activitiesavilable.start_date) }} - {{ formatDate(activitiesavilable.end_date) }}
            </span>
          </div>

          <div class="flex text-gray-600 text-sm md:text-bodyh2 font-normal justify-between border-b pb-2">
            <div class="flex items-center" style="color: #0b0b0b">
              <FeatherIcon name="clock" class="size-4" />
              <span class="ml-2"> {{ activitiesavilable.hours }}hr</span>
            </div>
            <span class="flex items-center gap-2" style="color: #0b0b0b">
              <FeatherIcon name="database" class="size-4" />
              <span>{{ activitiesavilable.karma_points }}</span>
            </span>
          </div>

          <div class="flex justify-between border-b pb-4" style="color: #666666">
            <span class="text-[12px] font-normal" style="color: #e23d90">
              Individual Activity
            </span>
            <span class="text-[12px] font-normal" style="color: #666666">
              Minumum Time Commitment
            </span>
          </div>

          <div class="flex space-x-2 border-b pb-2">
            <div v-if="activitiesavilable.sdgs" v-for="item in JSON.parse(activitiesavilable.sdgs)">
              <img v-if="item.image" :src="item.image" class="w-8 h-8" />
              <span v-else class="w-8 h-8 flex items-center justify-center bg-gray-50">{{ item.sdgs_name?.charAt(0) }}</span>
            </div>
          </div>

          <div class="font-poppins text-button">
            <router-link :to="`/activity/${activitiesavilable.activity}`">
              <button
                class="bg-secondary min-w-[112px] px-2 h-[32px] rounded-[4px] flex justify-center items-center text-white hover:bg-opacity-90 transition-colors">
                ACT NOW
                <!-- {{ route.params.type === 'kindness' ? 'ACT NOW' : 'I WANT TO HELP' }} -->
                <FeatherIcon name="arrow-up-right" class="size-4 ml-1" />
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Main section -->
    <section class="w-full bg-white">
      <div class="p-4 md:p-6 lg:p-10">
        <div class="flex flex-col lg:flex-row gap-4">
          <!-- Left Section -->
          <div class="w-full lg:w-[65xp]">
            <p class="mb-4 text-[10px] md:text-bodyh2 font-normal font-poppins text-justify" style="color: #666666">
              <span class="text-3xl md:text-[47px] text-black">T</span>his
              Women's Entrepreneurship Day, let's empower underserved women
              running small businesses or working in our communities by sharing
              positive reviews of their businesses on our social media
              platforms. By highlighting their names and services, we can
              increase their visibility, boost their confidence, and foster
              growth.This small act of kindness can have a significant impact,
              bringing hope and faith to these women as they navigate their
              entrepreneurial journeys. Together, we can create a supportive
              network that uplifts and inspires!
            </p>

            <h2 class="text-xl md:text-heading4 font-medium mt-6" style="color: #0b0b0b">
              Volunteer Role
            </h2>

            <p class="mt-2 text-sm md:text-bodyh2 font-normal text-justify" style="color: #666666">
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

            <div class="mt-4 space-y-2">
              <p class="text-sm md:text-bodyh2 font-normal font-poppins" style="color: #666666">
                Share your experience along with pictures on your social media
                handles and tag us on social media using
                <span class="text-secondary">@MyKaratvaya @NASSCOMfdn</span>
              </p>
              <p class="text-sm md:text-bodyh2 font-normal font-poppins" style="color: #666666">
                Use hashtag #MyKartavya #DoGoodFeelGood #LittleActMatters
                #womenempowerment #letsgrowtogether
              </p>
            </div>
          </div>

          <!-- Right Section -->
          <div class="w-full lg:w-[35%]">
            <div class="flex gap-3 flex-col">
              <span class="text-gray-700 font-medium flex items-center space-x-2">
                <span class="text-sm md:text-bodyh1 font-medium font-poppins" style="color: #0b0b0b">
                  Share activity with others
                </span>
                <Share2 class="w-5 h-5 text-gray-600" />
              </span>

              <div class="flex gap-3">
                <button v-for="icon in icons" :key="icon.name" :aria-label="icon.name"
                  class="p-1 bg-white rounded-full border border-gray-500 transition-colors">
                  <component :is="icon.svg" class="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <h2 class="text-xl md:text-heading4 pt-6 font-medium font-poppins" style="color: #0b0b0b">
              Related Opportunities
            </h2>
            <div v-if="loader" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 pt-1 gap-4">
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </div>
            <div class="" v-else>
              <div v-if="relatedactivity?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 pt-1 items-center gap-4">
                <Card v-for="(item, key) in relatedactivity" :key="key" :item="item"
                  />
              </div>
              <div class="w-full h-[330px]" v-else>
                <NotFound />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { FeatherIcon } from 'frappe-ui'
import { useRoute } from 'vue-router'
import Card from '../../components/Card.vue'
import NotFound from '../../components/NotFound.vue'
import CardLoader from '../../components/CardLoader.vue'
import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Share2,
} from 'lucide-vue-next'
const icons = [
  { name: 'Facebook', svg: Facebook },
  { name: 'X', svg: Twitter },
  { name: 'LinkedIn', svg: Linkedin },
  { name: 'WhatsApp', svg: MessageCircle },
]

const call = inject('call');
const activitiesavilable = ref([]);
const route = useRoute();
const formatDate = inject('formatDate');
const loader = ref(false);

const avilableactivity = async () => {
  try {
    const response = await call('mykartavya.controllers.api.activity_details', { 'name': route.params.name });
    activitiesavilable.value = response

  } catch (err) {
    console.error('Error fetching activity data:', err);
  }
};

const relatedactivity = ref([]);
const relatedOpportunities = async () => {
  try {
    const response = await call('mykartavya.controllers.api.related_opportunities', { 'name': route.params.name, sdgs: activitiesavilable.value.sdgs });
    if (response) {
      relatedactivity.value = response
    }
  } catch (err) {
    console.error('Error fetching activity data:', err);
  }
}

onMounted(async () => {
  await avilableactivity();
  await relatedOpportunities();
});
</script>

<style scoped>
.back-img {
  background-repeat: no-repeat;
  background-size: cover;
}

@media (max-width: 768px) {
  .back-img {
    background-position: center;
  }
}
</style>