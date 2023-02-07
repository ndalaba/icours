<script lang="ts">
    import {getRequest} from "$lib/helper/Request";
    import type {ChapterType, CourseType} from "$lib/type";
    import {onMount} from "svelte";
    import {activeMenu} from "$lib/helper/layout";
    import ChapterForm from "./ChapterForm.svelte";
    import {page} from "$app/stores"
    import Course from "./Course.svelte";

    let course: CourseType = {
        title: '',
        id: 0,
        content: '',
        tag: "",
        published: false,
        uid: '',
        subject: {id: 0},
        classes: []
    }
    let chapters: ChapterType[]

    let currentChapter: ChapterType = {
        title: '',
        id: 0,
        content: '',
        tag: "",
        published: false,
        uid: '',
        course: {id: 0}
    };
    let loading: boolean = true

    onMount(() => {
        getCourse()
        activeMenu("#courses_menu")

        const myOffcanvas = document.getElementById('offcanvasEnd')
        myOffcanvas?.addEventListener('hidden.bs.offcanvas', event => {
            currentChapter = {
                title: '',
                id: 0,
                content: '',
                tag: "",
                published: false,
                uid: '',
                course: course
            }
        })
    })

    async function getCourse() {
        const response = await getRequest("/courses/" + $page.params.courseUid)
        course = response.data
        await getChapters()
    }

    async function getChapters() {
        const response = await getRequest("/chapters/" + course.id)
        chapters = response.data
        loading = false
    }

    function setCurrentChapter(event) {
        currentChapter = event.detail.data
    }

</script>

<svelte:head>
    <title>I-Cours - {course?.title}</title>
</svelte:head>

<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
                    <li class="breadcrumb-item"><a href="/admin">Tableau de bord</a></li>
                    <li class="breadcrumb-item"><a href="/admin/courses">Cours</a></li>
                    {#if course.id}
                        <li class="breadcrumb-item">{course?.subject?.name}</li>
                        <li aria-current="page" class="breadcrumb-item active">
                            <h2 class="breadcrumb-current">
                                <a href={`/admin/courses/edit-${course?.uid}`}>{course?.title}</a>
                            </h2>
                        </li>
                    {/if}
                </ol>
            </div>
        </div>
    </div>
</div>

<div class="page-body">
    <div class="container-xl">
        <Course chapters={chapters} course={course} loading={loading} on:chapter-update-request={setCurrentChapter} on:chapter-updated={getChapters}/>

        <ChapterForm course={course} formData={currentChapter} on:chapter-updated={getChapters}/>
    </div>
</div>