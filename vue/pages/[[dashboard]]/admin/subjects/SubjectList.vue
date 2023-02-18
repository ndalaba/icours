<script setup lang="ts">
import type {SubjectType} from "@/composables/type";
import Trash from "~/components/icons/Trash.vue";
import Edit from "~/components/icons/Edit.vue";
import ListPlaceholder from "~/components/layouts/default/ListPlaceholder.vue";
import {deleteRequest} from "~/utils/Request";
import {success} from "~/utils/Toaster";
import {alert} from "~/utils/alert";

const emit = defineEmits(['subjectUpdated', "subjectUpdateRequest"])
const {subjects} = defineProps<{ 'subjects': SubjectType[] }>()

const filteredSubjects = computed(() => subjects.filter(subject => subject.name.toLowerCase().includes(search.value.toLowerCase())))
const search = ref("")

function deleteSubject(uid: string) {
  alert({
    actionLabel: "Envoyer",
    show: false,
    title: "Suppression",
    description: "Supprimer cet élément",
    callable: function () {
      deleteRequest('/subjects/' + uid).then(_ => {
        emit('subjectUpdated')
        success(`Matière supprimée.`)
      })
    }
  })
}

function updateSubject(subject: SubjectType) {
  emit('subjectUpdateRequest', subject)
}

</script>
<template>
  <div class="mb-2">
    <div class="row justify-content-between">
      <div class="col-12">
        <form class="mb-2 mb-sm-0 search-form">
          <input v-model="search" class="form-control" id="search" placeholder="Rechercher..." type="search">
        </form>
      </div>
    </div>
  </div>
  <ListPlaceholder v-if="!subjects.length"/>
  <template v-else>
    <div class="card mb-2" v-for="subject in filteredSubjects">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-sm-4">
            <div class="d-flex align-items-start">
              <img :alt="subject.name" class="d-flex align-self-center me-3 rounded-4" height="64" :src="SERVER_UPLOAD_PATH + subject.image">
              <div class="w-100">
                <h4 class="mt-0 mt-3 font-16">{subject.name}</h4>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <p class="mb-1 mt-3 mt-sm-0">
              {{ subject.description }}
            </p>
          </div>

          <div class="col-sm-2">
            <div class="text-sm-end">
              <a class="m-lg-2" @click.prevent="updateSubject(subject)">
                <Edit/>
              </a>
              <a class="m-lg-2 text-red" @click="deleteSubject(subject.uid)">
                <Trash/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>