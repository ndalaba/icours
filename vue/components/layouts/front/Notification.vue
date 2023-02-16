<script setup lang="ts">
const props = defineProps({
  notificationType: {
    type: String,
    default() {
      return "success"
    }
  },
  message: String,
})
</script>
<template>
  <div :class="`alert alert-${props.notificationType}`" role="alert">
    {{ props.message }}
  </div>
</template>
