<script setup lang="ts">
import File from "~/components/icons/File.vue";
import {ChapterType, CourseType} from "~/composables/type";

const route = useRoute()
const {chapters, course} = defineProps<{
  chapters?: ChapterType[],
  course?: CourseType
}>()
const slug = route.params.chapter
</script>
<template>
  <div class="" id="accordionCurriculum">
    <div class="overflow-hidden card rounded mb-6">
      <div v-for="chp in chapters" class="collapse show">
        <NuxtLink :href="`/cours/${course?.subject?.slug}/${course?.slug}/${chp.slug}`" class="border-bottom px-2 border-color-20 py-3 min-height-70 d-md-flex align-items-center text-black">
          <div class="d-flex align-items-center me-auto mb-4 mb-md-0">
            <div class="text-secondary d-flex">
              <File :width="30" :height="30"/>
            </div>
            <div class="ms-4">
              {{ (slug === chp.slug) ? chp.title.toUpperCase() : chp.title }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>