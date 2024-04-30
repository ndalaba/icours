<script setup lang="ts">
import {UserStore} from "@/composables/store";
import type {User} from "@/composables/type"
import {Role} from "@/composables/type"
import AdminMenu from "~/components/layouts/default/AdminMenu.vue";
import UserMenu from "~/components/layouts/default/UserMenu.vue";
import UserIcon from "~/components/layouts/default/UserIcon.vue";

function isAdmin(user: User): boolean {
  return [Role.ROLE_SUPER_ADMIN, Role.ROLE_ADMIN].includes(user?.role as number)
}

</script>
<template>
  <aside class="navbar navbar-vertical navbar-expand-lg">
    <div class="container-fluid">
      <button aria-controls="sidebar-menu" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-bs-target="#sidebar-menu" data-bs-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <template v-if="UserStore.authenticated">
        <div class="nav-item dropdown mt-3 ms-4 d-none d-md-block d-lg-block">
          <a aria-expanded="false" aria-label="Open user menu" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" href="#">
            <UserIcon :user="UserStore.user"/>
          </a>
          <UserMenu/>
        </div>
        <div class="navbar-nav flex-row d-lg-none">
          <div class="nav-item dropdown">
            <a aria-label="Open user menu" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" href="#">
              <UserIcon :user="UserStore.user"/>
            </a>
            <UserMenu/>
          </div>
        </div>
      </template>
      <div class="collapse navbar-collapse" id="sidebar-menu">
        <ul class="navbar-nav pt-lg-3">
          <li class="nav-item">
            <NuxtLink class="nav-link" href="/cours">
            <span class="nav-link-icon d-md-none d-lg-inline-block">
              <svg class="icon" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none"></path><path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path></svg>
            </span>
              <span class="nav-link-title">Explorer</span>
            </NuxtLink>
          </li>

          <AdminMenu v-if="isAdmin(UserStore.user)"/>

          <li>
            <a class="btn btn-primary chat_btn" data-bs-target="#modal-scrollable" data-bs-toggle="modal" href="#">
              Vous avez des questions
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<style>
.chat_btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: transparent;
  border-radius: 0;
  color: #000;
  padding-top: 10px;
}
</style>