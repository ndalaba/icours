<script type="ts">
	import Header from "../components/layouts/Header.svelte";
	import Footer from "../components/layouts/Footer.svelte";
</script>

<div class="app">
	<Header />
	<slot />
	<Footer/>
</div>