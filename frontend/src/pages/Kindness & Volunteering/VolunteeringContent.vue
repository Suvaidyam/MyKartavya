<template>
  <section class="mt-2 w-full h-full">
    <header
      class="flex flex-wrap gap-5 justify-between w-full max-md:mr-0.5 max-md:max-w-full"
    >
      <div class="flex flex-col leading-none">
        <h1 class="self-start mt-1 text-2xl text-center text-neutral-950">
          Kindness & Volunteering
        </h1>
      </div>
      <button
        class="flex gap-1.5 justify-center items-center px-2 my-auto w-8 h-8 bg-white rounded border border-solid border-[color:var(--Stroke,#D9D9D9)]"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c4064297019ef96779e7eb626ead56be65f493645c97b478472dc4c6b81cf07?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
          alt="Filter"
          class="object-contain self-stretch my-auto w-4 aspect-square"
        />
      </button>
    </header>

    <nav
      class="flex flex-col justify-center items-start py-px mt-4 text-base tracking-normal leading-none bg-white border-b-2 border-solid border-b-[color:var(--Stroke,#D9D9D9)] max-md:pr-5 max-md:mr-0.5 max-md:max-w-full"
    >
      <div
        class="flex flex-wrap gap-4 items-center max-w-full min-h-9 w-[519px]"
      >
        <a
          @click.prevent="activeTab = 'kindness'"
          class="flex gap-1 items-center self-stretch cursor-pointers p-2 my-auto bg-white border-b-2 border-solid min-w-60 text-stone-500"
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
          class="flex gap-1 items-center self-stretch cursor-pointers p-2 my-auto bg-white border-b-2 border-solid min-w-60 text-stone-500"
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

    <div class="mt-5 w-full h-4/5">
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
  </section>
</template>

<script setup>
import { ref, computed, onMounted, inject, watch } from 'vue'
import Card from '../../components/Card.vue'
import CardLoader from '../../components/CardLoader.vue'
import NotFound from '../../components/NotFound.vue'

const call = inject('call')
const activity = ref([])
const loader = ref(false)

const props = defineProps({
  filter: Object,
})
const filter = ref(props.filter)
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
  kindnes(filter.value)
})

watch(
  () => activeTab.value,
  (newVal) => {
    if (newVal) {
      kindnes(filter.value)
    }
  },
  { immediate: true }
)
watch(
  () => filter.value,
  (newVal) => {
    if (newVal) {
      kindnes(newVal)
    }
  },
  { immediate: true, deep: true }
)
</script>