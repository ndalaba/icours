<script lang="ts">
    import type {ChapterType, CourseType} from "$lib/type";
    import {deleteRequest, getRequest} from "$lib/helper/Request";
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
        document.getElementById('open_canvas').click()
        dispatch('chapter-update-request', {data: chapter})
    }

    function findCourses(event: SubmitEvent) {
        const data = new FormData(event.target as HTMLFormElement)
        getRequest(`/chapters/${course?.id}?published=${data.get('published')}`).then(response => filteredChapters = response.data)
    }

</script>
<div class="row mb-4">
    <div class="col-12">
        <div class="row justify-content-between">
            <div class="col-md-9">
                <form class="d-flex flex-wrap align-items-center" on:submit|preventDefault={findCourses}>
                    <div class="me-3 w-50">
                        <input bind:value={search} class="form-control my-1 my-md-0" id="search" placeholder="Rechercher..." type="search">
                    </div>
                    <div class="me-sm-3">
                        <select class="form-select my-1 my-md-0" name="published">
                            <option selected value="2">État</option>
                            <option value="1">Publié</option>
                            <option value="0">Brouillon</option>
                        </select>
                    </div>
                    <div class="me-sm-3">
                        <div class="col-auto">
                            <button aria-label="Button" class="btn btn-icon">
                                <svg class="icon" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
                                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                                    <path d="M21 21l-6 -6"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-3">
                <div class="text-md-end mt-3 mt-md-0">
                    <a aria-controls="offcanvasEnd" class="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="offcanvas" href="#offcanvasEnd" id="open_canvas" role="button">
                        <Edit/>
                        Ajouter un chapitre
                    </a>
                </div>
            </div><!-- end col-->
        </div> <!-- end row -->
    </div><!-- end col-->
</div>

<div class="row">
    {#if loading}
        <ListPlaceholder/>
    {:else}
        {#each filteredChapters as chapter }
            <div class="col-lg-3 mb-3">
                <div class="card project-box">
                    <div class="card-body" style="padding: 15px;background-image: url('/img/bg.svg')">
                        <div class="dropdown float-end">
                            <a aria-expanded="false" class="dropdown-toggle card-drop arrow-none" data-bs-toggle="dropdown" href="#">
                                <i class="mdi mdi-dots-horizontal m-0 text-muted h3"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" on:click|preventDefault={()=>updateChapter(chapter)}>Modifier</a>
                                <a class="dropdown-item text-danger" on:click|preventDefault={()=>deleteChapter(chapter.uid)}>Supprimer</a>
                            </div>
                        </div>
                        <h2 class="mt-0" style="height: 85px"><a class="text-black-gray">{chapter.title}</a></h2>
                        <p class="text-muted text-uppercase">
                            <i class="mdi mdi-account-circle"></i>
                            <span class={`badge ${chapter.published ? 'bg-teal' : 'bg-danger'}`}>{chapter.published ? 'Publié' : 'Brouillon'}</span>
                        </p>
                    </div>
                </div> <!-- end card box-->
            </div><!-- end col-->
        {/each}
        {#if !filteredChapters.length}
            <h2 class="text-center mt-5">Aucun chapitre n'a été ajouté à ce cours</h2>
        {/if}
    {/if}
</div>