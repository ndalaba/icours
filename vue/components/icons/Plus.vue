<script setup lang="ts">

const props= defineProps({
  width:{type:Number,default(){return 44}},
  height:{type:Number,default(){return 44}}
})
</script>
<template>
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" :width="props.width" :height="props.height" viewBox="0 0 24 24" stroke-width="1" stroke="#77838f" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="9" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="12" y1="9" x2="12" y2="15" />
</svg>
</template>