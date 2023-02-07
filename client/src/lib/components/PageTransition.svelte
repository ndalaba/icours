<script lang="ts">
    import {fly} from "svelte/transition"

    export let pathname = ""
    const duration = 300

</script>

{#key pathname}
    <div in:fly={{x:-10,duration:duration,delay:duration}} out:fly={{x:5,duration:duration}}>
        <slot></slot>
    </div>
{/key}