<script setup lang="ts">
  import "../tabler.min.css"
  import "../app.css"

  import Alert from "~/components/layouts/dashboard/Alert.vue";
  import Aside from "~/components/layouts/dashboard/Aside.vue";
  import Footer from "~/components/layouts/dashboard/Footer.vue";
  import Chat from "~/components/layouts/dashboard/chat/Chat.vue";

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