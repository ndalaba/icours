<script setup lang="ts">
    const props  = defineProps(['response'])
</script>

<div style="width: 100%;">
    <div class="p-2 bg-light" style="display: flex;">
        <div class="p-2">
            <div class="p-2 text-white border-2" style="background-color: rgb(165, 23, 23);border-radius: .5rem;">{{APP_NAME}}</div>
        </div>
        <div class="p-2" v-html="props.response"/>
    </div>
</div>