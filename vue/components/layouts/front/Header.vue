<script setup lang="ts">
import {UserStore} from '@/composables/store';</script>
<template>
  <header class="navbar navbar-expand-xl navbar-light">
    <div class="container container-wd">
      <a class="navbar-brand ms-0" href="/">
        <img alt="ICOURS" class="navbar-brand-img" src="/img/logo.png">
      </a>

      <div class="collapse navbar-collapse z-index-lg" id="navbarCollapse">
        <button aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler outline-0 text-primary" data-bs-target="#navbarCollapse" data-bs-toggle="collapse" type="button">
          <svg height="17" viewBox="0 0 16 17" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.142135 2.00015L1.55635 0.585938L15.6985 14.7281L14.2843 16.1423L0.142135 2.00015Z" fill="currentColor"/>
            <path d="M14.1421 1.0001L15.5563 2.41431L1.41421 16.5564L0 15.1422L14.1421 1.0001Z" fill="currentColor"/>
          </svg>
        </button>

        <ul class="navbar-nav ms-5">
          <li class="nav-item"><a class="nav-link" href="/">Accueil</a></li>
          <li class="nav-item"><a class="nav-link" href="/cours">Cours</a></li>
          <li class="nav-item"><a class="nav-link" href="/">Corrigés</a></li>
          <li class="nav-item"><a class="nav-link" href="/">Actu scolaires</a></li>
          <li class="nav-item"><a class="nav-link" href="/">Études</a></li>
          <li class="nav-item"><a class="nav-link" href="/">Qui sommes nous?</a></li>

          <template v-if="!UserStore.loading">
            <li class="nav-item" v-if="UserStore.authenticated">
              <a href="/cours" class="nav-link">{{ UserStore?.user?.firstName }}</a>
            </li>
            <li v-else class="nav-item"><NuxtLink href="/connexion" class="nav-link">Connexion</NuxtLink></li>
          </template>
        </ul>
      </div>

      <button
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          class="navbar-toggler ms-4 ms-md-5 shadow-none bg-teal text-white icon-xs p-0 outline-0 h-40p w-40p d-flex d-xl-none place-flex-center"
          data-bs-target="#navbarCollapse"
          data-bs-toggle="collapse"
          type="button"
      >
        <!-- Icon -->
        <svg height="17" viewBox="0 0 25 17" width="25" xmlns="http://www.w3.org/2000/svg">
          <rect fill="currentColor" height="1" width="25"/>
          <rect fill="currentColor" height="1" width="15" y="8"/>
          <rect fill="currentColor" height="1" width="20" y="16"/>
        </svg>
      </button>
    </div>
  </header>
</template>