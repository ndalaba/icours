import {UserStore} from "~/composables/store";

export default defineNuxtRouteMiddleware((to, from) => {
    if (!UserStore.authenticated) return navigateTo('/connexion')

    if(UserStore.user==undefined || ![Role.ROLE_ADMIN, Role.ROLE_SUPER_ADMIN].includes(UserStore.user?.role as number) )
        return navigateTo('/')
})