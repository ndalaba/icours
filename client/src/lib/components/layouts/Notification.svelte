<script lang="ts">
	export let notificationType = 'success';
	export let message = '';
	export let show = false;
</script>

{#if show}
	<div class={`alert alert-${notificationType}`} role="alert">
		{message}
	</div>
{/if}
