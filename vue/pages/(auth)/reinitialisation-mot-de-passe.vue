<script setup lang="ts">
	import {showValidationErrors} from '~/utils/Errors';
	import {PostContentType, postRequest} from '~/utils/Request';
	import Notification from '~/components/layouts/front/Notification.svelte';

	const showNotification = ref(false);

	async function handleSubmit(event: SubmitEvent) {
		const target = event.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(target).entries());
		const response = await postRequest('/password/recover-password', data,PostContentType.JSON);
		if (!response.success) {
			return showValidationErrors(response.error, 'reset-password');
		}
		showNotification.value = true;
	}
</script>

<template>

<Head>
	<Title>Mot de passe oublié</Title>
</Head>

<header class="py-8 py-md-8" style="background-image: none;">
	<div class="container text-center py-xl-2">
		<h1 class="display-4 fw-semi-bold mb-0">Mot de passe oublié?</h1>
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb breadcrumb-scroll justify-content-center">
				<li class="breadcrumb-item">
					<a class="text-gray-800" href="/">Accueil </a>
				</li>
				<li class="breadcrumb-item text-gray-800 active" aria-current="page">Mot de passe oublié</li>
			</ol>
		</nav>
	</div>
</header>

<div class="container mb-11">
	<div class="row gx-0">
		<div class="col-md-7 col-xl-4 mx-auto">
			<Notification 
			:message="'Pour finaliser votre opération veuillez consulter le message qui vient de vous être envoyé dans votre boite mail.'"
			:show="showNotification"
		/>

        <form class="mb-5" id="reset-password" @submit.prevent="handleSubmit">
			<div class="form-group">
				<input type="email" class="form-control" name="email" id="reset-password-email" placeholder="Adresse email" required />
				<div class="invalid-feedback" id="reset-password-email-feedback">Email non reconnu</div>
			</div>
			<p class="m-2">
				Entrez l'adresse e-mail avec laquelle vous vous êtes inscrit. Nous allons vous envoyer un e-mail avec votre nom d’utilisateur et un lien pour réinitialiser votre mot de passe.
			</p>

			<button class="btn btn-block btn-primary" type="submit"> RÉCUPÉRER MOT DE PASSE </button>
		</form>

			<!-- Text -->
			<p class="mb-0 font-size-sm text-center">
				Vous vous souvenez de votre mot de passe  <a class="text-underline" href="/connexion">Connexion</a>
			</p>
		</div>
	</div>
</div>
</template>