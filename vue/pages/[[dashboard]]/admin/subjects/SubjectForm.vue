<script setup lang="ts">
import {hideValidationErrors, showValidationErrors} from "~/utils/Errors";
import type {SubjectType} from "@/composables/type";
import {postRequest, putRequest} from "~/utils/Request";
import {success} from "~/utils/Toaster";

const emit = defineEmits(['subjectUpdated'])

const {formData} = defineProps<{ formData: SubjectType }>()

const formTitle = computed(() => formData?.uid ? `Modifier la matière ${formData?.name}` : "Ajouter une matière")

async function handleSubmit(event: SubmitEvent) {
  hideValidationErrors()
  const target = event.target as HTMLFormElement
  const data = new FormData(target)
  const response = +data?.get('id') === 0 ? await postRequest("/subjects", data) : await putRequest("/subjects", data);
  if (!response.success) {
    return showValidationErrors(response.error, 'subject');
  }
  target.reset()
  success(+data?.get('id') === 0 ? 'Matière ajoutée' : 'Matière modifiée.')
  emit('subjectUpdated')
}
</script>
<template>
  <form class="card" enctype="multipart/form-data" id="subject" @submit.prevent="handleSubmit">
    <div class="card-header">
      <h3 class="card-title">{{ formTitle }}</h3>
    </div>
    <div class="card-body">
      <input class="d-none" name="id" type="number" :value="formData.id">
      <input class="d-none" name="uid" :value="formData.uid">
      <div class="mb-3">
        <label class="form-label" for="subject-subject">Matières</label>
        <input class="form-control" id="subject-subject" name="name" required :value="formData.name">
        <div class="invalid-feedback" id="subject-subject-feedback">Matière déjà enregistrée</div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="subject-description">Description</label>
        <textarea class="form-control" id="subject-description" name="description" rows="3" :value="formData.description"></textarea>
      </div>
      <div class="mb-3">
        <div class="form-label">Image matière</div>
        <input class="form-control" name="image" type="file"/>
      </div>
    </div>

    <div class="card-footer">
      <div class="row align-items-center">
        <div class="col">
          <button class="btn btn-ghost-secondary" type="reset">Annuler</button>
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" type="submit">Enregistrer</button>
        </div>
      </div>
    </div>
  </form>
</template>