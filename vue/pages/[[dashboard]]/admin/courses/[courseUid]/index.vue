<script setup lang="ts">

import {ChapterType, CourseType} from "~/composables/type";
import Course from "./Course.vue"
import ChapterForm from "./ChapterForm.vue";

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
const chapters = ref<ChapterType[]>([])
const currentChapter = ref<ChapterType>({
  title: '',
  id: 0,
  content: '',
  published: false,
  uid: '',
  slug: "",
  course: {id: 0}
})

const loading = ref(true)

onMounted(() => {
  getCourse()
  activeMenu("#courses_menu")

  const myOffcanvas = document.getElementById('offcanvasEnd')
  myOffcanvas?.addEventListener('hidden.bs.offcanvas', event => {
    currentChapter.value = {
      title: '',
      id: 0,
      content: '',
      slug: "",
      published: false,
      uid: '',
      course: course.value
    }
  })
})

async function getCourse() {
  const response = await getRequest("/courses/" + route.params.courseUid)
  course.value = response.data
  await getChapters()
}

async function getChapters() {
  const response = await getRequest("/chapters/" + course.value?.id)
  chapters.value = response.data
  loading.value = false
}

function setCurrentChapter(data: ChapterType) {
  currentChapter.value = data
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
            <li class="breadcrumb-item"><NuxtLink href="/admin">Tableau de bord</NuxtLink></li>
            <li class="breadcrumb-item"><NuxtLink href="/admin/courses">Cours</NuxtLink></li>
            <template v-if="course?.id">
              <li class="breadcrumb-item">{{ course?.subject?.name }}</li>
              <li aria-current="page" class="breadcrumb-item active">
                <h2 class="breadcrumb-current">
                  <NuxtLink :href="`/admin/courses/edit-${course?.uid}`">{{ course?.title }}</NuxtLink>
                </h2>
              </li>
            </template>
          </ol>
        </div>
      </div>
    </div>
  </div>

  <div class="page-body">
    <div class="container-xl">
      <Course :chapters="chapters" :course="course" :loading="loading" @chapter-update-request="setCurrentChapter" @chapter-updated="getChapters"/>
      <ChapterForm :course="course" :formData="currentChapter" @chapter-updated="getChapters"/>
    </div>
  </div>
</template>