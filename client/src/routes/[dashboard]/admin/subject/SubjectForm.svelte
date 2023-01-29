<script lang="ts">
   import {showValidationErrors} from "$lib/helper/Errors.js";
   import type {SubjectType} from "$lib/type";
   import {postRequest} from "$lib/helper/Request";
   import {createEventDispatcher} from "svelte";

   const dispatch = createEventDispatcher()

   let formTitle = "Ajouter un matière"
   let formData: SubjectType;
   async function handleSubmit(event: SubmitEvent) {
      const target = event.target as HTMLFormElement
      const data = Object.fromEntries(new FormData(target).entries());
      const response = await postRequest("/subjects", data);
      if (!response.success) {
         return showValidationErrors(response.error, 'subject');
      }
      target.reset()
       dispatch('subjectSaved')
      //await getSubjects()
   }
</script>

<form class="card" id="subject" on:submit|preventDefault={handleSubmit}>
    <div class="card-header">
        <h3 class="card-title">{formTitle}</h3>
    </div>
    <div class="card-body">
        <input name="id" type="hidden" value="0">
        <div class="mb-3">
            <label class="form-label" for="subject-subject">Matières</label>
            <input class="form-control" id="subject-subject" name="subject" placeholder="" required>
            <div class="invalid-feedback" id="subject-subject-feedback">Email déjà utilisé</div>
        </div>
        <div class="mb-3">
            <label class="form-label" for="subject-description">Description</label>
            <textarea class="form-control" id="subject-description" name="description" required rows="3"></textarea>
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