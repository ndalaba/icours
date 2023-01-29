<script lang="ts">
    import {getRequest, postRequest} from "$lib/helper/Request";
    import {showValidationErrors} from "$lib/helper/Errors";
    import type {SubjectType} from "$lib/type";
    import {onMount} from "svelte";

    let formTitle = "Ajouter un matière"

    let subjects: SubjectType[] = []

    onMount(()=>{
        getSubjects()
    })

    async function getSubjects() {
        const response = await getRequest("/subjects")
        subjects = response.data
    }

    async function handleSubmit(event: SubmitEvent) {
        const target = event.target as HTMLFormElement
        const data = Object.fromEntries(new FormData(target).entries());
        const response = await postRequest("/subjects", data);
        if (!response.success) {
            return showValidationErrors(response.error, 'subject');
        }
        target.reset()
        await getSubjects()
    }

</script>


<svelte:head>
    <title>I-Cours - Matières</title>
</svelte:head>

<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <div class="page-pretitle"> Tableau de bord</div>
                <h2 class="page-title"> Listes matières </h2>
            </div>
        </div>
    </div>
</div>
<div class="page-body">
    <div class="container-xl">
        <div class="row g-4">
            <div class="col-md-7">
                <div class="card">
                    <div class="table-responsive">
                        <table class="table table-vcenter card-table table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Matière</th>
                                <th>Description</th>
                                <th class="w-1"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {#each subjects as subject }
                            <tr>
                                <td></td>
                                <td class="text-muted"><a class="text-reset" href="#">{subject.subject}</a></td>
                                <td class="text-muted">
                                    {subject.description}
                                </td>
                                <td>
                                    <a href="#">Edit</a>
                                </td>
                            </tr>
                            {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <form class="card" id="subject" on:submit|preventDefault={handleSubmit}>
                    <div class="card-header">
                        <h3 class="card-title">{formTitle}</h3>
                    </div>
                    <div class="card-body">
                        <input name="id" type="hidden" value="0">
                        <div class="mb-3">
                            <label class="form-label">Matières</label>
                            <input class="form-control" id="subject-subject" name="subject" placeholder="" required>
                            <div class="invalid-feedback" id="subject-subject-feedback">Email déjà utilisé</div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
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
            </div>
        </div>
    </div>
</div>