<script lang="ts">
    import type {PageData} from './$types';
    import type {CourseType, SubjectType} from "$lib/type";

    export let data: PageData;
    let subject: SubjectType = data?.subject as SubjectType
    let courses: CourseType[] = data?.courses as CourseType[]

</script>

<svelte:head>
    <title>{subject?.name}- Programme cours</title>
</svelte:head>
<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
                    <li class="breadcrumb-item"><a href="/cours">Cours</a></li>
                    <li aria-current="page" class="breadcrumb-item active">
                        <h2 class="breadcrumb-current">
                            <a href={`/cours/${subject?.slug}`}>{subject?.name}</a></h2>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</div>
<div class="page-body">
    <div class="container-xl">
        <div class="row row-deck row-cards">
            {#each courses as course}
                <div class="col-md-2 col-xl-2 m-2">
                    <a class="card card-link" href={`/cours/${subject.slug}/${course.slug}`} style="background-image: url('/img/bg.svg')">
                        <h3 class="p-3 page-title">
                            {course.title}
                        </h3>
                        <div class="card-footer">
                            <div class="text-muted">1 chapitres</div>
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    </div>
</div>
