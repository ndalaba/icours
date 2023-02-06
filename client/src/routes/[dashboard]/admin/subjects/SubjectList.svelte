<script lang="ts">
    import type {SubjectType} from "$lib/type";
    import Trash from "$lib/components/icons/Trash.svelte";
    import Edit from "$lib/components/icons/Edit.svelte";
    import ListPlaceholder from "$lib/components/layouts/dashboard/ListPlaceholder.svelte";
    import Plus from "$lib/components/icons/Plus.svelte";
    import {deleteRequest} from "$lib/helper/Request";
    import {createEventDispatcher} from "svelte";
    import {SERVER_UPLOAD_PATH} from "$lib/helper/Constants.js";
    import {success} from "$lib/helper/Toaster";
    import {alert} from "$lib/helper/alert";

    const dispatch = createEventDispatcher()
    export let subjects: SubjectType[] = []

    let filteredSubjects: SubjectType[]
    let search: string = ""

    $: filteredSubjects = subjects.filter(subject => subject.name.toLowerCase().includes(search.toLowerCase()))

    function deleteSubject(uid: string) {
        alert({
            actionLabel: "Envoyer",
            show: false,
            title: "Suppression",
            description: "Supprimer cet élément",
            callable: function () {
                deleteRequest('/subjects/' + uid).then(_ => {
                    dispatch('subject-updated')
                    success(`Matière supprimée.`)
                })
            }
        })
    }

    function updateSubject(subject: SubjectType) {
        dispatch('subject-update-request', {data: subject})
    }

</script>

<div class="card mb-2">
    <div class="card-body">
        <div class="row justify-content-between">
            <div class="col-auto">
                <form class="mb-2 mb-sm-0">
                    <label class="visually-hidden" for="search">Search</label>
                    <input bind:value={search} class="form-control" id="search" placeholder="Rechercher..." type="search">
                </form>
            </div>
            <div class="col-sm-3">
                <div class="text-sm-end">
                    <button class="btn btn-ghost-primary" type="button">
                        <Plus/>
                        Ajouter
                    </button>
                </div>
            </div><!-- end col-->
        </div>
    </div> <!-- end card-body-->
</div>
{#if !subjects.length}
    <ListPlaceholder/>
{:else}
    {#each filteredSubjects as subject }
        <div class="card mb-2">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-sm-4">
                        <div class="d-flex align-items-start">
                            <img alt={subject.name} class="d-flex align-self-center me-3 rounded-4" height="64" src={SERVER_UPLOAD_PATH + subject.image}>
                            <div class="w-100">
                                <h4 class="mt-0 mt-3 font-16">{subject.name}</h4>
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
                            <a class="m-lg-2" on:click|preventDefault={()=>updateSubject(subject)}>
                                <Edit/>
                            </a>
                            <a class="m-lg-2" on:click|preventDefault={()=>deleteSubject(subject.uid)}>
                                <Trash/>
                            </a>
                        </div>
                    </div> <!-- end col-->
                </div> <!-- end row -->
            </div>
        </div>
    {/each}
{/if}