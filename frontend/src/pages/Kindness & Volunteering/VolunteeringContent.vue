<template>
  <section class="mt-2 w-full h-full">
    <header
      class="flex items-center flex-wrap gap-5 justify-between w-full max-md:mr-0.5 max-md:max-w-full mt-3"
    >
      <div class="flex leading-none justify-between lg:w-[94%] w-[94%]">
        <h1 class="self-start mt-1 text-2xl text-center text-neutral-950">
          Kindness & Volunteering
        </h1>
        <div class="max-w-[184px] min-h-[32px]">
          <button
            class="h-8 rounded-sm border border-[#D9D9D9] bg-white py-2 px-4 gap-1.5 flex flex-row items-center text-sm font-[400] text-[#E23D90]"
          >
            Generate Random
            <FeatherIcon class="size-[13px]" name="refresh-ccw" />
          </button>
        </div>
      </div>
      <Sorting />
    </header>

    <nav
      class="flex flex-col justify-center items-start py-px mt-4 text-base tracking-normal leading-none bg-white border-b-2 border-solid border-b-[color:var(--Stroke,#D9D9D9)] max-md:pr-5 max-md:mr-0.5 max-md:max-w-full"
    >
      <div
        class="flex flex-wrap gap-4 items-center max-w-full min-h-9 w-[519px]"
      >
        <a
          @click.prevent="activeTab = 'kindness'"
          class="flex gap-1 items-center self-stretch cursor-pointer p-2 my-auto bg-white border-b-2 border-solid min-w-60 text-stone-500"
          :class="{
            'border-b-[color:var(--S2,#FF7C3A)] text-neutral-950':
              activeTab === 'kindness',
            'border-b-[color:var(--Primary,#FFF)]': activeTab !== 'kindness',
          }"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e19184eebc4a59cfdb05175c1ea1d1c4b671b0eb0457754baf6d25cefb636347?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
            alt=""
            class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          />
          <span>Acts of Random Kindness</span>
        </a>
        <a
          @click.prevent="activeTab = 'volunteering'"
          class="flex gap-1 items-center self-stretch cursor-pointer p-2 my-auto bg-white border-b-2 border-solid min-w-60 text-stone-500"
          :class="{
            'border-b-[color:var(--S2,#FF7C3A)] text-neutral-950':
              activeTab === 'volunteering',
            'border-b-[color:var(--Primary,#FFF)]':
              activeTab !== 'volunteering',
          }"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5df16569a7fc25da6cc37b22e0be591bf7cdc731ac26089af74b0ead24bbac7b?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
            alt=""
            class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          />
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
        <div
          v-if="activity.length > 0"
          class="grid grid-cols-3 gap-5 max-md:grid-cols-1"
        >
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