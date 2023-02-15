// since there's no dynamic data here, we can prerender

import {UserStore} from "$lib/store";
import {getRequest} from "$lib/helper/Request";
import {ClasseStore, SubjectStore} from "$lib/store";

export async function load() {
    try {
        const response = await getRequest('/auth/me')
        UserStore.set({
            authenticated: response.success && response.data != undefined,
            user: response.data,
            loading: false
        })
        getRequest('/subjects').then(response => {
            if (response.success) SubjectStore.set(response.data)
        })
        getRequest('/classes').then(response => {
            if (response.success) ClasseStore.set(response.data)
        })
    } catch (e) {
        console.error(e)
    }
}
