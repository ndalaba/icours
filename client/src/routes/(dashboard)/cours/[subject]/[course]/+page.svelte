<script lang="ts">
    import type {PageData} from '../../../../../.svelte-kit/types/src/routes';
    import type {ChapterType, CourseType} from "$lib/type";
    import ListPlaceholder from "$lib/components/layouts/dashboard/ListPlaceholder.svelte";
    import Chapters from "./Chapters.svelte";

    export let data: PageData;
    let course: CourseType = data?.course as CourseType
    let chapters: ChapterType[] = data?.chapters as ChapterType[]

</script>

<svelte:head>
    <title>{course?.title}</title>
</svelte:head>
<div class="course-detail">
    <div class="page-header d-print-none">
        <div class="container-fluid">
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
        <div class="container-fluid">
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
                                        <Chapters {chapters} {course}/>
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