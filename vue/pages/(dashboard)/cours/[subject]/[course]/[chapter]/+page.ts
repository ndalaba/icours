import type {PageLoad} from '../../../../../../.svelte-kit/types/src/routes';
import {getRequest} from "$lib/helper/Request";

export const load = (async ({params}) => {
    let res = await getRequest('/chapters/chapter/slug/' + params?.chapter)
    const chapter = res.data
    res = await getRequest('/chapters/' + chapter?.course?.id)
    return {chapter, chapters: res.data}
}) satisfies PageLoad