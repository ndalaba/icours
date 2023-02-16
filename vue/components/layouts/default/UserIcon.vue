<script lang="ts" setup>
const props = defineProps(['user'])
</script>
<template>
  <span class="avatar avatar-sm" style="background-image: url(https://assets.kartable.fr/front/assets/media/icons/avatars/student/203.svg?1674734259)"></span>
  <div class="d-none d-xl-block ps-2">
    <div>{{ props.user?.firstName }}</div>
    <div class="mt-1 small text-muted">UI Designer</div>
  </div>
</template>