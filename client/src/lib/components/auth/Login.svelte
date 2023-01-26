<script lang="ts">
	import { APP_NAME } from '$lib/helper/Constants';
	import { hasValidationError, showValidationErrors } from '$lib/helper/Errors';
	import { post } from '$lib/helper/Request';
	import Notification from '../layouts/Notification.svelte';
	import CloseBtn from './CloseBtn.svelte';

	let showPassword = false;
	let showNotification = false;
	let showResendEmailButton = false;
	let notificationMessage = '';
	let notificationType = 'success';

	async function handleSubmit(event: SubmitEvent) {
		showNotification = false;
		const target = event.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(target).entries());
		const response = await post('/auth/login', data);
		if (!response.success) {
			const { hasError, message } = hasValidationError('emailNotValidated', response.error);
			if (hasError) {
				showResendEmailButton = true;
				notificationMessage = message;
			}
			return showValidationErrors(response.error, 'login');
		}
		showNotification = true;
		target?.reset();
	}

	async function sendValidationEmail() {
		showNotification = false;
		showResendEmailButton = false;
		const response = await post('/auth/resend-token', {
			email: document.querySelector<HTMLInputElement>('#email')?.value
		});
		if (!response.success) {
			return showValidationErrors(response.error, 'login');
		}
		showNotification = true;
		notificationMessage = 'Un mail vient de vous être envoyé.';
	}
</script>

<div class="collapse" id="collapseSignin" data-bs-parent="#accountModal">
	<div class="modal-header">
		<h5 class="modal-title">Se connecter à votre compte {APP_NAME}</h5>
		<CloseBtn />
	</div>

	<div class="modal-body">
		<Notification message={notificationMessage} show={showNotification} {notificationType} />

		{#if showResendEmailButton}
			<p>
				<button class="btn btn-danger" on:click={sendValidationEmail}
					>{notificationMessage} Renvoyer un mail de confirmation?</button
				>
			</p>
		{/if}

		<form class="mb-5" id="login" on:submit|preventDefault={handleSubmit}>
			<!-- Email -->
			<div class="form-group mb-5">
				<label for="login-email">Email</label>
				<input
					type="email"
					class="form-control"
					id="login-email"
					name="email"
					placeholder="jon@doe.com"
					required
				/>
				<div class="invalid-feedback" id="login-email-feedback" />
			</div>

			<!-- Password -->
			<div class="form-group mb-5">
				<label for="login-password">Mot de passe</label>
				<div class="input-group input-group-flat">
					<input
						type={showPassword ? 'text' : 'password'}
						class="form-control"
						name="password"
						id="login-password"
						placeholder="**********"
						required
						autocomplete="off"
					/>
					<span class="input-group-text">
						<a
							href="#"
							class="input-group-link"
							on:click|preventDefault={() => (showPassword = !showPassword)}
							>{showPassword ? 'Masquer' : 'Afficher'}</a
						>
					</span>
					<div class="invalid-feedback" id="login-password-feedback" />
				</div>
			</div>
			<div class="d-flex align-items-center mb-5 font-size-sm">
				<div class="form-check">
					<input class="form-check-input text-gray-800" type="checkbox" id="autoSizingCheck" />
					<label class="form-check-label text-gray-800" for="autoSizingCheck">
						Rester connecté
					</label>
				</div>

				<div class="ms-auto">
					<a
						class="text-gray-800 collapsed"
						data-bs-toggle="collapse"
						href="#collapseForgotPassword"
						role="button"
						aria-expanded="false"
						aria-controls="collapseForgotPassword">Mot de passe oublié</a
					>
				</div>
			</div>

			<button class="btn btn-block btn-primary" type="submit"> ENVOYER </button>
		</form>

		<p class="mb-0 font-size-sm text-center">
			Vous n'avez de compte <a
				class="text-underline"
				data-bs-toggle="collapse"
				href="#collapseSignup"
				role="button"
				aria-expanded="true"
				aria-controls="collapseSignup">S'inscrire</a
			>
		</p>
	</div>
</div>
