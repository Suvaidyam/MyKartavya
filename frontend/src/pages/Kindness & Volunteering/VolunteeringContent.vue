<template>
  <section class="mt-2 w-full h-full">
    <header class="flex items-center flex-wrap gap-5 justify-between w-full mt-3">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <h1 class="text-2xl text-neutral-950">
          Kindness & Volunteering
        </h1>
        <div class="flex flex-wrap items-center gap-4">
          <button @click="generateRandom"
            class="h-8 rounded-sm border border-[#D9D9D9] bg-white py-2 px-4 gap-1.5 flex flex-row items-center text-sm font-[400] text-[#E23D90] whitespace-nowrap">
            Generate Random
            <FeatherIcon class="size-[13px]" name="refresh-ccw" />
          </button>
          <Sorting />
        </div>
      </div>
    </header>

    <nav
      class="flex flex-col justify-center items-start py-px mt-4 text-base tracking-normal leading-none bg-white border-b-2 border-solid border-b-[color:var(--Stroke,#D9D9D9)] w-full overflow-x-auto">
      <div class="flex gap-4 items-center min-h-9 w-full">
        <a @click.prevent="activeTab = 'kindness'"
          class="flex gap-1 items-center cursor-pointer p-2 bg-white border-b-2 border-solid whitespace-nowrap" :class="{
            'border-b-[color:var(--S2,#FF7C3A)] text-neutral-950':
              activeTab === 'kindness',
            'border-b-[color:var(--Primary,#FFF)] text-[#6B7280]':
              activeTab !== 'kindness',
          }">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e19184eebc4a59cfdb05175c1ea1d1c4b671b0eb0457754baf6d25cefb636347?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
            alt="Kindness icon" class="w-5 h-5 object-contain" />
          <span>Acts of Random Kindness</span>
        </a>
        <a @click.prevent="activeTab = 'volunteering'"
          class="flex gap-1 items-center cursor-pointer p-2 bg-white border-b-2 border-solid whitespace-nowrap" :class="{
            'border-b-[color:var(--S2,#FF7C3A)] text-neutral-950':
              activeTab === 'volunteering',
            'border-b-[color:var(--Primary,#FFF)] text-[#6B7280]':
              activeTab !== 'volunteering',
          }">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5df16569a7fc25da6cc37b22e0be591bf7cdc731ac26089af74b0ead24bbac7b?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
            alt="Volunteering icon" class="w-5 h-5 object-contain" />
          <span>Volunteering Opportunities</span>
        </a>
      </div>
    </nav>

    <div v-if="activeTab == 'kindness'" class="mt-5 w-full h-4/5">
      <div v-if="loader" class="grid grid-cols-3 gap-5 max-md:grid-cols-1">
        <CardLoader />
        <CardLoader />
        <CardLoader />
      </div>
      <div v-else class="h-full">
        <div v-if="activity.length > 0" class="grid grid-cols-3 gap-5 max-md:grid-cols-1">
          <Card v-for="item in activity" :key="item.name" :item="item" />
        </div>
        <NotFound v-else />
      </div>
    </div>
    <div v-else class="w-full h-4/5 flex items-center justify-center">
      <p>Coming Soon...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, inject, watch } from 'vue'
import Card from '../../components/Card.vue'
import CardLoader from '../../components/CardLoader.vue'
import NotFound from '../../components/NotFound.vue'
import Sorting from '../../components/Sorting.vue'
import { FeatherIcon } from 'frappe-ui'

const call = inject('call')
const store = inject('store')
const activity = ref([])
const loader = ref(false)

const activeTab = ref('kindness')
const kindnes = async (filter) => {
  loader.value = true
  try {
    const response = await call(
      'mykartavya.controllers.api.available_commitments',
      {
        filter: filter ?? {},
      }
    )
    activity.value = response
    setTimeout(() => {
      loader.value = false
    }, 1000)
  } catch (err) {
    loader.value = false
    console.error('Error fetching Kindness data:', err)
  }
}

const generateRandom = async () => {
  loader.value = true
  try {
    const response = await call(
      'mykartavya.controllers.api.available_commitments',
      {
        filter: { ...store.filters },
      }
    )
    if (response && response.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.length)
      activity.value = [response[randomIndex]]
    } else {
      activity.value = []
    }
    setTimeout(() => {
      loader.value = false
    }, 1000)
  } catch (err) {
    loader.value = false
    console.error('Error generating random activity:', err)
  }
}

onMounted(() => {
  kindnes(store.filters)
})

watch(
  () => activeTab.value,
  (newVal) => {
    if (newVal) {
      kindnes(store.filters)
    }
  },
  { immediate: true }
)
watch(
  () => store.filters,
  (newVal) => {
    if (newVal) {
      kindnes(newVal)
    }
  },
  { immediate: true, deep: true }
)
</script>