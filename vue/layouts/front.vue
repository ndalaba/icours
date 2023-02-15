<script setup lang="ts">
import Header from '~/components/layouts/front/Header.vue';
import Footer from '~/components/layouts/front/Footer.vue';
import '~/assets/app.css';
</script>

<template>
  <Head>
    <Title>I-COURS - Cours en ligne - Primaire, Collège et Lycée</Title>
    <Meta name="description" content="Cours en ligne pour le primaire, le collège et le lycée"/>
    <Link rel="preconnect" href="https://fonts.googleapis.com"/>
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <Link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,200&display=swap" rel="stylesheet"/>
    <Link rel="stylesheet" href="/fonts/fontawesome.css"/>
    <Link rel="stylesheet" href="/css/theme.min.css"/>
  </Head>

  <div class="app">
    <Header/>
    <slot/>
    <Footer/>
  </div>
</template>