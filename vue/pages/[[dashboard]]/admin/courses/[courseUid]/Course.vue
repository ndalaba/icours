<script setup lang="ts">
import ListPlaceholder from "~/components/layouts/default/ListPlaceholder.vue";
import {ChapterType, CourseType} from "~/composables/type";
import {removeObjectWithUid} from "~/utils/function";
import {deleteRequest} from "~/utils/Request";
import {alert} from "~/utils/alert";
import {success} from "~/utils/Toaster";
import Edit from "~/components/icons/Edit.vue"
import Trash from "~/components/icons/Trash.vue"

const emit = defineEmits(["chapterUpdateRequest"])
const props = defineProps<{
  chapters: ChapterType[],
  course: CourseType,
  loading: boolean
}>()

const chapters = ref<ChapterType[]>(props.chapters)
function deleteChapter(uid: string) {
  alert({
    actionLabel: "Envoyer",
    show: false,
    title: "Suppression",
    description: "Supprimer ce chapitre?",
    callable: function () {
      deleteRequest('/chapters/' + uid).then(_ => {
        success(`Chapitre supprimé.`)
        chapters.value = removeObjectWithUid(chapters.value, uid);
      })
    }
  })
}

function updateChapter(chapter: ChapterType) {
  document.getElementById('open_canvas')?.click()
  emit('chapterUpdateRequest', chapter)
}

function deleteCourse(uid: string) {
  alert({
    actionLabel: "Envoyer",
    show: false,
    title: "Suppression",
    description: "Supprimer ce cours",
    callable: function () {
      deleteRequest('/courses/' + uid).then(async _ => {
        success(`Course supprimé.`)
        navigateTo('/admin/courses')
      })
    }
  })
}

</script>
<template>
  <div class="row" v-if="course.id">
    <div class="row row-cards">
      <div class="col-lg-8">
        <div class="card card-lg">
          <div class="card-header">
            <div class="row">
              <div class="col-10">
                 <span class="pe-3">{{ course?.title?.toUpperCase() }}
                     <br><strong>({{ course?.subject?.name?.toUpperCase() }})</strong>
                 </span>
                <span :class="`m-1 badge ${course?.published ? 'bg-teal' : 'bg-danger'}`">{{ course?.published ? 'Publié' : 'Brouillon' }}</span>
                <span class="badge bg-blue m-1" v-for="classe in course?.classes">{{ classe.name }}</span>
              </div>
              <div class="col-2">
                <NuxtLink class="btn btn-outline-secondary me-1" :href="`/admin/courses/edit-${course?.uid}`">
                  <Edit/>
                </NuxtLink>
                <a class="btn btn-outline-danger" @click.prevent="deleteCourse(course?.uid)">
                  <Trash/>
                </a>
              </div>

            </div>
          </div>
          <div class="card-body markdown p-4" v-html="course?.content">
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <span class="pe-3">CHAPITRES DU COURS</span>
            <a aria-controls="offcanvasEnd" class="btn btn-outline-secondary d-none d-sm-inline-block" data-bs-toggle="offcanvas" href="#offcanvasEnd" id="open_canvas" role="button">
              <Edit/>
              Ajouter un chapitre
            </a>
          </div>
          <div class="card-body">
            <ListPlaceholder v-if="loading"/>
            <template v-else>
              <div v-for="chapter in chapters" class="border-bottom border-color-20 py-3 d-md-flex align-items-center">
                <div class="d-flex align-items-center me-auto mb-4 mb-md-0" style="width: 76%">
                  <div class="text-secondary d-flex">
                    <span :class="`badge ${chapter.published ? 'bg-teal' : 'bg-danger'}`">{{ chapter.published ? 'Publié' : 'Brouillon' }}</span>
                  </div>
                  <div class="ms-2">
                    <NuxtLink :href="`/admin/courses/${course.uid}/${chapter.uid}`" class="text-black">{{ chapter.title }}</NuxtLink>
                  </div>
                </div>

                <div class="dropdown">
                  <button class="btn btn-ghost-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Action
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" type="button" @click="updateChapter(chapter)">Modifier</button>
                    </li>
                    <li>
                      <button class="dropdown-item text-danger" type="button" @click="deleteChapter(chapter.uid)">Supprimer</button>
                    </li>
                  </ul>
                </div>

              </div>
            </template>
            <h2 class="text-center mt-2" v-if="!chapters?.length">Aucun chapitre n'a été ajouté à ce cours</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ListPlaceholder v-else/>
</template>