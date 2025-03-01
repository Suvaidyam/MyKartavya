<template>
  <!-- Available Commitments Section -->
  <section class="px-4 border rounded-[12px] bg-white overflow-y-auto min-h-[330px] h-screen pt-[62px]">
    <div class="w-full h-12 flex items-center bg-white sticky top-0 z-10">
      <h2 class="text-lg font-medium">Available Commitments</h2>
    </div>
    <div v-if="loader" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <CardLoader />
      <CardLoader />
      <CardLoader />
    </div>
    <div v-else class="w-full h-full pb-4">
      <div v-if="available_commitments?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card v-for="item in available_commitments" :key="item.name" :item="item" />
      </div>
      <div class="w-full h-full" v-else>
        <NotFound />
      </div>
    </div>
  </section>
</template>
<script setup>
import Card from '@/components/Card.vue';
import CardLoader from '@/components/CardLoader.vue';
import NotFound from '../../components/NotFound.vue';
import { ref } from 'vue';


const avai_commitments = async (filter) => {
  loader.value = true;
  try {
    const response = await call('mykartavya.controllers.api.available_commitments', {
      'filter': filter ?? {}
    });
    available_commitments.value = response;
    setTimeout(() => {
      loader.value = false;
      checkScrollButtons(); // Check button states after loading
    }, 1000);
  } catch (err) {
    loader.value = false;
    console.error('Error fetching Kindness data:', err);
  }
};
</script>