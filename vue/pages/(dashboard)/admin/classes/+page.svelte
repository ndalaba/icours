<script lang="ts">
    import {getRequest} from "$lib/helper/Request";
    import type {ClasseType} from "$lib/type";
    import {onMount} from "svelte";
    import ClasseForm from "./ClasseForm.svelte";
    import ClasseList from "./ClasseList.svelte";
    import {activeMenu} from "$lib/helper/layout";
    import {ClasseStore} from "$lib/store";

    let classes: ClasseType[] = []
    let currentClasse: ClasseType = {name: '', id: 0, description: '', uid: ''};

    onMount(() => {
        activeMenu("#classes_menu")
    })

    async function getClasses() {
        getRequest('/classes').then(response => ClasseStore.set(response.data))
    }

    function setCurrentClasse(event) {
        currentClasse = event.detail.data
    }
</script>

<svelte:head>
    <title>I-Cours - Classes</title>
</svelte:head>

<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
                    <li class="breadcrumb-item"><a href="/admin">Tableau de bord</a></li>
                    <li aria-current="page" class="breadcrumb-item active">
                        <h2 class="breadcrumb-current"><a href="/">Liste classes</a></h2>
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
                <ClasseList on:classe-update-request={setCurrentClasse} on:classe-updated={getClasses} classes={$ClasseStore}/>
            </div>
            <div class="col-md-6">
                <ClasseForm formData={currentClasse} on:classe-updated={getClasses}/>
            </div>
        </div>
    </div>
</div>