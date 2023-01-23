<div class="collapse" id="collapseSignin" data-bs-parent="#accountModal" style="">
    <div class="modal-header">
        <h5 class="modal-title">Log In to Your Skola Account!</h5>
        <button type="button" class="close text-primary" data-bs-dismiss="modal" aria-label="Close">
            <!-- Icon -->
            <svg width="16" height="17" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.142135 2.00015L1.55635 0.585938L15.6985 14.7281L14.2843 16.1423L0.142135 2.00015Z" fill="currentColor"></path>
                <path d="M14.1421 1.0001L15.5563 2.41431L1.41421 16.5564L0 15.1422L14.1421 1.0001Z" fill="currentColor"></path>
            </svg>

        </button>
    </div>

    <div class="modal-body">
        <!-- Form Signin -->
        <form class="mb-5">

            <!-- Email -->
            <div class="form-group mb-5">
                <label for="modalSigninEmail">
                    Username or Email
                </label>
                <input type="email" class="form-control" id="modalSigninEmail" placeholder="creativelayers">
            </div>

            <!-- Password -->
            <div class="form-group mb-5">
                <label for="modalSigninPassword">
                    Password
                </label>
                <input type="password" class="form-control" id="modalSigninPassword" placeholder="**********">
            </div>

            <div class="d-flex align-items-center mb-5 font-size-sm">
                <div class="form-check">
                    <input class="form-check-input text-gray-800" type="checkbox" id="autoSizingCheck">
                    <label class="form-check-label text-gray-800" for="autoSizingCheck">
                        Remember me
                    </label>
                </div>

                <div class="ms-auto">
                    <a class="text-gray-800 collapsed" data-bs-toggle="collapse" href="#collapseForgotPassword" role="button" aria-expanded="false" aria-controls="collapseForgotPassword">Forgot Password</a>
                </div>
            </div>

            <!-- Submit -->
            <button class="btn btn-block btn-primary" type="submit">
                LOGIN
            </button>
        </form>

        <!-- Text -->
        <p class="mb-0 font-size-sm text-center">
            Don't have an account? <a class="text-underline" data-bs-toggle="collapse" href="#collapseSignup" role="button" aria-expanded="true" aria-controls="collapseSignup">Sign up</a>
        </p>
    </div>
</div>