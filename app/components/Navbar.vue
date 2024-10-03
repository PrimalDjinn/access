<template>
    <div class="w-full flex justify-center items-center text-dark">
        <nav class="flex w-10/12 justify-between items-center border-sky border text-lg px-3 py-1 mt-4 bg-white rounded isolate relative navbar">
            <div>
                <svg class="h-12" viewBox="0 0 65 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 5C0 2.23858 2.23858 0 5 0H35C51.5685 0 65 13.4315 65 30C65 46.5685 51.5685 60 35 60H5C2.23858 60 0 57.7614 0 55V5Z"
                        fill="#3D5A80" />
                </svg>
            </div>
            <ul class="flex justify-center w-full font-serif gap-x-20 items-center text-xl -z-10 absolute">
                <li>
                    <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/">
                        <span class="uppercase text-3xl">Access.</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/pricing">Pricing</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact">Contact</NuxtLink>
                </li>
            </ul>
            <div>
                <NuxtLink class="bg-navy px-8 py-2 rounded-sm text-white font-bold" to="/auth/login">Login</NuxtLink>
            </div>
        </nav>
    </div>
</template>
<style scoped>
.navbar {
    filter: drop-shadow(0px 10px 10px rgba(90, 169, 230, 0.1));
    height: 65px;
}
</style>