<script setup lang="ts">
import {SubjectStore} from "@/composables/store";
import {SERVER_UPLOAD_PATH} from "~/utils/Constants.ts";</script>
<template>
  <Head>
    <Title>I-Cours - Programme cours</Title>
  </Head>
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <ol aria-label="breadcrumbs" class="breadcrumb breadcrumb-arrows">
            <li class="breadcrumb-item">
              <NuxtLink href="/cours">Cours</NuxtLink>
            </li>
            <li aria-current="page" class="breadcrumb-item active">
              <h2 class="breadcrumb-current">
                <NuxtLink href="/">Matières</NuxtLink>
              </h2>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <div class="page-body">
    <div class="container-xl">
      <div class="row row-deck row-cards">
        <div class="col-md-4 col-xl-2 m-2" v-for="subject in SubjectStore.subjects">
          <NuxtLink class="card card-link" :href="`/cours/${subject.slug}`">
            <div class="card-cover card-cover-blurred text-center" :style="{'background-image': 'url('+SERVER_UPLOAD_PATH + subject.image+')'}">
              <span class="avatar avatar-xl avatar-thumb rounded" :style="{'background-image': 'url('+SERVER_UPLOAD_PATH + subject.image+')'}"></span>
            </div>
            <div class="card-body text-center">
              <div class="card-title mb-1">{{ subject.name }}</div>
              <div class="text-muted">{{ subject.description }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>