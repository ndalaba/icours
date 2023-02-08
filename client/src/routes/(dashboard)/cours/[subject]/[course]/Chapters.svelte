<script lang="ts">
    import type {ChapterType} from "$lib/type";
    import {fly} from "svelte/transition";
    import Course from "../../../admin/courses/[courseUid]/Course.svelte";
    import {page} from "$app/stores";
    import RIghtArrow from "$lib/components/icons/RIghtArrow.svelte";

    export let chapters: ChapterType[] = []
    export let course: Course
    const slug = $page.params.chapter
</script>

{#each chapters as chp,index(chp.id)}
    <div transition:fly="{{x:-100, duration:400}}" class="border-bottom border-color-10 py-2">
        <h3 class="text-muted">
            <RIghtArrow/>
            <a href={`/cours/${course?.subject?.slug}/${course?.slug}/${chp.slug}`} class:text-black={slug && slug===chp.slug}>{slug && slug === chp.slug ? chp.title.toUpperCase() : chp.title}</a>
        </h3>
    </div>

{/each}