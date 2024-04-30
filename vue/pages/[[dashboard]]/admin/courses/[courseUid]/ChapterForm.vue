<script setup lang="ts">

import {ChapterType, CourseType} from "~/composables/type";
import {showValidationErrors} from "~/utils/Errors";

useHead({
  script: [{src: "https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"}]
})
const emit = defineEmits(["chapterUpdated"])

const props = defineProps<{
  formData: ChapterType,
  course: CourseType
}>()

const formData = ref(props.formData)
const formTitle = computed(() => props.formData?.uid ? `Modifier le chapitre ${props.formData?.title}` : "Ajouter un chapitre")

onMounted(() => {
  $('.summernote').summernote('code', formData.value?.content);
})


async function handleSubmit(event: SubmitEvent) {
  hideValidationErrors()
  const summernote = $('.summernote')
  const target = event.target as HTMLFormElement
  let data = Object.fromEntries((new FormData(target)).entries())
  data = {...data, course: {id: +data['course']}, content: summernote.summernote('code')}

  const response = +data['id'] == 0 ? await postRequest("/chapters", data, PostContentType.JSON) : await putRequest("/chapters", data, PostContentType.JSON);
  if (!response.success) return showValidationErrors(response.error, 'course');

  target.reset()
  summernote.summernote('code', '');
  document.querySelector<HTMLInputElement>("#course").value = props.course?.id as string
  success(+data['id'] == 0 ? 'Chapitre ajouté' : 'Chapitre modifié.')
  emit('chapterUpdated')
}
</script>
<template>
  <Head>
    <Title></Title>
    <Link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css" rel="stylesheet"/>
  </Head>
  <div aria-labelledby="offcanvasEndLabel" class="offcanvas offcanvas-end" id="offcanvasEnd" tabindex="-1">
    <div class="offcanvas-header bg-light text-uppercase">
      <h2 class="offcanvas-title bg-light" id="offcanvasEndLabel">{{ formTitle }}</h2>
      <button aria-label="Close" class="btn-close text-reset" data-bs-dismiss="offcanvas" type="button"></button>
    </div>
    <div class="offcanvas-body">
      <form enctype="multipart/form-data" id="chapter" @submit.prevent="handleSubmit">
        <input class="d-none" name="id" type="number" :value="formData.id">
        <input class="d-none" name="uid" :value="formData.uid">
        <input class="d-none" type="number" id="course" name="course" :value="props.course?.id">
        <div class="mb-4">
          <label class="form-label" for="chapter-title">Titre <span class="text-danger">*</span></label>
          <input class="form-control" id="chapter-title" name="title" placeholder="ex: l'histore de la colonisation" required type="text" :value="formData.title">
        </div>

        <div class="mb-4">
          <label class="form-label">Status du cours <span class="text-danger">*</span></label>
          <div class="d-flex flex-wrap">
            <div class="form-check me-2">
              <input :checked="formData.published" class="form-check-input" id="inlineRadio1" name="published" type="radio" value="1">
              <label class="form-check-label" for="inlineRadio1">Publié</label>
            </div>
            <div class="form-check me-2">
              <input :checked="!formData.published" class="form-check-input" id="inlineRadio2" name="published" type="radio" value="0">
              <label class="form-check-label" for="inlineRadio2">Brouillon</label>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label" for="chapter-content">Contenu</label>
          <textarea class="form-control summernote" id="chapter-content" name="content" placeholder="Contenu">{{formData.content}}</textarea>
        </div>

        <div class="row align-items-center mt-4">
          <div class="col">
            <button class="btn btn-ghost-secondary" data-bs-dismiss="offcanvas" type="reset">Annuler</button>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary" type="submit">Enregistrer</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>