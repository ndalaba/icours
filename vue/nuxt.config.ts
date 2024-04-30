// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            script: [
                {src: '/js/jquery.min.js'},
                {src: '/js/bootstrap.min.js'},
            ],
        }
    },
})
