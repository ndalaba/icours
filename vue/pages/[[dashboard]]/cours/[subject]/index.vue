<script setup lang="ts">
import type {CourseType, SubjectType} from "@/composables/type"
import {getRequest} from "~/utils/Request";

const subject = ref<SubjectType | null>(null)
const courses = ref<CourseType[] | null>([])

const route = useRoute()
let res = await getRequest('/subjects/' + route.params.subject)
subject.value = res.success ? res?.data : null
res = await getRequest('/courses?subject=' + subject.value?.id)
courses.value = res.success ? res?.data : []

</script>

<template>
  <Head>
    <Title>{{subject?.name}}- Programme cours</Title>
  </Head>
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
            <li class="breadcrumb-item">
              <NuxtLink href="/cours">Cours</NuxtLink>
            </li>
            <li aria-current="page" class="breadcrumb-item active">
              <h2 class="breadcrumb-current">
                <NuxtLink :href="`/cours/${subject?.slug}`">{{ subject?.name }}</NuxtLink>
              </h2>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <div class="page-body">
    <div class="container-xl">
      <div class="row row-deck row-cards">
        <div class="col-md-3 col-xl-3 m-2" v-for="course in courses">
          <NuxtLink class="card card-link" :href="`/cours/${subject.slug}/${course?.slug}`" style="background-image: url('/img/bg.svg')">
            <h3 class="p-3 page-title">
              {{ course.title }}
            </h3>
            <div class="card-footer p-1">
              <div class="text-muted">
                <span class="badge bg-azure-lt m-1" v-for="cls in course?.classes">{{ cls.name }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.col-md-3, .col-xl-3 {
  width: 20%
}
</style>