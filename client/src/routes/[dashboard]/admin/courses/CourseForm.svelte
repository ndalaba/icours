<script lang="ts">
    import {hideValidationErrors, showValidationErrors} from "$lib/helper/Errors.js";
    import type {ClasseType, CourseType, SubjectType} from "$lib/type";
    import {PostContentType, postRequest, putRequest} from "$lib/helper/Request";
    import {createEventDispatcher} from "svelte";
    import {success} from "$lib/helper/Toaster";

    const dispatch = createEventDispatcher()

    let formTitle = "Ajouter un cours"
    export let formData: CourseType;
    export let subjects: SubjectType[]
    export let classes: ClasseType[]

    $: if (formData?.uid) formTitle = "Modifier la course " + formData?.title

    async function handleSubmit(event: SubmitEvent) {

        hideValidationErrors()
        const target = event.target as HTMLFormElement
        const data = Object.fromEntries((new FormData(target)).entries())

        let classes = []
        document.getElementsByName<HTMLInputElement>('classes').forEach(elt => {
            if (elt.checked) {
                classes = [...classes, {id: +elt.getAttribute('value')}]
            }
        })
        const response = +data['id'] == 0 ? await postRequest("/courses", {
            ...data,
            classes: classes,
            subject: {id: +data['subject']}
        }, PostContentType.JSON) : await putRequest("/courses", {
            ...data,
            classes: classes,
            subject: {id: +data['subject']}
        }, PostContentType.JSON);
        if (!response.success) {
            return showValidationErrors(response.error, 'course');
        }
        target.reset()
        success(+data['id'] == 0 ? 'Course ajouté' : 'Course modifié.')
        dispatch('course-updated')
    }
</script>
<div aria-labelledby="offcanvasEndLabel" class="offcanvas offcanvas-end" id="offcanvasEnd" tabindex="-1">
    <div class="offcanvas-header bg-light text-uppercase">
        <h2 class="offcanvas-title bg-light" id="offcanvasEndLabel">{formTitle}</h2>
        <button aria-label="Close" class="btn-close text-reset" data-bs-dismiss="offcanvas" type="button"></button>
    </div>
    <div class="offcanvas-body">
        <form enctype="multipart/form-data" id="course" on:submit|preventDefault={handleSubmit}>
            <input class="d-none" name="id" type="number" value={formData.id}>
            <input class="d-none" name="uid" value={formData.uid}>
            <div class="mb-4">
                <label class="form-label" for="course-title">Titre <span class="text-danger">*</span></label>
                <input class="form-control" id="course-title" name="title" placeholder="ex: l'histore de la colonisation" required type="text" value={formData.title}>
            </div>

            <div class="mb-4">
                <label class="form-label" for="course-tag">Tag</label>
                <input class="form-control" id="course-tag" name="tag" placeholder="ex : esclavage, aliénation" type="text" value={formData.tag}>
            </div>

            <div class="mb-4">
                <label class="form-label" for="course-subject">Matière <span class="text-danger">*</span></label>
                <select bind:value={formData.subject.id} class="form-control" id="course-subject" name="subject">
                    <option selected>Sélectionner une matière</option>
                    {#each subjects as subject}
                        <option value={subject.id}>{subject.name}</option>
                    {/each}
                </select>
            </div>
            <div class="mb-4">
                <label class="form-label">Classes<span class="text-danger">*</span></label>
                <div class="form-selectgroup">
                    {#each classes as classe}
                        <label class="form-selectgroup-item">
                            <input type="checkbox" name="classes" value={classe.id} class="form-selectgroup-input" checked={formData.classes?.find(cls=>cls.id==classe.id)!==undefined?true:false}>
                            <span class="form-selectgroup-label">{classe.name}</span>
                        </label>
                    {/each}
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label">Status du cours <span class="text-danger">*</span></label>
                <div class="d-flex flex-wrap">
                    <div class="form-check me-2">
                        <input checked={formData.published} class="form-check-input" id="inlineRadio1" name="published" type="radio" value="1">
                        <label class="form-check-label" for="inlineRadio1">Publié</label>
                    </div>
                    <div class="form-check me-2">
                        <input checked={!formData.published} class="form-check-input" id="inlineRadio2" name="published" type="radio" value="0">
                        <label class="form-check-label" for="inlineRadio2">Brouillon</label>
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label">Contenu</label>
                <textarea class="form-control" id="course-content" name="content" placeholder="Contenu" required rows="7">{formData.content}</textarea>
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