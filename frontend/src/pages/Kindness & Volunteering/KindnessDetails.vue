<template>
  <div class="min-h-screen w-full pt-[62px]">
    <!-- Banner section -->
    <section>
      <div
        class="relative w-full h-[300px] md:h-[456px] sm:h-[456px] back-img flex items-center px-4 md:px-20"
      >
        <div
          class="w-full max-w-sm bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-4 justify-center"
        >
          <div class="border-b pb-2">
            <h2 class="text-2xl md:text-heading3 font-normal font-poppins mt-1">
              Empower the needy
            </h2>
            <span class="text-secondary font-medium text-caption">Online</span>
          </div>

          <div class="flex items-center" style="color: #666666">
            <FeatherIcon name="calendar" class="size-4" />
            <span
              class="text-sm md:text-bodyh2 font-normal ml-2"
              style="color: #0b0b0b"
            >
              01 Oct, 2024 - 30 Nov, 2024
            </span>
          </div>

          <div
            class="flex text-gray-600 text-sm md:text-bodyh2 font-normal justify-between border-b pb-2"
          >
            <div class="flex items-center" style="color: #0b0b0b">
              <FeatherIcon name="clock" class="size-4" />
              <span class="ml-2">50 hr</span>
            </div>
            <span class="flex items-center gap-2" style="color: #0b0b0b">
              <FeatherIcon name="database" class="size-4" />
              <span>40 Points</span>
            </span>
          </div>

          <div
            class="flex justify-between border-b pb-4"
            style="color: #666666"
          >
            <span class="text-[12px] font-normal" style="color: #e23d90">
              Individual Activity
            </span>
            <span class="text-[12px] font-normal" style="color: #666666">
              Minumum Time Commitment
            </span>
          </div>

          <div class="flex space-x-2">
            <img
              src="https://s3-alpha-sig.figma.com/img/898b/9a5c/5eac9b190fb13207adabb3086b70731b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k0HgHMabVhEH5zXQfC7Y-T3VRTGLkbVh3CF-7U3dLsdJKHJn7LY~3g9fVJt6~MzCFuUan1rOU2ScbHhIcSVzRW326B-RGG3SjtQdGg0FR4L6Ib8VHyVQlRnXtA025TCVDifmrnVqQBJCTDxZiWdT2V8hGl8PGBpps1vlIWariZI7Dt2zRrxnHRYNwMUmTbGJS-Dt3egr13OP5smtgglO2PTc6oVst4kc2wykva2uIhlrpdQ~xug9VtkmweOtDhz4k10Db65Oc7UqmnlWhy4xNMSDmjk2zjKfTcjsidzI36OwHf-MHhwjz-weJyChhP5CTRiHn3WASMcQqlp35DsgDA__"
              class="w-[34px] h-[37px]"
              alt="Goal 10"
            />
            <img
              src="https://s3-alpha-sig.figma.com/img/77ec/4184/a463a59fc378c1ee77d824caf08528b3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j90JYppUcg2cLQ1-BOIm50A5DQ0mJ~82F7-ukZPIPc7CbhyAPySKPqfz~xshvTL2sSPZXiKq6zqifAp94u8GazYKe6Gz2VO1QjoD5EjW7kHNTsLuw1vM7B0we8dv5mUbFgSK9fJ8-D231cnJuBegTC7yzmw-6Ju-5PUkWjkv7RV6MbxTsVyIsgxxKlaTRid21s1LzA6Jgg4fZrSLvzfpbIbWwwateY3jDQM6DEZ7qS9D3JxkXoZ0RkGDVxcZBCiKADeY9GOQnsjR~RmeiVHFsllKCL2c-0fkcSYz9Wv6UhsMXUKiQ6bxiA1EFWnnuyewI1V4rzd-6q8ly~PwfM3Y0Q__"
              class="w-[34px] h-[37px]"
              alt="Goal 11"
            />
          </div>

          <div class="font-poppins text-button">
            <button
              class="bg-secondary min-w-[112px] px-2 h-[32px] rounded-[4px] flex justify-center items-center text-white hover:bg-opacity-90 transition-colors"
            >
            {{ route.params.type === 'kindness' ? 'ACT NOW' : 'I WANT TO HELP' }}
              <FeatherIcon name="arrow-up-right" class="size-4 ml-1" />
            </button>
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
            <p
              class="mb-4 text-[10px] md:text-bodyh2 font-normal font-poppins text-justify"
              style="color: #666666"
            >
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

            <h2
              class="text-xl md:text-heading4 font-medium mt-6"
              style="color: #0b0b0b"
            >
              Volunteer Role
            </h2>

            <p
              class="mt-2 text-sm md:text-bodyh2 font-normal text-justify"
              style="color: #666666"
            >
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
              <p
                class="text-sm md:text-bodyh2 font-normal font-poppins"
                style="color: #666666"
              >
                Share your experience along with pictures on your social media
                handles and tag us on social media using
                <span class="text-secondary">@MyKaratvaya @NASSCOMfdn</span>
              </p>
              <p
                class="text-sm md:text-bodyh2 font-normal font-poppins"
                style="color: #666666"
              >
                Use hashtag #MyKartavya #DoGoodFeelGood #LittleActMatters
                #womenempowerment #letsgrowtogether
              </p>
            </div>
          </div>

          <!-- Right Section -->
          <div class="w-full lg:w-[35%]">
            <div class="flex gap-3 flex-col">
              <span
                class="text-gray-700 font-medium flex items-center space-x-2"
              >
                <span
                  class="text-sm md:text-bodyh1 font-medium font-poppins"
                  style="color: #0b0b0b"
                >
                  Share activity with others
                </span>
                <Share2 class="w-5 h-5 text-gray-600" />
              </span>

              <div class="flex gap-3">
                <button
                  v-for="icon in icons"
                  :key="icon.name"
                  :aria-label="icon.name"
                  class="p-1 bg-white rounded-full border border-gray-500 transition-colors"
                >
                  <component :is="icon.svg" class="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <h2
              class="text-xl md:text-heading4 pt-4 font-medium font-poppins"
              style="color: #0b0b0b"
            >
              Related Opportunities
            </h2>

            <div
              class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4"
            >
              <div
                v-for="card in cards"
                :key="card.id"
                class="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div class="relative">
                  <img
                    :src="card.image"
                    :alt="card.title"
                    class="w-full h-[200px] md:h-[237px] object-cover"
                  />
                  <div
                    class="absolute top-2 left-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-br-lg"
                  >
                    {{ card.type }}
                  </div>
                  <div
                    class="absolute top-2 right-2 bg-white text-[#0B0B0B] text-xs px-2 py-1 rounded-full shadow"
                  >
                    <span class="font-semibold">{{ card.points }} Points</span>
                  </div>
                  <div class="absolute left-2 bottom-2">
                    <span class="bg-white text-black px-2 py-1 rounded text-xs">
                      {{ card.sdg }}
                    </span>
                  </div>
                </div>

                <div class="p-4">
                  <h3 class="text-bodyh1 font-medium" style="color: #0b0b0b">
                    {{ card.title }}
                  </h3>
                  <p
                    class="text-caption font-normal mt-1 font-poppins"
                    style="color: #666666"
                  >
                    {{ card.description }}
                  </p>

                  <div class="flex items-center text-sm text-gray-500 mt-3">
                    <span
                      class="flex items-center text-caption font-normal"
                      style="color: #0b0b0b"
                    >
                      <FeatherIcon
                        name="calendar"
                        class="size-4 mr-1"
                        style="color: #666666"
                      />
                      {{ card.date }}
                    </span>
                    <p
                      class="ml-auto flex items-center text-caption font-normal"
                      style="color: #0b0b0b"
                    >
                      <FeatherIcon
                        name="clock"
                        class="size-4 mr-1"
                        style="color: #666666"
                      />
                      {{ card.duration }}
                    </p>
                  </div>

                  <div class="flex items-center mt-3">
                    <div class="flex -space-x-2">
                      <img
                        v-for="(user, index) in card.users"
                        :key="index"
                        :src="user.image"
                        :alt="'User ' + (index + 1)"
                        class="w-8 h-8 rounded-full border-2 border-white"
                      />
                      <div
                        class="w-8 h-8 bg-gray-200 text-gray-600 flex items-center justify-center rounded-full text-sm font-medium border-2 border-white"
                      >
                        +{{ card.additionalUsers }}
                      </div>
                    </div>
                    <button
                      class="ml-auto text-orange-600 font-semibold text-sm flex items-center hover:text-orange-700 transition-colors"
                    >
                      {{ route.params.type === 'kindness' ? 'ACT NOW' : 'I WANT TO HELP' }}
                      <FeatherIcon name="arrow-up-right" class="size-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
  <script setup>
