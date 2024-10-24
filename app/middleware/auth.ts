export default defineNuxtRouteMiddleware((to, from) => {
    if(!User.authCookie) {
        abortNavigation()
        return navigateTo('/auth/login')
    }
})