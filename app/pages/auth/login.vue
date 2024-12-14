<script setup lang="ts">
import type {Drizzle} from "~~/server/db/types";

const loading = ref(false)
const data = reactive({
  email: '',
  password: ''
})

async function submit(){
  loading.value = true
  const response = await $fetch<{
    user: Drizzle.User.select,
    token: string
  }>("/api/auth/login", {
    method: "POST",
    body: data,
    onResponseError({response}){
      window.alertError(unWrapFetchError(response, 'none'))
    },
    onRequestError({error}){
      window.alertError(error.message)
    }
  })

  if(!response) return
  loading.value = false
  User.value = response.user
  User.authToken = response.token
  await navigateTo("/a11y")
}
</script>
<template>
  <div>
    <Title>A11y | Login</Title>
  <div class="wrapper"></div>
  <div class="border border-sky bg-light/20 rounded-2xl max-sm:rounded w-[600px] max-w-[90vw] m-auto mt-20 p-10 shadow-md shadow-sky max-sm:mt-10">
    <form @submit.prevent="submit" class="flex flex-col gap-8 max-sm:gap-4">
      <div>
        <h2 class="text-lg uppercase font-serif">A11Y</h2>
        <h1 class="text-4xl font-sans font-bold">Login</h1>
      </div>
      <div class="flex flex-col gap-1">
        <label for="email" class="font-mono text-lg">Email</label>
        <input type="email" id="email" placeholder="username@mail.com" v-model="data.email"
               class="rounded-md px-3 py-2 focus:ring-1 outline-none focus:ring-sky focus:ring-opacity-50 border border-[#bdc6d7]"
               autocomplete="email">
      </div>
      <div class="flex flex-col gap-1">
        <label for="password">Password</label>
        <input type="password" id="password" autocomplete="current-password" v-model="data.password"
               class="rounded-md px-3 py-2 focus:ring-1 outline-none focus:ring-sky focus:ring-opacity-50 border border-[#bdc6d7]">
        <NuxtLink class="text-xs hover:underline font-mulish" to="/auth/reset">Forgot Password?</NuxtLink>
      </div>
      <div>
        <button type="submit" :disabled="loading"
                class="bg-peach w-full text-white rounded-md px-3 py-2 hover:bg-peach/90 transition-colors duration-300 disabled:cursor-not-allowed ease-in-out">
          <span v-if="!loading">Sign In</span>
          <span :class="{ 'animate-spin': loading }" class="w-full grid place-items-center" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path
                d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z">
              </path>
            </svg>
          </span>
        </button>
      </div>
      <p class="text-center text-sm font-mono capitalize">
        or continue with
      </p>
      <div class="flex justify-center gap-x-6 items-center w-full -mt-2">
        <button class="bg-white rounded-md px-4 py-2 border border-[#bdc6d7] hover:bg-[#e8f0fe] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_22_4029)">
              <path
                  d="M23.7662 9.64963H22.7996V9.59983H11.9998V14.3998H18.7815C17.7921 17.1939 15.1335 19.1997 11.9998 19.1997C8.02366 19.1997 4.79992 15.9759 4.79992 11.9998C4.79992 8.02366 8.02366 4.79992 11.9998 4.79992C13.8352 4.79992 15.5049 5.4923 16.7763 6.62329L20.1705 3.22914C18.0273 1.23178 15.1605 0 11.9998 0C5.37291 0 0 5.37291 0 11.9998C0 18.6267 5.37291 23.9996 11.9998 23.9996C18.6267 23.9996 23.9996 18.6267 23.9996 11.9998C23.9996 11.1952 23.9168 10.4098 23.7662 9.64963Z"
                  fill="#FFC107"/>
              <path
                  d="M1.38281 6.41449L5.32534 9.30584C6.39213 6.66468 8.97568 4.79992 11.999 4.79992C13.8344 4.79992 15.5042 5.4923 16.7755 6.62328L20.1697 3.22914C18.0265 1.23178 15.1598 0 11.999 0C7.38991 0 3.39278 2.60215 1.38281 6.41449Z"
                  fill="#FF3D00"/>
              <path
                  d="M12 24C15.0995 24 17.9159 22.8138 20.0452 20.8848L16.3313 17.7421C15.086 18.6891 13.5644 19.2013 12 19.2001C8.87881 19.2001 6.22865 17.2099 5.23027 14.4326L1.31714 17.4475C3.3031 21.3336 7.33623 24 12 24Z"
                  fill="#4CAF50"/>
              <path
                  d="M23.7662 9.64964H22.7996V9.59984H11.9998V14.3998H18.7814C18.3082 15.7296 17.4557 16.8916 16.3293 17.7423L16.3311 17.7411L20.045 20.8838C19.7822 21.1226 23.9996 17.9997 23.9996 11.9998C23.9996 11.1952 23.9168 10.4098 23.7662 9.64964Z"
                  fill="#1976D2"/>
            </g>
            <defs>
              <clipPath id="clip0_22_4029">
                <rect width="24" height="24" rx="12" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>
        <button class="bg-white rounded-md px-4 py-2 border border-[#bdc6d7] hover:bg-[#e8f0fe] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_22_4037)">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
                    fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_22_4037">
                <rect width="24" height="24" rx="12" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <p class="text-center text-sm font-mono capitalize mt-1">
        Don't have an account?
        <NuxtLink to="/auth/register" class="text-dark font-bold hover:underline">Register</NuxtLink>
      </p>
    </form>
  </div>
  </div>
</template>
<style scoped>
.wrapper {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 5rem;
  min-width: 100vw;
  min-height: 100vh;
  background: radial-gradient(100.76% 179.14% at -2.4% -2.78%, #FFFFFF 25.3%, #E0FBFC 100%)
}

.shadow-md.shadow-sky{
  box-shadow: 2px 4px 10px rgba(152, 193, 217, 0.25);
  backdrop-filter: blur(10px);
}
</style>