import { FeatherIcon } from 'frappe-ui'
import { useRoute } from 'vue-router'
import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Share2,
} from 'lucide-vue-next'
import { ref } from 'vue'

const route = useRoute()
console.log(route)
const icons = [
  { name: 'Facebook', svg: Facebook },
  { name: 'X', svg: Twitter },
  { name: 'LinkedIn', svg: Linkedin },
  { name: 'WhatsApp', svg: MessageCircle },
]

const cards = ref([
  {
    id: 1,
    title: 'Empower the needy',
    description:
      "This Women's Entrepreneurship Day, let's empower underserved women running small business...",
    image:
      'https://s3-alpha-sig.figma.com/img/2878/a4c5/9c959de9c3b9d28a480e8fc8a4b1bd81?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=deepSM9~pkpevq~2swFyA4g0zXUcOIZPg5bJaXVkcmNHwIVlwtQXJawLkEvr0pX3TeNueL4NtGlBtDG~zjxi8~C3mdRVPemZZudl8iw762tyT0kEi9Bk~9VwXQL299RLLLCnWeZYJo2pjXO-LuRi5aIUSu6rLnhmt3tjg7~pk5d8ICtHc2dOAKj~y80StIzWEII1KaRnoaoIQ8tDNap8Irp-3yBAItf~HCCc16FR8mdsShP0NlfshhwZxB6tEXVhfTPVj5bqC358wSr1CXqzQjbEfFqOTyETJm9zxc7OV6si2QRhJgtEzlXmgjtRGYUUy4~tv4w7SiEbkpBKNyQ0Wg__',
    type: 'On-Ground',
    points: 40,
    sdg: 'SDG 10 : Reduced Inequalities',
    date: '01 Oct, 2024 - 30 Nov, 2024',
    duration: '50 hr',
    users: [
      { image: 'https://i.pravatar.cc/150?img=1' },
      { image: 'https://i.pravatar.cc/150?img=2' },
      { image: 'https://i.pravatar.cc/150?img=3' },
    ],
    additionalUsers: 5,
  },
  {
    id: 2,
    title: 'Bright Bites',
    description:
      "This Women's Entrepreneurship Day, let's empower underserved women running small business...",
    image:
      'https://s3-alpha-sig.figma.com/img/4925/6686/2536992c32f72f58b66a7769a6226fd1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=a67iRkNKrfuO9FTJtxqySKsKg5XqiMxUz1NxW8eM5WfcZVDQT8QkUooHVg1CSh78LVVcG10OAmc-t2OIopz4itRPsaOYaYfvfebE0Ry30XoFWYamZZvFhpaeEW5vNaaf63K1bWbYtve9-3TOHs~5sl8vbA0ZEQxUn0sLDpGWgHkVloOodLSsRoMYFWdiq83kUNufCZeuByWzxJwewyIbkG~N~B5Z844DNOvbTdlZau~nJOb3qlqbRGYMvE~o0-FZfbLnvJ4w6npXKXS7I--Wd-~d4S7c1yAs73wi2UnUX4UjkBTsSyyNE-zj20h~vk9AvWr~sO61Ulh57uWYG~RmFQ__',
    type: 'On-Ground',
    points: 40,
    sdg: 'SDG 10 : Reduced Inequalities',
    date: '01 Oct, 2024 - 30 Nov, 2024',
    duration: '50 hr',
    users: [
      { image: 'https://i.pravatar.cc/150?img=4' },
      { image: 'https://i.pravatar.cc/150?img=5' },
      { image: 'https://i.pravatar.cc/150?img=6' },
    ],
    additionalUsers: 5,
  },
  {
    id: 3,
    title: 'Beat the sugar',
    description:
      "This Women's Entrepreneurship Day, let's empower underserved women running small business...",
    image:
      'https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__',
    type: 'On-Ground',
    points: 40,
    sdg: 'SDG 10 : Reduced Inequalities',
    date: '01 Oct, 2024 - 30 Nov, 2024',
    duration: '50 hr',
    users: [
      { image: 'https://i.pravatar.cc/150?img=7' },
      { image: 'https://i.pravatar.cc/150?img=8' },
      { image: 'https://i.pravatar.cc/150?img=9' },
    ],
    additionalUsers: 5,
  },
])
</script>
  
  <style scoped>
.back-img {
  background: url('https://s3-alpha-sig.figma.com/img/5fe6/fe04/058446e1c3ea035d2efd21a222ccb475?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=P-8K1XloauUtT7UVndu4L199Efq0NENaBmmYHpVZpgONi2Uxpbz6sP03gkJBPdo4LkhBZ1fbOgLHSF5Eq3RNvLCuSsdvhVTynPV2e7NlZ9TZqQFww3WueaAI-fXncdfG4xbhgvymccrF-Z0mLImqTne-4fbkk7I4tpHnChzjvmrENAMzsmMxFnhphfuatDa7~5RIlmLt84tmjiz2IBgoSZ3ZhV4WoGL7DQWE6OvV3uJ7JjoFHdUr9mNkWYKbcOJ~q0ehkwRR8XCYap4lG-BdlaOmQdG6ro1QlcixF~YEzhnDfvP1M4Gk00B~4lHnip9Hbzqkwml0NoehBoFPs-zkRQ');
  background-repeat: no-repeat;
  background-size: cover;
}

@media (max-width: 768px) {
  .back-img {
    background-position: center;
  }
}
</style>