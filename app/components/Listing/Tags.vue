<script setup lang="ts">
defineProps<{
    tags: string[]
}>()
</script>

<template>
    <div class="flex flex-nowrap w-72 items-center p-2 overflow-scroll no-scrollbar rounded gap-1" title="Hold shift and use the scroll wheel to scroll">
        <span v-for="tag of tags" :key="tag"
            class="px-2 w-max text-sm text-nowrap py-1 bg-gray-300 text-dark font-semibold rounded font-mono">
            {{ tag }}
        </span>
    </div>
</template>