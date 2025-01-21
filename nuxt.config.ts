// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	future: {
		compatibilityVersion: 4,
	},
	modules: ["@nuxtjs/tailwindcss", "nuxt-echarts", "@nuxt/scripts"],
	css: ["~/assets/scss/base.scss"],
	echarts: {
		components: ["TooltipComponent"],
		charts: ["PieChart"],
	},
	imports: {
		dirs: ["../shared/types", "../shared/utils"],
	},
	nitro: {
		imports: {
			dirs: ["./shared/utils", "./shared/types", "./server/utils"],
		},
	},
	app: {
		pageTransition: { name: "page", mode: "out-in" },
	},
	runtimeConfig: {
		public: {
			googleCalendarBookLink: ""
		}
	}
});