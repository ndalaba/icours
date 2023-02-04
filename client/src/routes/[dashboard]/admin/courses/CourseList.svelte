<script lang="ts">
    import type {ClasseType, CourseType, SubjectType} from "$lib/type";
    import {deleteRequest, getRequest} from "$lib/helper/Request";
    import {createEventDispatcher} from "svelte";
    import {success} from "$lib/helper/Toaster";
    import {alert} from "$lib/helper/alert";
    import Edit from "$lib/components/icons/Edit.svelte";
    import ListPlaceholder from "$lib/components/layouts/dashboard/ListPlaceholder.svelte";

    const dispatch = createEventDispatcher()
    export let courses: CourseType[] = []
    export let subjects: SubjectType[] = []
    export let classes: ClasseType[]
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

    function findCourses(event: SubmitEvent) {
        const data = new FormData(event.target as HTMLFormElement)
        getRequest(`/courses?subject=${data.get('subject')}&classe=${data.get('classe')}&published=${data.get('published')}`).then(response => filteredCourses = response.data)
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
                        <select class="form-select my-1 my-md-0" name="subject">
                            <option selected value="0">Matière</option>
                            {#each subjects as subject}
                                <option value={subject.id}>{subject.name}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="me-sm-3">
                        <select class="form-select my-1 my-md-0" name="classe">
                            <option selected value="0">Classe</option>
                            {#each classes as classe}
                                <option value={classe.id}>{classe.name}</option>
                            {/each}
                        </select>
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
                        Ajouter un cours
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
        {#each filteredCourses as course }
            <div class="col-lg-3 mb-3">
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
                        <h2 class="mt-0" style="height: 85px">
                            <a href={`/dashboard/admin/courses/${course.uid}`} class="text-black-gray">{course.title}</a>
                        </h2>
                        <p class="text-muted text-uppercase">
                            <i class="mdi mdi-account-circle"></i>
                            <strong>{course.subject?.name}</strong>
                            <span style="float: right" class={`badge ${course.published ? 'bg-teal' : 'bg-danger'}`}>{course.published ? 'Publié' : 'Brouillon'}</span>
                        </p>
                        {#each course.classes as classe}
                            <span class="badge bg-blue m-1">{classe.name}</span>
                        {/each}
                    </div>
                </div> <!-- end card box-->
            </div><!-- end col-->
        {/each}
    {/if}
</div>