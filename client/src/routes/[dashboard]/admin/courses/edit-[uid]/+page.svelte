<script lang="ts">
    import {page} from "$app/stores";
    import {getRequest, PostContentType, postRequest, putRequest} from "$lib/helper/Request";
    import {hideValidationErrors, showValidationErrors} from "$lib/helper/Errors";
    import {success} from "$lib/helper/Toaster";
    import {onMount} from "svelte";
    import type {CourseType} from "$lib/type";
    import {goto} from "$app/navigation";
    import {ClasseStore, SubjectStore} from "$lib/store.js";

    const uid = $page.params.uid
    let title = "Ajouter un cours"
    let course: CourseType = {
        title: '',
        id: 0,
        content: '',
        tag: "",
        published: false,
        uid: '',
        subject: {id: 0}
    };

    onMount(async () => {
        if (uid != 0) await getCourse()
        window?.jquery('.summernote').summernote('code', course.content);
    })

    async function getCourse() {
        const response = await getRequest("/courses/" + uid)
        course = response.data
        title = "Modifier le cours - " + course.title
    }

    async function handleSubmit(event: SubmitEvent) {

        hideValidationErrors()
        const target = event.target as HTMLFormElement
        let data = Object.fromEntries((new FormData(target)).entries())

        let classes = []
        document.getElementsByName<HTMLInputElement>('classes').forEach(elt => {
            if (elt.checked) {
                classes = [...classes, {id: +elt.getAttribute('value')}]
            }
        })

        data = {
            ...data,
            classes: classes,
            subject: {id: +data['subject']},
            content: window?.jquery('.summernote').summernote('code')
        }

        const response = +data['id'] == 0 ? await postRequest("/courses", data, PostContentType.JSON) : await putRequest("/courses", data, PostContentType.JSON);
        if (!response.success) {
            return showValidationErrors(response.error, 'course');
        }
        success(+data['id'] == 0 ? 'Cours ajouté' : 'Cours modifié.')
        await goto(`/dashboard/admin/courses/${response.data.uid}`)
    }

</script>
<svelte:head>
    <title>I-Cours - {title}</title>
</svelte:head>

<form class="row" enctype="multipart/form-data" id="course" on:submit|preventDefault={handleSubmit}>
    <div class="page-header d-print-none">
        <div class="container-xl">
            <div class="row g-2 align-items-center">
                <div class="col">
                    <h2 class="page-title">{title.toUpperCase()}</h2>
                </div>
                <div class="col-auto ms-auto d-print-none">
                    <div class="btn-list">
                        <a class="btn btn-ghost-danger" href="/dashboard/admin/courses">Annuler</a>
                        <button class="btn btn-primary d-none d-sm-inline-block" type="submit">
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="page-body">
        <div class="container-xl">
            <div class="row">
                <input class="d-none" name="id" type="number" value={course?.id}>
                <input class="d-none" name="uid" value={course?.uid}>
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-4">
                                <label class="form-label" for="course-title">Titre
                                    <span class="text-danger">*</span></label>
                                <input class="form-control" id="course-title" name="title" placeholder="ex: l'histore de la colonisation" required type="text" value={course?.title}>
                            </div>

                            <div class="mb-4">
                                <label class="form-label" for="course-tag">Tag</label>
                                <input class="form-control" id="course-tag" name="tag" placeholder="ex : esclavage, aliénation" type="text" value={course?.tag}>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Contenu</label>
                                <textarea class="form-control summernote" id="course-content" name="content" placeholder="Contenu">{course?.content}</textarea>
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
                                <select bind:value={course.subject.id} class="form-control" id="course-subject" name="subject" required>
                                    <option selected>Sélectionner une matière</option>
                                    {#each $SubjectStore as subject}
                                        <option value={subject.id}>{subject.name}</option>
                                    {/each}
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Classes<span class="text-danger">*</span></label>
                                <div class="form-selectgroup">
                                    {#each $ClasseStore as classe}
                                        <label class="form-selectgroup-item">
                                            <input type="checkbox" name="classes" value={classe.id} class="form-selectgroup-input" checked={course?.classes?.find(cls=>cls.id==classe.id)!==undefined?true:false}>
                                            <span class="form-selectgroup-label">{classe.name}</span>
                                        </label>
                                    {/each}
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Status du cours <span class="text-danger">*</span></label>
                                <div class="d-flex flex-wrap">
                                    <div class="form-check me-2">
                                        <input checked={course?.published==1} class="form-check-input" id="inlineRadio1" name="published" type="radio" value="1">
                                        <label class="form-check-label" for="inlineRadio1">Publié</label>
                                    </div>
                                    <div class="form-check me-2">
                                        <input checked={course?.published==0} class="form-check-input" id="inlineRadio2" name="published" type="radio" value="0">
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