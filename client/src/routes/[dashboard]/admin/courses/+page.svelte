<script lang="ts">
    import {getRequest} from "$lib/helper/Request";
    import type {CourseType, SubjectType} from "$lib/type";
    import {onMount} from "svelte";
    import {activeMenu} from "$lib/helper/layout";
    import CourseList from "./CourseList.svelte";
    import CourseForm from "./CourseForm.svelte";

    let courses: CourseType[] = []
    let subjects: SubjectType[] = []
    let currentCourse: CourseType = {
        title: '',
        id: 0,
        content: '',
        tag: "",
        published: false,
        uid: '',
        subject: {id: 0, uid: '', name: ''}
    };
    let loading: boolean = true

    onMount(() => {
        getSubjects()
        getCourses()
        activeMenu("#courses_menu")
        const myOffcanvas = document.getElementById('offcanvasEnd')
        myOffcanvas.addEventListener('hidden.bs.offcanvas', event => {
            currentCourse = {
                title: '',
                id: 0,
                content: '',
                tag: "",
                published: false,
                uid: '',
                subject: {id: 0, uid: '', name: ''}
            }
        })
    })

    async function getCourses() {
        const response = await getRequest("/courses")
        courses = response.data
        loading = false
    }

    async function getSubjects() {
        const response = await getRequest("/subjects")
        subjects = response.data
    }

    function setCurrentCourse(event) {
        currentCourse = event.detail.data
    }
</script>

<svelte:head>
    <title>I-Cours - Listes cours</title>
</svelte:head>

<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
                    <li class="breadcrumb-item"><a href="/dashboard/admin">Tableau de bord</a></li>
                    <li aria-current="page" class="breadcrumb-item active">
                        <h2 class="breadcrumb-current"><a href="/">Liste cours</a></h2>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</div>

<div class="page-body">
    <div class="container-xl">
        <CourseList courses={courses} loading={loading} on:course-update-request={setCurrentCourse} on:course-updated={getCourses} subjects={subjects}/>
        <br>
        <CourseForm formData={currentCourse} on:course-updated={getCourses} subjects={subjects}/>
    </div>
</div>