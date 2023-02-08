<script lang="ts">
    import type {PageData} from './$types';
    import {fly} from "svelte/transition";
    import type {ChapterType, CourseType} from "$lib/type";
    import ListPlaceholder from "$lib/components/layouts/dashboard/ListPlaceholder.svelte";
    import File from "$lib/components/icons/File.svelte";

    export let data: PageData;
    let course: CourseType = data?.course as CourseType
    let chapters: ChapterType[] = data?.chapters as ChapterType[]

</script>

<svelte:head>
    <title>{course?.title}</title>
</svelte:head>
<div class="page">
    <div class="page-header d-print-none">
        <div class="container-xl">
            <div class="row g-2 align-items-center">
                <div class="col">
                    <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
                        <li class="breadcrumb-item"><a href="/cours">Cours</a></li>
                        <li class="breadcrumb-item">
                            <a href={`/cours/${course?.subject?.slug}`}>{course?.subject?.name}</a>
                        </li>
                        <li aria-current="page" class="breadcrumb-item active">
                            <h2 class="breadcrumb-current">
                                {course?.title}
                            </h2>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="page-body">
        <div class="container-xl">
            {#if course.id}
                <div class="row">
                    <div class="row row-cards">
                        <div class="col-lg-8">
                            <div class="card card-lg">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-10">
                                            <span class="pe-3">{course?.title?.toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body markdown p-4">
                                    {@html course?.content}
                                </div>
                            </div>
                        </div>
                        {#if chapters?.length}
                            <div class="col-lg-4">
                                <div class="card">
                                    <div class="card-header">
                                        <span class="pe-3">CHAPITRES DU COURS</span>
                                    </div>
                                    <div class="card-body">
                                        {#each chapters as chapter,index(chapter.id)}
                                            <div transition:fly="{{x:-100, duration:400}}" class="border-bottom border-color-20 py-3 d-md-flex align-items-center">
                                                <div class="d-flex align-items-center me-auto mb-4 mb-md-0">
                                                    <div class="d-flex">
                                                        <File/>
                                                    </div>
                                                    <h3 class="ms-2">
                                                        <a href={`/admin/courses/${course.uid}/${chapter.uid}`} class="text-black">{chapter.title}</a>
                                                    </h3>
                                                </div>
                                            </div>

                                        {/each}

                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            {:else}
                <ListPlaceholder/>
            {/if}
        </div>
    </div>
</div>
<style>
    .page {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999999999;
        width: 100%;
        margin: 0;
        background-color: #f1f5f9;
    }
</style>