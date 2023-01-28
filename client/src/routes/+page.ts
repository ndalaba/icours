// since there's no dynamic data here, we can prerender

import { getRequest } from "$lib/helper/Request";
import { authStore } from "$lib/store";

// it so that it gets served as a static asset in production
export const prerender = true;


export async function load() {
   const response = await getRequest('/auth/me')
   authStore.set({ auth: response.success && response.data != undefined, user: response.data })
}
