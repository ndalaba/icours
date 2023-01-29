<script type="ts">
	import Header from '$lib/components/layouts/front/Header.svelte';
	import Footer from '$lib/components/layouts/front/Footer.svelte';
	import './theme.min.css'
	import './app.css';
</script>

<svelte:head>
	<title>I-COURS - Cours en ligne - Primaire, Collège et Lycée</title>
	<meta name="description" content="Cours en ligne pour le primaire, le collège et le lycée"/>
</svelte:head>

<div class="app">
	<Header />

	<section class="pb-11 pt-13 pt-xl-14 mt-n12 position-relative">
		<div class="position-absolute top-0 right-0">
			<img src="img/illustration-7.svg" class="img-fluid" alt="..." />
		</div>
		<div class="container">
			<div class="row align-items-center">
				<div class="col-12 col-md-5 col-lg-6 order-md-2" data-aos="fade-in" data-aos-delay="50">
					<!-- Image -->
					<img
						src="img/illustration-4.png"
						class="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0"
						alt="..."
					/>
				</div>
				<div class="col-12 col-md-7 col-lg-6 order-md-1 px-md-0">
					<!-- Heading -->
					<h1 class="display-2" data-aos="fade-left" data-aos-duration="150">
						Learn From <span class="text-orange fw-bold">Anywhere</span>
					</h1>

					<!-- Text -->
					<p class="lead pe-md-8 text-capitalize" data-aos="fade-up" data-aos-duration="200">
						Technology is bringing a massive wave of evolution on learning things in different ways.
					</p>

					<!-- Buttons -->
					<a
						href="./course-list-v1.html"
						class="btn btn-wide btn-slide slide-primary shadow mb-4 mb-md-0 me-md-5"
						data-aos-duration="200"
						data-aos="fade-up">GET STARTED</a
					>
					<a
						href="./course-list-v1.html"
						class="btn btn-primary btn-wide lift d-none d-lg-inline-block"
						data-aos-duration="200"
						data-aos="fade-up">VIEW COURSES</a
					>
				</div>
			</div>
			<!-- / .row -->
		</div>
	</section>

	<section class="py-5 py-md-8 bg-white">
		<div class="container container-wd">
			<div class="row align-items-end mb-md-7 mb-4">
				<div class="col-md mb-4 mb-md-0">
					<h1 class="mb-1">Trending Categories</h1>
					<p class="font-size-lg mb-0 text-capitalize">
						Cum doctus civibus efficiantur in imperdiet deterruisset.
					</p>
				</div>
				<div class="col-md-auto">
					<a href="./course-list-v6.html" class="d-flex align-items-center fw-medium">
						Browse All
						<div class="ms-2 d-flex">
							<!-- Icon -->
							<svg
								width="10"
								height="10"
								viewBox="0 0 10 10"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M7.7779 4.6098L3.32777 0.159755C3.22485 0.0567475 3.08745 0 2.94095 0C2.79445 0 2.65705 0.0567475 2.55412 0.159755L2.2264 0.487394C2.01315 0.700889 2.01315 1.04788 2.2264 1.26105L5.96328 4.99793L2.22225 8.73895C2.11933 8.84196 2.0625 8.97928 2.0625 9.1257C2.0625 9.27228 2.11933 9.4096 2.22225 9.51269L2.54998 9.84025C2.65298 9.94325 2.7903 10 2.9368 10C3.0833 10 3.2207 9.94325 3.32363 9.84025L7.7779 5.38614C7.88107 5.2828 7.93774 5.14484 7.93741 4.99817C7.93774 4.85094 7.88107 4.71305 7.7779 4.6098Z"
									fill="currentColor"
								/>
							</svg>
						</div>
					</a>
				</div>
			</div>

			<div class="row row-cols-2 row-cols-md-3 row-cols-xl-5 row-cols-wd-6">
				<div class="col mb-md-6 mb-4 px-2 px-md-4">
					<!-- Card -->
					<a
						href="./course-list-v6.html"
						class="card bg-lavender hover-gradient-1 rounded-lg p-md-5 p-3 h-210p text-center lift"
					>
						<!-- Image -->
						<div class="mt-7 text-gigas display-4">
							<i class="fas fa-bezier-curve" />

							<!-- Footer -->
							<div class="card-footer px-0 pb-0 pt-4">
								<h5 class="mb-0 line-clamp-2 text-gigas">Design</h5>
							</div>
						</div>
					</a>
				</div>

				<div class="col mb-md-6 mb-4 px-2 px-md-4">
					<!-- Card -->
					<a
						href="./course-list-v6.html"
						class="card bg-lavender hover-gradient-1 rounded-lg p-md-5 p-3 h-210p text-center lift"
					>
						<!-- Image -->
						<div class="mt-7 text-gigas display-4">
							<i class="fas fa-briefcase" />

							<!-- Footer -->
							<div class="card-footer px-0 pb-0 pt-4">
								<h5 class="mb-0 line-clamp-2 text-gigas">Business</h5>
							</div>
						</div>
					</a>
				</div>

				<div class="col mb-md-6 mb-4 px-2 px-md-4">
					<!-- Card -->
					<a
						href="./course-list-v6.html"
						class="card bg-lavender hover-gradient-1 rounded-lg p-md-5 p-3 h-210p text-center lift"
					>
						<!-- Image -->
						<div class="mt-7 text-gigas display-4">
							<i class="fas fa-laptop-code" />

							<!-- Footer -->
							<div class="card-footer px-0 pb-0 pt-4">
								<h5 class="mb-0 line-clamp-2 text-gigas">Software Development</h5>
							</div>
						</div>
					</a>
				</div>

				<div class="col mb-md-6 mb-4 px-2 px-md-4">
					<!-- Card -->
					<a
						href="./course-list-v6.html"
						class="card bg-lavender hover-gradient-1 rounded-lg p-md-5 p-3 h-210p text-center lift"
					>
						<!-- Image -->
						<div class="mt-7 text-gigas display-4">
							<i class="far fa-file-alt" />

							<!-- Footer -->
							<div class="card-footer px-0 pb-0 pt-4">
								<h5 class="mb-0 line-clamp-2 text-gigas">Personal Development</h5>
							</div>
						</div>
					</a>
				</div>

				<div class="col mb-md-6 mb-4 px-2 px-md-4">
					<!-- Card -->
					<a
						href="./course-list-v6.html"
						class="card bg-lavender hover-gradient-1 rounded-lg p-md-5 p-3 h-210p text-center lift"
					>
						<!-- Image -->
						<div class="mt-7 text-gigas display-4">
							<i class="fas fa-camera" />

							<!-- Footer -->
							<div class="card-footer px-0 pb-0 pt-4">
								<h5 class="mb-0 line-clamp-2 text-gigas">Photography</h5>
							</div>
						</div>
					</a>
				</div>

				<div class="col d-xl-none d-wd-block mb-md-6 mb-4 px-2 px-md-4">
					<!-- Card -->
					<a
						href="./course-list-v6.html"
						class="card bg-lavender hover-gradient-1 rounded-lg p-md-5 p-3 h-210p text-center lift"
					>
						<!-- Image -->
						<div class="mt-7 text-gigas display-4">
							<i class="fas fa-music" />

							<!-- Footer -->
							<div class="card-footer px-0 pb-0 pt-4">
								<h5 class="mb-0 line-clamp-2 text-gigas">Audio + Music</h5>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</section>

	<section class="py-5 py-md-8 bg-white">
		<div class="container container-wd">
			<div class="row align-items-center mb-6">
				<div class="col-md-6 order-2 aos-init aos-animate" data-aos="fade-left">
					<h2>Learn at your own pace</h2>
					<p class="line-clamp-3 line-height-md">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
						dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.Join
						millions of people from around the world learning together. Online learning is as easy
						and natural as chatting.
					</p>
				</div>

				<div class="col-md-6 order-1 mb-8 mb-md-0 aos-init aos-animate" data-aos="zoom-in">
					<img class="img-fluid" src="/img/post-10.png" alt="..." />
				</div>
			</div>

			<div class="row align-items-center">
				<div class="col-md-6 order-2 order-md-1 aos-init" data-aos="fade-right">
					<h2>Community of opportunities</h2>
					<p class="line-clamp-3 line-height-md">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
						dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.Join
						millions of people from around the world learning together. Online learning is as easy
						and natural as chatting.
					</p>
				</div>

				<div
					class="col-md-6 order-1 mb-8 mb-md-0 order-md-2 text-right aos-init"
					data-aos="zoom-in"
				>
					<img class="img-fluid" src="img/post-11.png" alt="..." />
				</div>
			</div>
		</div>
	</section>

	<section class="py-6 py-md-10 bg-white">
		<div class="container container-wd">
			<div class="bg-gradient-1 rounded-lg py-md-9 py-8 px-md-8 px-5">
				<div class="row align-items-center">
					<div class="col-xl-7 mb-4 mb-xl-0 text-capitalize">
						<h1 class="text-white mb-3">Subscribe our newsletter</h1>
						<p class="font-size-lg text-white mb-3">
							Your download should start automatically, if not Click here. Should I give up, huh?.
						</p>
					</div>

					<div class="col-xl-5">
						<form>
							<div class="input-group d-block d-md-flex bg-white p-1 rounded-lg">
								<input
									type="text"
									class="form-control w-100 w-md-auto form-control-sm rounded-lg border-0 placeholder-1"
									placeholder="Enter your email"
									aria-label="Enter your email"
									aria-describedby="button-addon2"
								/>
								<div class="input-group-append ms-0">
									<button
										class="btn btn-sm btn-dark w-100 w-md-auto btn-wide rounded-lg border-0"
										type="button"
										id="button-addon2">Subscribe</button
									>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
	<Footer />
</div>
