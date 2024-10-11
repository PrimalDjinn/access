<template>
    <div class="w-full flex justify-center items-center text-dark z-10">
        <nav
            class="flex w-10/12 justify-between items-center border-sky border text-lg px-3 py-1 mt-4 bg-white rounded isolate relative navbar">
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
                        <span class="uppercase text-3xl">a11y.</span>
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
                <NuxtLink v-if="!User.isAuthenticated" class="bg-navy px-8 py-2 rounded-sm text-white font-bold"
                    to="/auth/login">Login</NuxtLink>
                <div class="rounded-xl p-[6px] text-white font-bold bg-white border-2 border-navy relative overflow-hidden cursor-pointer"
                    v-else @click="toggleDropdown">
                    <img :src="User.profilePicture" alt="Profile Picture"
                        class="object-cover h-8 w-10 rounded-full aspect-square opacity-80 grayscale" />
                    <div class="absolute w-full h-full bg-navy/15 top-0 left-0 hover:bg-transparent transition-colors"></div>
                </div>
                <ul ref="dropdown" class="absolute border w-40 text-center dropdown text-dark right-0 bg-sky/10 rounded-b-md">
                    <li class="hover:bg-sky/20 w-full transition-colors">
                        <button @click="logout">Log Out</button>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script setup lang="ts">
const dropdown = ref<HTMLDivElement | null>(null);

function toggleDropdown() {
    if (!dropdown.value) return console.warn('Dropdown not found');
    dropdown.value.classList.toggle('active');
}

function logout() {
    $fetch("/api/auth/logout", {
        headers: {
            Authorization: `Bearer ${User.authToken}`
        },
        onResponse({ response }) {
            if (!response.ok) return
            User.value = null
            User.authToken = null
            toggleDropdown()
        },
        onResponseError({ response }) {
            alertError(unWrapFetchError(response, true))
        },
        onRequestError({ error }) {
            alertError(error.message)
        }
    })
}
</script>
<style scoped lang="scss">
.navbar {
    filter: drop-shadow(0px 10px 10px rgba(90, 169, 230, 0.1));
    height: 65px;
}

.dropdown {
    transform: translateY(-100%);
    z-index: -1;
    isolation: unset;
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
    pointer-events: none;

    &.active {
        transform: translateY(0);
        z-index: 10;
        opacity: 1;
        pointer-events: all;
    }
}
</style>