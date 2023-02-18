<script lang="ts">
    import {onMount} from "svelte";

    onMount(() => {
        const myOffcanvas = document.getElementById('offcanvasEnd')
        myOffcanvas?.addEventListener('hidden.bs.offcanvas', event => {
            document.querySelectorAll<HTMLFormElement>('#offcanvasEnd form').forEach(elt => elt.reset())
            window?.jquery('.summernote').summernote('code', '');
        })
    })
</script>
<slot/>