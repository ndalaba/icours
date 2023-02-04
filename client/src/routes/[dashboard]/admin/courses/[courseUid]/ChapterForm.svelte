<script lang="ts">
    import {hideValidationErrors, showValidationErrors} from "$lib/helper/Errors.js";
    import type {ChapterType, CourseType} from "$lib/type";
    import {PostContentType, postRequest, putRequest} from "$lib/helper/Request";
    import {createEventDispatcher} from "svelte";
    import {success} from "$lib/helper/Toaster";

    const dispatch = createEventDispatcher()

    let formTitle = "Ajouter un chapitre"
    export let formData: ChapterType;
    export let course:CourseType

    $: if (formData?.uid) formTitle = "Modifier le chapitre " + formData?.title

    async function handleSubmit(event: SubmitEvent) {

        hideValidationErrors()
        const target = event.target as HTMLFormElement
        const data = Object.fromEntries((new FormData(target)).entries())

        const response = +data['id'] == 0 ? await postRequest("/chapters", {
            ...data,
            course: {id: +data['course']}
        }, PostContentType.JSON) : await putRequest("/chapters", {
            ...data,
            course: {id: +data['course']}
        }, PostContentType.JSON);

        if (!response.success) {
            return showValidationErrors(response.error, 'course');
        }
        target.reset()
        document.querySelector<HTMLInputElement>("#course").value = course?.id as string
        success(+data['id'] == 0 ? 'Chapitre ajouté' : 'Chapitre modifié.')
        dispatch('chapter-updated')
    }
</script>
<div aria-labelledby="offcanvasEndLabel" class="offcanvas offcanvas-end" id="offcanvasEnd" tabindex="-1">
    <div class="offcanvas-header bg-light text-uppercase">
        <h2 class="offcanvas-title bg-light" id="offcanvasEndLabel">{formTitle}</h2>
        <button aria-label="Close" class="btn-close text-reset" data-bs-dismiss="offcanvas" type="button"></button>
    </div>
    <div class="offcanvas-body">
        <form enctype="multipart/form-data" id="chapter" on:submit|preventDefault={handleSubmit}>
            <input class="d-none" name="id" type="number" value={formData.id}>
            <input class="d-none" name="uid" value={formData.uid}>
            <input class="d-none" name="course" id="course" value={course?.id}>
            <div class="mb-4">
                <label class="form-label" for="chapter-title">Titre <span class="text-danger">*</span></label>
                <input class="form-control" id="chapter-title" name="title" placeholder="ex: l'histore de la colonisation" required type="text" value={formData.title}>
            </div>

            <div class="mb-4">
                <label class="form-label" for="chapter-tag">Tag</label>
                <input class="form-control" id="chapter-tag" name="tag" placeholder="ex : esclavage, aliénation" type="text" value={formData.tag}>
            </div>

            <div class="mb-4">
                <label class="form-label" for="">Status du cours <span class="text-danger">*</span></label>
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
                <label class="form-label" for="chapter-content">Contenu</label>
                <textarea class="form-control" id="chapter-content" name="content" placeholder="Contenu" required rows="7">{formData.content}</textarea>
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