import type {PageLoad} from './$types';
import {getRequest} from "$lib/helper/Request";

export const load = (async ({params}) => {
    let res = await getRequest('/courses/course/' + params?.course)
    const course = res?.data
    res = await getRequest('/chapters/' + course?.id)
    return {course, chapters: res.data}
}) satisfies PageLoad