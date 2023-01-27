<script lang="ts">
	import Notification from '$lib/components/layouts/Notification.svelte';
	import { APP_NAME } from '$lib/helper/Constants';
	import { hasValidationError, showValidationErrors } from '$lib/helper/Errors';
	import { post } from '$lib/helper/Request';

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


<svelte:head>
    <title>Connexion à {APP_NAME}</title>
</svelte:head>

<header class="py-8 py-md-8" style="background-image: none;">
    <div class="container text-center py-xl-2">
        <h1 class="display-4 fw-semi-bold mb-0">Connexion à {APP_NAME}</h1>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb breadcrumb-scroll justify-content-center">
                <li class="breadcrumb-item">
                    <a class="text-gray-800" href="/">Accueil                    </a>
                </li>
                <li class="breadcrumb-item text-gray-800 active" aria-current="page">
                    Connexion
                </li>
            </ol>
        </nav>
    </div>
</header>


<div class="container mb-11">
    <div class="row gx-0">
        <div class="col-md-7 col-xl-4 mx-auto">
            <Notification message={notificationMessage} show={showNotification} {notificationType} />
            <!-- Form Register -->
            <form class="mb-5" id="login" on:submit|preventDefault={handleSubmit}>
                <!-- Email -->
                <div class="form-group mb-5">
                    <input
                        type="email"
                        class="form-control"
                        id="login-email"
                        name="email"
                        placeholder="Adresse email"
                        required
                    />
                    <div class="invalid-feedback" id="login-email-feedback" />
                </div>
    
                <!-- Password -->
                <div class="form-group mb-5">
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
                            href="/compte/reinitialisation-mot-de-passe"
                            >Mot de passe oublié</a
                        >
                    </div>
                </div>
    
                <button class="btn btn-block btn-primary" type="submit"> ENVOYER </button>
            </form>

            <!-- Text -->
            <p class="mb-0 font-size-sm text-center">
                Vous n'avez pas de compte <a class="text-underline" href="/inscription">S'inscrire</a>
            </p>
        </div>
    </div>
</div>