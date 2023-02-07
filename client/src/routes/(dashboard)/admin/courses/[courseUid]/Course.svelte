<script lang="ts">
    import type {ChapterType, CourseType} from "$lib/type";
    import {deleteRequest} from "$lib/helper/Request";
    import {createEventDispatcher} from "svelte";
    import {success} from "$lib/helper/Toaster";
    import {alert} from "$lib/helper/alert";
    import Edit from "$lib/components/icons/Edit.svelte";
    import ListPlaceholder from "$lib/components/layouts/dashboard/ListPlaceholder.svelte";
    import Trash from "$lib/components/icons/Trash.svelte";
    import {goto} from "$app/navigation";

    const dispatch = createEventDispatcher()

    export let chapters: ChapterType[] = []
    export let course: CourseType = {
        title: '',
        id: 0,
        content: '',
        tag: "",
        published: false,
        uid: '',
        subject: {id: 0},
        classes: []
    }
    export let loading: boolean = true

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

    function deleteCourse(uid: string) {
        alert({
            actionLabel: "Envoyer",
            show: false,
            title: "Suppression",
            description: "Supprimer ce cours",
            callable: function () {
                deleteRequest('/courses/' + uid).then(async _ => {
                    success(`Course supprimé.`)
                    await goto('/admin/courses')
                })
            }
        })
    }

</script>

{#if course.id}
    <div class="row">
        <div class="row row-cards">
            <div class="col-lg-8">
                <div class="card card-lg">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-10">
                                 <span class="pe-3">{course?.title?.toUpperCase()}
                                     <br><strong>({course?.subject?.name?.toUpperCase()})</strong>
                                 </span>
                                <span class={`m-1 badge ${course?.published ? 'bg-teal' : 'bg-danger'}`}>{course?.published ? 'Publié' : 'Brouillon'}</span>

                                {#each course?.classes as classe}
                                    <span class="badge bg-blue m-1">{classe.name}</span>
                                {/each}
                            </div>
                            <div class="col-2">
                                <a class="btn btn-outline-secondary me-1" href={`/admin/courses/edit-${course?.uid}`}>
                                    <Edit/>
                                </a>
                                <a class="btn btn-outline-danger" on:click|preventDefault={()=>deleteCourse(course?.uid)}>
                                    <Trash/>
                                </a>
                            </div>

                        </div>
                    </div>
                    <div class="card-body markdown p-4">
                        {@html course?.content}
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header">
                        <span class="pe-3">CHAPITRES DU COURS</span>
                        <a aria-controls="offcanvasEnd" class="btn btn-outline-secondary d-none d-sm-inline-block" data-bs-toggle="offcanvas" href="#offcanvasEnd" id="open_canvas" role="button">
                            <Edit/>
                            Ajouter un chapitre
                        </a>
                    </div>
                    <div class="card-body">
                        {#if loading}
                            <ListPlaceholder/>
                        {:else}
                            {#each chapters as chapter }
                                <div class="border-bottom border-color-20 py-3 d-md-flex align-items-center">
                                    <div class="d-flex align-items-center me-auto mb-4 mb-md-0" style="width: 76%">
                                        <div class="text-secondary d-flex">
                                            <span class={`badge ${chapter.published ? 'bg-teal' : 'bg-danger'}`}>{chapter.published ? 'Publié' : 'Brouillon'}</span>
                                        </div>
                                        <div class="ms-2">
                                            <a href={`/admin/courses/${course.uid}/${chapter.uid}`} class="text-black">{chapter.title}</a>
                                        </div>
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
                            {#if !chapters?.length}
                                <h2 class="text-center mt-5">Aucun chapitre n'a été ajouté à ce cours</h2>
                            {/if}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else}
    <ListPlaceholder/>
{/if}