<script lang="ts" setup>
    import Send from "~/components/icons/Send.vue";
    import Question from "~/components/layouts/dashboard/chat/Question.vue";
    import Response from "~/components/layouts/dashboard/chat/Response.vue";
    import {UserStore} from "~/composables/store";
    import {PostContentType, postRequest} from "~/utils/Request";

    interface Chat {
        isQuestion: boolean,
        question: string,
        response: string
    }
    const question = ref('')
    const loading = ref(false)
    const chats = ref<Chat[]>([])

    async function handleSubmit() {
        loading.value = true
        const data = {question: question}
        chats.value = [...chats.value, {isQuestion: true, "question": question, response: ""}]
        question.value = ""
        const response = await postRequest("/chats", data, PostContentType.JSON)
        const text = response.data.response.split('\n').map((elt:string) => `<p>${elt}</p>`).join("")
        chats.value = [...chats.value, {isQuestion: false, question: "", response: text}]
        loading.value = false
        const modalBody = document.getElementById("chat_body")
        setTimeout(() => modalBody?.scrollTop = modalBody?.scrollHeight, 4)
    }
</script>

<div aria-hidden="true" class="chat modal fade" id="modal-scrollable" style="display: none;" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Poser vos question</h5>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body p-0" id="chat_body">
                <template v-for="chat in chats">
                    <Question :question="chat.question" :user="UserStore.user" v-if="chat.isQuestion"/>
                    <Response :response="chat.response" v-else/>
                </template>
            </div>
            <div class="modal-footer" style="padding: 0;background-color: #f1f5f9">
                <form @submit.prevent="handleSubmit" class="w-100" id="chat_form">
                        <div class="mb-1" v-if="loading">
                            <div class="progress">
                                <div class="progress-bar progress-bar-indeterminate bg-white"></div>
                            </div>
                        </div>
                    <div class="input-group mb-2 w-100">
                        <input autocomplete="off" v-model="question" class="form-control" name="question" placeholder="Entrer votre texte" style="border-right: none">

                        <button class="input-group-text" style="cursor:pointer; background-color: #fff;" type="submit">
                            <Send/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>