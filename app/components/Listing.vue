<script setup lang="ts">
import type {Result} from "axe-core"

defineProps<{
  listing: Result
}>()

const carouselContainer = ref<HTMLElement | null>(null);
const items = ref<Element[]>([]);
const activeItemIndex = ref(0);

function scrollTo(index: number) {
  if (!items.value.length) return;
  if (index < 0) {
    index = items.value.length - 1
  }

  if (index >= items.value.length) {
    index = 0
  }

  items.value[index]!.classList.add('active');
  activeItemIndex.value = index;

  const scrollWidth = carouselContainer.value!.scrollWidth;
  console.log(scrollWidth, items.value.length, index);
  carouselContainer.value!.scrollTo({
    left: (scrollWidth / items.value.length) * index - 16,
    behavior: 'smooth'
  });
}

function scrollRight(event: Event) {
  const target = event.target as HTMLElement | null;
  if (!target) return console.warn('No target found', event);

  target.classList.add('squish');
  setTimeout(() => target.classList.remove('squish'), 500);

  items.value[activeItemIndex.value]!.classList.remove('active');
  scrollTo(activeItemIndex.value + 1);
}

function scrollLeft(event: Event) {
  const target = event.target as HTMLElement | null;
  if (!target) return console.warn('No target found', event);

  target.classList.add('squish');
  setTimeout(() => target.classList.remove('squish'), 500);

  items.value[activeItemIndex.value]!.classList.remove('active');
  scrollTo(activeItemIndex.value - 1);
}

onMounted(() => {
  const carousel_items = document.getElementById("carousel_items")
  if (carouselContainer.value && carousel_items) {
    items.value = Array.from(carousel_items.children)
    let activeIndex = items.value.findIndex(item => item.classList.contains('active'));
    if (activeIndex !== -1) items.value[activeIndex]!.classList.remove('active');
    scrollTo(activeItemIndex.value);
  }
})
</script>

<template>
  <div class="flex items-center justify-between relative w-40">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 cursor-pointer absolute -left-10" @click="scrollLeft">
      <path
          d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
    </svg>
    <div class="grid gap-2 overflow-auto no-scrollbar grid-flow-col" ref="carouselContainer" id="carousel_items">
      <span v-for="tag of listing.tags"
            class="px-2 w-max text-sm py-1 bg-gray-300 text-dark font-semibold rounded font-mono">
        {{ tag }}
      </span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 cursor-pointer absolute -right-10" @click="scrollRight" v-if="activeItemIndex !== items.length - 1">
      <path
          d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
    </svg>
  </div>
</template>

<style scoped>
.squish {
  animation: squish 0.5s infinite;
}

@keyframes squish {
  0% {
    scale: 1;
  }

  50% {
    scale: 0.85;
  }

  100% {
    scale: 1;
  }
}
</style>