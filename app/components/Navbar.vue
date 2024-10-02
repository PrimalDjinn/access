<template>
    <div class="w-full flex justify-center items-center">
        <nav class="flex w-10/12 justify-center items-center border-sky border-2">
            <ul class="flex justify-between w-full">
                <li>
                    <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/">
                        <span>Access</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/pricing">Pricing</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact">Contact</NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>