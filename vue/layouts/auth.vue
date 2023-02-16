<script setup lang="ts">
import '~/assets/app.css';</script>

<template>
  <Head>
    <Link rel="preconnect" href="https://fonts.googleapis.com"/>
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <Link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,200&display=swap" rel="stylesheet"/>
    <Link rel="stylesheet" href="/fonts/fontawesome.css"/>
    <Link rel="stylesheet" href="/css/theme.min.css"/>
  </Head>

  <div class="app">
    <slot/>
  </div>
</template>