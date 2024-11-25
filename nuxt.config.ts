// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-echarts', '@nuxt/scripts'],
  css: [
    '~/assets/scss/base.scss',
  ],
  echarts: {
    components: ['TooltipComponent'],
    charts: ['PieChart'],
  }
})