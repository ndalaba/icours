<script setup lang="ts">
import {ClasseType, CourseType} from "~/composables/type";
import {SubjectStore} from "~/composables/store";
import {getRequest} from "~/utils/Request";
import {hideValidationErrors} from "~/utils/Errors";

useHead({
  script: [{src: "https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"}]
})

const route = useRoute()

const uid = route.params.uid
const title = ref('Ajouter un cours')
const course = ref<CourseType>({
  title: '',
  id: 0,
  content: '',
  tag: "",
  published: false,
  uid: '',
  subject: {id: 0}
})

onMounted(async () => {
  if (+uid != 0) await getCourse()
  $('.summernote').summernote('code', course.value?.content)
})

async function getCourse() {
  const response = await getRequest("/courses/" + uid)
  course.value = response.data
  title.value = "Modifier le cours - " + course.value.title
}

async function handleSubmit(event: SubmitEvent) {

  hideValidationErrors()
  const target = event.target as HTMLFormElement

  let data = Object.fromEntries((new FormData(target)).entries())

  let classes: any[] = []

  document.querySelectorAll<HTMLInputElement>(".classes_checkbox").forEach(elt => {
    if (elt.checked) classes.push({id: elt?.getAttribute('value')})
  })

  data = {...data, classes: classes, subject: {id: +data['subject']},content: $('.summernote').summernote('code')}

  const response = +data['id'] == 0 ? await postRequest("/courses", data, PostContentType.JSON) : await putRequest("/courses", data, PostContentType.JSON);
  if (!response.success) return showValidationErrors(response.error, 'course');

  success(+data['id'] == 0 ? 'Cours ajouté' : 'Cours modifié.')
  await navigateTo(`/admin/courses/${response.data.uid}`)
}

const checked = (course: CourseType, classe: ClasseType) => course?.classes?.find(cls => cls.id === classe.id) !== undefined
</script>
<template>
  <Head>
    <Title>I-Cours - {{title}}</Title>
    <Link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css" rel="stylesheet"/>
  </Head>

  <form enctype="multipart/form-data" id="course" @submit.prevent="handleSubmit">
    <div class="page-header d-print-none">
      <div class="container-fluid">
        <div class="row g-2 align-items-center">
          <div class="col">
            <h2 class="page-title">{{ title.toUpperCase() }}</h2>
          </div>
          <div class="col-auto ms-auto d-print-none">
            <div class="btn-list">
              <NuxtLink class="btn btn-ghost-danger" href="/admin/courses">Annuler</NuxtLink>
              <button class="btn btn-primary d-none d-sm-inline-block" type="submit">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container-fluid">
        <div class="row">
          <input class="d-none" name="id" type="number" :value="course?.id">
          <input class="d-none" name="uid" :value="course?.uid">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-body">
                <div class="mb-4">
                  <label class="form-label" for="course-title">Titre
                    <span class="text-danger">*</span></label>
                  <input class="form-control" id="course-title" name="title" placeholder="ex: l'histore de la colonisation" required type="text" :value="course?.title">
                </div>

                <div class="mb-4">
                  <label class="form-label" for="course-tag">Tag</label>
                  <input class="form-control" id="course-tag" name="tag" placeholder="ex : esclavage, aliénation" type="text" :value="course?.tag">
                </div>

                <div class="mb-4">
                  <label class="form-label">Contenu</label>

                  <textarea class="form-control summernote" id="course-content" name="content" placeholder="Contenu">{{course?.content}}</textarea>
                </div>

              </div>
            </div> <!-- end card -->
          </div> <!-- end col -->

          <div class="col-lg-4">

            <div class="card">
              <div class="card-body">
                <div class="mb-4">
                  <label class="form-label" for="course-subject">
                    Matière<span class="text-danger">*</span>
                  </label>
                  <select v-model="course.subject.id" class="form-control" id="course-subject" name="subject" required>
                    <option selected>Sélectionner une matière</option>
                    <option v-for="subject in SubjectStore.subjects" :value="subject.id">{{ subject.name }}</option>
                  </select>
                </div>

                <div class="mb-4">
                  <label class="form-label">Classes<span class="text-danger">*</span></label>
                  <div class="form-selectgroup">
                    <label class="form-selectgroup-item" v-for="classe in ClasseStore.classes">
                      <input type="checkbox" name="classes" :value="classe.id" class="form-selectgroup-input classes_checkbox" :checked="checked(course,classe)">
                      <span class="form-selectgroup-label">{{ classe.name }}</span>
                    </label>
                  </div>
                </div>

                <div class="mb-4">
                  <label class="form-label">Status du cours <span class="text-danger">*</span></label>
                  <div class="d-flex flex-wrap">
                    <div class="form-check me-2">
                      <input :checked="course?.published===1" class="form-check-input" id="inlineRadio1" name="published" type="radio" value="1">
                      <label class="form-check-label" for="inlineRadio1">Publié</label>
                    </div>
                    <div class="form-check me-2">
                      <input :checked="course?.published===0" class="form-check-input" id="inlineRadio2" name="published" type="radio" value="0">
                      <label class="form-check-label" for="inlineRadio2">Brouillon</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>