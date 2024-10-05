<script setup lang="ts">
const notification = ref<HTMLDivElement | null>(null)
const props = defineProps({
    message: String,
    timeout: {
        type: Object as PropType<number | 'never'>,
        default: 5000
    },
    intensity: {
        type: String as PropType<'info' | 'success' | 'error'>,
        default: 'info'
    }
})

function close() {
    notification.value?.classList.add('closing')
    setTimeout(() => notification.value?.remove(), 500)
}

onMounted(() => {
    if (props.timeout !== 'never') {
        setTimeout(() => {
            notification.value?.classList.remove('opening')
            close()
        }, props.timeout)
    }
})
</script>

<template>
    <Teleport to="#notification-dock">
        <div ref="notification"
            class="flex items-center justify-between rounded-md p-4 w-1/3 min-w-96 backdrop-blur opening"
            :class="intensity">
            <div class="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    v-if="intensity === 'info'">
                    <path
                        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5C11.1716 9.5 10.5 8.82843 10.5 8C10.5 7.17157 11.1716 6.5 12 6.5C12.8284 6.5 13.5 7.17157 13.5 8Z"
                        class="fill-dark" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    v-else-if="intensity === 'success'">
                    <path
                        d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"
                        class="fill-dark" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-else>
                    <path
                        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
                        class="fill-dark" />
                </svg>
                <p class="text-dark">
                    <slot>{{ message }}</slot>
                </p>
            </div>
            <div class="cursor-pointer hover:bg-light rounded-full p-1" @click="close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                        fill="black" />
                </svg>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.info {
    background-color: hsla(190, 59%, 90%, 0.8);
    border: 2px solid #3681CB;
}

.success {
    background-color: hsla(122, 71%, 93%, 0.8);
    border: 2px solid #4CAF50;
}

.error {
    background-color: hsla(0, 59%, 90%, 0.8);
    border: 2px solid #FF0B0B;
}

.closing {
    animation: close 0.5s ease-in-out forwards;
}

.opening {
    animation: open 0.5s ease-in-out forwards;
}

@keyframes close {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(0);
        opacity: 0;
    }
}

@keyframes open {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>