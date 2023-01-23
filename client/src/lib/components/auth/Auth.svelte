<script>
	import Login from "./Login.svelte";
    import Password from "./Password.svelte";
	import Register from "./Register.svelte";
</script>
<div class="modal modal-sidebar left fade-left fade" id="accountModal" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Signin -->
            <Login/>

            <!-- Signup -->
            <Register/>

            <!-- Forgot Password -->
           <Password/>
        </div>
    </div>
</div>