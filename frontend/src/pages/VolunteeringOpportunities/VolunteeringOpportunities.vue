<template>
  <div class=" pt-[62px] h-screen">
    <section class="flex flex-col lg:flex-row px-5 h-full">
      <Filters :filter="filter" />
      <main class="w-full h-full py-3 lg:pl-[270px]">
        <div class="flex justify-between items-center pb-3">
          <h2 class="text-lg font-semibold mb-4 px-3">Kindness & Volunteering</h2>
          <button class="border rounded-md px-2 py-1.5 h-8 w-8 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 6h18M3 12h12M3 18h6" />
            </svg>
          </button>
        </div>
        <div v-if="loader" class="px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </div>
        <div v-else class="px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card v-for="item in kindness_volunteering" :key="item.name" :item="item" type="card" />
          <!-- Repeat similar blocks for other opportunities -->
        </div>
      </main>
    </section>

  </div>
</template>

<script setup>
import { ref, watch, onMounted, inject } from 'vue';
import Card from '../../components/Card.vue';
import Filters from '../../components/Filters.vue';
import Loader from '../../components/Loader.vue';
import CardLoader from '../../components/CardLoader.vue';

const filter = ref({
  sdgs: [],
  volunteering_hours: '',
  activity_type: [],
  karma_points: ''
})
const call = inject('call')
const kindness_volunteering = ref([])
const loader = ref(false)

const volunteering_opportunities = async (filter) => {
  loader.value = true
  try {
    const response = await call('mykartavya.controllers.api.get_activity_data', {
      'filter': filter ?? {}
    });
    kindness_volunteering.value = response
    setTimeout(() => {
      loader.value = false
    }, 1000)
  } catch (err) {
    loader.value = false
    console.error('Error fetching Kindness data:', err);
  }
};
onMounted(() => {
  volunteering_opportunities()
})

watch(() => filter.value, (newVal) => {
  if (newVal) {
    volunteering_opportunities(newVal)
  }
}, { immediate: true, deep: true })
</script>

<style scoped>
/* Any additional styling can be placed here */
</style>