<script lang="ts">
	import { APP_NAME } from '$lib/helper/Constants';
	import { showValidationErrors } from '$lib/helper/Errors';
	import { post } from '$lib/helper/Request';
	import Notification from '$lib/components/layouts/Notification.svelte';

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

<svelte:head>
    <title>Inscription à {APP_NAME}</title>
</svelte:head>

<header class="py-8 py-md-8" style="background-image: none;">
    <div class="container text-center py-xl-2">
        <h1 class="display-4 fw-semi-bold mb-0">Inscrivez-vous <br> et commencez à apprendre</h1>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb breadcrumb-scroll justify-content-center">
                <li class="breadcrumb-item">
                    <a class="text-gray-800" href="/">Accueil                    </a>
                </li>
                <li class="breadcrumb-item text-gray-800 active" aria-current="page">
                    Inscription
                </li>
            </ol>
        </nav>
    </div>
</header>


<div class="container mb-11">
    <div class="row gx-0">
        <div class="col-md-7 col-xl-4 mx-auto">
            <Notification message="Pour finaliser votre inscription veuillez consulter le message qui vient de vous être envoyé dans votre boite mail." show={showNotification}/>

            <form class="mb-5" id="register" on:submit|preventDefault={handleSubmit} method="post">
                <div class="form-group mb-5">
                    <input
                        type="text"
                        class="form-control"
                        name="firstName"
                        id="register-firstName"
                        placeholder="Prénom"
                        required
                    />
                </div>
                <div class="form-group mb-5">
                    <input
                        type="text"
                        class="form-control"
                        name="lastName"
                        id="register-lastName"
                        placeholder="Nom"
                        required
                    />
                </div>
    
                <div class="form-group mb-5">
                    <input
                        type="email"
                        class="form-control"
                        name="email"
                        id="register-email"
                        placeholder="Adresse email"
                        required
                    />
                    <div class="invalid-feedback" id="register-email-feedback">Email déjà utilisé</div>
                </div>
    
                <div class="form-group mb-5">
                    <input
                        type="text"
                        class="form-control"
                        name="phone"
                        id="register-phone"
                        placeholder="Téléphone"
                        required
                    />
                    <div class="invalid-feedback" id="register-phone-feedback">Téléphone déjà utilisé</div>
                </div>
                <div class="form-group mb-5">
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

            <!-- Text -->
            <p class="mb-0 font-size-sm text-center">
                Vous avez déjà un compte <a class="text-underline" href="/connexion">Se connecter</a>
            </p>
        </div>
    </div>
</div>