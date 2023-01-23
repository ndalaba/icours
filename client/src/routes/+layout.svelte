<script type="ts">
	import Header from "$lib/components/layouts/Header.svelte";
	import Footer from "$lib/components/layouts/Footer.svelte";
	import Auth from "$lib/components/auth/Auth.svelte";
	import "./app.css"
</script>

<div class="app">
	<Auth/>
	<Header />
	<slot />
	<Footer/>
</div>