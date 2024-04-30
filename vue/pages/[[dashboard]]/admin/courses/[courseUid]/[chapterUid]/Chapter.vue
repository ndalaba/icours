<script setup lang="ts">
import ListPlaceholder from "~/components/layouts/default/ListPlaceholder.vue";
import {ChapterType} from "~/composables/type";
import Edit from "~/components/icons/Edit.vue"
import Trash from "~/components/icons/Trash.vue"
import {deleteRequest} from "~/utils/Request";
import {success} from "~/utils/Toaster";

const emit = defineEmits(["chapterUpdateRequest"])
const props = defineProps<{
  chapter: ChapterType
}>()

function updateChapter(chapter: ChapterType) {
  document.getElementById('open_canvas')?.click()
  emit('chapterUpdateRequest', chapter)
}

function deleteChapter(uid: string) {
  alert({
    actionLabel: "Valider",
    show: false,
    title: "Suppression",
    description: "Supprimer ce chapitre?",
    callable: function () {
      deleteRequest('/chapters/' + uid).then(async _ => {
        success(`Chapitre supprimé.`)
        navigateTo(`/admin/courses/${props.chapter?.course.uid}`)
      })
    }
  })
}

</script>
<template>
  <div class="row" v-if="chapter.id">
    <div class="row row-cards">
      <div class="col-lg-10">
        <div class="card card-lg">
          <div class="card-header">
            <div class="row">
              <div class="col-10">
                <span class="pe-3">{{ chapter?.title?.toUpperCase() }}</span>
                <span :class="`m-1 badge ${chapter?.published ? 'bg-teal' : 'bg-danger'}`">{{ chapter?.published ? 'Publié' : 'Brouillon' }}</span>
              </div>
              <div class="col-2">
                <a class="btn btn-outline-secondary me-1" @click.prevent="updateChapter(chapter)">
                  <Edit/>
                </a>
                <a class="btn btn-outline-danger" @click.prevent="deleteChapter(chapter?.uid)">
                  <Trash/>
                </a>
              </div>
            </div>
          </div>
          <div class="card-body markdown p-4" v-html="chapter?.content">
          </div>
        </div>
      </div>
    </div>
  </div>
  <ListPlaceholder v-else/>
</template>