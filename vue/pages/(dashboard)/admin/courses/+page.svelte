<script lang="ts">
    import {fly} from "svelte/transition";
    import {deleteRequest, getRequest} from "$lib/helper/Request";
    import type {CourseType} from "$lib/type";
    import {onMount} from "svelte";
    import {activeMenu} from "$lib/helper/layout";
    import {alert} from "$lib/helper/alert";
    import {success} from "$lib/helper/Toaster";
    import Edit from "$lib/components/icons/Edit.svelte";
    import ListPlaceholder from "$lib/components/layouts/dashboard/ListPlaceholder.svelte";
    import {ClasseStore, SubjectStore} from "$lib/store.js";
    import Trash from "$lib/components/icons/Trash.svelte";
    import {removeObjectWithUid} from "$lib/helper/function";

    let courses: CourseType[] = []
    let loading: boolean = true
    let filteredCourses: CourseType[]
    let search: string = ""

    $: filteredCourses = courses.filter(course => course.title.toLowerCase().includes(search.toLowerCase()))

    onMount(() => {
        getCourses()
        activeMenu("#courses_menu")
    })

    function deleteCourse(uid: string) {
        alert({
            actionLabel: "Envoyer",
            show: false,
            title: "Suppression",
            description: "Supprimer ce cours",
            callable: function () {
                deleteRequest('/courses/' + uid).then(async _ => {
                    success(`Course supprimé.`)
                    filteredCourses = removeObjectWithUid(filteredCourses, uid)
                    //await getCourses()
                })
            }
        })
    }

    function findCourses(event: SubmitEvent) {
        const data = new FormData(event.target as HTMLFormElement)
        getRequest(`/courses?subject=${data.get('subject')}&classe=${data.get('classe')}&published=${data.get('published')}`).then(response => filteredCourses = response.data)
    }

    async function getCourses() {
        const response = await getRequest("/courses")
        courses = response.data
        loading = false
    }

</script>

<svelte:head>
    <title>I-Cours - Listes cours</title>
</svelte:head>

<div class="page-header d-print-none">
    <div class="container-fluid">
        <div class="row g-2 align-items-center">
            <div class="col">
                <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
                    <li class="breadcrumb-item"><a href="/admin">Tableau de bord</a></li>
                    <li aria-current="page" class="breadcrumb-item active">
                        <h2 class="breadcrumb-current"><a href="/">Liste cours</a></h2>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</div>

<div class="page-body">
    <div class="container-fluid">
        <div class="row mb-4">
            <div class="col-12">
                <div class="row justify-content-between">
                    <div class="col-md-3">
                        <div class="text-md-start mt-3 mt-md-0">
                            <a class="btn btn-primary d-none d-sm-inline-block" href="/admin/courses/edit-0">
                                <Edit/>
                                Ajouter un cours
                            </a>
                        </div>
                    </div>
                    <div class="col-md-9 text-md-end">
                        <form class="d-flex flex-wrap align-items-center search-form" on:submit|preventDefault={findCourses}>
                            <div class="me-3 w-50">
                                <input bind:value={search} class="form-control my-1 my-md-0" id="search" placeholder="Rechercher..." type="search">
                            </div>
                            <div class="me-sm-3">
                                <select class="form-select my-1 my-md-0" name="subject">
                                    <option selected value="0">Matière</option>
                                    {#each $SubjectStore as subject}
                                        <option value={subject.id}>{subject.name}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="me-sm-3">
                                <select class="form-select my-1 my-md-0" name="classe">
                                    <option selected value="0">Classe</option>
                                    {#each $ClasseStore as classe}
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
                </div> <!-- end row -->
            </div><!-- end col-->
        </div>

        <div class="table-responsive">
            <table class="table table-vcenter card-table table-striped">
                <thead>
                <tr>
                    <th>Titre</th>
                    <th>Matière</th>
                    <th>Auteur</th>
                    <th>Classes</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>

                {#if loading}
                    <tr>
                        <td>
                            <ListPlaceholder/>
                        </td>
                        <td>
                            <ListPlaceholder/>
                        </td>
                        <td>
                            <ListPlaceholder/>
                        </td>
                        <td>
                            <ListPlaceholder/>
                        </td>
                    </tr>
                {:else}
                    <tbody>
                    {#each filteredCourses as course,index (course)}
                        <tr transition:fly="{{x:-100, duration:400}}">
                            <td>
                                <a href={`/admin/courses/${course.uid}`} class="text-black-gray">{course.title}</a>
                            </td>
                            <td class="text-muted">
                                {course.subject.name}
                            </td>
                            <td class="text-muted">
                                {course.user.firstName}
                            </td>
                            <td class="text-muted">
                                {#each course.classes as classe}
                                    <span class="badge bg-blue m-1">{classe.name}</span>
                                {/each}
                            </td>
                            <td class="text-muted">
                                <span class={`badge ${course.published ? 'bg-teal' : 'bg-danger'}`}>{course.published ? 'Publié' : 'Brouillon'}</span>
                            </td>
                            <td>
                                <a href={`/admin/courses/edit-${course.uid}`}>
                                    <Edit/>
                                </a>
                                <a class="text-danger" on:click|preventDefault={()=>deleteCourse(course.uid)}>
                                    <Trash/>
                                </a>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                {/if}

            </table>
        </div>
    </div>
</div>