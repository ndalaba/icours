<script lang="ts" setup>
    import type {User} from "@/composables/type";

    const props = defineProps<{
        question: string,
        user: User
    }>()

</script>

<div style="width: 100%;">
    <div class="p-2" style="display: flex">
        <div class="p-2">
            <div class="p-2 text-white" style="background-color: #0a1a28;border-radius: .5rem">{{props.user.firstName}}</div>
        </div>
        <div class="p-2">
            <p>{{props.question}}</p>
        </div>
    </div>
</div>