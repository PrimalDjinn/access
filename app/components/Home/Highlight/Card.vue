<template>
    <div class="bg-sky/50 backdrop-blur rounded-2xl w-72 p-2 pb-4 flex flex-col justify-between max-sm:w-[80vw]">
        <div class="grid place-items-center icon-container">
            <slot name="icon"></slot>
        </div>
        <p class="text-center text-dark font-sans font-light text-xl">
            <slot name="tagline"></slot>
        </p>
    </div>
</template>
<style scoped lang="scss">
.icon-container {

    svg,
    img {
        width: 100px;
        height: 100px;
    }
}
</style>