<template>
    <VChart :option="option" style="height: 230px; width: 400px;" :autoresize="true" />
</template>
<script setup lang="ts">
const props = defineProps({
    data: Object as PropType<{
        value: number,
        name: string
    }[]>
})

const option = ref<ECOption>({
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
    },
    series: {
        type: 'pie',
        padAngle: 1,
        itemStyle: {
            borderRadius: 2,
        },
        data: props.data,
        labelLine: {
            smooth: 0.2,
        },
    }
})

watch(() => props.data, (newData) => {
    option.value.series.data = newData
})
</script>