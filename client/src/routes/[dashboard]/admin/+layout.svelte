<script lang="ts">
    import {userStore} from "$lib/store";
    import {onMount} from "svelte";
    import {Role} from "$lib/type";
    import {goto} from "$app/navigation";

    onMount(() => {
        userStore.subscribe(async value => {
            if (!value.authenticated)
                await goto('/')

            if (value.user == undefined || ![Role.ROLE_ADMIN, Role.ROLE_SUPER_ADMIN].includes(value.user?.role as number)) {
                await goto('/')
            }
        })
    })
</script>

<slot/>