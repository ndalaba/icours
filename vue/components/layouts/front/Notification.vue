<script setup lang="ts">
  const props = defineProps({
    notificationType:{type:String, default(){return "success"}},
    message:String,
    show:Boolean
  })
</script>
<template v-if="props.show">
  <div :class="`alert alert-${props.notificationType}`" role="alert">
    {{ message }}
  </div>
</template>