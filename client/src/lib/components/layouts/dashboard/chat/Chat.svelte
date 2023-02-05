<script lang="ts">
    import Send from "$lib/components/icons/Send.svelte";
    import Question from "$lib/components/layouts/dashboard/chat/Question.svelte";
    import Response from "$lib/components/layouts/dashboard/chat/Response.svelte";
    import {userStore} from "$lib/store";
    import {PostContentType, postRequest} from "$lib/helper/Request";

    type ChatType = {
        isQuestion: boolean,
        question: string,
        response: string
    }

    let question = ""
    let loading = false;
    let chats: ChatType[] = []
    let user = $userStore.user

    async function handleSubmit() {
        loading = true
        const data = {question: question}
        chats = [...chats, {isQuestion: true, question: question, response: ""}]
        question = ""
        const response = await postRequest("/chats", data, PostContentType.JSON)
        const text = response.data.response.split('\n').map(elt => `<p>${elt}</p>`).join("")
        chats = [...chats, {isQuestion: false, question: "", response: text}]
        loading = false
        const modalBody = document.getElementById("chat_body")
        setTimeout(() => modalBody.scrollTop = modalBody.scrollHeight, 4)

    }
</script>

<div aria-hidden="true" class="chat modal fade" id="modal-scrollable" style="display: none;" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">FAQ</h5>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body p-0" id="chat_body">
                {#each chats as chat}
                    {#if chat.isQuestion}
                        <Question question={chat.question} user={user}/>
                    {:else }
                        <Response response={chat.response}/>
                    {/if}
                {/each}
            </div>
            <div class="modal-footer" style="padding: 0;background-color: #f1f5f9">
                <form class="w-100" id="chat_form" on:submit|preventDefault={handleSubmit}>
                    {#if loading}
                        <div class="mb-1">
                            <div class="progress">
                                <div class="progress-bar progress-bar-indeterminate bg-white"></div>
                            </div>
                        </div>
                    {/if}
                    <div class="input-group mb-2 w-100">
                        <input autocomplete="off" bind:value={question} class="form-control" name="question" placeholder="Entrer votre texte" style="border-right: none">

                            <button class="input-group-text" style="cursor:pointer; background-color: #fff;" type="submit">
                                <Send/>
                            </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>