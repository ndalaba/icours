<script lang="ts">
    import type {ChapterType, CourseType} from "$lib/type";
    import {page} from "$app/stores";
    import RightArrow from "$lib/components/icons/RightArrow.svelte";
    import File from "$lib/components/icons/File.svelte";

    export let chapters: ChapterType[] = []
    export let course: CourseType
    const slug = $page.params.chapter
</script>

<div class="" id="accordionCurriculum">
    <div class="overflow-hidden card rounded mb-6">

        {#each chapters as chp,index(chp.id)}
            <div aria-labelledby="curriculumheadingOne" class="collapse show" data-parent="#accordionCurriculum" id="CurriculumcollapseOne">
                <a href="{`/cours/${course?.subject?.slug}/${course?.slug}/${chp.slug}`}" class="border-bottom px-2 border-color-20 py-4 min-height-70 d-md-flex align-items-center text-black">
                    <div class="d-flex align-items-center me-auto mb-4 mb-md-0">
                        <div class="text-secondary d-flex">
                            <File width={30} height={30}/>
                        </div>

                        <div class="ms-4">
                            {slug && slug === chp.slug ? chp.title.toUpperCase() : chp.title}
                        </div>
                    </div>

                    <div class="d-flex align-items-center overflow-auto overflow-md-visible flex-shrink-all">
                        <a class="text-secondary d-flex" class:text-black={slug && slug===chp.slug} href="{`/cours/${course?.subject?.slug}/${course?.slug}/${chp.slug}`}">
                            <RightArrow width={30} height={30}/>
                        </a>
                    </div>

                </a>
            </div>
        {/each}
    </div>

</div>