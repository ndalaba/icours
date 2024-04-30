<script setup lang="ts">
import {ClasseType} from "~/composables/type";
import {success} from "~/utils/Toaster";

const emit = defineEmits(["classeUpdated"])

const {formData} = defineProps<{ formData: ClasseType }>()

const formTitle = computed(() => formData?.uid ? `Modifier la classe ${formData?.name}` : "Ajouter une classe")

async function handleSubmit(event: SubmitEvent) {
  hideValidationErrors()
  const target = event.target as HTMLFormElement
  const data = Object.fromEntries((new FormData(target)).entries())
  const response = +data['id'] == 0 ? await postRequest("/classes", data, PostContentType.JSON) : await putRequest("/classes", data, PostContentType.JSON);
  if (!response.success) {
    return showValidationErrors(response.error, 'classe');
  }
  target.reset()
  success(+data['id'] == 0 ? 'Classe ajoutée' : 'Classe modifiée.')
  emit('classeUpdated')
}
</script>
<template>
  <form class="card" enctype="multipart/form-data" id="classe" @submit.prevent="handleSubmit">
    <div class="card-header">
      <h3 class="card-title">{{ formTitle }}</h3>
    </div>
    <div class="card-body">
      <input class="d-none" name="id" type="number" :value="formData.id">
      <input class="d-none" name="uid" :value="formData.uid">
      <div class="mb-3">
        <label class="form-label" for="classe-name">Classe</label>
        <input class="form-control" id="classe-name" name="name" required :value="formData.name">
        <div class="invalid-feedback" id="classe-name-feedback">Classe déjà enregistrée</div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="classe-description">Description</label>
        <textarea class="form-control" id="classe-description" name="description" rows="3" :value="formData.description"></textarea>
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