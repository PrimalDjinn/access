<script setup lang="ts">
import type { NodeResult, Result } from 'axe-core';


defineProps<{
    listing: Result,
    tab: "incomplete" | "inapplicable" | "critical" | "pass"
}>();

function checkResult(node: NodeResult) {
    return node.all.concat(node.any).concat(node.none);
}
</script>
<template>
    <td colspan="4" v-if="tab !== 'inapplicable'">
        <hr class="m-auto w-[90%] mb-3 border-sky/30">
        <div class="m-auto w-[90%] bg-dark/20 rounded">
            <p class="uppercase text-sm px-2 py-1 font-semibold">
                <span v-if="tab === 'critical'" class="text-red-500 font-bolder">Failing</span>
                <span v-else-if="tab === 'incomplete'" class="text-yellow-500 font-bolder">Incomplete</span>
                <span v-else-if="tab === 'pass'" class="text-green-500 font-bolder">Passing</span>
                elements
            </p>
            <div v-for="(node, index) of listing.nodes" :key="index" class="p-2 border-b w-full border-dark/30 detail">
                <div class="bg-white text-navy rounded-sm py-0.5 pb-2 px-2 m-auto mb-2 overflow-auto">
                    <ListingCode :node="node" />
                </div>
                <div>
                    <div class="flex gap-1 items-center font-bold text-sm uppercase mt-3 mb-2">
                        <span>Summary</span>
                        <span>
                            <NuxtLink :external="true" :to="listing.helpUrl" target="_blank"
                                class="top-1 right-2 hover:text-peach cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-4 h-4">
                                    <path
                                        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z">
                                    </path>
                                </svg>
                            </NuxtLink>
                        </span>
                    </div>
                    <div class="mt-1">
                        <table class="table-fixed bg-white text-dark rounded-sm p-1 w-full">
                            <thead class="border-b border-dark">
                                <tr>
                                    <th class="w-1/5 p-1 pl-4 text-left">Impact</th>
                                    <th class="w-4/5 border-l p-1 border-dark text-left">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(failure, index) of checkResult(node)" :key="index"
                                    class="border-sky/40 border-b">
                                    <td class="p-1 pl-4 text-left">
                                        <span v-if="failure.impact === 'critical'" class="text-red-500">Critical</span>
                                        <span v-else-if="failure.impact === 'serious'"
                                            class="text-yellow-500">Serious</span>
                                        <span v-else-if="failure.impact === 'moderate'"
                                            class="text-yellow-500">Moderate</span>
                                        <span v-else class="text-green-500">Minor</span>
                                    </td>
                                    <td class="border-l p-1 border-dark">{{ failure.message }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </td>
</template>
<style scoped>
.detail:not(:last-child) {
    @apply border-t border-sky/30 mb-2;
}

.detail:last-child {
    margin-bottom: 1rem;
}
</style>