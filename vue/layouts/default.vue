<script setup lang="ts">
import "~/assets/app.css"

import Alert from "~/components/layouts/default/Alert.vue";
import Aside from "~/components/layouts/default/Aside.vue";
import Footer from "~/components/layouts/default/Footer.vue";
import Chat from "~/components/layouts/default/chat/Chat.vue";

onMounted(() => {
  document.querySelectorAll('.dropdown-menu').forEach(elt => elt.classList.remove('show'))
  document.querySelector('#admin_menu')?.classList.add("show")
})

</script>

<template>

  <Head>
    <Title>Tableau de bord - I-Cours</Title>
    <Meta name="description" content="Cours en ligne pour le primaire, le collège et le lycée"/>
    <Link rel="preconnect" href="https://fonts.googleapis.com"/>
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <Link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,200&display=swap" rel="stylesheet"/>
    <Link rel="stylesheet" href="/fonts/fontawesome.css"/>
    <Link href="/css/tabler.min.css" rel="stylesheet"/>
  </Head>

  <div class="page">
    <Alert/>
    <Aside/>
    <div class="page-wrapper">
      <slot/>
      <Footer/>
    </div>
    <Chat/>
  </div>
</template>