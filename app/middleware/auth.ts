export default defineNuxtRouteMiddleware((to, from) => {
    if(!User.isAuthenticated) {
        abortNavigation()
        return navigateTo('/auth/login')
    }
})