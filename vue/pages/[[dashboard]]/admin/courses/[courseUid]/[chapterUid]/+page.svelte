<script lang="ts">
    import {getRequest} from "$lib/helper/Request";
    import type {ChapterType, CourseType} from "$lib/type";
    import {onMount} from "svelte";
    import {activeMenu} from "$lib/helper/layout";
    import {page} from "$app/stores"
    import Chapter from "./Chapter.svelte";
    import ChapterForm from "../ChapterForm.svelte";

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
    })

    async function getCourse() {
        const response = await getRequest("/courses/" + $page.params.courseUid)
        course = response.data
        await getChapter()
    }

    async function getChapter() {
        const response = await getRequest("/chapters/" + $page.params.courseUid + "/" + $page.params.chapterUid)
        currentChapter = response.data
        loading = false
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
                        <li aria-current="page" class="breadcrumb-item">
                            <h2 class="breadcrumb-current">
                                <a href={`/admin/courses/${course?.uid}`}>{course?.title}</a>
                            </h2>
                        </li>
                    {/if}
                </ol>
            </div>
        </div>
    </div>
</div>

<div class="page-body">
    <a aria-controls="offcanvasEnd" class="btn btn-outline-secondary d-none" data-bs-toggle="offcanvas" href="#offcanvasEnd" id="open_canvas" role="button">
    </a>
    <div class="container-xl">
        <Chapter chapter={currentChapter} />
        <ChapterForm course={course} formData={currentChapter} on:chapter-updated={getChapter}/>
    </div>
</div>