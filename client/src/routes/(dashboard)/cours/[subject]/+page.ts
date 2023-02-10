import type {SubjectType} from "$lib/type";
import type {PageLoad} from '../../../../.svelte-kit/types/src/routes';
import {getRequest} from "$lib/helper/Request";

export const load = (async ({params}) => {
    let subject: SubjectType
    let res = await getRequest('/subjects/' + params.subject)
    subject = res.success ? res?.data : null
    res = await getRequest('/courses?subject=' + subject?.id)
    const courses = res.success ? res?.data : []
    return {subject, courses}
}) satisfies PageLoad