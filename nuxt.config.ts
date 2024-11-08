// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-echarts'],
  css: [
    '~/assets/scss/base.scss',
    '~/assets/css/hljs.css'
  ],
  echarts: {
    components: ['TooltipComponent'],
    charts: ['PieChart'],
  }
})