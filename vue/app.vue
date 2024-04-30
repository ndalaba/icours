<script setup lang="ts">
import {ClasseStore, SubjectStore, UserStore} from "@/composables/store";
import {getRequest} from "~/utils/Request";

try {
  const response = await getRequest('/auth/me')
  UserStore.setAuthenticated(response.success && response.data != undefined).setUser(response.data).setLoading(false)

  getRequest('/subjects').then(res => {
    if (res.success) SubjectStore.setSubjects(res.data)
  })
  getRequest('/classes').then(res => {
    if (res.success) ClasseStore.setClasses(res.data)
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