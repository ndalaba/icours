<script setup lang="ts">

import {CourseType} from "~/composables/type";
import {ClasseStore, SubjectStore} from "~/composables/store";
import Edit from "~/components/icons/Edit.vue";
import Trash from "~/components/icons/Trash.vue";
import ListPlaceholder from "~/components/layouts/default/ListPlaceholder.vue";
import {activeMenu} from "~/utils/layout";
import {removeObjectWithUid} from "~/utils/function";
import {deleteRequest, getRequest} from "~/utils/Request";
import {success} from "~/utils/Toaster";

const courses = ref<CourseType[]>([])
const loading = ref(true)
const search = ref("")

const filteredCourses = computed(() => courses.value.filter(course => course.title.toLowerCase().includes(search.value.toLowerCase())))

onMounted(() => {
  getCourses()
  activeMenu("#courses_menu")
})

function deleteCourse(uid: string) {
  alert({
    actionLabel: "Envoyer",
    show: false,
    title: "Suppression",
    description: "Supprimer ce cours?",
    callable: function () {
      deleteRequest('/courses/' + uid).then(async _ => {
        success(`Cours supprimé.`)
        courses.value = removeObjectWithUid(courses.value, uid)
      })
    }
  })
}

function findCourses(event: SubmitEvent) {
  const data = new FormData(event.target as HTMLFormElement)
  getRequest(`/courses?subject=${data.get('subject')}&classe=${data.get('classe')}&published=${data.get('published')}`).then(response => courses.value = response.data)
}

async function getCourses() {
  const response = await getRequest("/courses")
  courses.value = response.data
  loading.value = false
}

</script>

<template>
  <Head>
    <Title>I-Cours - Liste cours</Title>
  </Head>

  <div class="page-header d-print-none">
    <div class="container-fluid">
      <div class="row g-2 align-items-center">
        <div class="col">
          <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
            <li class="breadcrumb-item">
              <NuxtLink href="/admin">Tableau de bord</NuxtLink>
            </li>
            <li aria-current="page" class="breadcrumb-item active">
              <h2 class="breadcrumb-current">
                <NuxtLink href="/">Liste cours</NuxtLink>
              </h2>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>

  <div class="page-body">
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12">
          <div class="row justify-content-between">
            <div class="col-md-3">
              <div class="text-md-start mt-3 mt-md-0">
                <NuxtLink class="btn btn-primary d-none d-sm-inline-block" href="/admin/courses/edit-0">
                  <Edit/>
                  Ajouter un cours
                </NuxtLink>
              </div>
            </div>
            <div class="col-md-9 text-md-end">
              <form class="d-flex flex-wrap align-items-center search-form" @submit.prevent="findCourses">
                <div class="me-3 w-50">
                  <input v-model="search" class="form-control my-1 my-md-0" id="search" placeholder="Rechercher..." type="search">
                </div>
                <div class="me-sm-3">
                  <select class="form-select my-1 my-md-0" name="subject">
                    <option selected value="0">Matière</option>
                    <option v-for="subject in SubjectStore.subjects" :value="subject.id">{{ subject.name }}</option>
                  </select>
                </div>
                <div class="me-sm-3">
                  <select class="form-select my-1 my-md-0" name="classe">
                    <option selected value="0">Classe</option>
                    <option v-for="classe in ClasseStore.classes" :value="classe.id">{{ classe.name }}</option>
                  </select>
                </div>
                <div class="me-sm-3">
                  <select class="form-select my-1 my-md-0" name="published">
                    <option selected value="2">État</option>
                    <option value="1">Publié</option>
                    <option value="0">Brouillon</option>
                  </select>
                </div>
                <div class="me-sm-3">
                  <div class="col-auto">
                    <button aria-label="Button" class="btn btn-icon">
                      <svg class="icon" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                        <path d="M21 21l-6 -6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-vcenter card-table table-striped">
          <thead>
          <tr>
            <th>Titre</th>
            <th>Matière</th>
            <th>Auteur</th>
            <th>Classes</th>
            <th>Status</th>
            <th></th>
          </tr>
          </thead>

          <tr v-if="loading">
            <td>
              <ListPlaceholder/>
            </td>
            <td>
              <ListPlaceholder/>
            </td>
            <td>
              <ListPlaceholder/>
            </td>
            <td>
              <ListPlaceholder/>
            </td>
          </tr>
          <tbody v-else>
          <tr v-for="course in filteredCourses">
            <td>
              <NuxtLink :href="`/admin/courses/${course.uid}`" class="text-black-gray">{{ course.title }}</NuxtLink>
            </td>
            <td class="text-muted">
              {{ course.subject.name }}
            </td>
            <td class="text-muted">
              {{ course.user.firstName }}
            </td>
            <td class="text-muted">
              <span class="badge bg-blue m-1" v-for="classe in course.classes">{{ classe.name }}</span>
            </td>
            <td class="text-muted">
              <span :class="`badge ${course.published ? 'bg-teal' : 'bg-danger'}`">{{ course.published ? 'Publié' : 'Brouillon' }}</span>
            </td>
            <td>
              <NuxtLink :href="`/admin/courses/edit-${course.uid}`">
                <Edit/>
              </NuxtLink>
              <a class="text-danger" @click.prevent="deleteCourse(course.uid)">
                <Trash/>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>