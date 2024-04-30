<script setup lang="ts">
import {getRequest} from "~/utils/Request";
import type {SubjectType} from "@/composables/type";
import SubjectForm from "./SubjectForm.vue";
import SubjectList from "./SubjectList.vue";
import {activeMenu} from "~/utils/layout";
import {SubjectStore} from "@/composables/store";

const subjects = ref<SubjectType[]>([])
const currentSubject = ref<SubjectType>({name: '', id: 0, description: '', image: '', uid: ''})

onMounted(() => {
  activeMenu("#subjects_menu")
})

async function getSubjects() {
  getRequest('/subjects').then(response => SubjectStore.setSubjects(response.data))
}

function setCurrentSubject(data: SubjectType) {
  currentSubject.value = data
}
</script>
<template>
  <Head>
    <Title>I-Cours - Matières</Title>
  </Head>

  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
            <li class="breadcrumb-item">
              <NuxtLink href="/admin">Tableau de bord</NuxtLink>
            </li>
            <li aria-current="page" class="breadcrumb-item active">
              <h2 class="breadcrumb-current">
                <NuxtLink href="/">Liste matières</NuxtLink>
              </h2>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <div class="page-body">
    <div class="container-xl">
      <div class="row g-4">
        <div class="col-md-6">
          <SubjectList @subject-update-request="setCurrentSubject" @subject-updated="getSubjects" />
        </div>
        <div class="col-md-6">
          <SubjectForm :formData="currentSubject" @subject-updated="getSubjects"/>
        </div>
      </div>
    </div>
  </div>
</template>