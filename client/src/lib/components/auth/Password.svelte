<div class="collapse" id="collapseForgotPassword" data-bs-parent="#accountModal">
    <div class="modal-header">
        <h5 class="modal-title">Recover password!</h5>
        <button type="button" class="close text-primary" data-bs-dismiss="modal" aria-label="Close">
            <!-- Icon -->
            <svg width="16" height="17" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.142135 2.00015L1.55635 0.585938L15.6985 14.7281L14.2843 16.1423L0.142135 2.00015Z" fill="currentColor"></path>
                <path d="M14.1421 1.0001L15.5563 2.41431L1.41421 16.5564L0 15.1422L14.1421 1.0001Z" fill="currentColor"></path>
            </svg>

        </button>
    </div>

    <div class="modal-body">
        <!-- Form Recover Password -->
        <form class="mb-5">
            <!-- Email -->
            <div class="form-group">
                <label for="modalForgotpasswordEmail">
                    Email
                </label>
                <input type="email" class="form-control" id="modalForgotpasswordEmail" placeholder="johndoe@creativelayers.com">
            </div>

            <!-- Submit -->
            <button class="btn btn-block btn-primary" type="submit">
                RECOVER PASSWORD
            </button>
        </form>

        <!-- Text -->
        <p class="mb-0 font-size-sm text-center">
            Remember your password? <a class="text-underline collapsed" data-bs-toggle="collapse" href="#collapseSignin" role="button" aria-expanded="false" aria-controls="collapseSignin">Log In</a>
        </p>
    </div>
</div>