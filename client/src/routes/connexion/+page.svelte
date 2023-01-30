<script lang="ts">
    import '../theme.min.css'
    import {goto} from '$app/navigation';
    import Eye from '$lib/components/icons/Eye.svelte';
    import EyeOff from '$lib/components/icons/EyeOff.svelte';
    import Notification from '$lib/components/layouts/front/Notification.svelte';
    import {APP_NAME} from '$lib/helper/Constants';
    import {hasValidationError, showValidationErrors} from '$lib/helper/Errors';
    import {PostContentType, postRequest} from '$lib/helper/Request';
    import {userStore} from '$lib/store';
    import type {UserStoreType} from '$lib/type';

    let user: UserStoreType = {authenticated: false, user: undefined, loading: true};

    userStore.subscribe((value) => {
        user = value;
        if (value.authenticated) goto('/');
    });

    let showPassword = false;
    let showNotification = false;
    let showResendEmailButton = false;
    let notificationMessage = '';
    let notificationType = 'success';

    async function handleSubmit(event: SubmitEvent) {
        showNotification = false;
        const target = event.target as HTMLFormElement;
        const data = Object.fromEntries(new FormData(target).entries());
        const response = await postRequest('/auth/login', data, PostContentType.JSON);
        if (!response.success) {
            const {hasError, message} = hasValidationError('emailNotValidated', response.error);
            if (hasError) {
                showResendEmailButton = true;
                notificationMessage = message;
            }
            return showValidationErrors(response.error, 'login');
        }
        showNotification = false;
        target?.reset();
        userStore.set({authenticated: response.success, user: response.data, loading: false});
        await goto('/');
    }

    async function sendValidationEmail() {
        showNotification = false;
        showResendEmailButton = false;
        const response = await postRequest('/auth/resend-token', {
            email: document.querySelector<HTMLInputElement>('#email')?.value
        },PostContentType.JSON);
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
                    <a class="text-gray-800" href="/">Accueil </a>
                </li>
                <li aria-current="page" class="breadcrumb-item text-gray-800 active">Connexion</li>
            </ol>
        </nav>
    </div>
</header>

<div class="container mb-11">
    <div class="row gx-0">
        <div class="col-md-7 col-xl-4 mx-auto">
            <Notification message={notificationMessage} {notificationType} show={showNotification}/>
            {#if showResendEmailButton}
                <p>
                    <button class="btn btn-danger" on:click={sendValidationEmail}>
                        {notificationMessage} Renvoyer un mail de confirmation?
                    </button>
                </p>
            {/if}
            <form class="mb-5" enctype="multipart/form-data" id="login" on:submit|preventDefault={handleSubmit}>
                <div class="form-group mb-5">
                    <input
                            class="form-control"
                            id="login-email"
                            name="email"
                            placeholder="Adresse email"
                            required
                            type="email"
                    />
                    <div class="invalid-feedback" id="login-email-feedback"/>
                </div>
                <div class="form-group mb-5">
                    <div class="input-group input-group-flat">
                        <input
                                autocomplete="off"
                                class="form-control"
                                id="login-password"
                                name="password"
                                placeholder="**********"
                                required
                                type={showPassword ? 'text' : 'password'}
                        />
                        <span class="input-group-text">
							<a
                                    class="input-group-link"
                                    href="#"
                                    on:click|preventDefault={() => (showPassword = !showPassword)}
                            >
								{#if showPassword}
									<EyeOff/>
								{:else}
									<Eye/>
								{/if}
							</a>
						</span>
                        <div class="invalid-feedback" id="login-password-feedback"/>
                    </div>
                </div>
                <div class="d-flex align-items-center mb-5 font-size-sm">
                    <div class="form-check">
                        <input
                                class="form-check-input text-gray-800"
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                        />
                        <label class="form-check-label text-gray-800" for="remember_me">Rester connecté</label>
                    </div>

                    <div class="ms-auto">
                        <a class="text-gray-800 collapsed" href="/compte/reinitialisation-mot-de-passe">Mot de passe oublié?</a>
                    </div>
                </div>

                <button class="btn btn-block btn-primary" type="submit"> ENVOYER</button>
            </form>
            <p class="mb-0 font-size-sm text-center">
                Vous n'avez pas de compte <a class="text-underline" href="/inscription">S'inscrire</a>
            </p>
        </div>
    </div>
</div>
