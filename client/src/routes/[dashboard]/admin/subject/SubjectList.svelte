<script lang="ts">
    import type {SubjectType} from "$lib/type";
    import Trash from "$lib/components/icons/Trash.svelte";
    import Edit from "$lib/components/icons/Edit.svelte";
    import ListPlaceholder from "$lib/components/layouts/dashboard/ListPlaceholder.svelte";

    export let subjects: SubjectType[] = []
</script>
<div class="card mb-2">
    <div class="card-body">
        <div class="row justify-content-between">
            <div class="col-auto">
                <form class="mb-2 mb-sm-0">
                    <label class="visually-hidden" for="inputPassword2">Search</label>
                    <input class="form-control" id="inputPassword2" placeholder="Search..." type="search">
                </form>
            </div>
            <div class="col-sm-3">
                <div class="text-sm-end">
                    <button class="btn btn-secondary" type="button">
                        <i class="fa fa-plus-circle"></i> Add New
                    </button>
                </div>
            </div><!-- end col-->
        </div>
    </div> <!-- end card-body-->
</div>
{#if !subjects.length}
    <ListPlaceholder/>
{:else}
    {#each subjects as subject }
        <div class="card mb-2">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-sm-4">
                        <div class="d-flex align-items-start">
                            <img alt="Generic placeholder image" class="d-flex align-self-center me-3 rounded-4" height="64" src="https://preview.tabler.io/static/avatars/000m.jpg">
                            <div class="w-100">
                                <h4 class="mt-0 mt-3 font-16">{subject.subject}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <p class="mb-1 mt-3 mt-sm-0">
                            {subject.description}
                        </p>
                    </div>

                    <div class="col-sm-2">
                        <div class="text-sm-end">
                            <a>
                                <Edit/>
                            </a>
                            <a>
                                <Trash/>
                            </a>
                        </div>
                    </div> <!-- end col-->
                </div> <!-- end row -->
            </div>
        </div>
    {/each}
{/if}