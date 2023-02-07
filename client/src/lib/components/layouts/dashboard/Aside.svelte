<script lang="ts">
    import {userStore} from "$lib/store";
    import type {User, UserStoreType} from "$lib/type"
    import {Role} from "$lib/type";
    import AdminMenu from "$lib/components/layouts/dashboard/AdminMenu.svelte";
    import UserMenu from "$lib/components/layouts/dashboard/UserMenu.svelte";
    import UserIcon from "$lib/components/layouts/dashboard/UserIcon.svelte";

    const authUser: UserStoreType = $userStore

    function isAdmin(user: User): boolean {
        return [Role.ROLE_SUPER_ADMIN, Role.ROLE_ADMIN].includes(user?.role as number)
    }

</script>

<aside class="navbar navbar-vertical navbar-expand-lg navbar-dark">
    <div class="container-fluid">
        <button aria-controls="sidebar-menu" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-bs-target="#sidebar-menu" data-bs-toggle="collapse" type="button">
            <span class="navbar-toggler-icon"></span>
        </button>
        {#if authUser.authenticated}
        <div class="nav-item dropdown mt-3 ms-4 d-none d-md-block d-lg-block">
            <a aria-expanded="false" aria-label="Open user menu" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" href="#">
                <UserIcon user={authUser.user}/>
            </a>
            <UserMenu/>
        </div>
        <div class="navbar-nav flex-row d-lg-none">
            <div class="nav-item dropdown">
                <a aria-label="Open user menu" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" href="#">
                    <UserIcon user={authUser.user}/>
                </a>
                <UserMenu/>
            </div>
        </div>
        {/if}
        <div class="collapse navbar-collapse" id="sidebar-menu">
            <ul class="navbar-nav pt-lg-3">
                <li class="nav-item">
                    <a class="nav-link" href="/admin">
                          <span class="nav-link-icon d-md-none d-lg-inline-block">
                            <svg class="icon" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none"></path><path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path></svg>
                          </span>
                        <span class="nav-link-title">Accueil</span>
                    </a>
                </li>

                {#if isAdmin(authUser.user)}
                    <AdminMenu/>
                {/if}


                <li>
                    <a class="btn btn-primary chat_btn" data-bs-target="#modal-scrollable" data-bs-toggle="modal" href="#">
                        Vous avez des questions
                    </a>
                </li>
            </ul>
        </div>
    </div>
</aside>

<style>
    .chat_btn {
        position: fixed;
        bottom: 0;
        width: 15rem;
        background-color: #dd0b1f;
        border-radius: 0;

    }
</style>