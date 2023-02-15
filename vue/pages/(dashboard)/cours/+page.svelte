<script>
   import {SubjectStore} from "$lib/store.ts";
   import {SERVER_UPLOAD_PATH} from "$lib/helper/Constants.ts";
</script>

<svelte:head>
    <title>I-Cours - Programme cours</title>
</svelte:head>
<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
                    <li class="breadcrumb-item"><a href="/cours">Cours</a></li>
                    <li aria-current="page" class="breadcrumb-item active">
                        <h2 class="breadcrumb-current"><a href="/">Matières</a></h2></li>
                </ol>
            </div>
        </div>
    </div>
</div>
<div class="page-body">
    <div class="container-xl">
        <div class="row row-deck row-cards">
            {#each $SubjectStore as subject}
                <div class="col-md-4 col-xl-2 m-2">
                    <a class="card card-link" href={`/cours/${subject.slug}`}>
                        <div class="card-cover card-cover-blurred text-center" style="background-image: url('{SERVER_UPLOAD_PATH + subject.image}')">
                            <span class="avatar avatar-xl avatar-thumb rounded" style="background-image: url('{SERVER_UPLOAD_PATH + subject.image}')"></span>
                        </div>
                        <div class="card-body text-center">
                            <div class="card-title mb-1">{subject.name}</div>
                            <div class="text-muted">{subject.description}</div>
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    </div>
</div>
