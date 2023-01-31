<script lang="ts">
    import "./tabler.min.css"
    import "../app.css"
    import Footer from "$lib/components/layouts/dashboard/Footer.svelte"
    import Aside from "$lib/components/layouts/dashboard/Aside.svelte";

    import { SvelteToast } from '@zerodevx/svelte-toast'

    const options = {}
</script>

<div class="page">
    <SvelteToast {options} />
    <Aside/>
    <div class="page-wrapper">
        <slot/>
        <Footer/>
    </div>
</div>