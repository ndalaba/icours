<script lang="ts">
    import type {ChapterType, CourseType} from "$lib/type";
    import {deleteRequest} from "$lib/helper/Request";
    import {createEventDispatcher} from "svelte";
    import {success} from "$lib/helper/Toaster";
    import {alert} from "$lib/helper/alert";
    import Edit from "$lib/components/icons/Edit.svelte";
    import ListPlaceholder from "$lib/components/layouts/dashboard/ListPlaceholder.svelte";

    const dispatch = createEventDispatcher()

    export let chapters: ChapterType[] = []
    export let course: CourseType
    export let loading: boolean = true

    let filteredChapters: ChapterType[]
    let search: string = ""

    $: filteredChapters = chapters.filter(chapter => chapter.title.toLowerCase().includes(search.toLowerCase()))

    function deleteChapter(uid: string) {
        alert({
            actionLabel: "Envoyer",
            show: false,
            title: "Suppression",
            description: "Supprimer ce chapitre",
            callable: function () {
                deleteRequest('/chapters/' + uid).then(_ => {
                    dispatch('chapter-updated')
                    success(`Chapitre supprimé.`)
                })
            }
        })
    }

    function updateChapter(chapter: ChapterType) {
        document.getElementById('open_canvas')?.click()
        dispatch('chapter-update-request', {data: chapter})
    }

</script>

<div class="row">
    <div class="row row-cards">
        <div class="col-lg-8">
            <div class="card card-lg">
                <div class="card-body">
                        {@html course?.content}
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <span class="pe-4">CHAPITRES DU COURS</span>
                    <a aria-controls="offcanvasEnd" class="btn btn-outline-secondary d-none d-sm-inline-block" data-bs-toggle="offcanvas" href="#offcanvasEnd" id="open_canvas" role="button">
                        <Edit/>
                        Ajouter un chapitre
                    </a>
                </div>
                <div class="card-body">
                    {#if loading}
                        <ListPlaceholder/>
                    {:else}
                        {#each filteredChapters as chapter }

                            <div class="border-bottom border-color-20 py-3 d-md-flex align-items-center">
                                <div class="d-flex align-items-center me-auto mb-4 mb-md-0" style="width: 76%">
                                    <div class="text-secondary d-flex">
                                        <span class={`badge ${chapter.published ? 'bg-teal' : 'bg-danger'}`}>{chapter.published ? 'Publié' : 'Brouillon'}</span>
                                    </div>
                                    <div class="ms-2">{chapter.title}</div>
                                </div>

                                <div class="dropdown">
                                    <button class="btn btn-ghost-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Action
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <button class="dropdown-item" type="button" on:click|preventDefault={()=>updateChapter(chapter)}>Modifier</button>
                                        </li>
                                        <li>
                                            <button class="dropdown-item text-danger" type="button" on:click|preventDefault={()=>deleteChapter(chapter.uid)}>Supprimer</button>
                                        </li>
                                    </ul>
                                </div>

                            </div>

                        {/each}
                        {#if !filteredChapters.length}
                            <h2 class="text-center mt-5">Aucun chapitre n'a été ajouté à ce cours</h2>
                        {/if}
                    {/if}
                </div>
            </div>
        </div>
    </div>

</div>