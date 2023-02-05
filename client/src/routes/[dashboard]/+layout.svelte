<script lang="ts">
    import "./tabler.min.css"
    import "../app.css"
    import Footer from "$lib/components/layouts/dashboard/Footer.svelte"
    import Aside from "$lib/components/layouts/dashboard/Aside.svelte";

    import { SvelteToast } from '@zerodevx/svelte-toast'
    import Alert from "$lib/components/layouts/dashboard/Alert.svelte";
    import Chat from "$lib/components/layouts/dashboard/chat/Chat.svelte";

    const options = {}
</script>

<div class="page">
    <SvelteToast {options} />
    <Alert/>
    <Aside/>
    <div class="page-wrapper">
        <slot/>
        <Footer/>
    </div>
    <Chat/>
</div>