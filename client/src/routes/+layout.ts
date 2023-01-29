// since there's no dynamic data here, we can prerender

import { getRequest } from "$lib/helper/Request";
import { userStore } from "$lib/store";

export async function load() {
   const response = await getRequest('/auth/me')
   userStore.set({ authenticated: response.success && response.data != undefined, user: response.data, loading: false })
}
