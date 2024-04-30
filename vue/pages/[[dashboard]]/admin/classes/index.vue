<script setup lang="ts">
import {ClasseType} from "~/composables/type";
import {ClasseStore} from "~/composables/store";
import ClasseList from "~/pages/[[dashboard]]/admin/classes/ClasseList.vue";
import ClasseForm from "~/pages/[[dashboard]]/admin/classes/ClasseForm.vue";
import {activeMenu} from "~/utils/layout";

const classes = ref<ClasseType[]>([])
const currentClasse = ref<ClasseType>({name: '', id: 0, description: '', uid: ''})

onMounted(() => activeMenu("#classes_menu"))
const getClasses = async () => getRequest('/classes').then(response => ClasseStore.setClasses(response.data))
const setCurrentClasse = (data: ClasseType) => currentClasse.value = data

</script>
<template>
  <Head>
    <Title>I-Cours - Classes</Title>
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
                <NuxtLink href="/">Liste classes</NuxtLink>
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
          <ClasseList @classe-update-request="setCurrentClasse" @classe-updated="getClasses"/>
        </div>
        <div class="col-md-6">
          <ClasseForm :formData="currentClasse" @classe-updated="getClasses"/>
        </div>
      </div>
    </div>
  </div>
</template>