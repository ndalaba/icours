<script lang="ts">
	import { APP_NAME } from '$lib/helper/Constants';
	import { showValidationErrors } from '$lib/helper/Errors';
	import { post } from '$lib/helper/Request';
	import Notification from '$lib/components/layouts/Notification.svelte';
	import CloseBtn from './CloseBtn.svelte';

	let showPassword = false;
	let showNotification = false;

	async function handleSubmit(event: SubmitEvent) {
		const target = event.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(target).entries());
		const response = await post('/auth/register', data);
		if (!response.success) {
			return showValidationErrors(response.error,'register');
		}
        showNotification=true
        target?.reset()
	}
</script>

<div class="collapse show" id="collapseSignup" data-bs-parent="#accountModal">
	<div class="modal-header">
		<h5 class="modal-title">Inscription à {APP_NAME}</h5>
		<CloseBtn/>
	</div>

	<div class="modal-body">
        <Notification message="Pour finaliser votre inscription veuillez consulter le message qui vient de vous être envoyé dans votre boite mail." show={showNotification}/>

		<form class="mb-5" id="register" on:submit|preventDefault={handleSubmit} method="post">
			<div class="form-group mb-5">
				<label for="register-firstName">Prénom</label>
				<input
					type="text"
					class="form-control"
					name="firstName"
					id="register-firstName"
					placeholder="John"
					required
				/>
			</div>
			<div class="form-group mb-5">
				<label for="register-lastName">Nom</label>
				<input
					type="text"
					class="form-control"
					name="lastName"
					id="register-lastName"
					placeholder="Doe"
					required
				/>
			</div>

			<div class="form-group mb-5">
				<label for="register-email">Email</label>
				<input
					type="email"
					class="form-control"
					name="email"
					id="register-email"
					placeholder="johndoe@icours.com"
					required
				/>
				<div class="invalid-feedback" id="register-email-feedback">Email déjà utilisé</div>
			</div>

			<div class="form-group mb-5">
				<label for="register-phone">Téléphone</label>
				<input
					type="text"
					class="form-control"
					name="phone"
					id="register-phone"
					placeholder="+224 00 000 000"
					required
				/>
				<div class="invalid-feedback" id="register-phone-feedback">Téléphone déjà utilisé</div>
			</div>
			<div class="form-group mb-5">
				<label for="register-password">Mot de passe</label>
				<div class="input-group input-group-flat">
					<input
						type={showPassword ? 'text' : 'password'}
						class="form-control"
						name="password"
						id="register-password"
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
				</div>
			</div>

			<button class="btn btn-block btn-primary" type="submit"> ENVOYER </button>
		</form>

		<p class="mb-0 font-size-sm text-center">
			Vous avez déjà un compte? <a
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
