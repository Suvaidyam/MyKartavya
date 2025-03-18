<template>
  <div class=" pt-[62px] h-screen">
    <section class="flex flex-col lg:flex-row px-5 h-full">
      <Filters  />
      <main class="w-full h-full py-3 lg:pl-[270px]">
        <div class="flex justify-between items-center pb-1">
          <h2 class="text-3xl font-normal mb-4 text-[#0B0B0B] px-3">Kindness & Volunteering</h2>
          <Sorting :sort="filter" />
        </div>
        <div v-if="loader" class="px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </div>
        <div v-else class="h-full w-full px-3">
          <div v-if="kindness_volunteering.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card v-for="item in kindness_volunteering" :key="item.name" :item="item" type="card" />
          </div>
          <NotFound v-else />
        </div>
      </main>
    </section>

  </div>
</template>

<script setup>
import { ref, watch, onMounted, inject } from 'vue';
import Card from '../../components/Card.vue';
import Filters from '../../components/Filters.vue';
import Sorting from '../../components/Sorting.vue';
import Loader from '../../components/Loader.vue';
import CardLoader from '../../components/CardLoader.vue';
import NotFound from '../../components/NotFound.vue';

const call = inject('call')
const store = inject('store')
const kindness_volunteering = ref([])
const loader = ref(false)

const volunteering_opportunities = async (filter) => {
  loader.value = true
  try {
    const response = await call('mykartavya.controllers.api.available_commitments', {
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

watch(() =>store.filters, (newVal) => {
  if (newVal) {
    volunteering_opportunities(newVal)
  }
}, { immediate: true, deep: true })
</script>

<style scoped>
/* Any additional styling can be placed here */
</style>