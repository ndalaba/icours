<script setup lang="ts">

import {showValidationErrors} from '~/utils/Errors';
import {PostContentType, postRequest} from '~/utils/Request';
import Notification from '~/components/layouts/front/Notification.vue';
import EyeOff from '~/components/icons/EyeOff.vue';
import Eye from '~/components/icons/Eye.vue';
import {APP_NAME} from "~/utils/Constants";

const showPassword = ref(false)
const showNotification = ref(false)

async function handleSubmit(event: SubmitEvent) {
  const target = event.target as HTMLFormElement;
  const data = Object.fromEntries(new FormData(target).entries());
  const response = await postRequest('/auth/register', data, PostContentType.JSON);
  if (!response.success)
    return showValidationErrors(response.error, 'register');

  showNotification.value = true
  target?.reset()
}
</script>

<template>
  <Head>
    <Title>Inscription à {{APP_NAME}}</Title>
  </Head>

  <header class="py-8 py-md-8" style="background-image: none;">
    <div class="container text-center py-xl-2">
      <h1 class="display-4 fw-semi-bold mb-0">Inscrivez-vous <br> et commencez à apprendre</h1>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-scroll justify-content-center">
          <li class="breadcrumb-item">
            <a class="text-gray-800" href="/" :title="APP_NAME">Accueil</a>
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
        <Notification :message="'Pour finaliser votre inscription veuillez consulter le message qui vient de vous être envoyé dans votre boite mail'" :show="showNotification"/>

        <form class="mb-5" id="register" @submit.prevent="handleSubmit" method="post">
          <div class="form-group mb-5">
            <input type="text" class="form-control" name="firstName" id="register-firstName" placeholder="Prénom" required/>
          </div>
          <div class="form-group mb-5">
            <input type="text" class="form-control" name="lastName" id="register-lastName" placeholder="Nom" required/>
          </div>

          <div class="form-group mb-5">
            <input type="email" class="form-control" name="email" id="register-email" placeholder="Adresse email" required/>
            <div class="invalid-feedback" id="register-email-feedback">Email déjà utilisé</div>
          </div>

          <div class="form-group mb-5">
            <input type="text" class="form-control" name="phone" id="register-phone" placeholder="Téléphone" required/>
            <div class="invalid-feedback" id="register-phone-feedback">Téléphone déjà utilisé</div>
          </div>
          <div class="form-group mb-5">
            <div class="input-group input-group-flat">
              <input :type="showPassword ? 'text' : 'password'" class="form-control" name="password" id="register-password" placeholder="**********" required autocomplete="off"/>
              <span class="input-group-text">
                <a href="#" class="input-group-link" @click.prevent="showPassword = !showPassword">
									<EyeOff v-if="showPassword"/>
									<Eye v-else/>
                </a>
              </span>
            </div>
          </div>

          <button class="btn btn-block btn-primary" type="submit"> ENVOYER</button>
        </form>

        <!-- Text -->
        <p class="mb-0 font-size-sm text-center">
          Vous avez déjà un compte <a class="text-underline" href="/connexion">Se connecter</a>
        </p>
      </div>
    </div>
  </div>
</template>