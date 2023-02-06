<script lang="ts">
    import {deleteRequest} from "$lib/helper/Request";
    import {afterUpdate, createEventDispatcher} from "svelte";
    import {success} from "$lib/helper/Toaster";
    import {alert} from "$lib/helper/alert";
    import Edit from "$lib/components/icons/Edit.svelte";
    import ListPlaceholder from "$lib/components/layouts/dashboard/ListPlaceholder.svelte";
    import Trash from "$lib/components/icons/Trash.svelte";
    import {goto} from "$app/navigation";
    import type {ChapterType} from "$lib/type";

    const dispatch = createEventDispatcher()

    export let chapter: ChapterType = {
        title: '',
        id: 0,
        content: '',
        tag: "",
        published: false,
        uid: '',
        course: {id: 0},
    }

    function updateChapter(chapter: ChapterType) {
        document.getElementById('open_canvas')?.click()
        dispatch('chapter-update-request', {data: chapter})
    }

    function deleteChapter(uid: string) {
        alert({
            actionLabel: "Valider",
            show: false,
            title: "Suppression",
            description: "Supprimer ce chapitre",
            callable: function () {
                deleteRequest('/chapters/' + uid).then(async _ => {
                    success(`Chapitre supprimé.`)
                    await goto(`/dashboard/admin/courses/${chapter.course.uid}`)
                })
            }
        })
    }

</script>

{#if chapter.id}
    <div class="row">
        <div class="row row-cards">
            <div class="col-lg-10">
                <div class="card card-lg">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-10">
                                 <span class="pe-3">{chapter?.title?.toUpperCase()}
                                 </span>
                                <span class={`m-1 badge ${chapter?.published ? 'bg-teal' : 'bg-danger'}`}>{chapter?.published ? 'Publié' : 'Brouillon'}</span>
                            </div>
                            <div class="col-2">
                                <a class="btn btn-outline-secondary me-1" on:click|preventDefault={()=>updateChapter(chapter)}>
                                    <Edit/>
                                </a>
                                <a class="btn btn-outline-danger" on:click|preventDefault={()=>deleteChapter(chapter?.uid)}>
                                    <Trash/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="card-body markdown p-4">
                        {@html chapter?.content}
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else}
    <ListPlaceholder/>
{/if}