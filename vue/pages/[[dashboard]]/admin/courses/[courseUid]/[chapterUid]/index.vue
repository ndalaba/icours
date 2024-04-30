<script setup lang="ts">

import {ChapterType, CourseType} from "~/composables/type";
import {activeMenu} from "~/utils/layout";
import {getRequest} from "~/utils/Request";
import Chapter from "./Chapter.vue";
import ChapterForm from "../ChapterForm.vue";

const route = useRoute()

const course = ref<CourseType>({
  title: '',
  id: 0,
  content: '',
  tag: "",
  published: false,
  uid: '',
  subject: {id: 0},
  classes: []
})

const currentChapter = ref<ChapterType>({
  title: '',
  id: 0,
  content: '',
  slug: "",
  published: false,
  uid: '',
  course: {id: 0}
})

const loading = ref(true)

onMounted(() => {
  getCourse()
  activeMenu("#courses_menu")
})

async function getCourse() {
  const response = await getRequest("/courses/" + route.params.courseUid)
  course.value = response.data
  await getChapter()
}

async function getChapter() {
  const response = await getRequest("/chapters/" + route.params.courseUid + "/" + route.params.chapterUid)
  currentChapter.value = response.data
  loading.value = false
}

</script>
<template>
  <Head>
    <Title>I-Cours - {{course?.title}}</Title>
  </Head>

  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
            <li class="breadcrumb-item">
              <NuxtLink href="/admin">Tableau de bord</NuxtLink>
            </li>
            <li class="breadcrumb-item">
              <NuxtLink href="/admin/courses">Cours</NuxtLink>
            </li>
            <template v-if="course.id">
              <li class="breadcrumb-item">{{ course?.subject?.name }}</li>
              <li aria-current="page" class="breadcrumb-item">
                <h2 class="breadcrumb-current">
                  <NuxtLink :href="`/admin/courses/${course?.uid}`">{{ course?.title }}</NuxtLink>
                </h2>
              </li>
            </template>
          </ol>
        </div>
      </div>
    </div>
  </div>

  <div class="page-body">
    <a aria-controls="offcanvasEnd" class="btn btn-outline-secondary d-none" data-bs-toggle="offcanvas" href="#offcanvasEnd" id="open_canvas" role="button">
    </a>
    <div class="container-xl">
      <Chapter :chapter="currentChapter"/>
      <ChapterForm :course="course" :formData="currentChapter" @chapter-updated="getChapter"/>
    </div>
  </div>
</template>