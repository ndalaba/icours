<script lang="ts">
	import { userStore } from '$lib/store';
	import type { UserStoreType } from '$lib/type';
	let user: UserStoreType = { authenticated: false, user: undefined, loading: true };
	userStore.subscribe((value) => (user = value));
</script>

<header class="navbar navbar-expand-xl navbar-light">
	<div class="container container-wd">
		<!-- Brand -->
		<a class="navbar-brand ms-0" href="/client/static">
			<img src="/img/logo.png" class="navbar-brand-img" alt="ICOURS" />
		</a>

		<!-- Vertical Menu -->

		<!-- Collapse -->
		<div class="collapse navbar-collapse z-index-lg" id="navbarCollapse">
			<!-- Toggler -->
			<button
				class="navbar-toggler outline-0 text-primary"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarCollapse"
				aria-controls="navbarCollapse"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<!-- Icon -->
				<svg width="16" height="17" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M0.142135 2.00015L1.55635 0.585938L15.6985 14.7281L14.2843 16.1423L0.142135 2.00015Z"
						fill="currentColor"
					/>
					<path
						d="M14.1421 1.0001L15.5563 2.41431L1.41421 16.5564L0 15.1422L14.1421 1.0001Z"
						fill="currentColor"
					/>
				</svg>
			</button>

			<!-- Navigation -->

			<ul class="navbar-nav ms-5">
				<li class="nav-item"><a href="/client/static" class="nav-link">Accueil</a></li>
				<li class="nav-item"><a href="/client/static" class="nav-link">Corrigés</a></li>
				<li class="nav-item"><a href="/client/static" class="nav-link">Actu scolaires</a></li>
				<li class="nav-item"><a href="/client/static" class="nav-link">Études</a></li>
				<li class="nav-item"><a href="/client/static" class="nav-link">Qui sommes nous?</a></li>
				
				{#if !user.loading}
					{#if user.authenticated}
						<li class="nav-item"><a href="/dashboard" class="nav-link">{user?.user?.firstName}</a></li>
					{:else}
						<li class="nav-item"><a href="/connexion" class="nav-link">Connexion</a></li>
					{/if}
				{/if}
			</ul>
		</div>

		<button
			class="navbar-toggler ms-4 ms-md-5 shadow-none bg-teal text-white icon-xs p-0 outline-0 h-40p w-40p d-flex d-xl-none place-flex-center"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarCollapse"
			aria-controls="navbarCollapse"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<!-- Icon -->
			<svg width="25" height="17" viewBox="0 0 25 17" xmlns="http://www.w3.org/2000/svg">
				<rect width="25" height="1" fill="currentColor" />
				<rect y="8" width="15" height="1" fill="currentColor" />
				<rect y="16" width="20" height="1" fill="currentColor" />
			</svg>
		</button>
	</div>
</header>
