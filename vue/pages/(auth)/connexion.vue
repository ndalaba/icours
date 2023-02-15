<script setup lang="ts">
import Eye from '~/components/icons/Eye.vue';
import EyeOff from '~/components/icons/EyeOff.vue';
import Notification from '~/components/layouts/front/Notification.vue';
import {hasValidationError, showValidationErrors} from '~/utils/Errors';
import {PostContentType, postRequest} from '~/utils/Request';
import {UserStore} from '@/composables/store';
import {APP_NAME} from "~/utils/Constants";

if(UserStore.authenticated)
 return  navigateTo('/')

const  showPassword = ref(false)
const showNotification = ref(false)
const showResendEmailButton = ref(false)
const notificationMessage = ref('')
const notificationType = ref('success')

async function handleSubmit(event: SubmitEvent) {
  showNotification.value = false;
  const target = event.target as HTMLFormElement;
  const data = Object.fromEntries(new FormData(target).entries());
  const response = await postRequest('/auth/login', data, PostContentType.JSON);
  if (!response.success) {
    const {hasError, message} = hasValidationError('emailNotValidated', response.error);
    if (hasError) {
      showResendEmailButton.value = true;
      notificationMessage.value = message;
    }
    return showValidationErrors(response.error, 'login');
  }
  showNotification.value = false;
  target?.reset();
  UserStore.setAuthenticated(response.success).setUser(response.data).setLoading(false)
  return navigateTo('/admin');
}

async function sendValidationEmail() {
  showNotification.value = false;
  showResendEmailButton.value = false;
  const response = await postRequest('/auth/resend-token', {
    email: document.querySelector<HTMLInputElement>('#email')?.value
  }, PostContentType.JSON);
  if (!response.success) {
    return showValidationErrors(response.error, 'login');
  }
  showNotification.value = true;
  notificationMessage.value = 'Un mail vient de vous être envoyé.';
}
</script>

<template>
  <Head>
    <Title>Connexion à {{APP_NAME}}</Title>
  </Head>

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
        <Notification :message="notificationMessage" :notificationType="notificationType" :show="showNotification"/>
          <p v-if="showResendEmailButton">
            <button class="btn btn-danger" @click="sendValidationEmail">
              {{notificationMessage}} Renvoyer un mail de confirmation?
            </button>
          </p>
          <form class="mb-5" enctype="multipart/form-data" id="login" @submit.prevent="handleSubmit">
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
                    :type="showPassword ? 'text' : 'password'"
                />
                <span class="input-group-text">
							<a href="#" class="input-group-link" @click.prevent="showPassword = !showPassword">
									<EyeOff v-if="showPassword"/>
									<Eye v-else/>
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
                <a class="text-gray-800 collapsed" href="/reinitialisation-mot-de-passe">Mot de passe oublié?</a>
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
</template>