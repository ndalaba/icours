<script lang="ts">
    import type {CourseType, SubjectType} from "$lib/type";
    import {deleteRequest} from "$lib/helper/Request";
    import {createEventDispatcher} from "svelte";
    import {success} from "$lib/helper/Toaster";
    import {alert} from "$lib/helper/alert";
    import Edit from "$lib/components/icons/Edit.svelte";
    import ListPlaceholder from "$lib/components/layouts/dashboard/ListPlaceholder.svelte";

    const dispatch = createEventDispatcher()
    export let courses: CourseType[] = []
    export let subjects: SubjectType[] = []
    export let loading: boolean = true

    let filteredCourses: CourseType[]
    let search: string = ""

    $: filteredCourses = courses.filter(course => course.title.toLowerCase().includes(search.toLowerCase()))

    function deleteCourse(uid: string) {
        alert({
            actionLabel: "Envoyer",
            show: false,
            title: "Suppression",
            description: "Supprimer ce cours",
            callable: function () {
                deleteRequest('/courses/' + uid).then(_ => {
                    dispatch('course-updated')
                    success(`Course supprimé.`)
                })
            }
        })
    }

    function updateCourse(course: CourseType) {
        document.getElementById('open_canvas').click()
        dispatch('course-update-request', {data: course})
    }

</script>
<div class="row mb-3">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <div class="row justify-content-between">
                    <div class="col-md-8">
                        <form class="d-flex flex-wrap align-items-center">
                            <label class="visually-hidden" for="inputPassword2">Search</label>
                            <div class="me-3">
                                <input class="form-control my-1 my-md-0" id="inputPassword2" placeholder="Search..." type="search">
                            </div>
                            <label class="me-2" for="status-select">Sort By</label>
                            <div class="me-sm-3">
                                <select class="form-select my-1 my-md-0" id="status-select">
                                    <option>Select</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-4">
                        <div class="text-md-end mt-3 mt-md-0">
                            <a aria-controls="offcanvasEnd" class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasEnd" id="open_canvas" role="button">
                                <Edit/>
                                Ajouter un cours
                            </a>
                        </div>
                    </div><!-- end col-->
                </div> <!-- end row -->
            </div>
        </div> <!-- end card -->
    </div><!-- end col-->
</div>

<div class="row">
    {#if loading}
        <ListPlaceholder/>
    {:else}
        {#each filteredCourses as course }
            <div class="col-lg-3">
                <div class="card project-box">
                    <div class="card-body" style="padding: 15px;background-image: url('/img/bg.svg')">
                        <div class="dropdown float-end">
                            <a aria-expanded="false" class="dropdown-toggle card-drop arrow-none" data-bs-toggle="dropdown" href="#">
                                <i class="mdi mdi-dots-horizontal m-0 text-muted h3"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" on:click|preventDefault={()=>updateCourse(course)}>Modifier</a>
                                <a class="dropdown-item text-danger" on:click|preventDefault={()=>deleteCourse(course.uid)}>Supprimer</a>
                            </div>
                        </div>
                        <h2 class="mt-0" style="height: 85px"><a class="text-dark">{course.title}</a></h2>
                        <p class="text-muted text-uppercase">
                            <i class="mdi mdi-account-circle"></i>
                            <small>{course.subject?.name}</small>
                        </p>
                        <span class={`badge ${course.published ? 'bg-teal' : 'bg-danger'}`}>{course.published ? 'Publié' : 'Brouillon'}</span>
                    </div>
                </div> <!-- end card box-->
            </div><!-- end col-->
        {/each}
    {/if}
</div>