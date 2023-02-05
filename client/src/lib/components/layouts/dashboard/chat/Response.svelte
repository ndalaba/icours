<script lang="ts">
    export let response = ""
    /*onMount(() => {
        let curr = 0;
        const Write = function write() {
            content.textContent = content.textContent + response.charAt(curr);
            curr++;
            if (curr < response.length)
                window.setTimeout(write, 10);
        };
       Write();
    })*/

</script>
<div style="width: 100%;">
    <div class="p-2 bg-light" style="display: flex;">
        <div class="p-2">
            <div class="p-2 text-white border-2" style="background-color: rgb(165, 23, 23);border-radius: .5rem;">I-COURS</div>
        </div>
        <div class="p-2">
            {@html response}
        </div>
    </div>
</div>