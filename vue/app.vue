<script setup lang="ts">
import {ClasseStore, SubjectStore, UserStore} from "@/composables/store";
import {getRequest} from "~/utils/Request";

try {
  const response = await getRequest('/auth/me')
  UserStore.setAuthenticated(response.success && response.data != undefined).setUser(response.data).setLoading(false)

  getRequest('/subjects').then(response => {
    if (response.success) SubjectStore.setSubjects(response.data)
  })
  getRequest('/classes').then(response => {
    if (response.success) ClasseStore.setClasses(response.data)
  })
} catch (e) {
  console.error(e)
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
