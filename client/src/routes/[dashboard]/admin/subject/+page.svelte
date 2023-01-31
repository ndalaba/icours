<script lang="ts">
    import {getRequest} from "$lib/helper/Request";
    import type {SubjectType} from "$lib/type";
    import {onMount} from "svelte";
    import SubjectForm from "./SubjectForm.svelte";
    import SubjectList from "./SubjectList.svelte";

    let subjects: SubjectType[] = []
    let currentSubject: SubjectType = {subject: '', id: 0, description: '', image: '', uid: ''};
    let loading: boolean = true

    onMount(() => {
        getSubjects()
    })

    async function getSubjects() {
        const response = await getRequest("/subjects")
        subjects = response.data
        loading = false
    }

    function setCurrentSubject(event) {
        currentSubject = event.detail.data
    }
</script>

<svelte:head>
    <title>I-Cours - Matières</title>
</svelte:head>

<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
                    <li class="breadcrumb-item"><a href="/dashboard/admin">Tableau de bord</a></li>
                    <li aria-current="page" class="breadcrumb-item active">
                        <h2 class="breadcrumb-current"><a href="/">Listes matières</a></h2>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</div>
<div class="page-body">
    <div class="container-xl">
        <div class="row g-4">
            <div class="col-md-6">
                <SubjectList loading={loading} on:subject-update-request={setCurrentSubject} on:subject-updated={getSubjects} subjects={subjects}/>
            </div>
            <div class="col-md-6">
                <SubjectForm formData={currentSubject} on:subject-updated={getSubjects}/>
            </div>
        </div>
    </div>
</div>