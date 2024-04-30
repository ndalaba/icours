<script setup lang="ts">
import Edit from "~/components/icons/Edit.vue"
import Trash from "~/components/icons/Trash.vue"
import {ClasseType} from "~/composables/type";
import ListPlaceholder from "~/components/layouts/default/ListPlaceholder.vue";
import {ClasseStore} from "~/composables/store";

const emit = defineEmits(['classeUpdated', "classeUpdateRequest"])
const search = ref('')

const filteredClasses = computed(() => ClasseStore.classes.filter(classe => classe.name.toLowerCase().includes(search.value.toLowerCase())))

function deleteClasse(uid: string) {
  alert({
    actionLabel: "Envoyer",
    show: false,
    title: "Suppression",
    description: "Supprimer cet élément?",
    callable: function () {
      deleteRequest('/classes/' + uid).then(_ => {
        emit('classeUpdated')
        success(`Classe supprimée.`)
      })
    }
  })
}

function updateClasse(classe: ClasseType) {
  emit('classeUpdateRequest', classe)
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
  <ListPlaceholder v-if="!ClasseStore.classes.length"/>
  <template v-else>
    <div class="card mb-2" v-for="classe in filteredClasses">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-sm-4">
            <div class="d-flex align-items-start">
              <div class="w-100">
                <h4 class="mt-0 mt-3 font-16">{{ classe.name }}</h4>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <p class="mb-1 mt-3 mt-sm-0">
              {{ classe.description }}
            </p>
          </div>

          <div class="col-sm-2">
            <div class="text-sm-end">
              <a class="m-lg-2" @click.prevent="updateClasse(classe)">
                <Edit/>
              </a>
              <a class="m-lg-2 text-red" @click.prevent="deleteClasse(classe.uid)">
                <Trash/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>