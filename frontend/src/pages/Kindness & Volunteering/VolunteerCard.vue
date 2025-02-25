<template>
    <article class="flex flex-col w-full">
        <div class="flex relative flex-col py-3 pr-3 w-full rounded-xl aspect-[1.557]">
            <img :src="imageSrc" alt="" class="object-cover rounded-md absolute inset-0 size-full" />
            <div
                class="flex relative justify-between text-xs font-medium tracking-normal leading-none text-justify text-neutral-950">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4138a280b3a136bb112c9be5ef23c1ce3a12d516daa8cede29ad404bcb75a31b?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                    alt="" class="object-contain shrink-0 max-w-full aspect-[4.03] w-[101px]" />
                <div
                    class="flex flex-col rounded-lg px-2 justify-center h-6  bg-white border border-solid">
                    <div class="flex gap-1 items-center w-full">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c49a0afe7089e38e103d66c4c361731bed25ed9dfbe5b58de7105c730d3c6d93?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                            alt="" class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                        <span class="self-stretch my-auto">{{ points }} Points</span>
                    </div>
                </div>
            </div>
            <div class="flex relative gap-3 items-center self-start mt-36 ml-3 max-md:mt-10 max-md:ml-2.5">
                <img v-for="(badge, index) in badgeImages" :key="index" :src="badge" alt=""
                    class="object-contain shrink-0 self-stretch my-auto aspect-[0.92] w-[34px]" />
            </div>
        </div>

        <h3 class="self-start mt-3 text-base font-medium tracking-normal text-neutral-950">
            {{ title }}
        </h3>

        <p class="mt-2 text-xs tracking-normal leading-3 text-justify text-[#666666]">
            {{ description }}
        </p>

        <div class="flex gap-5 justify-between mt-4">
            <div class="flex flex-col text-justify">
                <div class="flex gap-1 items-center text-xs tracking-normal text-neutral-950">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/206e5d29b5523c409dbfe316e887c82aeb672c336764aad169ece16b133845e4?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                        alt="" class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                    <time class="self-stretch my-auto">{{ date }}</time>
                </div>
                <div class="flex gap-1 items-center self-start mt-4 text-xs tracking-normal text-stone-500">
                    <img :src="participantImages" alt=""
                        class="object-contain shrink-0 self-stretch my-auto aspect-[2.16] w-[65px]" />
                    <span class="self-stretch my-auto">+5 more</span>
                </div>
            </div>
            <div class="flex flex-col self-start">
                <div class="flex gap-1 items-center self-end text-xs tracking-normal text-justify text-neutral-950">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/193573c664d98aa3d1c71908aad0cbb8163b462f0553be41c395306a299aa57f?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                        alt="" class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                    <span class="self-stretch my-auto">{{ hours }} hr</span>
                </div>
                <button
                    class="flex gap-1 items-center mt-6 text-sm font-medium tracking-normal text-right text-orange-600 uppercase hover:text-orange-700">
                    <router-link :to="`/kindness-volunteering/${type}`" class="self-stretch my-auto">
                        {{ type === 'kindness' ? 'Act now' : 'I want to help' }}
                    </router-link>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb34dd02beac2ec2e17320d59938a8e4f1f75c978b7f31db85369770609c9c38?placeholderIfAbsent=true&apiKey=ef196b73f352421e818afb6843ffc193"
                        alt="" class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                </button>
            </div>
        </div>
    </article>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    badgeImages: {
        type: Array,
        required: true,
    },
    participantImages: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});
</script>