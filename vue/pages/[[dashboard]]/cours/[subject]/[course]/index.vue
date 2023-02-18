<script setup lang="ts">
import type {ChapterType, CourseType} from "@/composables/type";
import ListPlaceholder from "~/components/layouts/default/ListPlaceholder.vue";
import Chapters from "./_chapters.vue";
import {getRequest} from "~/utils/Request";

const route = useRoute()

const course = ref<CourseType | null>()
const chapters = ref<ChapterType[] | null>([])
let res = await getRequest('/courses/course/' + route.params?.course)
course.value = res?.success ? res?.data : null
res = await getRequest('/chapters/' + course.value?.id)
chapters.value = res.success ? res?.data : []

</script>

<template>
  <Head>
    <Title>{{course?.title}}</Title>
  </Head>
  <div class="course-detail">
    <div class="page-header d-print-none">
      <div class="container-fluid">
        <div class="row g-2 align-items-center">
          <div class="col">
            <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
              <li class="breadcrumb-item">
                <NuxtLink href="/cours">Cours</NuxtLink>
              </li>
              <li class="breadcrumb-item">
                <NuxtLink :href="`/cours/${course?.subject?.slug}`">{{ course?.subject?.name }}</NuxtLink>
              </li>
              <li aria-current="page" class="breadcrumb-item active">
                <h2 class="breadcrumb-current">
                  {{ course?.title }}
                </h2>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="container-fluid">
        <div class="row" v-if="course.id">
          <div class="row row-cards">
            <div class="col-lg-8">
              <div class="card card-lg">
                <div class="card-header">
                  <div class="row">
                    <div class="col-10">
                      <span class="pe-3">{{ course?.title?.toUpperCase() }}</span>
                    </div>
                  </div>
                </div>
                <div class="card-body markdown p-4" v-html="course?.content">
                </div>
              </div>
            </div>
            <div class="col-lg-4" v-if="chapters?.length">
              <div class="card">
                <div class="card-header">
                  <span class="pe-3">CHAPITRES DU COURS</span>
                </div>
                <div class="card-body">
                  <Chapters :chapters="chapters" :course="course"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ListPlaceholder v-else/>
      </div>
    </div>
  </div>
</template>