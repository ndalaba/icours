<script lang="ts">
    import {alertStore, close} from "$lib/helper/alert";

    function doAction() {
        if ($alertStore.callable !== undefined)
            $alertStore.callable()
        close()
    }
</script>
{#if $alertStore.show}
    <div aria-modal="true" class="modal modal-blur fade show" id="modal-danger" role="dialog" style="display: block;" tabindex="-1">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" on:click={close} type="button"></button>
                <div class="modal-status bg-danger"></div>
                <div class="modal-body text-center py-4">
                    <svg class="icon mb-2 text-danger icon-lg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
                        <path d="M12 9v2m0 4v.01"></path>
                        <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"></path>
                    </svg>
                    <h3>{$alertStore.title}</h3>
                    <div class="text-muted">{$alertStore.description}</div>
                </div>
                <div class="modal-footer">
                    <div class="w-100">
                        <div class="row">
                            <div class="col">
                                <a class="btn w-100" data-bs-dismiss="modal" on:click={close}> Annuler </a>
                            </div>
                            <div class="col">
                                <a class="btn btn-danger w-100" data-bs-dismiss="modal" on:click={doAction}>
                                    {$alertStore.actionLabel !== undefined ? $alertStore.actionLabel : "Envoyer"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}