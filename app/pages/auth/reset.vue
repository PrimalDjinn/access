<template>
  <Title>Login</Title>
  <div class="wrapper"></div>
  <div class="border border-sky bg-light/20 rounded-2xl w-[600px] m-auto mt-20 p-10 shadow-md shadow-sky">
    <form @submit.prevent class="flex flex-col gap-8">
      <div>
        <h2 class="text-lg uppercase font-serif">a11y.</h2>
        <h1 class="text-4xl font-sans font-bold">Reset</h1>
      </div>
      <div class="flex flex-col gap-1">
        <label for="email" class="font-mono text-lg">Email</label>
        <input type="email" id="email" placeholder="username@mail.com"
               class="rounded-md px-3 py-2 focus:ring-1 outline-none focus:ring-sky focus:ring-opacity-50 border border-[#bdc6d7]"
               autocomplete="email">
        <small class="font-mulish text-gray">Enter the email you used during sign up</small>
      </div>
      <div>
        <button type="submit"
                class="bg-peach w-full text-white rounded-md px-3 py-2 hover:bg-peach/90 transition-colors duration-300 ease-in-out">
          Reset
        </button>
      </div>
      <p class="text-center text-sm font-mono capitalize mt-1">
        Don't have an account?
        <NuxtLink to="/auth/register" class="text-dark font-bold hover:underline">Register</NuxtLink>
      </p>
    </form>
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
<script setup lang="ts">
</script>