<script lang="ts">
	import { showValidationErrors } from '$lib/helper/Errors';
	import { post } from '$lib/helper/Request';
	import Notification from '$lib/components/layouts/Notification.svelte';
	import CloseBtn from './CloseBtn.svelte';

	let showNotification = false;

	async function handleSubmit(event: SubmitEvent) {
		const target = event.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(target).entries());
		const response = await post('/password/recover-password', data);
		if (!response.success) {
			return showValidationErrors(response.error,'reset-password');
		}
		showNotification = true;
	}
</script>

<div class="collapse" id="collapseForgotPassword" data-bs-parent="#accountModal">
	<div class="modal-header">
		<h5 class="modal-title">Réinitialiser mot de passe!</h5>
		<CloseBtn/>
	</div>

	<div class="modal-body">
		<Notification 
			message="Pour finaliser votre opération veuillez consulter le message qui vient de vous être envoyé dans votre boite mail."
			show={showNotification}
		/>

		<form class="mb-5" id="reset-password" on:submit|preventDefault={handleSubmit}>
			<div class="form-group">
				<label for="reset-password-email">Email</label>
				<input type="email" class="form-control" name="email" id="reset-password-email" placeholder="johndoe@icours.com" />
				<div class="invalid-feedback" id="reset-password-email-feedback">Email non reconnu</div>
			</div>

			<button class="btn btn-block btn-primary" type="submit"> RÉCUPÉRER MOT DE PASSE </button>
		</form>

		<p class="mb-0 font-size-sm text-center">
			Vous vous souvenez de votre mot de passe 
            <a
				class="text-underline collapsed"
				data-bs-toggle="collapse"
				href="#collapseSignin"
				role="button"
				aria-expanded="false"
				aria-controls="collapseSignin">Se connecter</a
			>
		</p>
	</div>
</div>
