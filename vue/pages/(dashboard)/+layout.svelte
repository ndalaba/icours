<script lang="ts">
    import "../tabler.min.css"
    import "../app.css"

    import {SvelteToast} from '@zerodevx/svelte-toast'
    import Alert from "$lib/components/layouts/dashboard/Alert.svelte";
    import Aside from "$lib/components/layouts/dashboard/Aside.svelte";
    import Footer from "$lib/components/layouts/dashboard/Footer.svelte";
    import Chat from "$lib/components/layouts/dashboard/chat/Chat.svelte";
    import PageTransition from "$lib/components/PageTransition.svelte";

    const options = {}
    export let data
</script>

<div class="page">
    <SvelteToast {options}/>
    <Alert/>
    <Aside/>
    <div class="page-wrapper">
        <PageTransition  pathname={data.pathname}>
            <slot/>
        </PageTransition>
        <Footer/>
    </div>
    <Chat/>
</div>