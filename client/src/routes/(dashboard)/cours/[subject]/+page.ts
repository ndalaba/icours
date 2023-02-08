import type {SubjectType} from "$lib/type";
import type {PageLoad} from './$types';
import {getRequest} from "$lib/helper/Request";

export const load = (async ({params}) => {
    let subject: SubjectType
    let res = await getRequest('/subjects/' + params.subject)
    subject = res?.data
    res = await getRequest('/courses?subject=' + subject?.id)
    const courses = res?.data
    return {subject, courses}
}) satisfies PageLoad