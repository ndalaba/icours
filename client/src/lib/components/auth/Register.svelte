<script lang="ts">
	import { APP_NAME } from '$lib/helper/Constants';
	import { validationError } from '$lib/helper/Errors';
	import { post } from '$lib/helper/Request';
	import Notification from '$lib/components/layouts/Notification.svelte';

	let showPassword = false;
	let showNotification = false;

	async function handleSubmit(event: SubmitEvent) {
		const data = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
		const response = await post('/auth/register', data);
		if (!response.success) {
			return validationError(response.error);
		}
        showNotification=true
        event.target?.reset()
	}
</script>

<div class="collapse show" id="collapseSignup" data-bs-parent="#accountModal">
	<div class="modal-header">
		<h5 class="modal-title">Inscription à {APP_NAME}</h5>
		<button type="button" class="close text-primary" data-bs-dismiss="modal" aria-label="Close">
			<!-- Icon -->
			<svg width="16" height="17" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M0.142135 2.00015L1.55635 0.585938L15.6985 14.7281L14.2843 16.1423L0.142135 2.00015Z"
					fill="currentColor"
				/>
				<path
					d="M14.1421 1.0001L15.5563 2.41431L1.41421 16.5564L0 15.1422L14.1421 1.0001Z"
					fill="currentColor"
				/>
			</svg>
		</button>
	</div>

	<div class="modal-body">
        <Notification message="Pour finaliser votre inscription veuillez consulter le message qui vient de vous être envoyé dans votre boite mail." show={showNotification}/>

		<form class="mb-5" on:submit|preventDefault={handleSubmit} method="post">
			<div class="form-group mb-5">
				<label for="firstName">Prénom</label>
				<input
					type="text"
					class="form-control"
					name="firstName"
					id="firstName"
					placeholder="John"
					required
				/>
			</div>
			<div class="form-group mb-5">
				<label for="lastName">Nom</label>
				<input
					type="text"
					class="form-control"
					name="lastName"
					id="lastName"
					placeholder="Doe"
					required
				/>
			</div>

			<div class="form-group mb-5">
				<label for="email">Email</label>
				<input
					type="email"
					class="form-control"
					name="email"
					id="email"
					placeholder="johndoe@icours.com"
					required
				/>
				<div class="invalid-feedback" id="email-feedback">Email déjà utilisé</div>
			</div>

			<div class="form-group mb-5">
				<label for="phone">Téléphone</label>
				<input
					type="text"
					class="form-control"
					name="phone"
					id="phone"
					placeholder="+224 00 000 000"
					required
				/>
				<div class="invalid-feedback" id="phone-feedback">Téléphone déjà utilisé</div>
			</div>
			<div class="form-group mb-5">
				<label for="password">Mot de passe</label>
				<div class="input-group input-group-flat">
					<input
						type={showPassword ? 'text' : 'password'}
						class="form-control"
						name="password"
						id="password"
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
                    <div class="invalid-feedback" id="password-feedback">Email déjà utilisé</div>
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
