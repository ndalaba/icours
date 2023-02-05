<script lang="ts">
    import type {User} from "$lib/type";

    export let question = ""
    export let user: User;

</script>

<div style="width: 100%;">
    <div class="p-2" style="display: flex">
        <div class="p-2">
            <div class="p-2 text-white" style="background-color: #0a1a28;border-radius: .5rem">{user.firstName}</div>
        </div>
        <div class="p-2">
            <p>{question}</p>
        </div>
    </div>
</div>