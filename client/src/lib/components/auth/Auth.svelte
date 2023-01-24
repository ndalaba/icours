<script>
	import Login from "./Login.svelte";
    import Password from "./Password.svelte";
	import Register from "./Register.svelte";
</script>

<div class="modal modal-sidebar left fade-left fade" id="accountModal" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <Login/>

            <Register/>

           <Password/>
        </div>
    </div>
</div>
<style>
    .modal-sidebar{padding-right: 0px!important;}
</style>